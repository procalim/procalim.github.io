import { breadcrumbList } from "@/lib/breadcrumbs";
import { site } from "@/data/site";
import { pageUrl } from "@/lib/page-url";

/**
 * The structured data each page hands to search engines.
 *
 * It lived inside the page components, which meant it existed only after
 * React ran. Google renders JavaScript, but it renders it late and not
 * always — so a recipe could sit indexed for weeks with no photograph and
 * a borrowed description. These builders are plain functions of their
 * arguments, so the build step can write the same markup straight into the
 * HTML and the page can keep using it unchanged.
 *
 * كانت البيانات المنظَّمة تُضاف بالجافاسكربت بعد التحميل، فلا يراها جوجل
 * إلا متأخراً. صارت دوالّ خالصة يستدعيها البناء ويكتبها في الصفحة نفسها.
 */

export type Trail = { name: string; path: string }[];

/**
 * "35 min" reads fine on the page, but schema.org wants ISO 8601 — Google
 * drops a totalTime it cannot parse, and the cooking time is half the reason
 * a recipe result gets clicked.
 * الوقت يُكتب بصيغة ISO وإلا تجاهله جوجل.
 */
/**
 * The tags are written for the filter row, but they carry two things Google
 * asks a recipe for by name. Only the words below count — a tag like "Viral"
 * or "Quick" is neither a course nor a cuisine, and guessing one would be
 * worse than leaving the field out.
 * الوسوم تحمل نوع الطبق ومطبخه؛ نأخذ المعروف منها فقط ولا نخمّن الباقي.
 */
const COURSES = new Set(["Appetizer", "Salad", "Dessert", "Drinks", "Coffee", "Bread",
                         "Sides", "Sandwich", "Dinner", "Pasta", "Sauce"]);
const CUISINES = new Set(["Middle Eastern", "Mexican", "Italian", "Korean", "Japanese",
                          "Thai", "French", "Chinese", "Indian", "Greek", "American"]);

/**
 * Where the shop sells. A digital download reaches everywhere, but Google
 * wants named countries for delivery and returns: the Arab markets the
 * book is written for, and the largest English-speaking and European ones.
 * الدول التي تُعلَن فيها سياسة التوصيل والاسترداد.
 */
const MARKETS = ["SA", "AE", "KW", "QA", "BH", "OM", "JO", "EG", "MA", "LB", "IQ",
                 "US", "GB", "CA", "AU", "DE", "FR", "NL", "SE", "TR"];

const isoDuration = (time: string) => {
  const match = time.match(/^(\d+)\s*(min|h)$/i);
  if (!match) return time;
  const value = Number(match[1]);
  return match[2].toLowerCase() === "h" ? `PT${value}H` : `PT${value}M`;
};

/**
 * One ingredient per entry, as Google reads recipeIngredient.
 *
 * A few recipes list a whole component on one line — "Garlic butter sauce:
 * ½ cup butter, ¼ cup milk, 2 tbsp honey, …" — which reads well on the page
 * but reached Search Console as "Invalid string length in recipeIngredient".
 * Lines with a "Label:" prefix are split at their commas (never inside
 * brackets) for the markup only; the page keeps its grouping.
 * بعض الوصفات تجمع مكوّنات جزء كامل في سطر واحد؛ نفصلها في البيانات المنظَّمة
 * فقط، مكوّناً في كل عنصر.
 */
const splitIngredients = (lines: string[]) =>
  lines.flatMap((line) => {
    const labelled = line.match(/^[^:()]{2,40}:\s*(.+)$/);
    if (!labelled) return [line.trim()];
    const parts: string[] = [];
    let depth = 0;
    let current = "";
    for (const ch of labelled[1]) {
      if (ch === "(") depth += 1;
      if (ch === ")") depth = Math.max(0, depth - 1);
      if ((ch === "," || ch === "،") && depth === 0) {
        parts.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    parts.push(current.trim());
    return parts.filter(Boolean);
  });

const graph = (trail: Trail, entity: Record<string, unknown>) => ({
  "@context": "https://schema.org",
  "@graph": [breadcrumbList(trail), entity],
});

export const recipeGraph = (args: {
  trail: Trail;
  name: string;
  description: string;
  /** Site-relative path, or null when the recipe has no photograph. */
  photo: string | null;
  lang: string;
  serves: string;
  time: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
}) =>
  graph(args.trail, {
    "@type": "Recipe",
    url: pageUrl(args.trail[args.trail.length - 1].path),
    name: args.name,
    description: args.description,
    ...(args.photo ? { image: `${site.url}${args.photo}` } : {}),
    author: { "@type": "Person", name: site.brand.chefEn, url: pageUrl("/about") },
    inLanguage: args.lang,
    recipeYield: args.serves,
    totalTime: isoDuration(args.time),
    keywords: args.tags.join(", "),
    ...(args.tags.find((tag) => COURSES.has(tag))
      ? { recipeCategory: args.tags.find((tag) => COURSES.has(tag)) }
      : {}),
    ...(args.tags.find((tag) => CUISINES.has(tag))
      ? { recipeCuisine: args.tags.find((tag) => CUISINES.has(tag)) }
      : {}),
    recipeIngredient: splitIngredients(args.ingredients),
    // Each step is anchored on the page (#step-1, #step-2, …), so Google can
    // link straight to it.
    recipeInstructions: args.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
      url: `${pageUrl(args.trail[args.trail.length - 1].path)}#step-${i + 1}`,
    })),
    isPartOf: { "@type": "Book", name: site.brand.name },
  });

type ProductArgs = {
  trail: Trail;
  name: string;
  description: string;
  image: string;
  slug: string;
  price: number;
};

const paidProduct = (args: ProductArgs) =>
  graph(args.trail, {
    "@type": "Product",
    name: args.name,
    description: args.description,
    image: `${site.url}${args.image}`,
    brand: { "@type": "Brand", name: site.brand.name },
    // No aggregateRating here: the reviews on the site are still
    // placeholders, and publishing invented ratings as structured data would
    // mislead shoppers and breach Google's guidelines. Add it once real
    // reviews exist.
    sku: args.slug,
    offers: {
      "@type": "Offer",
      url: pageUrl(args.trail[args.trail.length - 1].path),
      price: args.price,
      priceCurrency: site.currency.code,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      // Google's merchant-listing report asks every product for a delivery
      // and a returns policy, and flags each one that has neither. Both are
      // true here: the book is a download — nothing to ship, nothing to pay,
      // there the moment the order clears — and the 30-day refund is the one
      // the policies page promises.
      // جوجل يطلب لكل منتج سياسة توصيل واسترداد؛ التحميل فوري ومجاني،
      // والاسترداد خلال ٣٠ يوماً كما في صفحة السياسات.
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: 0, currency: site.currency.code },
        shippingDestination: MARKETS.map((country) => ({ "@type": "DefinedRegion", addressCountry: country })),
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: MARKETS,
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnFees: "https://schema.org/FreeReturn",
        refundType: "https://schema.org/FullRefund",
        merchantReturnLink: pageUrl("/policies/refund"),
      },
    },
  });

// A free download is not a merchant listing: Google requires a price
// above zero there and reports "Invalid price" for every 0. It is
// described as what it is, a free book, which no report validates against
// shopping rules.
// المنتج المجاني ليس عرضاً تجارياً عند جوجل (يرفض السعر صفر)، فنصفه كتاباً مجانياً.
const freeBook = (args: ProductArgs) =>
  graph(args.trail, {
    "@type": "Book",
    name: args.name,
    description: args.description,
    image: `${site.url}${args.image}`,
    url: pageUrl(args.trail[args.trail.length - 1].path),
    author: { "@type": "Person", name: site.brand.chefEn, url: pageUrl("/about") },
    publisher: { "@type": "Organization", name: site.brand.name },
    bookFormat: "https://schema.org/EBook",
    isAccessibleForFree: true,
  });

export const productGraph = (args: ProductArgs) =>
  args.price > 0 ? paidProduct(args) : freeBook(args);

export const videoGraph = (args: {
  trail: Trail;
  name: string;
  description: string;
  thumbnail: string;
  clip: string;
  duration: number;
  lang: string;
}) =>
  graph(args.trail, {
    "@type": "VideoObject",
    name: args.name,
    description: args.description,
    thumbnailUrl: `${site.url}${args.thumbnail}`,
    contentUrl: `${site.url}${args.clip}`,
    uploadDate: "2026-09-22T00:00:00+03:00",
    duration: `PT${args.duration}S`,
    inLanguage: args.lang,
    publisher: { "@type": "Organization", name: site.brand.name },
  });
