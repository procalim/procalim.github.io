/**
 * Writes a real index.html at every address the app serves.
 *
 * GitHub Pages has no SPA rewrite: for a path with no file behind it, it
 * serves 404.html — with an HTTP 404. A visitor saw the page render and
 * noticed nothing, but every crawler was told the page does not exist, and
 * Google refused to index anything but the home page. Giving each route its
 * own file turns that into a 200, and lets each one carry its own title,
 * description and canonical for crawlers that do not run JavaScript.
 *
 * صفحات جيت هب لا تعرف مسارات التطبيق، فكانت تُعيد 404 لكل صفحة داخلية —
 * يراها الزائر سليمة بينما يراها جوجل غير موجودة. هذا الملف يكتب صفحة
 * حقيقية لكل عنوان.
 */
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";
import { alternates, enPath, origin, pageTitle, pageUrl, root, routes } from "./routes.mjs";

const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

/**
 * The picture a page should show when it is shared or listed in a result.
 *
 * Every pre-rendered page was shipping the home page's logo, written as the
 * relative "./brand/logo-square.jpg" — which on /recipes/<slug>/ resolves to
 * /recipes/<slug>/brand/... and 404s. With nothing usable declared, Google
 * picked whatever image it liked off the rendered page, which is why recipes
 * came up in search under a neighbouring recipe's photograph.
 * كل صفحة كانت تعلن صورة الشعار بمسار نسبي مكسور، فكان جوجل يختار صورة
 * عشوائية من الصفحة — ولهذا ظهرت وصفات بصور وصفات أخرى.
 */
const assets = fs.existsSync(path.join(dist, "assets")) ? fs.readdirSync(path.join(dist, "assets")) : [];

const hashed = (slug, ext = "jpg") => {
  const hit = assets.find((f) => new RegExp(`^${slug}-[A-Za-z0-9_-]+\\.${ext}$`).test(f));
  return hit ? `/assets/${hit}` : null;
};

const PRODUCT_IMAGE = {
  "the-edible-codex": "/brand/book/cover.jpg",
  "the-five-sauces": "/brand/chef-shrimp-rainbow.jpg",
};

const imageFor = (route) => {
  const [, section, slug] = route.path.split("/");
  if (section === "recipes" && slug) return hashed(slug);
  if (section === "videos" && slug) return hashed(slug);
  if (section === "shop" && slug) return PRODUCT_IMAGE[slug] ?? null;
  return null;
};

/**
 * The catalogue, loaded through Vite so the aliases and `import.meta.glob`
 * in the data files resolve exactly as they do in the app — no second copy
 * of the recipes for the build step to drift away from.
 * تُحمَّل البيانات عبر Vite نفسه، فلا تتكرّر ولا تختلف عن التي يراها الموقع.
 */
const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const load = (file) => vite.ssrLoadModule(file);
const [{ recipes, recipeText }, { products }, { videos }, schema, { dictionary }, { policies }] = await Promise.all([
  load("/src/data/recipes.ts"),
  load("/src/data/products.ts"),
  load("/src/data/videos.ts"),
  load("/src/lib/structured-data.ts"),
  load("/src/i18n/dictionary.ts"),
  load("/src/data/policies.ts"),
]);
await vite.close();

/**
 * Every page is written twice: Arabic at its address, English at /en/….
 * The English copy carries its own title, description, body and structured
 * data, so Google can index it on its own and show it to English searchers.
 * كل صفحة تُكتب مرتين: عربية في عنوانها، وإنجليزية تحت /en بعنوانها
 * ووصفها ونصّها وبياناتها المنظَّمة.
 */
const LANGS = ["ar", "en"];
const say = (key, lang) => dictionary[key][lang];
const at = (p, lang) => (lang === "en" ? enPath(p) : p);

const structuredData = new Map();
for (const lang of LANGS) {
  const home = { name: say("nav.home", lang), path: at("/", lang) };
  for (const recipe of recipes) {
    const text = recipeText(recipe, lang);
    structuredData.set(at(`/recipes/${recipe.slug}`, lang), schema.recipeGraph({
      trail: [
        home,
        { name: say("nav.recipes", lang), path: at("/recipes", lang) },
        { name: recipe.title[lang], path: at(`/recipes/${recipe.slug}`, lang) },
      ],
      name: recipe.title[lang],
      description: recipe.subtitle[lang],
      photo: recipe.photo ? hashed(recipe.slug) : null,
      lang,
      serves: recipe.serves,
      time: recipe.time,
      tags: recipe.tags,
      ingredients: text.ingredients,
      steps: text.steps,
    }));
  }
  for (const product of products) {
    structuredData.set(at(`/shop/${product.slug}`, lang), schema.productGraph({
      trail: [
        home,
        { name: say("nav.shop", lang), path: at("/shop", lang) },
        { name: product.title[lang], path: at(`/shop/${product.slug}`, lang) },
      ],
      name: product.title[lang],
      description: product.description[lang],
      image: product.image,
      slug: product.slug,
      price: product.price,
    }));
  }
  for (const video of videos) {
    structuredData.set(at(`/videos/${video.slug}`, lang), schema.videoGraph({
      trail: [
        home,
        { name: say("videos.nav", lang), path: at("/videos", lang) },
        { name: video.title[lang], path: at(`/videos/${video.slug}`, lang) },
      ],
      name: video.title[lang],
      description: video.description[lang],
      thumbnail: hashed(video.slug) ?? "",
      clip: hashed(video.slug, "mp4") ?? "",
      duration: video.duration,
      lang,
    }));
  }
}

const escape = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * This page's structured data, ready for the document — Google reads it
 * without running a line of the app.
 * البيانات المنظَّمة داخل الصفحة نفسها، يقرأها جوجل بلا جافاسكربت.
 */
const markup = (page) => {
  const data = structuredData.get(page.path);
  if (!data) return "";
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return `    <script type="application/ld+json" data-page="true">${json}</script>\n`;
};

/**
 * The page's own content, written into the static fallback.
 *
 * Every pre-rendered page was shipping the home page's fallback as its
 * body: thirty-four addresses with the same H1 and the same paragraph.
 * Anything that reads the HTML without running the app (Bing, link
 * previews, AI crawlers, Google's first pass) saw one page thirty-four
 * times. Each address now carries its own heading and its own text.
 * كل صفحة كانت تحمل محتوى الصفحة الرئيسية نفسه في الـ HTML، فكانت تبدو
 * لمحرّكات البحث ٣٤ نسخة من صفحة واحدة. الآن لكل صفحة عنوانها ونصّها.
 */
const H1 = "font-family:'Playfair Display',Amiri,Georgia,serif;font-size:32px;margin:0 0 12px";
const LIST = "max-width:620px;margin:0 auto 24px;text-align:start;line-height:1.8";
const recipeBySlug = new Map(recipes.map((r) => [r.slug, r]));
const productBySlug = new Map(products.map((p) => [p.slug, p]));
const videoBySlug = new Map(videos.map((v) => [v.slug, v]));
const policyBySlug = new Map(policies.map((p) => [p.slug, p]));

const WORDS = {
  ar: { people: "أشخاص", ingredients: "المكوّنات", method: "طريقة التحضير", tip: "نصيحة الشيف:",
        fromBook: "الوصفة من كتاب ذا إديبل كودكس · ٢٦١ وصفة", free: "مجاناً · Free" },
  en: { people: "servings", ingredients: "Ingredients", method: "Method", tip: "Chef's tip:",
        fromBook: "From The Edible Codex · 261 recipes", free: "Free" },
};

const fallbackBody = (route, lang) => {
  const [, section, slug] = route.path.split("/");
  const w = WORDS[lang];
  const recipe = section === "recipes" && slug ? recipeBySlug.get(slug) : null;
  if (recipe) {
    const img = imageFor(route);
    const text = recipeText(recipe, lang);
    const heading = lang === "ar" ? `${recipe.title.ar} · ${recipe.title.en}` : recipe.title.en;
    return (
      `<h1 style="${H1}">${escape(heading)}</h1>\n` +
      `<p style="max-width:620px;margin:0 auto 20px;line-height:1.8">${escape(recipe.subtitle[lang])}</p>\n` +
      (img ? `<img src="${img}" alt="${escape(recipe.title[lang])}" width="600" style="max-width:100%;height:auto;margin:0 auto 20px;display:block" />\n` : "") +
      `<p>${escape(recipe.time)} · ${escape(recipe.serves)} ${w.people}</p>\n` +
      `<h2>${w.ingredients}</h2>\n<ul style="${LIST}">${text.ingredients.map((i) => `<li>${escape(i)}</li>`).join("")}</ul>\n` +
      `<h2>${w.method}</h2>\n<ol style="${LIST}">${text.steps.map((t, i) => `<li id="step-${i + 1}">${escape(t)}</li>`).join("")}</ol>\n` +
      (text.tip ? `<p style="${LIST}"><strong>${w.tip}</strong> ${escape(text.tip)}</p>\n` : "") +
      `<p><a href="${at("/shop/the-edible-codex/", lang)}" style="color:#C9A227">${w.fromBook}</a></p>`
    );
  }
  const product = section === "shop" && slug ? productBySlug.get(slug) : null;
  if (product) {
    const price = product.price ? `$${product.price}` : w.free;
    const heading = lang === "ar" ? `${product.title.ar} · ${product.title.en}` : product.title.en;
    return (
      `<h1 style="${H1}">${escape(heading)}</h1>\n` +
      `<p style="max-width:620px;margin:0 auto 20px;line-height:1.8">${escape(product.description[lang])}</p>\n` +
      `<p style="color:#C9A227;font-size:20px">${price}</p>\n` +
      `<p>${escape(say("seo.productSuffix", lang))}</p>`
    );
  }
  if (lang === "en") {
    // English pages with no body of their own above still get English text,
    // not the bilingual home-page fallback. الصفحات الإنجليزية الباقية.
    const meta = englishMeta(route);
    return `<h1 style="${H1}">${escape(meta.title)}</h1>\n<p style="max-width:620px;margin:0 auto 20px;line-height:1.8">${escape(meta.description)}</p>`;
  }
  return null;
};

/** Title and description of a route in English, from the same sources the app reads. */
const englishMeta = (route) => {
  const [, section, slug] = route.path.split("/");
  const fixed = { "": "home", shop: "shop", recipes: "recipes", videos: "videos", about: "about", faq: "faq", contact: "contact" };
  if (!slug && section in fixed) {
    const key = fixed[section];
    return { title: say(`seo.${key}.title`, "en"), description: say(`seo.${key}.desc`, "en") };
  }
  if (section === "recipes") {
    const r = recipeBySlug.get(slug);
    return { title: r.title.en, description: `${r.subtitle.en} · ${r.time} · ${say("seo.recipeSuffix", "en")}` };
  }
  if (section === "shop") {
    const p = productBySlug.get(slug);
    return { title: p.title.en, description: `${p.subtitle.en} · ${say("seo.productSuffix", "en")}` };
  }
  if (section === "videos") {
    const v = videoBySlug.get(slug);
    return { title: v.title.en, description: v.description.en };
  }
  if (section === "policies") {
    const p = policyBySlug.get(slug);
    return { title: p.title.en, description: p.sections[0].body.en };
  }
  throw new Error(`No English title for ${route.path}`);
};

const withFallback = (html, route, lang) => {
  const body = fallbackBody(route, lang);
  if (!body) return html;
  return html.replace(
    /(<div id="static-fallback"[^>]*>)[\s\S]*?(<\/div>\s*<\/div>\s*(?:<script|<\/body>))/,
    (_, open, close) => `${open}\n${body}\n      ${close}`,
  );
};

/** Swaps in this route's own metadata, leaving the rest of the document alone. */
const render = (route, lang) => {
  const page = { path: at(route.path, lang) };
  const { ar, en } = alternates(route);
  const url = lang === "en" ? en : ar;
  const meta = lang === "en" ? englishMeta(route) : null;
  const title = escape(meta ? `${meta.title} | The Edible Codex` : pageTitle(route));
  const description = escape(meta ? meta.description : route.description);
  const image = origin + (imageFor(route) ?? "/brand/logo-square.jpg");

  let html = withFallback(template, route, lang);
  if (lang === "en") html = html.replace('<html lang="ar" dir="rtl">', '<html lang="en" dir="ltr">');
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${image}" />`,
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*" \/>/,
      `<meta name="twitter:image" content="${image}" />`,
    )
    .replace(
      "</head>",
      `  <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n` +
        `    <link rel="alternate" hreflang="ar" href="${ar}" />\n` +
        `    <link rel="alternate" hreflang="en" href="${en}" />\n` +
        `    <link rel="alternate" hreflang="x-default" href="${en}" />\n` +
        `${markup(page)}  </head>`,
    );
};

let written = 0;
for (const route of routes) {
  for (const lang of LANGS) {
    const target = path.join(dist, at(route.path, lang), "index.html");
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, render(route, lang));
    written += 1;
  }
}

/**
 * The page Whop returns buyers to after an off-site payment step. It must
 * answer 200 (GitHub Pages would otherwise serve it as a 404), but it is not
 * a page anyone should find in search, so it stays out of the sitemap and
 * says noindex.
 * صفحة العودة من الدفع: تُكتب لتُخدم بنجاح، لكنها خارج خريطة الموقع ومحجوبة عن الفهرسة.
 */
for (const lang of LANGS) {
  const title = escape(`${say("done.title", lang)} | ${lang === "en" ? "The Edible Codex" : "ذا إديبل كودكس"}`);
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace("</head>", `  <meta name="robots" content="noindex" />\n  </head>`);
  if (lang === "en") html = html.replace('<html lang="ar" dir="rtl">', '<html lang="en" dir="ltr">');
  const target = path.join(dist, at("/checkout/complete/", lang), "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}

/**
 * Addresses Google may still hold from earlier versions of the site: the
 * /product/<slug> shape the shop first used, and four products that were
 * retired. Without a page behind them they surface as "Not found (404)" in
 * Search Console. Each gets a stub that sends the visitor — and Google,
 * which reads an immediate meta refresh as a permanent redirect — to the
 * page that replaced it.
 * عناوين قديمة قد يعرفها جوجل؛ لكل منها صفحة تحوّل فوراً إلى بديلها حتى لا
 * تظهر خطأ 404 في Search Console.
 */
const RETIRED = ["chefs-table-bundle", "meat-and-fire", "signature-plating-masterclass", "the-sauce-lab"];
const moved = new Map([
  ...products.map((p) => [`/product/${p.slug}`, `/shop/${p.slug}`]),
  ...RETIRED.flatMap((slug) => [[`/product/${slug}`, "/shop"], [`/shop/${slug}`, "/shop"]]),
  ["/index", "/"],
]);
for (const [from, to] of moved) {
  const target = pageUrl({ path: to });
  const stub =
    `<!doctype html>\n<html lang="ar"><head><meta charset="utf-8" />\n` +
    `<title>${escape(pageTitle(routes.find((r) => r.path === to)))}</title>\n` +
    `<link rel="canonical" href="${target}" />\n` +
    `<meta http-equiv="refresh" content="0; url=${target}" />\n` +
    `</head><body><a href="${target}">${target}</a></body></html>\n`;
  fs.mkdirSync(path.join(dist, from), { recursive: true });
  fs.writeFileSync(path.join(dist, from, "index.html"), stub);
}

// Kept for any address not in the list — a mistyped URL still lands in the app.
fs.writeFileSync(path.join(dist, "404.html"), template);

console.log(`prerender: ${written} routes written under dist/, ${moved.size} old addresses redirected`);
