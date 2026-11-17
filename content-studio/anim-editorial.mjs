// Editorial cards (owner, 2026-11-17: «الكتابة والتصميم ... احلى من التصميم ابيضّ او اسود والهووك ميل ig viral، مش نفس
// تصميم الي قبل»). Built from the swipe file's top reels (research/swipe-2026-11-17.md): a white serif title straight on
// the food with no box («SNICKERS / SMASHED DATES», 8.2x), a small series line over an italic title («healthy protein
// treats: ep 2» / «Cottage Cheese ICE CREAM», 3.6x), and Instagram's own white label with black text for a statement
// ("I'm doing this from now on", 7.0x). Motion is quiet: a soft rise with a de-blur, the English caps closing their
// letter spacing, the label easing in; a fade out.
// Usage (Higgsfield sandbox, /home/user/ov with @fontsource el-messiri, playfair-display, tajawal, instrument-sans):
//   node editorial.mjs spec.json outDir [--still]     (--still: one PNG per card at its held state, for mockups)
// spec: {fps, cards: [{key, frames, y, items: [
//   {k: "kicker", t, en?}      the small series line (Arabic, optional English after a dot)
//   {k: "title", t}             the big Arabic title, white serif display, no box
//   {k: "caps", t}              the English title in spaced serif capitals
//   {k: "italic", t}            an English line in serif italic
//   {k: "label", t}             Instagram's white label, black text (a statement or the share line)
//   {k: "send", t, en?}         the white label with the paper plane (the share card)
// ]}]}
import { chromium } from "/usr/local/lib/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const still = args.includes("--still");
const [specPath, outDir = "edi"] = args.filter((a) => !a.startsWith("--"));
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const FS = "file:///home/user/ov/node_modules/@fontsource";
const MAXW = 620;   // the safe width x 230-850
const css = `
@font-face{font-family:Mes;font-weight:700;src:url(${FS}/el-messiri/files/el-messiri-arabic-700-normal.woff2)}
@font-face{font-family:Mes;font-weight:600;src:url(${FS}/el-messiri/files/el-messiri-arabic-600-normal.woff2)}
@font-face{font-family:MesL;font-weight:700;src:url(${FS}/el-messiri/files/el-messiri-latin-700-normal.woff2)}
@font-face{font-family:PF;font-weight:600;src:url(${FS}/playfair-display/files/playfair-display-latin-600-normal.woff2)}
@font-face{font-family:PF;font-weight:600;font-style:italic;src:url(${FS}/playfair-display/files/playfair-display-latin-600-italic.woff2)}
@font-face{font-family:Taj;font-weight:800;src:url(${FS}/tajawal/files/tajawal-arabic-800-normal.woff2)}
@font-face{font-family:TajL;font-weight:800;src:url(${FS}/tajawal/files/tajawal-latin-800-normal.woff2)}
@font-face{font-family:IS;font-weight:700;src:url(${FS}/instrument-sans/files/instrument-sans-latin-700-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.wrap{position:absolute;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:10px}
.blk{display:flex;justify-content:center;will-change:transform}
.a{display:inline-block;will-change:transform,opacity,filter}
.sh{text-shadow:0 2px 3px rgba(0,0,0,.35),0 4px 18px rgba(0,0,0,.55)}
.kicker{font:600 32px/1.3 Mes,MesL,serif;color:rgba(255,255,255,.9);direction:rtl;white-space:nowrap;letter-spacing:.3px}
.kicker i{font:600 italic 28px PF,serif;direction:ltr;unicode-bidi:isolate;opacity:.9}
.title{font:700 104px/1.12 Mes,MesL,serif;color:#fff;direction:rtl;white-space:nowrap}
.caps{font:600 40px/1.2 PF,serif;color:#fff;text-transform:uppercase;direction:ltr;white-space:nowrap}
.italic{font:600 italic 46px/1.2 PF,serif;color:#fff;direction:ltr;white-space:nowrap}
.label{display:inline-block;text-align:center;font:800 46px/1.25 Taj,TajL,sans-serif;color:#111;background:#fff;border-radius:16px;padding:12px 26px 16px;
  direction:rtl;white-space:nowrap;box-shadow:0 6px 20px rgba(0,0,0,.25)}
.label .en{display:block;font:700 24px/1.3 IS,sans-serif;color:#444;direction:ltr;unicode-bidi:isolate;text-align:center;margin-top:4px}
.send{display:inline-flex;align-items:center;gap:16px}
.send svg{width:46px;height:46px;flex:none}
.pl{display:inline-block}`;
const PLANE = `<svg viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">
<path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9z"/></svg>`;
const ENTER = 10, STAG = 3, EXIT = 6;

function build(c) {
  let s = 0, k = 0;
  const unit = (html, kind) => { const h = `<span class="a" data-k="${kind}" data-s="${s}" data-i="${k++}">${html}</span>`; s += STAG; return h; };
  const blocks = c.items.map((it) => {
    if (it.k === "kicker") return `<div class="blk">${unit(`<span class="kicker sh">${it.t}${it.en ? ` · <i>${it.en}</i>` : ""}</span>`, "fade")}</div>`;
    if (it.k === "title") return `<div class="blk" style="direction:rtl;gap:24px">${it.t.split(" ").map((w) => unit(`<span class="title sh">${w}</span>`, "rise")).join("")}</div>`;
    if (it.k === "caps") return `<div class="blk">${unit(`<span class="caps sh">${it.t}</span>`, "track")}</div>`;
    if (it.k === "italic") return `<div class="blk">${unit(`<span class="italic sh">${it.t}</span>`, "rise")}</div>`;
    if (it.k === "label") return `<div class="blk">${unit(`<span class="label">${it.t}${it.en ? `<span class="en">${it.en}</span>` : ""}</span>`, "label")}</div>`;
    if (it.k === "send") return `<div class="blk">${unit(`<span class="label"><span class="send"><span class="pl">${PLANE}</span><span>${it.t}</span></span>${it.en ? `<span class="en">${it.en}</span>` : ""}</span>`, "send")}</div>`;
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
  const fit = await page.evaluate((MAXW) => [...document.querySelectorAll(".wrap > .blk")].map((b) => {
    const rs = [...b.querySelectorAll(".a")].map((e) => e.getBoundingClientRect());
    const w = Math.max(...rs.map((r) => r.right)) - Math.min(...rs.map((r) => r.left));
    b.dataset.fit = w > MAXW ? MAXW / w : 1; return Math.round(w);
  }), MAXW);
  const n = c.frames;
  const frames = still ? [Math.min(n - EXIT - 1, 40)] : [...Array(n).keys()];
  for (const f of frames) {
    await page.evaluate(({ f, n, ENTER, EXIT }) => {
      const cl = (x) => Math.max(0, Math.min(1, x));
      const out = (p) => 1 - Math.pow(1 - p, 3);
      const units = [...document.querySelectorAll(".a")];
      const drift = -8 * (f / Math.max(n - 1, 1));
      document.querySelectorAll(".wrap > .blk").forEach((b) => { b.style.transform = `translateY(${drift}px) scale(${b.dataset.fit})`; });
      units.forEach((e) => {
        const s = +e.dataset.s, k = e.dataset.k;
        const p = out(cl((f - s) / ENTER));
        const q = cl((f - (n - EXIT)) / EXIT);   // all fade out together, gently
        let ty = 0, bl = 0, sc = 1, op = cl((f - s) / (ENTER * 0.7));
        if (k === "rise") { ty = (1 - p) * 28; bl = (1 - p) * 8; }
        if (k === "fade") { ty = (1 - p) * 10; }
        if (k === "track") { e.firstChild.style.letterSpacing = `${0.18 + 0.32 * (1 - p)}em`; bl = (1 - p) * 4; }
        if (k === "label" || k === "send") { sc = 0.94 + 0.06 * p; ty = (1 - p) * 14; }
        if (k === "send") {   // the plane nudges forward once
          const pl = e.querySelector(".pl"), t = cl((f - s - 12) / 10);
          const x = Math.sin(Math.PI * t) * 10, y = -Math.sin(Math.PI * t) * 10;
          pl.style.transform = `translate(${x}px,${y}px)`;
        }
        op *= 1 - q; ty -= 10 * q;
        e.style.transform = `translateY(${ty}px) scale(${sc})`;
        e.style.opacity = op; e.style.filter = bl > 0.05 ? `blur(${bl}px)` : "none";
      });
    }, { f, n, ENTER, EXIT });
    await page.screenshot({ path: path.join(dir, `f${String(f).padStart(3, "0")}.png`), omitBackground: true });
  }
  fs.unlinkSync(tmp);
  console.log(c.key, frames.length, "frames, block widths", fit.join(","));
}
await browser.close();
