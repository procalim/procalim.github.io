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

## One-time setup (no computer needed)

1. **Resend:** verify the domain `ediblecodex.com`, then create an API key
   with sending access.
2. **Cloudflare:** create an API token from the **Edit Cloudflare Workers**
   template, and note the **Account ID** on the dashboard.
3. **GitHub:** Settings → Secrets and variables → Actions → add
   `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `EMAIL_API_KEY`,
   `EMAIL_REPLY_TO`.
4. **Deploy:** Actions → *Deploy order-email webhook* → Run workflow. The
   run's summary shows the Worker URL. (It creates the KV store itself.)
5. **Whop:** Developer → Webhooks → new webhook to that URL with the
   `payment.succeeded` event. Copy its `ws_…` secret into a GitHub secret
   named `WHOP_WEBHOOK_SECRET`, then run the workflow once more.

From a computer, the same is `npx wrangler deploy` plus
`npx wrangler secret put <NAME>` for each secret.

## Checking it

- `npx wrangler tail` streams one JSON line per event: `thanks.sent`,
  `thanks.duplicate`, `thanks.failed`, `review.scheduled`, `review.sent`,
  `review.failed`, `webhook.rejected`, `payment.ignored`, `payment.no_email`.
- `npm test` runs the Worker locally against a stand-in for Resend and signed
  test webhooks; no real email is sent.
