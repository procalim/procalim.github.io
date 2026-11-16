// Kinetic cards v2 (owner, 2026-11-16: «حتى التصميم الكتابة اشتغل على مهارة المحترفين بالكتابة والانيميشين»).
// Replaces the sticker boxes of anim-cards.mjs with the grammar of pro food reels: words land one by one (rise, overshoot,
// de-blur), the key words get a gold marker block that sweeps in behind them with a shine, numbers count up, the series
// pill carries a pulsing gold dot, the English line wipes in, the share card's paper plane flies out and back with a
// ring pulse, everything drifts a few pixels while it holds and leaves word by word.
// Usage (Higgsfield sandbox, next to /home/user/ov/node_modules): node kinetic.mjs spec.json outDir
// spec: {fps, cards: [{key, frames, y, items: [
//   {k: "pill", t}                                  the series pill
//   {k: "line", size?, parts: [{t, hl?}]}            words; a part with hl gets the gold block (its words move together)
//   {k: "count", pre?, n, post}                      a number counting up from 0, e.g. pre «حوالي», n 37, post «غ بروتين»
//   {k: "en", t}                                     the English line
//   {k: "send", l1, l2, l3?}                         the share card with the paper plane (l3: the English line inside)
// ]}]}
import { chromium } from "/usr/local/lib/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const [specPath, outDir = "kin"] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const FS = "file:///home/user/ov/node_modules/@fontsource";
const MAXW = 620;   // the safe width x 230-850
const css = `
@font-face{font-family:Taj;font-weight:900;src:url(${FS}/tajawal/files/tajawal-arabic-900-normal.woff2)}
@font-face{font-family:Taj;font-weight:800;src:url(${FS}/tajawal/files/tajawal-arabic-800-normal.woff2)}
@font-face{font-family:TajL;font-weight:900;src:url(${FS}/tajawal/files/tajawal-latin-900-normal.woff2)}
@font-face{font-family:TajL;font-weight:800;src:url(${FS}/tajawal/files/tajawal-latin-800-normal.woff2)}
@font-face{font-family:IS;font-weight:700;src:url(${FS}/instrument-sans/files/instrument-sans-latin-700-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.wrap{position:absolute;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:14px}
.blk{display:flex;align-items:center;justify-content:center;direction:rtl;will-change:transform}
.row{gap:18px}
.a{display:inline-block;will-change:transform,opacity,filter}
.w{position:relative;font:900 var(--fs)/1.18 Taj,TajL,sans-serif;color:#FFF6E0;padding:0 2px;white-space:nowrap;
  text-shadow:0 3px 0 rgba(0,0,0,.6),0 8px 26px rgba(0,0,0,.8),0 0 3px rgba(0,0,0,.9)}
.w.hl{color:#121212;text-shadow:none;padding:4px 24px 14px}
.bg{position:absolute;inset:0;border-radius:18px;overflow:hidden;transform-origin:right center;
  background:linear-gradient(180deg,#F8D978 0%,#E8B442 55%,#D99A26 100%);
  box-shadow:0 12px 28px rgba(0,0,0,.55),inset 0 2px 0 rgba(255,255,255,.5)}
.tx{position:relative}
.shine{position:absolute;top:-30%;bottom:-30%;width:30%;left:-60%;transform:skewX(-20deg);
  background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.8),rgba(255,255,255,0))}
.pill{font:800 32px/1.2 Taj,TajL,sans-serif;color:#F2C14E;background:rgba(10,10,10,.84);border:2px solid rgba(242,193,78,.8);
  padding:7px 24px 11px;border-radius:999px;display:inline-flex;align-items:center;gap:12px;direction:rtl;white-space:nowrap;
  box-shadow:0 8px 22px rgba(0,0,0,.5)}
.dot{width:13px;height:13px;border-radius:50%;background:#F2C14E;box-shadow:0 0 12px #F2C14E;flex:none}
.count{gap:16px;align-items:baseline}
.num{font:900 150px/0.95 TajL,Taj,sans-serif;background:linear-gradient(180deg,#FFF0B8 0%,#F2C14E 48%,#C98A1C 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 8px 16px rgba(0,0,0,.75));
  font-variant-numeric:tabular-nums;min-width:1.2em;text-align:center}
.pre,.post{font:900 52px/1.1 Taj,TajL,sans-serif;color:#FFF6E0;
  text-shadow:0 3px 0 rgba(0,0,0,.6),0 8px 24px rgba(0,0,0,.8)}
.pre{font-size:38px;color:#F2C14E}
.en{display:inline-block;unicode-bidi:isolate;font:700 30px/1.28 IS,sans-serif;color:#FFF6E0;background:rgba(10,10,10,.66);
  padding:7px 18px 9px;border-radius:12px;max-width:600px;text-align:center;direction:ltr;letter-spacing:.3px;white-space:normal}
.send{gap:22px;background:rgba(10,10,10,.88);border:3px solid rgba(242,193,78,.9);border-radius:30px;
  padding:16px 26px 18px 30px;box-shadow:0 18px 44px rgba(0,0,0,.6)}
.ic{position:relative;width:104px;height:104px;border-radius:50%;flex:none;
  background:linear-gradient(180deg,#F8D978,#D99A26);box-shadow:inset 0 2px 0 rgba(255,255,255,.5)}
.ic svg{position:absolute;left:24px;top:26px;width:56px;height:56px}
.ring{position:absolute;inset:0;border-radius:50%;border:4px solid #F2C14E;opacity:0}
.st{display:flex;flex-direction:column;align-items:flex-start;gap:2px;white-space:nowrap}
.l1{font:800 44px/1.15 Taj,TajL,sans-serif;color:#FFF6E0}
.l2{font:900 58px/1.15 Taj,TajL,sans-serif;color:#F2C14E}
.l3{display:inline-block;unicode-bidi:isolate;direction:ltr;font:700 25px/1.3 IS,sans-serif;color:#FFF6E0;opacity:.85;margin-top:4px}`;
const PLANE = `<svg viewBox="0 0 24 24" fill="none" stroke="#141414" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round">
<path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9z"/></svg>`;

const ENTER = 8, STAG = 2, EXIT = 6;   // words 2 frames apart: the hook is whole by about 0.4 s

function build(c) {
  // every animated unit gets a start frame in reading order
  let s = 0, k = 0;
  const unit = (html, kind, extra = "") => { const h = `<span class="a" data-k="${kind}" data-s="${s}" data-i="${k++}" ${extra}>${html}</span>`; s += STAG; return h; };
  const blocks = c.items.map((it) => {
    if (it.k === "pill") return `<div class="blk">${unit(`<span class="pill"><span class="dot"></span>${it.t}</span>`, "pill")}</div>`;
    if (it.k === "line") {
      const fs = `${it.size || 80}px`;
      const parts = it.parts.map((p) => p.hl
        ? unit(`<span class="w hl" style="--fs:${fs}"><span class="bg"><span class="shine"></span></span><span class="tx">${p.t}</span></span>`, "hl")
        : p.t.split(" ").map((w) => unit(`<span class="w" style="--fs:${fs}">${w}</span>`, "pop")).join(""));
      return `<div class="blk row">${parts.join("")}</div>`;
    }
    if (it.k === "count") {
      const pre = it.pre ? unit(`<span class="pre">${it.pre}</span>`, "pop") : "";
      const num = unit(`<span class="num" data-n="${it.n}">0</span>`, "count");
      const post = unit(`<span class="post">${it.post}</span>`, "pop");
      return `<div class="blk count">${pre}${num}${post}</div>`;
    }
    if (it.k === "en") { s += 2; return `<div class="blk">${unit(`<span class="en">${it.t}</span>`, "en")}</div>`; }
    if (it.k === "send") {
      const h = unit(`<span class="blk send"><span class="ic"><span class="ring"></span><span class="ring r2"></span>
        <span class="pl">${PLANE}</span></span><span class="st"><span class="l1">${it.l1}</span><span class="l2">${it.l2}</span>${it.l3 ? `<span class="l3">${it.l3}</span>` : ""}</span></span>`, "send");
      s += 3;
      return `<div class="blk">${h}</div>`;
    }
    throw new Error("unknown item " + it.k);
  });
  return `<html><head><meta charset="utf-8"><style>${css}</style></head><body>
    <div class="wrap" style="top:${c.y}px">${blocks.join("")}</div></body></html>`;
}

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
for (const c of spec.cards) {
  const dir = path.join(outDir, c.key);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const tmp = path.join(outDir, `_${c.key}.html`);
  fs.writeFileSync(tmp, build(c));
  await page.goto("file://" + path.resolve(tmp));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  // fit: any block wider than the safe width is scaled down as a whole (the words keep their proportions)
  const fit = await page.evaluate((MAXW) => [...document.querySelectorAll(".wrap > .blk")].map((b) => {
    const rs = [...b.querySelectorAll(".a")].map((e) => e.getBoundingClientRect());
    const w = Math.max(...rs.map((r) => r.right)) - Math.min(...rs.map((r) => r.left));
    b.dataset.fit = w > MAXW ? MAXW / w : 1; return Math.round(w);
  }), MAXW);
  const n = c.frames;
  for (let f = 0; f < n; f++) {
    await page.evaluate(({ f, n, ENTER, EXIT }) => {
      const cl = (x) => Math.max(0, Math.min(1, x));
      const back = (p) => { const c = 1.7; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
      const out = (p) => 1 - Math.pow(1 - p, 3);
      const units = [...document.querySelectorAll(".a")];
      const last = units.length - 1;
      const drift = -10 * (f / Math.max(n - 1, 1));   // a slow lift while the card holds
      document.querySelectorAll(".wrap > .blk").forEach((b) => { b.style.transform = `translateY(${drift}px) scale(${b.dataset.fit})`; });
      units.forEach((e) => {
        const s = +e.dataset.s, k = e.dataset.k, i = +e.dataset.i;
        const p = cl((f - s) / ENTER);
        const q = cl((f - (n - EXIT) + (last - i) * 0.6) / EXIT);   // exit, the last unit first
        let sc = 1, ty = 0, bl = 0, op = 1;
        if (k === "pop" || k === "count") { sc = 0.5 + 0.5 * back(p); ty = (1 - out(p)) * 48; bl = (1 - out(p)) * 10; op = cl(p * 2.2); }
        if (k === "pill") { sc = 0.85 + 0.15 * out(p); ty = -(1 - out(p)) * 26; op = cl(p * 2); }
        if (k === "en") { op = cl(p * 3); e.firstChild.style.clipPath = `inset(0 ${100 - 100 * out(cl((f - s) / 10))}% 0 0 round 12px)`; }
        if (k === "send") { sc = 0.6 + 0.4 * back(p); ty = (1 - out(p)) * 60; op = cl(p * 2.5); }
        if (k === "hl") {
          const bg = e.querySelector(".bg"), tx = e.querySelector(".tx"), sh = e.querySelector(".shine");
          const pb = out(cl((f - s) / 7)), pt = cl((f - s - 3) / ENTER);
          bg.style.transform = `scaleX(${pb})`; op = cl((f - s) / 2);
          tx.style.transform = `translateY(${(1 - out(pt)) * 40}px) scale(${0.6 + 0.4 * back(pt)})`;
          tx.style.opacity = cl(pt * 2.5); tx.style.filter = `blur(${(1 - out(pt)) * 8}px)`;
          const ps = cl((f - s - 11) / 10); sh.style.left = `${-60 + 200 * ps}%`; sh.style.opacity = ps > 0 && ps < 1 ? 1 : 0;
          sc = 1 + 0.06 * Math.sin(Math.PI * cl((f - s - 3) / 8));   // a small punch as the word lands
        }
        if (k === "count") {
          const num = e.querySelector(".num"), pc = out(cl((f - s - 2) / 16));
          num.textContent = Math.round(+num.dataset.n * pc);
          sc *= 1 + 0.08 * Math.sin(Math.PI * cl((f - s - 16) / 6));   // a pop when it reaches the number
        }
        if (k === "send") {
          const pl = e.querySelector(".pl");
          const t1 = cl((f - s - 14) / 8), t2 = cl((f - s - 22) / 7);   // the plane flies out, then back in
          const x = t1 < 1 ? 70 * out(t1) : -50 * (1 - out(t2)), y = t1 < 1 ? -70 * out(t1) : 50 * (1 - out(t2));
          pl.style.transform = `translate(${x}px,${y}px)`; pl.style.opacity = t1 < 1 ? 1 - t1 : t2;
          e.querySelectorAll(".ring").forEach((r, j) => {
            const pr = cl((f - s - 12 - 16 * j) / 14);
            r.style.transform = `scale(${1 + 0.8 * out(pr)})`; r.style.opacity = pr > 0 && pr < 1 ? 0.9 * (1 - pr) : 0;
          });
        }
        if (e.querySelector(".dot")) e.querySelector(".dot").style.opacity = 0.45 + 0.55 * (0.5 + 0.5 * Math.cos(f / 3.2));
        sc *= 1 - 0.14 * q; ty -= 26 * q; bl += 7 * q; op *= 1 - q;
        e.style.transform = `translateY(${ty}px) scale(${sc})`;
        e.style.opacity = op; e.style.filter = bl > 0.05 ? `blur(${bl}px)` : "none";
      });
    }, { f, n, ENTER, EXIT });
    await page.screenshot({ path: path.join(dir, `f${String(f).padStart(3, "0")}.png`), omitBackground: true });
  }
  fs.unlinkSync(tmp);
  console.log(c.key, n, "frames, block widths", fit.join(","));
}
await browser.close();
