// Renders the 8-slide kitchen-psychology carousel from the manga chapter (1080x1350) to out/slide-N.jpg.
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
.cta{background:#e3b84f;color:#141414;border-radius:30px;padding:30px 36px}
.panel{width:920px;display:block;object-fit:cover;border:7px solid #111;border-radius:6px;background:#fff}
.black .panel{border-color:#f3ede1}
.tag{position:absolute;top:18px;left:18px;direction:ltr;font-family:E;font-weight:600;font-size:22px;letter-spacing:2px;background:#111;color:#e3b84f;padding:8px 14px;border-radius:8px}
`;
const head = `<div class="hd"><img src="${IMG}/avatar.jpg"><div><div class="n">أحمد سلامة</div><div class="b">THE EDIBLE CODEX</div></div></div>`;
const foot = (i) => `<div class="ft"><span>@ahmet_salameh</span><span>${i}/${N}</span></div>`;
const X = `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/></svg>`;
const V = `<svg width="32" height="32" viewBox="0 0 24 24"><path d="M4 12.5L9.5 18L20 6" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const slides = [
  // 1 COVER
  `<div class="s cream">${head}
   <div class="body" style="top:200px">
     <div style="position:relative"><img class="panel" src="${IMG}/silence.jpg" style="height:560px;object-position:50% 35%"><div class="tag">MASTER OF THE CRAFT · CH.1</div></div>
   </div>
   <div class="body" style="top:800px;left:120px;right:120px">
     <div class="k" style="font-size:98px">الحكام قرروا<br>قبل <span class="hl">أول لقمة</span></div>
     <div class="p" style="font-size:40px;margin-top:16px">٣ حواس بتحكم على أكلك قبل لسانك</div>
     <div class="en" style="font-size:32px;margin-top:8px">The judges decided before the first bite</div>
   </div>${foot(1)}</div>`,
  // 2 STAKE
  `<div class="s black">${head}
   <div class="body" style="top:250px">
     <div class="k" style="font-size:78px">أكلك بينحكم عليه<br><span class="g">٣ مرات</span> قبل ما<br>يوصل للسان</div>
     <div class="p" style="font-size:46px;margin-top:22px">بالعين. بالأنف. بالأذن.</div>
     <div class="en" style="font-size:32px;margin-top:10px">Judged three times before it reaches the tongue.</div>
     <img class="panel" src="${IMG}/judges.jpg" style="height:470px;margin-top:40px;object-position:50% 18%">
   </div>${foot(2)}</div>`,
  // 3 EYE
  `<div class="s cream">${head}
   <div class="body" style="top:210px">
     <div class="chip" style="background:#e3b84f;color:#141414"><span>١ · العين</span></div>
     <img class="panel" src="${IMG}/plating.jpg" style="height:500px;margin-top:22px;object-position:50% 60%">
     <div class="k" style="font-size:72px;margin-top:30px">الصحن المرتّب <span class="hl">بيطلع أطيب</span></div>
     <div class="p" style="font-size:36px;margin-top:14px">باحثين بأكسفورد قدّموا نفس السلطة بتلات طرق. نفس المكونات بالضبط. اللي انرتبت متل لوحة فنية، الناس قالوا إنها أطيب ودفعوا فيها أكتر.</div>
     <div class="en" style="font-size:32px;margin-top:10px">Same salad, plated like a painting: rated tastier.</div>
   </div>${foot(3)}</div>`,
  // 4 NOSE
  `<div class="s black">${head}
   <div class="body" style="top:210px">
     <div class="chip" style="background:#e3b84f;color:#141414"><span>٢ · الأنف</span></div>
     <img class="panel" src="${IMG}/smoke.jpg" style="height:520px;margin-top:22px;object-position:50% 30%">
     <div class="k" style="font-size:80px;margin-top:30px">الريحة <span class="g">بتسبق اللقمة</span></div>
     <div class="p" style="font-size:38px;margin-top:14px;opacity:.9">جزء كبير من اللي بنسميه طعم جاي من الأنف. جرّب. سكّر مناخيرك وذوق، وشوف كيف الطعم بيضعف.</div>
     <div class="en" style="font-size:32px;margin-top:10px">Much of what we call taste is smell.</div>
   </div>${foot(4)}</div>`,
  // 5 EAR
  `<div class="s cream">${head}
   <div class="body" style="top:210px">
     <div class="chip" style="background:#e3b84f;color:#141414"><span>٣ · الأذن</span></div>
     <img class="panel" src="${IMG}/slice.jpg" style="height:500px;margin-top:22px;object-position:50% 88%">
     <div class="k" style="font-size:70px;margin-top:30px">القرمشة اللي بتنسمع <span class="hl">بتنطعم</span></div>
     <div class="p" style="font-size:36px;margin-top:14px">بتجربة بأكسفورد علّوا صوت قرمشة الشيبس بالسماعات، ونفس الشيبس انحسّ أقرمش وأطزج.</div>
     <div class="en" style="font-size:32px;margin-top:10px">A louder crunch made the same chips feel crisper.</div>
   </div>${foot(5)}</div>`,
  // 6 VERDICT
  `<div class="s gold">${head}
   <div class="body" style="top:220px">
     <img class="panel" src="${IMG}/texture.jpg" style="height:600px;object-position:50% 30%">
     <div class="k" style="font-size:86px;margin-top:40px">حكموا قبل ما يتذوقوا</div>
     <div class="p" style="font-size:38px;margin-top:14px">القوام والريحة قالوا كلمتهم قبل ما حدا يمسك الشوكة.</div>
     <div class="en" style="font-size:32px;margin-top:10px;opacity:.75">They judged it before they tasted it.</div>
   </div>${foot(6)}</div>`,
  // 7 RECAP
  `<div class="s cream">${head}
   <div class="body" style="top:270px">
     <div class="k" style="font-size:84px"><span class="hl">٣ حكام</span> قبل اللسان</div>
     <div style="margin-top:50px">
       <div class="card"><div class="num" style="font-size:32px;width:124px;height:124px">العين</div><div class="k" style="font-size:42px;font-weight:800">رتّب الصحن قبل ما تقدّمه</div></div>
       <div class="card"><div class="num" style="font-size:32px;width:124px;height:124px">الأنف</div><div class="k" style="font-size:42px;font-weight:800">خلّي الريحة توصل قبل الصحن</div></div>
       <div class="card"><div class="num" style="font-size:32px;width:124px;height:124px">الأذن</div><div class="k" style="font-size:42px;font-weight:800">خلّي القرمشة تنسمع</div></div>
     </div>
     <div class="en" style="font-size:32px">Three judges before the tongue.</div>
   </div>${foot(7)}</div>`,
  // 8 CTA
  `<div class="s black">${head}
   <div class="body" style="top:205px">
     <div class="k" style="font-size:74px">الطعم آخر حكم.<br><span class="g">مش أول واحد.</span></div>
     <div class="p" style="font-size:34px;margin-top:12px;opacity:.88">٣٦١ وصفة حلال بكتابي، كل وحدة بصورتها وخطواتها</div>
     <img class="panel" src="${IMG}/taste.jpg" style="height:390px;margin-top:26px;object-position:50% 25%">
     <div class="cta" style="margin-top:28px;display:flex;align-items:center;gap:28px">
       <div style="flex:1">
         <div class="k" style="font-size:52px">اكتب «كتاب» بالتعليقات</div>
         <div class="p" style="font-size:32px;margin-top:4px">وببعتلك الرابط على الخاص</div>
         <div class="p" style="font-size:32px;margin-top:6px;opacity:.75">تحميل فوري · استرجاع خلال ٣٠ يوم</div>
         <div class="en" style="font-size:32px;opacity:.75;margin-top:6px">Comment BOOK for the link.</div>
       </div>
       <img src="${IMG}/book-cover.jpg" style="width:150px;height:208px;object-fit:cover;border-radius:6px;box-shadow:0 10px 24px rgba(0,0,0,.35)">
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
