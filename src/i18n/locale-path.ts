import type { Lang } from "./dictionary";

/**
 * Each language has its own address: Arabic at the root, English under /en.
 *
 * Both languages used to share one URL, with English one click away in the
 * browser. Google only ever saw the Arabic, so the English recipes, product
 * pages and home page never reached anyone searching in English. Giving
 * English its own addresses lets Google index both and show each searcher
 * the one in their language.
 * لكل لغة عنوانها: العربية في الجذر والإنجليزية تحت /en، حتى يفهرس جوجل
 * النسختين ويعرض لكل باحث لغته.
 */
export const EN_PREFIX = "/en";

/** The language an address belongs to. */
export const langFromPath = (pathname: string): Lang =>
  pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : "ar";

/** The address without its language prefix: "/en/shop/" → "/shop/". */
export const stripLocale = (pathname: string) =>
  langFromPath(pathname) === "en" ? pathname.slice(EN_PREFIX.length) || "/" : pathname;

/** The same page in the given language: ("/shop/", "en") → "/en/shop/". */
export const localePath = (path: string, lang: Lang) => {
  const bare = stripLocale(path);
  return lang === "en" ? `${EN_PREFIX}${bare === "/" ? "/" : bare}` : bare;
};
