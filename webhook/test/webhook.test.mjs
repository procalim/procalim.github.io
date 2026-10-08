/**
 * End-to-end check of the Worker, run locally with `npm test`.
 *
 * Starts the Worker under `wrangler dev` (local KV, local cron) with a
 * stand-in for Resend, then sends it webhooks signed exactly as Whop signs
 * them. Nothing leaves the machine: no real email is sent.
 */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { createHmac } from "node:crypto";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SECRET = "ws_test_secret_for_local_runs_only";
const WORKER = "http://127.0.0.1:8799";
const sent = [];
let resend, worker;

/** Whop's signing: Standard Webhooks, HMAC-SHA256 keyed with the literal secret bytes. */
const sign = (id, timestamp, body, secret = SECRET) =>
  "v1," + createHmac("sha256", Buffer.from(secret, "utf8")).update(`${id}.${timestamp}.${body}`).digest("base64");

const deliver = async (event, { secret, deliveryId = `msg_${Math.random().toString(36).slice(2)}` } = {}) => {
  const body = JSON.stringify(event);
  const ts = Math.floor(Date.now() / 1000).toString();
  return fetch(WORKER, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "webhook-id": deliveryId,
      "webhook-timestamp": ts,
      "webhook-signature": sign(deliveryId, ts, body, secret),
    },
    body,
  });
};

const payment = (id, plan, email = "buyer@example.com") => ({
  id: `evt_${id}`,
  type: "payment.succeeded",
  api_version: "v1",
  timestamp: new Date().toISOString(),
  data: { id, plan_id: plan, customer_email: email, status: "paid" },
});

before(async () => {
  resend = createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      sent.push({ key: req.headers["idempotency-key"], auth: req.headers.authorization, ...JSON.parse(raw) });
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ id: `email_${sent.length}` }));
    });
  }).listen(8798, "127.0.0.1");

  worker = spawn(
    "npx",
    ["wrangler", "dev", "--port", "8799", "--ip", "127.0.0.1", "--test-scheduled", "--persist-to", mkdtempSync(join(tmpdir(), "kv-")),
     "--var", `WHOP_WEBHOOK_SECRET:${SECRET}`, "--var", "EMAIL_API_KEY:re_test", "--var", "EMAIL_REPLY_TO:support@example.com",
     "--var", "RESEND_API_URL:http://127.0.0.1:8798", "--var", "REVIEW_DELAY_DAYS:0"],
    { stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, WRANGLER_SEND_METRICS: "false" } },
  );
  worker.logs = "";
  worker.stdout.on("data", (d) => (worker.logs += d));
  worker.stderr.on("data", (d) => (worker.logs += d));
  for (let i = 0; i < 120; i++) {
    try { if ((await fetch(WORKER)).ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("wrangler dev did not start:\n" + worker.logs);
});

after(() => { worker?.kill(); resend?.close(); });

test("a forged signature is refused and sends nothing", async () => {
  const res = await deliver(payment("pay_forged", "plan_yC2EH8kuwf8pi"), { secret: "ws_wrong" });
  assert.equal(res.status, 401);
  assert.equal(sent.length, 0);
});

test("payment.succeeded for the free guide sends the thank-you at once", async () => {
  const res = await deliver(payment("pay_free1", "plan_yC2EH8kuwf8pi"));
  assert.equal(res.status, 200);
  assert.equal(sent.length, 1);
  const mail = sent[0];
  assert.deepEqual(mail.to, ["buyer@example.com"]);
  assert.equal(mail.from, "The Edible Codex <hello@ediblecodex.com>");
  assert.equal(mail.reply_to, "support@example.com");
  assert.equal(mail.auth, "Bearer re_test");
  assert.equal(mail.key, "thanks/pay_free1");
  assert.match(mail.subject, /طلبك جاهز/);
  assert.match(mail.html, /https:\/\/whop\.com\/the-edible-codex-five-sauces/);
  assert.doesNotMatch(mail.html, /the-edible-codex-cookbook/);
});

test("a retried delivery of the same payment sends nothing more", async () => {
  const res = await deliver(payment("pay_free1", "plan_yC2EH8kuwf8pi"));
  assert.equal(res.status, 200);
  assert.equal(sent.length, 1);
});

test("the cookbook links to the cookbook", async () => {
  await deliver(payment("pay_book1", "plan_em9IY2N3WR5Je", "reader@example.com"));
  assert.equal(sent.length, 2);
  assert.match(sent[1].html, /https:\/\/whop\.com\/the-edible-codex-cookbook/);
  assert.deepEqual(sent[1].to, ["reader@example.com"]);
});

test("other plans and other events are acknowledged and ignored", async () => {
  assert.equal((await deliver(payment("pay_other", "plan_somethingelse"))).status, 200);
  assert.equal((await deliver({ ...payment("pay_x", "plan_yC2EH8kuwf8pi"), type: "payment.failed" })).status, 200);
  assert.equal(sent.length, 2);
});

test("the cron sends each due review request once", async () => {
  await fetch(`${WORKER}/__scheduled?cron=17+*+*+*+*`);
  await new Promise((r) => setTimeout(r, 1500));
  const reviews = sent.filter((m) => m.key?.startsWith("review/"));
  assert.deepEqual(reviews.map((m) => m.key).sort(), ["review/pay_book1", "review/pay_free1"]);
  assert.match(reviews.find((m) => m.key === "review/pay_free1").subject, /وش رأيك/);
  assert.match(reviews.find((m) => m.key === "review/pay_free1").html, /the-edible-codex-five-sauces/);

  await fetch(`${WORKER}/__scheduled?cron=17+*+*+*+*`);
  await new Promise((r) => setTimeout(r, 1500));
  assert.equal(sent.filter((m) => m.key?.startsWith("review/")).length, 2);
});

test("every send was logged", () => {
  for (const event of ["thanks.sent", "thanks.duplicate", "review.scheduled", "review.sent", "webhook.rejected"]) {
    assert.ok(worker.logs.includes(`"event":"${event}"`), `missing log ${event}`);
  }
  assert.ok(!worker.logs.includes("buyer@example.com"), "full addresses must not reach the logs");
});
