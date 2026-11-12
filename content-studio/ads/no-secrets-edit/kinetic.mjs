// Kinetic Arabic subtitles: one PNG per reveal state (k words shown), plus a "pop" PNG where the newest word is enlarged.
// Usage: node kinetic.mjs kinetic.json outDir
import { chromium } from "playwright";
import fs from "fs"; import path from "path"; import { fileURLToPath } from "url";
const here = path.dirname(fileURLToPath(import.meta.url));
const [specPath, outDir] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const FS = "file://" + path.resolve(here, "../../node_modules/@fontsource");
const css = `@font-face{font-family:Taj;font-weight:800;src:url(${FS}/tajawal/files/tajawal-arabic-800-normal.woff2)}
@font-face{font-family:Taj;font-weight:800;src:url(${FS}/tajawal/files/tajawal-latin-800-normal.woff2);unicode-range:U+0000-024F}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.wrap{position:absolute;left:40px;right:40px;top:${spec.y}px;text-align:center;direction:rtl;white-space:nowrap}
.w{display:inline-block;margin:0 13px;font:800 ${spec.size}px/1.25 Taj,sans-serif;color:#fff;-webkit-text-stroke:11px #000;paint-order:stroke fill;
 text-shadow:0 0 18px rgba(0,0,0,.9),0 6px 16px rgba(0,0,0,.8);transform-origin:50% 60%}
.g{color:#F2C14E}.h{visibility:hidden}.pop{transform:scale(1.16)}`;
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium", args: ["--allow-file-access-from-files"] }).catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: Number(process.env.SCALE || 1) });
for (const [key, words] of Object.entries(spec.phrases)) {
  for (let k = 1; k <= words.length; k++) {
    for (const pop of [true, false]) {
      const html = words.map((w, i) => {
        const gold = w.startsWith("*"); const txt = gold ? w.slice(1) : w;
        const cls = ["w", gold ? "g" : "", i >= k ? "h" : "", pop && i === k - 1 ? "pop" : ""].join(" ");
        return `<span class="${cls}">${txt}</span>`;
      }).join("");
      fs.writeFileSync(path.join(outDir, "_t.html"), `<html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="wrap">${html}</div></body></html>`);
      await page.goto("file://" + path.resolve(outDir, "_t.html"));
      await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(120);
      await page.screenshot({ path: path.join(outDir, `${key}_${k}${pop ? "p" : ""}.png`), omitBackground: true });
    }
  }
}
fs.unlinkSync(path.join(outDir, "_t.html"));
await browser.close(); console.log("done");
