import { useEffect } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { site } from "@/data/site";
import { pageUrl } from "@/lib/page-url";
import { localePath } from "@/i18n/locale-path";

type SeoProps = {
  title: string;
  description: string;
  image?: string;
  /** Structured data for this page, handed to search engines as JSON-LD. */
  jsonLd?: Record<string, unknown>;
  /** Keep this page out of search results (e.g. the post-checkout page). */
  noindex?: boolean;
};

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
};

/** Keeps the title, social tags, canonical URL and structured data in sync. */
const Seo = ({
  title,
  description,
  image = `${import.meta.env.BASE_URL}brand/logo-square.jpg`,
  jsonLd,
  noindex = false,
}: SeoProps) => {
  const { lang } = useLang();
  const brand = lang === "ar" ? site.brand.nameAr : site.brand.name;

  useEffect(() => {
    const full = `${title} | ${brand}`;
    const origin = site.url.replace(/\/$/, "");
    const canonical = pageUrl(window.location.pathname);
    const absoluteImage = image.startsWith("http") ? image : origin + image.replace(/^\./, "");

    document.title = full;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", full);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:image"]', "property", "og:image", absoluteImage);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    if (noindex) setMeta('meta[name="robots"]', "name", "robots", "noindex");
    else document.head.querySelector('meta[name="robots"]')?.remove();
    setMeta('meta[property="og:locale"]', "property", "og:locale", lang === "ar" ? "ar_SA" : "en_US");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", full);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", absoluteImage);

    // Each language has its own address, and each version names both, so
    // Google shows Arabic searchers the Arabic page and everyone else the
    // English one. لكل لغة عنوانها، وكل نسخة تشير إلى الأخرى.
    setLink("canonical", canonical);
    setLink("alternate", pageUrl(localePath(window.location.pathname, "ar")), "ar");
    setLink("alternate", pageUrl(localePath(window.location.pathname, "en")), "en");
    setLink("alternate", pageUrl(localePath(window.location.pathname, "en")), "x-default");
  }, [title, description, image, brand, lang, noindex]);

  useEffect(() => {
    if (!jsonLd) return;
    // The build writes this page's markup into the HTML already, so the copy
    // it wrote goes before React adds its own — otherwise a crawler that does
    // run the script sees the same recipe declared twice.
    // البناء يكتب البيانات في الصفحة، فنزيل نسخته قبل إضافة نسختنا.
    document.head.querySelectorAll("script[data-page]").forEach((el) => el.remove());
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.page = "true";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => script.remove();
  }, [jsonLd]);

  return null;
};

export default Seo;
