// Bilingual on-video line (the owner, 24 Nov: «نفس الخط اصغر شوي ... عربي انجليزي لانه المحتوى لسه عم بيطلع لجمهور
// العربي»): white only, no box, the middle of the frame; the Arabic line (Cairo 600, 54 px) above the English line
// (Instrument Sans 600, 46 px). A transparent 1080x1920 PNG. Runs in the Higgsfield sandbox (npm i @fontsource/cairo
// in /home/user/ov next to @fontsource/instrument-sans).
// Usage: node biline.mjs out.png "عربي" "English" [centerY=960] [arPx=54] [enPx=46]
import { chromium } from "/usr/local/lib/node_modules/playwright/index.mjs";
const [out, ar, en, cy = "960", ap = "54", ep = "46"] = process.argv.slice(2);
const IS = "file:///home/user/ov/node_modules/@fontsource/instrument-sans/files";
const CA = "file:///home/user/ov/node_modules/@fontsource/cairo/files";
const html = `<html><head><style>
@font-face{font-family:IS;font-weight:600;src:url(${IS}/instrument-sans-latin-600-normal.woff2)}
@font-face{font-family:CA;font-weight:600;src:url(${CA}/cairo-arabic-600-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.w{position:absolute;left:0;right:0;top:${cy}px;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:6px}
.t{color:#fff;text-align:center;white-space:nowrap;text-shadow:0 2px 3px rgba(0,0,0,.5),0 0 18px rgba(0,0,0,.4)}
.ar{font:600 ${ap}px/1.25 CA,sans-serif;direction:rtl}
.en{font:600 ${ep}px/1.2 IS,sans-serif;letter-spacing:-0.3px}
</style></head><body><div class="w"><div class="t ar">${ar}</div><div class="t en">${en}</div></div></body></html>`;
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
await p.setContent(html); await p.evaluate(() => document.fonts.ready);
await p.screenshot({path: out, omitBackground: true}); await b.close();
