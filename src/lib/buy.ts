import type { Lang } from "@/i18n/dictionary";
import { checkoutUrlFor, whatsappLink } from "@/data/site";
import type { Product } from "@/data/products";
import { trackCheckoutStart } from "./pixel";

/**
 * A free product skips checkout and opens its own page on Whop. A payment
 * form for a free download read as a sale, and visitors left before
 * claiming it.
 * المنتج المجاني يفتح صفحته على Whop مباشرة بدل صفحة الدفع، لأن نموذج الدفع
 * كان يوحي للزائر أنه سيدفع.
 */
export const freeLink = (product: Product) =>
  product.price === 0 && product.accessUrl ? product.accessUrl : null;

/**
 * Where a buy button sends the visitor.
 * Whop when its link is configured; otherwise a ready-written WhatsApp order,
 * so a button is never a dead end while the link is still missing.
 *
 * زر الشراء يفتح صفحة Whop إن كان رابطها موضوعاً، وإلا يفتح رسالة واتساب جاهزة.
 */
export const buyLink = (product: Product, lang: Lang) =>
  freeLink(product) ??
  checkoutUrlFor(product) ??
  whatsappLink(
    lang === "ar"
      ? `أريد الحصول على: ${product.title.ar}`
      : `I'd like to get: ${product.title.en}`,
  );

/** Report the handoff to the Whop pixel before the new tab opens. */
export const onBuyClick = (product: Product) => trackCheckoutStart(product.slug, product.price);
