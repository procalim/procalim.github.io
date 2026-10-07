/**
 * The single list of addresses the site serves — read by the sitemap writer
 * and by the pre-render step, so the two can never disagree about what
 * exists. Titles and descriptions mirror the `seo.*` entries in
 * src/i18n/dictionary.ts; change them there and here together.
 *
 * قائمة صفحات الموقع الوحيدة، تقرأ منها خريطة الموقع وصفحات ما قبل البناء.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const origin = JSON.parse(
  fs.readFileSync(path.join(root, "site.config.json"), "utf8"),
).url.replace(/\/$/, "");

/** Pulls slug, Arabic title and Arabic subtitle out of a catalogue file. */
const readEntries = (file) => {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const entries = [];
  for (const match of source.matchAll(/slug:\s*"([^"]+)"/g)) {
    const rest = source.slice(match.index);
    const title = rest.match(/title:\s*\{\s*ar:\s*"([^"]+)"/);
    const subtitle = rest.match(/subtitle:\s*\{\s*\n?\s*ar:\s*"([^"]+)"/);
    const description = rest.match(/description:\s*\{\s*\n?\s*ar:\s*"([^"]+)"/);
    entries.push({
      slug: match[1],
      title: title?.[1] ?? "",
      subtitle: subtitle?.[1] ?? "",
      description: description?.[1] ?? "",
    });
  }
  return entries;
};

const products = readEntries("src/data/products.ts");
const recipes = readEntries("src/data/recipes.ts");
const clips = readEntries("src/data/videos.ts");

const brand = "ذا إديبل كودكس";
const productSuffix = "تحميل فوري · وصول مدى الحياة · استرداد خلال ٣٠ يوماً";
const recipeSuffix = "وصفة مجانية مصوّرة خطوة بخطوة من ذا إديبل كودكس";

export const routes = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    title: "٢٦١ وصفة مصوّرة خطوة بخطوة",
    description:
      "كتاب طبخ رقمي من مطبخ محترف — ٢٦١ وصفة مصوّرة ومشروحة بالجرام والكوب، مع ١٠٠ وصفة سريعة هدية. تحميل فوري بـ ٩٫٩٩ دولاراً واسترداد خلال ٣٠ يوماً.",
  },
  {
    path: "/shop",
    priority: "0.9",
    changefreq: "weekly",
    title: "الكتاب الكامل والصلصات الخمس",
    description:
      "إصداران: ذا إديبل كودكس بـ ٩٫٩٩ دولاراً، والصلصات الخمس المميّزة مجاناً. تحميل فوري، وصول مدى الحياة، واسترداد خلال ٣٠ يوماً.",
  },
  ...products.map((product) => ({
    path: `/shop/${product.slug}`,
    priority: "0.9",
    changefreq: "weekly",
    title: product.title,
    description: `${product.subtitle} · ${productSuffix}`,
  })),
  {
    path: "/recipes",
    priority: "0.9",
    changefreq: "weekly",
    title: "١٣ وصفة مجانية مصوّرة",
    description:
      "وصفات مجانية من الكتاب — تاكو كيسابيريا، مطري مي تشكن، باستا الفيتا المخبوزة وغيرها. مقادير دقيقة، خطوات واضحة، وصورة للطبق النهائي.",
  },
  ...recipes.map((recipe) => ({
    path: `/recipes/${recipe.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    title: `طريقة عمل ${recipe.title}`,
    description: `${recipe.subtitle} · ${recipeSuffix}`,
  })),
  {
    path: "/videos",
    priority: "0.8",
    changefreq: "monthly",
    title: "تقنيات مطبخ مصوّرة",
    description:
      "مقاطع قصيرة من مطبخ محترف: لماذا تتسرّب الجبنة المقلية، متى ينفصل الهولنديز، وكيف يُضغط الأرز المقرمش. قاعدة واحدة في كل مقطع.",
  },
  ...clips.map((clip) => ({
    path: `/videos/${clip.slug}`,
    priority: "0.7",
    changefreq: "monthly",
    title: clip.title,
    description: clip.description,
  })),
  {
    path: "/about",
    priority: "0.6",
    changefreq: "monthly",
    title: "الشيف أحمد سلامة",
    description:
      "قصة المطبخ الذي وُلد منه ذا إديبل كودكس — من الخدمة اليومية إلى ٢٦١ وصفة مُختبرة ومصوّرة.",
  },
  {
    path: "/faq",
    priority: "0.6",
    changefreq: "monthly",
    title: "الأسئلة الشائعة — الشراء والتحميل",
    description:
      "كل ما تحتاج معرفته قبل الشراء: صيغ الملفات، طريقة التحميل، اللغات، طرق الدفع، وسياسة الاسترداد خلال ٣٠ يوماً.",
  },
  {
    path: "/contact",
    priority: "0.5",
    changefreq: "monthly",
    title: "تواصل معنا",
    description: "أسئلة عن الكتاب أو عن طلبك؟ راسلنا على واتساب ونردّ خلال ساعات.",
  },
  {
    path: "/policies/privacy",
    priority: "0.3",
    changefreq: "yearly",
    title: "سياسة الخصوصية",
    description: "كيف نتعامل مع بياناتك عند الشراء من ذا إديبل كودكس.",
  },
  {
    path: "/policies/terms",
    priority: "0.3",
    changefreq: "yearly",
    title: "الشروط والأحكام",
    description: "شروط استخدام الموقع وشراء الإصدارات الرقمية.",
  },
  {
    path: "/policies/refund",
    priority: "0.3",
    changefreq: "yearly",
    title: "سياسة الاسترداد",
    description: "استرداد كامل خلال ٣٠ يوماً من الشراء، دون أسئلة.",
  },
];

export const pageTitle = (route) => `${route.title} | ${brand}`;

/**
 * The address a route is served from. Each page is written as
 * <path>/index.html, and GitHub Pages answers "/shop" with a 301 to
 * "/shop/" — so the sitemap and canonicals must name the slashed form, or
 * Google is handed a redirect instead of a page.
 * العنوان الذي تُخدَم منه الصفحة فعلاً، بالشرطة الأخيرة.
 */
export const pageUrl = (route) => `${origin}${route.path.endsWith("/") ? route.path : `${route.path}/`}`;

/**
 * The English twin of an address. Arabic lives at the root, English under
 * /en — the same rule as src/i18n/locale-path.ts.
 * العنوان الإنجليزي المقابل: العربية في الجذر والإنجليزية تحت /en.
 */
export const enPath = (path) => (path === "/" ? "/en/" : `/en${path}`);

/** Both addresses of a route, for hreflang. */
export const alternates = (route) => ({
  ar: pageUrl(route),
  en: pageUrl({ path: enPath(route.path) }),
});
