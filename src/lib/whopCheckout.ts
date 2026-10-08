import { loadWhop } from "@whop/elements";

/**
 * Whop Elements · الدفع المدمج عبر Whop Elements
 *
 * Loads Whop's hosted Elements SDK (cdn.whop.com/elements/…) the first time
 * a buyer opens checkout. It replaces the legacy embedded checkout loader
 * (js.whop.com/static/checkout/loader.js), which Whop is retiring. A failed
 * load is never fatal: the dialog falls back to the hosted checkout link,
 * and the next open retries rather than reusing the failure.
 * يُحمَّل عند فتح نافذة الدفع فقط، ويحلّ محلّ أداة الدفع القديمة.
 */
let pending: ReturnType<typeof loadWhop> | null = null;

export const loadCheckout = () => {
  pending = pending ? pending.retry() : loadWhop();
  return pending;
};
