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
import { origin, pageTitle, pageUrl, root, routes } from "./routes.mjs";

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
const [{ recipes, recipeText }, { products }, { videos }, schema, { dictionary }] = await Promise.all([
  load("/src/data/recipes.ts"),
  load("/src/data/products.ts"),
  load("/src/data/videos.ts"),
  load("/src/lib/structured-data.ts"),
  load("/src/i18n/dictionary.ts"),
]);
await vite.close();

/** Arabic is what the page serves by default, so it is what the build writes. */
const say = (key) => dictionary[key].ar;

const structuredData = new Map();
for (const recipe of recipes) {
  structuredData.set(`/recipes/${recipe.slug}`, schema.recipeGraph({
    trail: [
      { name: say("nav.home"), path: "/" },
      { name: say("nav.recipes"), path: "/recipes" },
      { name: recipe.title.ar, path: `/recipes/${recipe.slug}` },
    ],
    name: recipe.title.ar,
    description: recipe.subtitle.ar,
    photo: recipe.photo ? hashed(recipe.slug) : null,
    lang: "ar",
    serves: recipe.serves,
    time: recipe.time,
    tags: recipe.tags,
    ingredients: recipeText(recipe, "ar").ingredients,
    steps: recipeText(recipe, "ar").steps,
  }));
}
for (const product of products) {
  structuredData.set(`/shop/${product.slug}`, schema.productGraph({
    trail: [
      { name: say("nav.home"), path: "/" },
      { name: say("nav.shop"), path: "/shop" },
      { name: product.title.ar, path: `/shop/${product.slug}` },
    ],
    name: product.title.ar,
    description: product.description.ar,
    image: product.image,
    slug: product.slug,
    price: product.price,
  }));
}
for (const video of videos) {
  structuredData.set(`/videos/${video.slug}`, schema.videoGraph({
    trail: [
      { name: say("nav.home"), path: "/" },
      { name: say("videos.nav"), path: "/videos" },
      { name: video.title.ar, path: `/videos/${video.slug}` },
    ],
    name: video.title.ar,
    description: video.description.ar,
    thumbnail: hashed(video.slug) ?? "",
    clip: hashed(video.slug, "mp4") ?? "",
    duration: video.duration,
    lang: "ar",
  }));
}

const escape = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * This page's structured data, ready for the document — Google reads it
 * without running a line of the app.
 * البيانات المنظَّمة داخل الصفحة نفسها، يقرأها جوجل بلا جافاسكربت.
 */
const markup = (route) => {
  const data = structuredData.get(route.path);
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

const fallbackBody = (route) => {
  const [, section, slug] = route.path.split("/");
  const recipe = section === "recipes" && slug ? recipeBySlug.get(slug) : null;
  if (recipe) {
    const img = imageFor(route);
    const text = recipeText(recipe, "ar");
    return (
      `<h1 style="${H1}">${escape(recipe.title.ar)} · ${escape(recipe.title.en)}</h1>\n` +
      `<p style="max-width:620px;margin:0 auto 20px;line-height:1.8">${escape(recipe.subtitle.ar)}<br />${escape(recipe.subtitle.en)}</p>\n` +
      (img ? `<img src="${img}" alt="${escape(recipe.title.ar)}" width="600" style="max-width:100%;height:auto;margin:0 auto 20px;display:block" />\n` : "") +
      `<p>${escape(recipe.time)} · ${escape(recipe.serves)} أشخاص</p>\n` +
      `<h2>المكوّنات</h2>\n<ul style="${LIST}">${text.ingredients.map((i) => `<li>${escape(i)}</li>`).join("")}</ul>\n` +
      `<h2>طريقة التحضير</h2>\n<ol style="${LIST}">${text.steps.map((t, i) => `<li id="step-${i + 1}">${escape(t)}</li>`).join("")}</ol>\n` +
      (text.tip ? `<p style="${LIST}"><strong>نصيحة الشيف:</strong> ${escape(text.tip)}</p>\n` : "") +
      `<p><a href="/shop/the-edible-codex/" style="color:#C9A227">الوصفة من كتاب ذا إديبل كودكس · ٢٦١ وصفة</a></p>`
    );
  }
  const product = section === "shop" && slug ? productBySlug.get(slug) : null;
  if (product) {
    const price = product.price ? `$${product.price}` : "مجاناً · Free";
    return (
      `<h1 style="${H1}">${escape(product.title.ar)} · ${escape(product.title.en)}</h1>\n` +
      `<p style="max-width:620px;margin:0 auto 20px;line-height:1.8">${escape(product.description.ar)}</p>\n` +
      `<p style="color:#C9A227;font-size:20px">${price}</p>\n` +
      `<p>تحميل فوري · وصول مدى الحياة · استرداد خلال ٣٠ يوماً</p>`
    );
  }
  return null;
};

const withFallback = (html, route) => {
  const body = fallbackBody(route);
  if (!body) return html;
  return html.replace(
    /(<div id="static-fallback"[^>]*>)[\s\S]*?(<\/div>\s*<\/div>\s*(?:<script|<\/body>))/,
    (_, open, close) => `${open}\n${body}\n      ${close}`,
  );
};

/** Swaps in this route's own metadata, leaving the rest of the document alone. */
const render = (route) => {
  const url = pageUrl(route);
  const title = escape(pageTitle(route));
  const description = escape(route.description);
  const image = origin + (imageFor(route) ?? "/brand/logo-square.jpg");

  return withFallback(template, route)
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
        `${markup(route)}  </head>`,
    );
};

let written = 0;
for (const route of routes) {
  const target =
    route.path === "/" ? path.join(dist, "index.html") : path.join(dist, route.path, "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, render(route));
  written += 1;
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
