import { site } from "@/data/site";

/**
 * The address a page is actually served from: with a trailing slash.
 *
 * Every page is built as <path>/index.html, and GitHub Pages answers
 * "/shop" with a 301 to "/shop/". The sitemap, the canonicals and the
 * links all named the slashless form, so Google was handed a redirect for
 * every address it was told to index — "Page with redirect" in Search
 * Console, and nothing indexed but the home page.
 * جيت هب يحوّل "/shop" إلى "/shop/"؛ فنكتب كل العناوين بالشرطة الأخيرة
 * حتى لا يجد جوجل تحويلاً بدل الصفحة.
 */
export const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

export const pageUrl = (path: string) => `${site.url.replace(/\/$/, "")}${withSlash(path)}`;
