/**
 * The plans this webhook sends emails for, and where each buyer goes to get
 * their content. A payment for any other plan is logged and left alone.
 * الخطط التي تُرسل لها الرسائل، ورابط محتوى كل منتج.
 */
export type Product = { name: { ar: string; en: string }; url: string };

export const PRODUCTS: Record<string, Product> = {
  plan_yC2EH8kuwf8pi: {
    name: { ar: "الصلصات الخمس — دليل مجاني", en: "The Five Sauces — Free Guide" },
    url: "https://whop.com/the-edible-codex-five-sauces",
  },
  plan_em9IY2N3WR5Je: {
    name: { ar: "كتاب ذا إديبل كودكس", en: "The Edible Codex Cookbook" },
    url: "https://whop.com/the-edible-codex-cookbook",
  },
};
