// Renders the 8-slide "room for dessert" carousel, chapter 2 of the manga (1080x1350).
// Panels come from img/<name>.jpg (see panels.md). While a panel is missing, a grey placeholder stands in and the
// slides go to draft/ (not committed) so the text layout can be checked. With all 7 panels they go to out/.
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, "../../package.json"));
const { chromium } = require("playwright");
const FS = "file://" + path.join(here, "../../node_modules/@fontsource");
const IMG = "file://" + path.join(here, "img");
const CH1 = "file://" + path.join(here, "../manga-psych/img");
const N = 8;
const PANELS = ["full", "eyes", "bored", "courses", "door", "bliss", "smirk"];
const missing = PANELS.filter((n) => !fs.existsSync(path.join(here, "img", n + ".jpg")));
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
.g{color:#e3b84f}
.hl{background:linear-gradient(transparent 58%,#e3b84f 58%,#e3b84f 92%,transparent 92%)}
.p{font-weight:500;line-height:1.45}
.en{font-family:E;font-weight:600;direction:ltr;text-align:right;opacity:.7;margin-top:18px}
.chip{display:inline-flex;align-items:center;gap:12px;font-weight:800;font-size:34px;padding:10px 24px 6px;border-radius:14px}
.card{background:#fff;border:2px solid #e2d9c8;border-radius:26px;display:flex;align-items:center;gap:28px;padding:26px 34px;margin-bottom:22px}
.num{flex:none;width:100px;height:100px;border-radius:50%;border:3px solid #141414;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:54px;padding-top:8px}
.cta{background:#e3b84f;color:#141414;border-radius:30px;padding:30px 36px}
.pw{position:relative}
.panel{width:920px;display:block;object-fit:cover;border:7px solid #111;border-radius:6px;background:#fff}
.black .panel{border-color:#f3ede1}
.ph{display:flex;align-items:center;justify-content:center;direction:ltr;font-family:E;font-weight:600;font-size:40px;color:#666;background:repeating-linear-gradient(45deg,#dcdcdc 0 18px,#cdcdcd 18px 36px)}
.tag{position:absolute;top:18px;left:18px;direction:ltr;font-family:E;font-weight:600;font-size:22px;letter-spacing:2px;background:#111;color:#e3b84f;padding:8px 14px;border-radius:8px}
.bub{position:absolute;background:#fff;color:#111;border:5px solid #111;border-radius:50%;padding:30px 44px 22px;font-weight:800;font-size:38px;line-height:1.2;text-align:center;white-space:nowrap}
.bub::after{content:"";position:absolute;bottom:-18px;width:28px;height:28px;background:#fff;border-right:5px solid #111;border-bottom:5px solid #111;transform:rotate(45deg) skew(12deg,12deg)}
.bub.tl::after{left:30%}.bub.tr::after{right:30%}
`;
const head = `<div class="hd"><img src="${CH1}/avatar.jpg"><div><div class="n">أحمد سلامة</div><div class="b">THE EDIBLE CODEX</div></div></div>`;
const foot = (i) => `<div class="ft"><span>@ahmet_salameh</span><span>${i}/${N}</span></div>`;
// A panel with an optional overlay (tag, speech bubble). pos = object-position of the crop.
const panel = (name, h, pos = "50% 50%", over = "", mt = 0) =>
  `<div class="pw" style="margin-top:${mt}px">` +
  (missing.includes(name)
    ? `<div class="panel ph" style="height:${h}px">${name}.jpg</div>`
    : `<img class="panel" src="${IMG}/${name}.jpg" style="height:${h}px;object-position:${pos}">`) +
  `${over}</div>`;
// Speech bubble: tail = "tl" (tail under the left part) or "tr" (under the right part).
const bub = (text, style, tail = "tl") => `<div class="bub ${tail}" style="${style}">${text}</div>`;
const chip = (t) => `<div class="chip" style="background:#e3b84f;color:#141414"><span>${t}</span></div>`;
const slides = [
  // 1 COVER
  `<div class="s cream">${head}
   <div class="body" style="top:200px">
     ${panel("full", 560, "50% 50%", `<div class="tag">MASTER OF THE CRAFT · CH.2</div>` + bub("شبعنا. ولا لقمة.", "top:26px;right:28px", "tl"))}
   </div>
   <div class="body" style="top:800px;left:120px;right:120px">
     <div class="k" style="font-size:98px">ليش دايماً في<br><span class="hl">مكان للحلو؟</span></div>
     <div class="p" style="font-size:40px;margin-top:16px">الحكام شبعوا. المعلّم لسا ما خلّص.</div>
     <div class="en" style="font-size:32px;margin-top:8px">Why is there always room for dessert?</div>
   </div>${foot(1)}</div>`,
  // 2 STAKE
  `<div class="s black">${head}
   <div class="body" style="top:250px">
     <div class="k" style="font-size:78px">حلفت إنك شبعت.<br><span class="g">وبعدين نزل الحلو.</span></div>
     <div class="p" style="font-size:46px;margin-top:22px">ومسكت المعلقة. مش ضعف إرادة.<br>هيك دماغك مبني.</div>
     <div class="en" style="font-size:32px;margin-top:10px">You swore you were full. Then dessert landed.</div>
     ${panel("eyes", 420, "50% 50%", "", 36)}
   </div>${foot(2)}</div>`,
  // 3 LAW 1
  `<div class="s cream">${head}
   <div class="body" style="top:210px">
     ${chip("القانون ١")}
     ${panel("bored", 500, "50% 50%", bub("كمان نفس الطعم؟", "top:24px;left:26px", "tr"), 22)}
     <div class="k" style="font-size:64px;margin-top:30px">الشبع من أكلة، <span class="hl">مش من الأكل</span></div>
     <div class="p" style="font-size:36px;margin-top:14px">فريق بأكسفورد سنة ١٩٨١ أكّل ناس أكلة وحدة لحد الشبع. متعتها نزلت أكتر من الأكلات اللي ما أكلوها.</div>
     <div class="en" style="font-size:32px;margin-top:10px">You get full of one food, not of food.</div>
   </div>${foot(3)}</div>`,
  // 4 LAW 2
  `<div class="s black">${head}
   <div class="body" style="top:210px">
     ${chip("القانون ٢")}
     ${panel("courses", 520, "50% 50%", "", 22)}
     <div class="k" style="font-size:80px;margin-top:30px">التنويع <span class="g">بيرجّع الشهية</span></div>
     <div class="p" style="font-size:38px;margin-top:14px;opacity:.9">بتجربة تانية سنة ١٩٨٤: ٤ أطباق مختلفة ورا بعض، مقابل نفس الطبق ٤ مرات. اللي تنوّع أكلهم أكلوا حوالي ٦٠٪ أكتر.</div>
     <div class="en" style="font-size:32px;margin-top:10px">Four different courses: about 60% more eaten.</div>
   </div>${foot(4)}</div>`,
  // 5 LAW 3
  `<div class="s cream">${head}
   <div class="body" style="top:210px">
     ${chip("القانون ٣")}
     ${panel("door", 500, "50% 50%", "", 22)}
     <div class="k" style="font-size:70px;margin-top:30px">للسكر <span class="hl">باب خاص بالدماغ</span></div>
     <div class="p" style="font-size:36px;margin-top:14px">دراسة ألمانية سنة ٢٠٢٥ على الفئران: خلايا الشبع نفسها بتفتح للسكر باب. الفار الشبعان بيوقّف أكل، وبيكمّل عالحلو.</div>
     <div class="en" style="font-size:32px;margin-top:10px">In mice, the "full" neurons open a door for sugar.</div>
   </div>${foot(5)}</div>`,
  // 6 VERDICT
  `<div class="s gold">${head}
   <div class="body" style="top:220px">
     ${panel("bliss", 560, "50% 50%", bub("طلع في مكان.", "top:26px;right:28px", "tl"))}
     <div class="k" style="font-size:80px;margin-top:36px">مش جوع.<br>زهق من <span style="background:linear-gradient(transparent 58%,#fff 58%,#fff 92%,transparent 92%)">نفس الطعم</span></div>
     <div class="p" style="font-size:38px;margin-top:14px">معدتك ما كذبت لما قالت شبعت. لسانك بس كان بدّو طعم جديد.</div>
     <div class="en" style="font-size:32px;margin-top:10px;opacity:.75">It isn't hunger. You're bored of the same taste.</div>
   </div>${foot(6)}</div>`,
  // 7 RECAP
  `<div class="s cream">${head}
   <div class="body" style="top:250px">
     <div class="k" style="font-size:84px"><span class="hl">٣ قوانين</span> للشبع</div>
     <div style="margin-top:44px">
       <div class="card"><div class="num">١</div><div class="k" style="font-size:44px;font-weight:800">الشبع من أكلة، مش من الأكل</div></div>
       <div class="card"><div class="num">٢</div><div class="k" style="font-size:44px;font-weight:800">التنويع بيرجّع الشهية</div></div>
       <div class="card"><div class="num">٣</div><div class="k" style="font-size:44px;font-weight:800">للسكر باب خاص بالدماغ</div></div>
     </div>
     <div class="k" style="font-size:46px;margin-top:36px;line-height:1.3">بعزومتك الجاية:<br><span class="hl">نوّع الطعمات، مش الكميات.</span></div>
     <div class="en" style="font-size:32px;margin-top:14px">Vary your flavours, not your portions.</div>
   </div>${foot(7)}</div>`,
  // 8 CTA
  `<div class="s black">${head}
   <div class="body" style="top:205px">
     <div class="k" style="font-size:74px">٣٦١ طعم.<br><span class="g">لسانك ما بيزهق.</span></div>
     <div class="p" style="font-size:34px;margin-top:12px;opacity:.88">كلها وصفات حلال بكتابي، وكرنكل هالفصل وحدة منها</div>
     ${panel("smirk", 390, "50% 50%", bub("قلتلكم.", "top:40px;right:60px", "tl"), 26)}
     <div class="cta" style="margin-top:28px;display:flex;align-items:center;gap:28px">
       <div style="flex:1">
         <div class="k" style="font-size:52px">اكتب «كتاب» بالتعليقات</div>
         <div class="p" style="font-size:32px;margin-top:4px">وببعتلك الرابط على الخاص</div>
         <div class="p" style="font-size:32px;margin-top:6px;opacity:.75">تحميل فوري · استرجاع خلال ٣٠ يوم</div>
         <div class="en" style="font-size:32px;opacity:.75;margin-top:6px">Comment BOOK, I'll send you the link.</div>
       </div>
       <img src="${CH1}/book-cover.jpg" style="width:150px;height:208px;object-fit:cover;border-radius:6px;box-shadow:0 10px 24px rgba(0,0,0,.35)">
     </div>
   </div>${foot(8)}</div>`,
];
const outDir = path.join(here, missing.length ? "draft" : "out");
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
for (let i = 0; i < slides.length; i++) {
  const f = path.join(here, `_s${i + 1}.html`);
  fs.writeFileSync(f, `<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>${css}</style></head><body>${slides[i]}</body></html>`);
  await page.goto("file://" + f);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  // Flag text that runs under the footer or out of the slide.
  const low = await page.evaluate(() => {
    const ft = document.querySelector(".ft").getBoundingClientRect().top;
    return Math.max(...[...document.querySelectorAll(".body")].map((b) => b.getBoundingClientRect().bottom)) - ft;
  });
  if (low > -20) console.log(`slide ${i + 1}: body ends ${Math.round(low + 20)} px too low`);
  await page.screenshot({ path: path.join(outDir, `slide-${i + 1}.jpg`), type: "jpeg", quality: 92 });
  fs.unlinkSync(f);
}
await browser.close();
console.log(missing.length ? `DRAFT (missing panels: ${missing.join(", ")}) -> draft/` : "rendered -> out/", slides.length);
