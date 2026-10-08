# Order emails · رسائل الطلبات

A Cloudflare Worker that receives Whop's `payment.succeeded` webhook and emails
the buyer through [Resend](https://resend.com):

| When | Email | Link |
|---|---|---|
| Right after payment | طلبك جاهز! 🎉 · Your Edible Codex order is ready! | product page |
| 4 days later (`REVIEW_DELAY_DAYS`) | وش رأيك بتجربتك؟ · How's it going so far? | product page |

Plans and their links live in `src/products.ts`; the email copy in `src/emails.ts`.
A retried webhook never sends a second email: each one is recorded under the
payment ID in KV and sent with a Resend idempotency key.

## One-time setup

1. **Resend:** create an account, add and verify the domain `ediblecodex.com`
   (it shows the DNS records to add), then create an API key.
2. **Cloudflare:** from this folder,
   ```sh
   npm install
   npx wrangler login
   npx wrangler kv namespace create ORDERS   # paste the id into wrangler.toml
   npx wrangler secret put EMAIL_API_KEY      # the Resend key, re_…
   npx wrangler secret put EMAIL_REPLY_TO     # the inbox that answers customers
   npm run deploy                             # prints the Worker's URL
   ```
3. **Whop:** Developer → Webhooks → create a webhook to that URL with the
   `payment.succeeded` event. Copy its `ws_…` secret, then
   `npx wrangler secret put WHOP_WEBHOOK_SECRET`.

## Checking it

- `npx wrangler tail` streams one JSON line per event: `thanks.sent`,
  `thanks.duplicate`, `thanks.failed`, `review.scheduled`, `review.sent`,
  `review.failed`, `webhook.rejected`, `payment.ignored`, `payment.no_email`.
- `npm test` runs the Worker locally against a stand-in for Resend and signed
  test webhooks; no real email is sent.
