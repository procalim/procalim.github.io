import type { Localized } from "@/i18n/LanguageContext";
import { bookPages, brandImages } from "./site";

export type Product = {
  id: number;
  slug: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  features: Localized[];
  image: string;
  gallery: string[];
  price: number;
  compareAt?: number;
  badge?: "bestseller" | "new" | "free";
  rating: number;
  reviews: number;
  featured?: boolean;
  /** CSS object-position for the cover crop — keeps the dish in frame. */
  focus?: string;
  /**
   * رابط هذا المنتج على Whop — ضعه هنا وسيفتح زر الشراء صفحة الدفع مباشرة.
   * This product's Whop checkout link. Falls back to site.checkout.url.
   */
  checkoutUrl?: string;
  /**
   * Whop plan id — lets the checkout open inside our own page instead of
   * sending the buyer to another domain.
   * معرّف الخطة في Whop — يجعل الدفع يفتح داخل صفحتنا بدل الانتقال لموقع آخر.
   */
  planId?: string;
};

/**
 * المنتجان · The two products
 * عدّل الأسعار والنصوص وروابط Whop من هنا فقط.
 */
export const products: Product[] = [
  {
    id: 1,
    slug: "the-edible-codex",
    title: { ar: "٢٦١ وصفة احترافية + ١٠٠ وصفة مجاناً", en: "261 Chef Recipes + 100 Free" },
    subtitle: { ar: "٣٦١ وصفة في ٣٨٦ صفحة — مطبخ مطعم كامل بسعر وجبة واحدة", en: "361 recipes in 386 pages — a restaurant kitchen for the price of one meal" },
    description: {
      ar: "المجلّد الرقمي الكامل: ٣٦١ وصفة في ٣٨٦ صفحة — ٢٦١ وصفة من المطبخ المحترف، ومعها ١٠٠ وصفة من الوصفات التي اجتاحت الإنترنت، مجاناً. كل وصفة على صفحة واحدة، بصورتها الخاصة، بالمقادير والخطوات وملاحظة الشيف — لا تقليب بين صفحتين وأنت تطبخ.",
      en: "The complete digital volume: 361 recipes across 386 pages — 261 from a professional kitchen, plus 100 of the internet's most-cooked dishes, free. Every recipe sits on a single page with its own photograph, its measurements, its method and a chef's note — no flipping back and forth while you cook.",
    },
    features: [
      { ar: "٢٦١ وصفة احترافية + ١٠٠ وصفة مجاناً = ٣٦١", en: "261 chef recipes + 100 free = 361" },
      { ar: "صورة خاصة لكل وصفة — ٣٦١ صورة، لا تتكرّر", en: "Its own photograph for every recipe — 361, none repeated" },
      { ar: "كل وصفة كاملة على صفحة واحدة", en: "Every recipe complete on one page" },
      { ar: "ملاحظة الشيف مع كل وصفة", en: "A chef's note with every recipe" },
      { ar: "ملف رقمي يُقرأ على الجوال واللوح والحاسوب", en: "A digital file that reads on phone, tablet and desktop" },
      { ar: "تحميل فوري وتحديثات مجانية مدى الحياة", en: "Instant download and free lifetime updates" },
    ],
    image: bookPages.cover,
    gallery: [
      bookPages.cover,
      bookPages.onScreen,
      bookPages.recipeMain,
      bookPages.contents,
      bookPages.recipeSide,
      bookPages.frontispiece,
    ],
    price: 9.99,
    compareAt: 19.99,
    badge: "bestseller",
    rating: 4.9,
    reviews: 812,
    featured: true,
    checkoutUrl: "https://whop.com/c/the-edible-codex-cookbook/codex",
    planId: "plan_em9IY2N3WR5Je",
  },
  {
    id: 2,
    slug: "the-five-sauces",
    title: { ar: "الصلصات الخمس", en: "The Five Signature Sauces" },
    subtitle: { ar: "خمس صلصات ملوّنة — السرّ خلف كل طبق، مجاناً", en: "Five colour sauces — the secret behind every plate, free" },
    description: {
      ar: "الصلصة هي الفرق بين طبق جيّد وطبق يُذكر. خمس صلصات — البنجر، الكركم، الأعشاب، الفلفل المشوي، والبلسمك المركّز — بنِسَب مضبوطة بالجرام، وخطوات مصوّرة، وطرق حفظ ومدد صلاحية واضحة. نفس الصلصات التي تراها في صور الأطباق.",
      en: "Sauce is the difference between a good plate and a memorable one. Five sauces — beetroot, turmeric, herb, roasted pepper and reduced balsamic — with exact ratios in grams, photographed steps, storage methods and honest shelf lives. The same sauces you see on the plates.",
    },
    features: [
      { ar: "خمس صلصات بنِسَب دقيقة بالجرام", en: "Five sauces with exact ratios in grams" },
      { ar: "خطوات مصوّرة لكل صلصة", en: "Photographed steps for each sauce" },
      { ar: "طريقة الرسم والتوزيع على الطبق", en: "How to draw and place them on the plate" },
      { ar: "طرق الحفظ ومدد الصلاحية", en: "Storage methods and shelf lives" },
    ],
    image: brandImages.chefShrimp,
    gallery: [brandImages.chefShrimp, brandImages.chefDuck, brandImages.chefBeef],
    /** مجاني · free — a price of 0 renders as "مجاناً" everywhere */
    price: 0,
    badge: "free",
    rating: 4.9,
    reviews: 208,
    featured: true,
    focus: "center 75%",
    checkoutUrl: "https://whop.com/checkout/plan_yC2EH8kuwf8pi",
    planId: "plan_yC2EH8kuwf8pi",
  },
];

export const getProduct = (slug?: string) => products.find((p) => p.slug === slug);

/**
 * PLACEHOLDER REVIEWS — replace with your real customer reviews before going live.
 * تقييمات نموذجية — استبدلها بتقييمات عملائك الحقيقيين قبل النشر.
 */
export const testimonials: { name: Localized; role: Localized; quote: Localized; rating: number }[] = [
  {
    name: { ar: "ل. الحربي", en: "L. Alharbi" },
    role: { ar: "طاهية منزلية", en: "Home cook" },
    quote: {
      ar: "أول مرة يخرج مني طبق يشبه صور المطاعم. فصل الصلصات وحده يستحق السعر.",
      en: "First time a plate of mine actually looked like the restaurant photos. The sauce chapter alone is worth the price.",
    },
    rating: 5,
  },
  {
    name: { ar: "م. عبد الله", en: "M. Abdullah" },
    role: { ar: "صاحب مقهى", en: "Café owner" },
    quote: {
      ar: "استخدمت طريقة التنسيق في قائمتنا الجديدة، وارتفعت صور الزبائن على إنستغرام بشكل ملحوظ.",
      en: "I used the plating method for our new menu and customer photos on Instagram jumped noticeably.",
    },
    rating: 5,
  },
  {
    name: { ar: "S. Moreau", en: "S. Moreau" },
    role: { ar: "هاوي طهي", en: "Weekend cook" },
    quote: {
      ar: "المقادير مضبوطة فعلاً. جرّبت أربع وصفات ونجحت كلها من المرة الأولى.",
      en: "The ratios are genuinely dialled in. Four recipes, all of them worked first try.",
    },
    rating: 5,
  },
  {
    name: { ar: "ن. القحطاني", en: "N. Alqahtani" },
    role: { ar: "مصوّرة طعام", en: "Food photographer" },
    quote: {
      ar: "الصلصات الخمس غيّرت شكل أطباقي بالكامل — ألوان حقيقية بلا أي إضافات.",
      en: "The five sauces changed how my plates look — real colour, nothing artificial.",
    },
    rating: 5,
  },
  {
    name: { ar: "R. Silva", en: "R. Silva" },
    role: { ar: "شيف مساعد", en: "Sous chef" },
    quote: {
      ar: "أعطيت النسخة لفريقي كمرجع تدريب. الخطوات قصيرة وواضحة ولا تحتاج شرحاً إضافياً.",
      en: "I handed it to my team as a training reference. The steps are short, clear and need no extra explaining.",
    },
    rating: 5,
  },
  {
    name: { ar: "ه. إبراهيم", en: "H. Ibrahim" },
    role: { ar: "أمّ لثلاثة أطفال", en: "Parent of three" },
    quote: {
      ar: "فصل الوصفات السريعة أنقذ أسبوعي. عشاء كامل في عشرين دقيقة وبمكوّنات موجودة أصلاً.",
      en: "The quick-meals chapter saved my week. Full dinner in twenty minutes from what I already had.",
    },
    rating: 5,
  },
];

export const faqs: { q: Localized; a: Localized }[] = [
  {
    q: { ar: "كيف أستلم الكتاب بعد الشراء؟", en: "How do I receive the book after buying?" },
    a: {
      ar: "الدفع يتم عبر Whop، وفور إتمامه يصلك رابط التحميل مباشرة على بريدك. الرابط يبقى فعّالاً ويمكنك إعادة التحميل في أي وقت.",
      en: "Payment goes through Whop, and the download link reaches your email the moment it completes. The link stays active and you can re-download any time.",
    },
  },
  {
    q: { ar: "هل الكتاب بالعربية أم الإنجليزية؟", en: "Is the book in Arabic or English?" },
    a: {
      ar: "يأتي بالنسختين العربية والإنجليزية في شراء واحد، دون رسوم إضافية.",
      en: "It ships with both the Arabic and the English version in one purchase, at no extra cost.",
    },
  },
  {
    q: { ar: "هل أحتاج معدات مطبخ احترافية؟", en: "Do I need professional kitchen equipment?" },
    a: {
      ar: "لا. كل الوصفات صُمِّمت لمطبخ منزلي عادي: مقلاة، فرن، وخلاط. المعدات الاختيارية مذكورة بوضوح مع بدائل منزلية لكل منها.",
      en: "No. Every recipe is designed for an ordinary home kitchen: a pan, an oven and a blender. Optional equipment is clearly marked with a home substitute for each.",
    },
  },
  {
    q: { ar: "ما سياسة الاسترداد؟", en: "What is the refund policy?" },
    a: {
      ar: "إذا لم يعجبك الإصدار خلال ٣٠ يوماً من الشراء، راسلنا وسنعيد المبلغ كاملاً دون أسئلة.",
      en: "If the edition isn't for you within 30 days of purchase, write to us and we refund in full, no questions asked.",
    },
  },
  {
    q: { ar: "هل يعمل على الجوال والآيباد؟", en: "Does it work on phone and tablet?" },
    a: {
      ar: "نعم. الملف مُحسَّن للقراءة على الجوال واللوح والحاسوب، ويمكن طباعته أيضاً إن فضّلت النسخة الورقية.",
      en: "Yes. The file is optimised for phone, tablet and desktop, and prints cleanly if you prefer paper.",
    },
  },
  {
    q: { ar: "هل يمكنني استخدام الوصفات في مطعمي؟", en: "Can I use the recipes in my restaurant?" },
    a: {
      ar: "الاستخدام التجاري متاح عبر ترخيص خاص — راسلنا وسنرسل لك التفاصيل خلال يوم عمل.",
      en: "Commercial use is available under a separate licence — write to us and we'll send the details within one business day.",
    },
  },
];
