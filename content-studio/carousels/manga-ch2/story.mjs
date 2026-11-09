// Story frames (1080x1920) for chapter 2. Text inside y 250-1600; stickers are added in the Instagram app.
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, "../../package.json"));
const { chromium } = require("playwright");
const FS = "file://" + path.join(here, "../../node_modules/@fontsource");
const IMG = "file://" + path.join(here, "img");
const css = `
@font-face{font-family:T;font-weight:500;src:url(${FS}/tajawal/files/tajawal-arabic-500-normal.woff2)}
@font-face{font-family:T;font-weight:900;src:url(${FS}/tajawal/files/tajawal-arabic-900-normal.woff2)}
@font-face{font-family:T;font-weight:900;src:url(${FS}/tajawal/files/tajawal-latin-900-normal.woff2);unicode-range:U+0000-024F}
@font-face{font-family:E;font-weight:600;src:url(${FS}/instrument-sans/files/instrument-sans-latin-600-normal.woff2)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;overflow:hidden;background:#0d0d0d}
.s{position:relative;width:1080px;height:1920px;direction:rtl;font-family:T,'Noto Color Emoji',sans-serif;color:#f6f1e7;overflow:hidden}
.t{position:absolute;left:80px;right:80px;top:270px;text-align:center}
.k{font-weight:900;font-size:84px;line-height:1.18}
.g{color:#e3b84f}
.en{font-family:E;font-weight:600;font-size:34px;direction:ltr;opacity:.75;margin-top:16px}
.panel{position:absolute;left:80px;width:920px;object-fit:cover;border:8px solid #f3ede1;border-radius:6px;background:#fff}
.tag{position:absolute;left:80px;right:80px;bottom:330px;text-align:center;direction:ltr;font-family:E;font-weight:600;font-size:26px;letter-spacing:4px;color:#e3b84f}
`;
const tag = `<div class="tag">MASTER OF THE CRAFT · CH.2 · @ahmet_salameh</div>`;
const frames = {
  "1-open": `<img class="panel" src="${IMG}/smirk.jpg" style="top:700px;height:640px;object-position:50% 25%">
    <div class="t"><div class="k">الفصل التاني<br>من <span class="g">المانغا</span> الليلة 👀</div><div class="en">Chapter 2 of my kitchen comic, tonight</div></div>${tag}`,
  "2-full": `<img class="panel" src="${IMG}/full.jpg" style="top:600px;height:960px;object-position:50% 20%">
    <div class="t"><div class="k">الحكام شبعوا.<br><span class="g">ولا لقمة.</span></div><div class="en">The judges are full. Not one more bite.</div></div>`,
  "3-eyes": `<img class="panel" src="${IMG}/eyes.jpg" style="top:640px;height:600px;object-position:50% 0%">
    <div class="t"><div class="k">وبعدين<br><span class="g">نزل الحلو</span></div><div class="en">Then dessert landed.</div></div>`,
  "4-quiz": `<img class="panel" src="${IMG}/bored.jpg" style="top:600px;height:560px;object-position:50% 50%">
    <div class="t"><div class="k">ليش دايماً في<br><span class="g">مكان للحلو</span>؟</div><div class="en">Why is there always room for dessert?</div></div>`,
  "5-countdown": `<img class="panel" src="${IMG}/door.jpg" style="top:0;left:0;width:1080px;height:1920px;border:0;border-radius:0;object-position:40% 50%;filter:blur(10px) brightness(.4)">
    <div class="t" style="top:560px"><div class="k">الجواب<br>بالكاروسيل <span class="g">الليلة</span> 👇</div><div class="en">The answer is in tonight's post.</div></div>`,
  "6-live": `<img class="panel" src="${IMG}/bliss.jpg" style="top:640px;height:700px;object-position:50% 50%">
    <div class="t"><div class="k">نزل 🔥 الجواب<br>بالشريحة <span class="g">٣</span></div><div class="en">It's live. The answer starts on slide 3.</div></div>
    <div class="t" style="top:1380px"><div class="k" style="font-size:56px">قلّب للآخر واكتبلي <span class="g">«كتاب»</span></div><div class="en" style="font-size:30px">Swipe to the end and comment BOOK.</div></div>`,
};
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [k, body] of Object.entries(frames)) {
  const f = path.join(here, `_st-${k}.html`);
  fs.writeFileSync(f, `<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>${css}</style></head><body><div class="s">${body}</div></body></html>`);
  await page.goto("file://" + f);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(here, "story", `story-${k}.jpg`), type: "jpeg", quality: 92 });
  fs.unlinkSync(f);
}
await browser.close();
console.log("rendered", Object.keys(frames).length);
