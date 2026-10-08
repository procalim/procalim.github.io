import { unwrapWebhook } from "@whop/sdk/helpers";
import { PRODUCTS, type Product } from "./products";
import { reviewEmail, thankYouEmail, type Email } from "./emails";

/**
 * Whop payment webhook → order emails · رسائل الطلب من Whop
 *
 * On `payment.succeeded` for one of the plans in ./products, the buyer gets a
 * thank-you email at once, and a review request is queued for a few days
 * later. An hourly cron sends the review requests that have come due.
 *
 * Whop retries a delivery that does not answer 2xx, so the same payment can
 * arrive more than once. Each email is recorded under the payment ID before
 * the next delivery could repeat it, and Resend is also handed an
 * idempotency key per email, so a retry never sends a second copy.
 * Whop يعيد الإرسال عند الفشل، فكل رسالة مرتبطة برقم الدفع ولا تتكرر.
 */

export interface Env {
  ORDERS: KVNamespace;
  WHOP_WEBHOOK_SECRET: string;
  EMAIL_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_REPLY_TO?: string;
  REVIEW_DELAY_DAYS?: string;
  /** Tests only: send to a local stand-in instead of Resend. */
  RESEND_API_URL?: string;
}

/**
 * The fields read off a payment. The webhook nests them — `plan.id`,
 * `user.email` — where the REST API's payment has flat `plan_id` and
 * `customer_email`; both shapes are accepted, so the handler keeps working
 * whichever one a delivery carries.
 * Whop يرسل رقم الخطة والإيميل داخل plan و user؛ نقرأ الشكلين.
 */
type Payment = {
  id: string;
  plan_id?: string | null;
  plan?: { id?: string | null } | null;
  customer_email?: string | null;
  user?: { email?: string | null } | null;
};

const planOf = (payment: Payment) => payment.plan_id ?? payment.plan?.id ?? null;
const emailOf = (payment: Payment) => (payment.customer_email ?? payment.user?.email ?? "").trim() || null;
type WhopEvent = { id: string; type: string; data: Payment };
type PendingReview = { paymentId: string; email: string; planId: string };

const DAY = 24 * 60 * 60 * 1000;

/** Whop's webhook log expects JSON back and flags plain text as invalid. */
const reply = (result: string, status = 200) =>
  new Response(JSON.stringify({ result }), { status, headers: { "content-type": "application/json" } });

/** One JSON line per event, readable in `wrangler tail` and the Workers logs. */
const log = (level: "info" | "warn" | "error", event: string, fields: Record<string, unknown> = {}) =>
  console[level === "info" ? "log" : level](JSON.stringify({ level, event, ...fields }));

/** "a***@gmail.com" — enough to find a delivery, without writing addresses to logs. */
const maskEmail = (email: string) => email.replace(/^(.).*(@.*)$/, "$1***$2");

const sendEmail = async (env: Env, to: string, email: Email, idempotencyKey: string) => {
  const response = await fetch(`${env.RESEND_API_URL ?? "https://api.resend.com"}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.EMAIL_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [to],
      ...(env.EMAIL_REPLY_TO ? { reply_to: env.EMAIL_REPLY_TO } : {}),
      // Gmail and Yahoo trust mail that offers a one-click way out; without
      // it a new sending domain lands in spam far more often.
      // جوجل يثق أكثر بالرسائل التي تتيح إلغاء الاشتراك.
      ...(env.EMAIL_REPLY_TO
        ? { headers: { "List-Unsubscribe": `<mailto:${env.EMAIL_REPLY_TO}?subject=unsubscribe>` } }
        : {}),
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`Resend ${response.status}: ${body.slice(0, 300)}`);
  return (JSON.parse(body) as { id?: string }).id ?? null;
};

/** Review keys sort by when they fall due, so the cron reads them in order. */
const reviewKey = (due: Date, paymentId: string) => `review:${due.toISOString()}:${paymentId}`;

const handlePayment = async (env: Env, payment: Payment): Promise<Response> => {
  const planId = planOf(payment);
  const product: Product | undefined = planId ? PRODUCTS[planId] : undefined;
  if (!product) {
    log("info", "payment.ignored", { payment: payment.id, plan: planId, reason: "plan not handled" });
    return reply("ignored");
  }
  const to = emailOf(payment);
  if (!to) {
    // A retry would carry the same empty field, so there is nothing to wait for.
    log("error", "payment.no_email", { payment: payment.id, plan: planId });
    return reply("no buyer email");
  }

  if (await env.ORDERS.get(`thanks:${payment.id}`)) {
    log("info", "thanks.duplicate", { payment: payment.id });
    return reply("already sent");
  }

  let emailId: string | null;
  try {
    emailId = await sendEmail(env, to, thankYouEmail(product, payment.id), `thanks/${payment.id}`);
  } catch (error) {
    // Answer 500 so Whop retries; nothing was recorded, so the retry tries again.
    log("error", "thanks.failed", { payment: payment.id, to: maskEmail(to), error: String(error) });
    return reply("email failed", 500);
  }
  log("info", "thanks.sent", { payment: payment.id, plan: planId, to: maskEmail(to), emailId });

  const configured = Number(env.REVIEW_DELAY_DAYS);
  const days = env.REVIEW_DELAY_DAYS && Number.isFinite(configured) && configured >= 0 ? configured : 4;
  const due = new Date(Date.now() + days * DAY);
  const pending: PendingReview = { paymentId: payment.id, email: to, planId: planId! };
  await env.ORDERS.put(reviewKey(due, payment.id), JSON.stringify(pending));
  await env.ORDERS.put(`thanks:${payment.id}`, JSON.stringify({ sentAt: new Date().toISOString(), emailId }));
  log("info", "review.scheduled", { payment: payment.id, due: due.toISOString() });

  return reply("ok");
};

/** Sends every review request that has come due. Failures stay queued for the next run. */
export const sendDueReviews = async (env: Env, now = new Date()) => {
  const results = { sent: 0, failed: 0, skipped: 0 };
  let cursor: string | undefined;
  do {
    const page = await env.ORDERS.list({ prefix: "review:", cursor });
    for (const { name } of page.keys) {
      const dueAt = name.slice("review:".length, name.lastIndexOf(":"));
      if (new Date(dueAt) > now) return results; // keys are in due order; the rest are later
      const pending = await env.ORDERS.get<PendingReview>(name, "json");
      if (!pending) continue;

      if (await env.ORDERS.get(`reviewed:${pending.paymentId}`)) {
        await env.ORDERS.delete(name);
        results.skipped += 1;
        continue;
      }
      const product = PRODUCTS[pending.planId];
      if (!product) {
        await env.ORDERS.delete(name);
        results.skipped += 1;
        continue;
      }
      try {
        const emailId = await sendEmail(env, pending.email, reviewEmail(product), `review/${pending.paymentId}`);
        await env.ORDERS.put(`reviewed:${pending.paymentId}`, JSON.stringify({ sentAt: now.toISOString(), emailId }));
        await env.ORDERS.delete(name);
        log("info", "review.sent", { payment: pending.paymentId, to: maskEmail(pending.email), emailId });
        results.sent += 1;
      } catch (error) {
        log("error", "review.failed", { payment: pending.paymentId, to: maskEmail(pending.email), error: String(error) });
        results.failed += 1;
      }
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return results;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") return new Response("Edible Codex webhook", { status: 200 });

    const body = await request.text();
    let event: WhopEvent;
    try {
      event = unwrapWebhook<WhopEvent>(body, {
        headers: Object.fromEntries(request.headers),
        key: env.WHOP_WEBHOOK_SECRET,
      });
    } catch (error) {
      log("warn", "webhook.rejected", { error: String(error) });
      return reply("invalid signature", 401);
    }

    if (event.type !== "payment.succeeded") {
      log("info", "webhook.ignored", { type: event.type, webhook: event.id });
      return reply("ignored");
    }
    return handlePayment(env, event.data);
  },

  async scheduled(_controller: ScheduledController, env: Env): Promise<void> {
    const results = await sendDueReviews(env);
    log("info", "review.cron", results);
  },
} satisfies ExportedHandler<Env>;
