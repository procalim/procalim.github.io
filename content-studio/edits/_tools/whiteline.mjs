// On-video line in the owner's style from 23 Nov: white text only, no box, no sticker, in the middle of the frame
// (the owner: «الهوك حطه في منتصف الفيديو وليس من فوق، وحطه باللون الأبيض بدون ملصق زي الألماني بفيديوهاته
// الثانية، لون أبيض فقط»). A soft shadow under the letters only, for legibility on bright frames; no box.
// A transparent 1080x1920 page rendered at 2x: a 2160x3840 PNG for the 4K take.
// Usage: node whiteline.mjs out.png "text<br>line 2" [centerY=960] [fontPx=66]
// Runs in the Higgsfield sandbox (Playwright and @fontsource/instrument-sans there).
import { chromium } from "/usr/local/lib/node_modules/playwright/index.mjs";
const [out, text, cy = "960", fs = "66"] = process.argv.slice(2);
const FS = "file:///home/user/ov/node_modules/@fontsource/instrument-sans/files";
const html = `<html><head><style>
@font-face{font-family:IS;font-weight:600;src:url(${FS}/instrument-sans-latin-600-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.w{position:absolute;left:0;right:0;top:${cy}px;transform:translateY(-50%);display:flex;justify-content:center}
.t{max-width:900px;color:#fff;font:600 ${fs}px/1.2 IS,sans-serif;text-align:center;letter-spacing:-0.3px;
   text-shadow:0 2px 3px rgba(0,0,0,.45),0 0 18px rgba(0,0,0,.35)}
</style></head><body><div class="w"><div class="t">${text}</div></div></body></html>`;
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:2});
await p.setContent(html); await p.evaluate(() => document.fonts.ready);
await p.screenshot({path: out, omitBackground: true}); await b.close();
