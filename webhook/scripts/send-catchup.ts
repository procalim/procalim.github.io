/**
 * One-off: email the people who got the free Five Sauces guide before the
 * order emails existed — their access link, a review request, and the full
 * book. Run by .github/workflows/send-catchup.yml.
 *
 *   MODE=test  sends one copy to EMAIL_REPLY_TO, to see it before anyone else
 *   MODE=send  sends to every address in CATCHUP_EMAILS
 *
 * Each address gets a Resend idempotency key, so pressing "send" twice within
 * a day sends nothing new. Addresses are never printed in full.
 * إرسال لمرة واحدة لمن حصل على الدليل المجاني سابقاً.
 */
import { PRODUCTS } from "../src/products";
import { catchUpEmail } from "../src/emails";

const env = (name: string, required = true) => {
  const value = process.env[name]?.trim() ?? "";
  if (required && !value) throw new Error(`${name} is not set`);
  return value;
};

const mode = env("MODE");
const apiKey = env("EMAIL_API_KEY");
const from = env("EMAIL_FROM");
const replyTo = env("EMAIL_REPLY_TO");
const mask = (email: string) => email.replace(/^(.).*(@.*)$/, "$1***$2");

const list = mode === "test"
  ? [replyTo]
  : [...new Set(env("CATCHUP_EMAILS").split(/[\s,;]+/).map((e: string) => e.trim().toLowerCase()).filter(Boolean))];

const valid = list.filter((e) => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(e));
for (const bad of list.filter((e) => !valid.includes(e))) console.log(`skipped (not an email): ${mask(bad)}`);

const email = catchUpEmail(PRODUCTS.plan_yC2EH8kuwf8pi, PRODUCTS.plan_em9IY2N3WR5Je, {
  ar: "https://ediblecodex.com/shop/the-edible-codex/",
  en: "https://ediblecodex.com/en/shop/the-edible-codex/",
});

let sent = 0;
let failed = 0;
for (const to of valid) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": mode === "test" ? `catchup-test/${Date.now()}` : `catchup/${to}`,
    },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject: email.subject, html: email.html, text: email.text }),
  });
  if (res.ok) {
    sent += 1;
    console.log(`sent: ${mask(to)}`);
  } else {
    failed += 1;
    console.log(`FAILED: ${mask(to)} — ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  await new Promise((r) => setTimeout(r, 600)); // Resend allows 2 requests a second
}

console.log(`\n${mode}: ${sent} sent, ${failed} failed, ${list.length - valid.length} skipped`);
if (failed) process.exit(1);
