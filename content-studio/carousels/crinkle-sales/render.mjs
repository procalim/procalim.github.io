// Renders the 8-slide Crinkle Cake sales carousel (1080x1350) to out/slide-N.jpg.
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, "../../package.json"));
const { chromium } = require("playwright");
const FS = "file://" + path.join(here, "../../node_modules/@fontsource");
const IMG = "file://" + path.join(here, "img");
const N = 8;
const css = `
@font-face{font-family:T;font-weight:500;src:url(${FS}/tajawal/files/tajawal-arabic-500-normal.woff2)}
@font-face{font-family:T;font-weight:800;src:url(${FS}/tajawal/files/tajawal-arabic-800-normal.woff2)}
@font-face{font-family:T;font-weight:900;src:url(${FS}/tajawal/files/tajawal-arabic-900-normal.woff2)}
@font-face{font-family:T;font-weight:500;src:url(${FS}/tajawal/files/tajawal-latin-500-normal.woff2);unicode-range:U+0000-024F}
@font-face{font-family:T;font-weight:800;src:url(${FS}/tajawal/files/tajawal-latin-800-normal.woff2);unicode-range:U+0000-024F}
@font-face{font-family:T;font-weight:900;src:url(${FS}/tajawal/files/tajawal-latin-900-normal.woff2);unicode-range:U+0000-024F}
@font-face{font-family:E;font-weight:600;src:url(${FS}/instrument-sans/files/instrument-sans-latin-600-normal.woff2)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden}
.s{position:relative;width:1080px;height:1350px;direction:rtl;font-family:T,sans-serif;overflow:hidden}
.black{background:#0d0d0d;color:#f6f1e7}.cream{background:#f3ede1;color:#141414}.gold{background:#e3b84f;color:#141414}
.hd{position:absolute;top:64px;right:80px;display:flex;align-items:center;gap:22px}
.hd img{width:104px;height:104px;border-radius:50%;border:4px solid #e3b84f;object-fit:cover}
.hd .n{font-weight:800;font-size:34px;line-height:1.1}.hd .b{font-family:E;font-weight:600;font-size:20px;letter-spacing:3px;color:#b8892a;margin-top:6px;direction:ltr;text-align:right}
.black .hd .b{color:#e3b84f}
.ft{position:absolute;bottom:56px;left:80px;right:80px;display:flex;justify-content:space-between;direction:ltr;font-family:E;font-weight:600;font-size:24px;opacity:.75}
.body{position:absolute;left:80px;right:80px}
.k{font-weight:900;line-height:1.15}
.g{color:#e3b84f}.gd{color:#a8761a}
.hl{background:linear-gradient(transparent 58%,#e3b84f 58%,#e3b84f 92%,transparent 92%)}
.p{font-weight:500;line-height:1.45}
.en{font-family:E;font-weight:600;direction:ltr;text-align:right;opacity:.7;margin-top:18px}
.chip{display:inline-flex;align-items:center;gap:12px;font-weight:800;font-size:34px;padding:10px 24px 6px;border-radius:14px}
.pic{width:920px;border-radius:28px;object-fit:cover;display:block}
.card{background:#fff;border:2px solid #e2d9c8;border-radius:26px;display:flex;align-items:center;gap:28px;padding:30px 34px;margin-bottom:24px}
.num{flex:none;width:76px;height:76px;border-radius:50%;border:3px solid #141414;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:40px;padding-top:6px}
.cta{background:#e3b84f;color:#141414;border-radius:30px;padding:34px 40px}
`;
const head = `<div class="hd"><img src="${IMG}/avatar.jpg"><div><div class="n">أحمد سلامة</div><div class="b">THE EDIBLE CODEX</div></div></div>`;
const foot = (i) => `<div class="ft"><span>@ahmet_salameh</span><span>${i}/${N}</span></div>`;
const X = `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/></svg>`;
const V = `<svg width="32" height="32" viewBox="0 0 24 24"><path d="M4 12.5L9.5 18L20 6" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const slides = [
  // 1 COVER
  `<div class="s black"><img src="${IMG}/cover-clean.jpg" style="position:absolute;inset:0;width:1080px;height:1350px;object-fit:cover">
   <div style="position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.78) 0%,rgba(0,0,0,.25) 22%,rgba(0,0,0,.2) 30%,rgba(0,0,0,.82) 40%,rgba(0,0,0,.82) 66%,rgba(0,0,0,.15) 80%,rgba(0,0,0,.55) 100%)"></div>
   ${head}
   <div class="body" style="top:520px;left:120px;right:120px">
     <div class="k" style="font-size:112px">الغلطة اللي<br>بتخرّب <span class="g">الكرنكل</span></div>
     <div class="p" style="font-size:40px;margin-top:22px">من الريل اللي جاب <b class="g">نص مليون</b> مشاهدة</div>
     <div class="en" style="font-size:32px">The one mistake that ruins crinkle cake</div>
   </div>${foot(1)}</div>`,
  // 2 STAKE
  `<div class="s black">${head}
   <div class="body" style="top:430px">
     <div class="p" style="font-size:46px;opacity:.8">الكرنكل بيطلع تقيل وطري؟</div>
     <div class="k" style="font-size:84px;margin-top:34px">المشكلة مش بإيدك…</div>
     <div class="k" style="font-size:84px;margin-top:20px">المشكلة <span class="g">بخطوة وحدة</span><br>الكل بيعملها</div>
     <div class="en" style="font-size:32px;margin-top:40px">Heavy and soft? It's not your hands. It's one step.</div>
   </div>${foot(2)}</div>`,
  // 3 THE USUAL WAY
  `<div class="s cream">${head}
   <div class="body" style="top:420px">
     <div class="chip" style="background:#2a2a2a;color:#f3ede1">${X}<span>الطريقة العادية</span></div>
     <div class="k" style="font-size:104px;margin-top:40px">زبدة بين<br><span class="hl">كل طبقة</span></div>
     <div class="p" style="font-size:44px;margin-top:40px">الزبدة بتثقّل الورق قبل ما يتماسك،<br>فبيطلع <b>طري وتقيل</b>.</div>
     <div class="en" style="font-size:32px">The usual way: butter between every layer.</div>
   </div>${foot(3)}</div>`,
  // 4 THE CHEF'S WAY
  `<div class="s cream">${head}
   <div class="body" style="top:220px">
     <div class="chip" style="background:#e3b84f;color:#141414">${V}<span>طريقة الشيف</span></div>
     <img class="pic" src="${IMG}/dry.jpg" style="height:520px;margin-top:26px;object-position:50% 70%">
     <div class="k" style="font-size:76px;margin-top:34px">ناشف بالفرن <span class="hl">أول ١٠ دقايق</span></div>
     <div class="p" style="font-size:40px;margin-top:16px">ولا نقطة زبدة. الورق بيتماسك وبيصير حروف مقرمشة.</div>
     <div class="en" style="font-size:32px">Dry in the oven for the first 10 minutes.</div>
   </div>${foot(4)}</div>`,
  // 5 THEN THE BUTTER
  `<div class="s black">${head}
   <div class="body" style="top:220px">
     <img class="pic" src="${IMG}/butter.jpg" style="height:590px;object-position:50% 55%">
     <div class="k" style="font-size:76px;margin-top:40px">وبعدين الزبدة <span class="g">من فوق</span>،<br>دفعة وحدة</div>
     <div class="p" style="font-size:40px;margin-top:16px;opacity:.85">بعد ما يتماسك الورق، بتنصب عليه مرة وحدة.</div>
     <div class="en" style="font-size:32px">Then the butter, over the top in one go.</div>
   </div>${foot(5)}</div>`,
  // 6 RESULT
  `<div class="s gold">${head}
   <div class="body" style="top:250px">
     <img class="pic" src="${IMG}/result.jpg" style="height:510px;object-position:50% 40%;box-shadow:0 20px 50px rgba(0,0,0,.25)">
     <div class="k" style="font-size:84px;margin-top:46px">حروف ذهبية<br>بتطقطق</div>
     <div class="p" style="font-size:40px;margin-top:18px">هاد الصوت اللي وصّل الريل لنص مليون مشاهدة.</div>
     <div class="en" style="font-size:32px;opacity:.75">Golden ridges that crackle.</div>
   </div>${foot(6)}</div>`,
  // 7 RECAP
  `<div class="s cream">${head}
   <div class="body" style="top:300px">
     <div class="k" style="font-size:80px">الكرنكل الصح<br>بـ<span class="hl">٣ خطوات</span></div>
     <div style="margin-top:54px">
       <div class="card"><div class="num">١</div><div class="k" style="font-size:46px;font-weight:800">كرمش الورق ورصّه واقف</div></div>
       <div class="card"><div class="num">٢</div><div class="k" style="font-size:46px;font-weight:800">فرن ناشف ١٠ دقايق</div></div>
       <div class="card"><div class="num">٣</div><div class="k" style="font-size:46px;font-weight:800">الزبدة من فوق دفعة وحدة</div></div>
     </div>
     <div class="en" style="font-size:32px">Crinkle cake in 3 steps.</div>
   </div>${foot(7)}</div>`,
  // 8 CTA
  `<div class="s black">${head}
   <div class="body" style="top:240px">
     <div class="k" style="font-size:86px">الوصفة كاملة <span class="g">بكتابي</span></div>
     <div class="p" style="font-size:40px;margin-top:14px;opacity:.85">مع ٣٦٠ وصفة حلال تانية، بالعربي والإنجليزي</div>
     <img src="${IMG}/book.jpg" style="display:block;width:420px;height:420px;object-fit:cover;object-position:50% 45%;border-radius:24px;margin:30px auto 0">
     <div class="cta" style="margin-top:34px">
       <div class="k" style="font-size:56px">اكتب «كرنكل» بالتعليقات</div>
       <div class="p" style="font-size:36px;margin-top:6px">وببعتلك الرابط على الخاص</div>
       <div class="p" style="font-size:28px;margin-top:10px;opacity:.75">تحميل فوري · استرجاع خلال ٣٠ يوم</div>
       <div class="en" style="font-size:32px;opacity:.75;margin-top:8px">Comment CRINKLE and I'll send you the link.</div>
     </div>
   </div>${foot(8)}</div>`,
];
fs.mkdirSync(path.join(here, "out"), { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
for (let i = 0; i < slides.length; i++) {
  const f = path.join(here, `_s${i + 1}.html`);
  fs.writeFileSync(f, `<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>${css}</style></head><body>${slides[i]}</body></html>`);
  await page.goto("file://" + f);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(here, "out", `slide-${i + 1}.jpg`), type: "jpeg", quality: 92 });
  fs.unlinkSync(f);
}
await browser.close();
console.log("rendered", slides.length);
