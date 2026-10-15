/**
 * Writes sitemap.xml and robots.txt before the build, from the routes the
 * app actually serves and the products it actually sells — so the two can
 * never drift apart. Change the domain in site.config.json only.
 *
 * يكتب خريطة الموقع وملف robots قبل البناء، اعتماداً على صفحات الموقع
 * ومنتجاته الحقيقية. لتغيير النطاق عدّل site.config.json فقط.
 */
import fs from "node:fs";
import path from "node:path";
import { alternates, origin, root, routes } from "./routes.mjs";

const today = new Date().toISOString().slice(0, 10);

// Each page appears twice — Arabic and English — and each entry names
// both, so Google pairs them and shows searchers their own language.
// كل صفحة مرتين، عربية وإنجليزية، وكل منهما تشير إلى الأخرى.
const entry = (loc, route) => {
  const { ar, en } = alternates(route);
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${ar}" />
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />
  </url>`;
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.flatMap((route) => [entry(alternates(route).ar, route), entry(alternates(route).en, route)]).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

fs.writeFileSync(path.join(root, "public/sitemap.xml"), sitemap);
fs.writeFileSync(path.join(root, "public/robots.txt"), robots);
console.log(`seo: sitemap with ${routes.length * 2} urls for ${origin}`);
