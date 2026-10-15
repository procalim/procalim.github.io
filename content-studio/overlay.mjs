// Renders transparent 1080x1920 PNG text overlays for reels.
// Usage: node overlay.mjs spec.json outDir
// spec: { "y": 1250,
//         "items": { "hook": { "ar": "تاكو <b>بيج ماك</b> بيتي", "en": "Big Mac Tacos" } } }
// Style: no box, no label pill, recipe name never repeated. Big white Arabic with a dark
// outline and soft shadow, one <b>word</b> in gold, small English line under it.
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
const [specPath, outDir = "."] = process.argv.slice(2);
if (!specPath) { console.error("usage: node overlay.mjs spec.json outDir"); process.exit(1); }
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const FS = "file://" + path.join(here, "node_modules/@fontsource");
const css = `
@font-face{font-family:IS;font-weight:700;src:url(${FS}/instrument-sans/files/instrument-sans-latin-700-normal.woff2)}
@font-face{font-family:Taj;font-weight:800;src:url(${FS}/tajawal/files/tajawal-arabic-800-normal.woff2)}
@font-face{font-family:Taj;font-weight:800;src:url(${FS}/tajawal/files/tajawal-latin-800-normal.woff2);unicode-range:U+0000-024F}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.wrap{position:absolute;left:40px;right:40px;display:flex;flex-direction:column;align-items:center;text-align:center;white-space:nowrap}
.ar{font:800 74px/1.2 Taj,'Noto Color Emoji',sans-serif;color:#fff;direction:rtl;-webkit-text-stroke:7px #0b0b0b;paint-order:stroke fill;text-shadow:0 6px 18px rgba(0,0,0,.55)}
.en{margin-top:2px;font:700 34px/1.2 IS,'Noto Color Emoji',sans-serif;color:rgba(255,255,255,.9);letter-spacing:.5px;-webkit-text-stroke:4px #0b0b0b;paint-order:stroke fill;text-shadow:0 4px 12px rgba(0,0,0,.5)}
b{color:#F2C14E;font-weight:800}`;

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium", args: ["--allow-file-access-from-files"] }).catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [key, v] of Object.entries(spec.items)) {
  const y = v.y || spec.y || 1250;
  const html = `<html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="wrap" style="top:${y}px"><div class="ar" dir="rtl">${v.ar || ""}</div><div class="en">${v.en || ""}</div></div></body></html>`;
  const tmp = path.join(outDir, `_${key}.html`);
  fs.writeFileSync(tmp, html);
  await page.goto("file://" + path.resolve(tmp));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(outDir, `ov_${key}.png`), omitBackground: true });
  fs.unlinkSync(tmp);
}
await browser.close();
console.log("rendered", Object.keys(spec.items).length, "overlays to", outDir);
