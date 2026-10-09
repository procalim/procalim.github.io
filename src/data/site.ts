/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE FIRST  ·  ابدأ بتعديل هذا الملف
 *  Every piece of contact / brand information used across the
 *  site lives here, so you never have to hunt through components.
 *  كل بيانات التواصل والهوية مجمّعة هنا لتعديلها من مكان واحد.
 * ─────────────────────────────────────────────────────────────
 */

import config from "../../site.config.json";

export const site = {
  /**
   * العنوان الكامل للموقع — غيّره هنا فقط عند شراء النطاق
   * (site.config.json)، فخريطة الموقع والروابط الأساسية تقرأ منه.
   */
  url: config.url,

  brand: {
    name: "The Edible Codex",
    nameAr: "ذا إديبل كودكس",
    taglineEn: "Modern Culinary Adventures",
    taglineAr: "مغامرات الطهي الحديثة",
    chefEn: "Chef Ahmet Salameh",
    chefAr: "الشيف أحمد سلامة",
    establishedYear: 2021,
  },

  contact: {
    /** بريد المتجر — اتركه فارغاً ليختفي من الموقع · store email, empty hides it */
    email: "",
    /** International format, digits only — used to build the WhatsApp link */
    whatsapp: "962775320369",
    phoneDisplay: "+962 7 7532 0369",
    cityEn: "Amman, Jordan",
    cityAr: "عمّان، الأردن",
    hoursEn: "Sun – Thu · 10:00 – 18:00",
    hoursAr: "الأحد – الخميس · ١٠:٠٠ – ١٨:٠٠",
  },

  social: {
    /** ضع رابط حسابك هنا · put your real profile link here */
    instagram: "https://instagram.com/ahmet_salameh",
  },

  /** Currency shown on every price · العملة المعروضة */
  currency: {
    code: "USD",
    symbol: "$",
  },

  /**
   * Whop checkout · الدفع عبر Whop
   * ضع رابط متجرك أو منتجك على Whop هنا، مثال:
   *   https://whop.com/your-store/the-edible-codex
   * يمكن أيضاً إعطاء كل منتج رابطه الخاص عبر `checkoutUrl` في products.ts.
   * إن ترك فارغاً يعمل نموذج الطلب الداخلي + واتساب بدلاً منه.
   * Leave empty to fall back to the built-in order form.
   */
  checkout: {
    provider: "whop" as const,
    url: "",
  },
} as const;

/** The Whop link a given product should open, if one is configured. */
export const checkoutUrlFor = (product?: { checkoutUrl?: string }) =>
  product?.checkoutUrl || site.checkout.url || null;

/**
 * The checkout destination, written out for the visitor — seeing
 * "whop.com/the-edible-codex" before the jump is what makes the handoff
 * feel deliberate instead of like being thrown to a stranger's site.
 */
export const checkoutDomainLabel = (url: string | null) => {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const store = parsed.pathname.split("/").filter(Boolean)[0];
    return store ? `${parsed.host}/${store}` : parsed.host;
  } catch {
    return null;
  }
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

/**
 * Brand images — resolved against the deployment's base path, so the site
 * works served from the root or from a sub-folder.
 */
const base = import.meta.env.BASE_URL;

export const brandImages = {
  /** خلفية الواجهة: الشيف وأطباقه · the hero backdrop */
  heroBackdrop: `${base}brand/hero-backdrop.jpg`,
  logoCrest: `${base}brand/logo-crest.jpg`,
  logoFull: `${base}brand/logo-square.jpg`,
  chefPortrait: `${base}brand/chef-portrait.jpg`,
  chefShrimp: `${base}brand/chef-shrimp-rainbow.jpg`,
  chefDuck: `${base}brand/chef-duck-cherry.jpg`,
  chefBeef: `${base}brand/chef-beef-tenderloin.jpg`,
  codexCover: `${base}brand/edible-codex-cover.jpg`,
  /** The finished plate with all five sauces drawn across it */
  fiveSauces: `${base}brand/email/five-sauces.jpg`,
} as const;

/**
 * صفحات حقيقية من داخل الكتاب — الغلاف، صفحة الافتتاح، الفهرس، ووصفتان.
 * Real pages lifted out of the book itself. A buyer deciding on a cookbook
 * wants to see a page, not another photograph of a plate.
 */
export const bookPages = {
  cover: `${base}brand/book/cover.jpg`,
  frontispiece: `${base}brand/book/frontispiece.jpg`,
  contents: `${base}brand/book/contents.jpg`,
  recipeMain: `${base}brand/book/recipe-main.jpg`,
  recipeSide: `${base}brand/book/recipe-side.jpg`,
  /** The book on a tablet and a phone — it is a file, not a parcel. */
  onScreen: `${base}brand/book/on-screen.jpg`,
} as const;
