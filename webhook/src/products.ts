/**
 * The plans this webhook sends emails for, what each email says about the
 * product, and where each buyer goes to get their content. A payment for any
 * other plan is logged and left alone. The copy mirrors src/data/products.ts.
 * الخطط التي تُرسل لها الرسائل، ووصف كل منتج ورابط محتواه.
 */
export type Localized = { ar: string; en: string };

export type Product = {
  name: Localized;
  /** One line under the name. */
  tagline: Localized;
  description: Localized;
  features: Localized[];
  /** 1200×720 hero, served from the site (public/brand/email/). */
  image: string;
  /** What the buyer paid, as shown in the order summary. */
  price: Localized;
  url: string;
};

const IMAGES = "https://ediblecodex.com/brand/email";

export const PRODUCTS: Record<string, Product> = {
  plan_yC2EH8kuwf8pi: {
    name: { ar: "الصلصات الخمس", en: "The Five Signature Sauces" },
    tagline: { ar: "دليل مجاني من مطبخ الشيف أحمد سلامة", en: "A free guide from Chef Ahmet Salameh's kitchen" },
    description: {
      ar: "الصلصة هي الفرق بين طبق جيّد وطبق يُذكر. خمس صلصات — البنجر، الكركم، الأعشاب، الفلفل المشوي، والبلسمك المركّز — بنِسَب مضبوطة بالجرام، وخطوات مصوّرة. نفس الصلصات التي تراها في صور الأطباق.",
      en: "Sauce is the difference between a good plate and a memorable one. Five sauces — beetroot, turmeric, herb, roasted pepper and reduced balsamic — with exact ratios in grams and photographed steps. The same sauces you see on the plates.",
    },
    features: [
      { ar: "خمس صلصات بنِسَب دقيقة بالجرام", en: "Five sauces with exact ratios in grams" },
      { ar: "خطوات مصوّرة لكل صلصة", en: "Photographed steps for each sauce" },
      { ar: "طريقة الرسم والتوزيع على الطبق", en: "How to draw and place them on the plate" },
      { ar: "طرق الحفظ ومدد الصلاحية", en: "Storage methods and shelf lives" },
    ],
    image: `${IMAGES}/five-sauces.jpg`,
    price: { ar: "مجاناً", en: "Free" },
    url: "https://whop.com/the-edible-codex-five-sauces",
  },
  plan_em9IY2N3WR5Je: {
    name: { ar: "ذا إديبل كودكس", en: "The Edible Codex" },
    tagline: { ar: "٢٦١ وصفة احترافية + ١٠٠ وصفة مجاناً · ٣٨٦ صفحة", en: "261 chef recipes + 100 free · 386 pages" },
    description: {
      ar: "المجلّد الرقمي الكامل: ٣٦١ وصفة — ٢٦١ وصفة من المطبخ المحترف، ومعها ١٠٠ وصفة من الوصفات التي اجتاحت الإنترنت. كل وصفة على صفحة واحدة، بصورتها الخاصة، بالمقادير والخطوات وملاحظة الشيف.",
      en: "The complete digital volume: 361 recipes — 261 from a professional kitchen, plus 100 of the internet's most-cooked dishes. Every recipe on a single page, with its own photograph, measurements, method and a chef's note.",
    },
    features: [
      { ar: "٣٦١ وصفة، لكل وصفة صورتها الخاصة", en: "361 recipes, each with its own photograph" },
      { ar: "كل وصفة كاملة على صفحة واحدة", en: "Every recipe complete on one page" },
      { ar: "ملاحظة الشيف مع كل وصفة", en: "A chef's note with every recipe" },
      { ar: "يُقرأ على الجوال واللوح والحاسوب", en: "Reads on phone, tablet and desktop" },
      { ar: "تحديثات مجانية مدى الحياة", en: "Free lifetime updates" },
    ],
    image: `${IMAGES}/cookbook.jpg`,
    price: { ar: "٩٫٩٩ دولار", en: "$9.99" },
    url: "https://whop.com/the-edible-codex-cookbook",
  },
};
