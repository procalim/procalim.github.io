// Typed cards (owner, 2026-11-17: «الكتابة بدون ملصق وبخط كتابة مرتب ويطلع صوت الكتابة هي وخفيف على الشاشة»).
// No boxes, no stickers: neat white type straight on the picture (El Messiri for Arabic, Playfair Display for English)
// with a soft shadow, typed in letter by letter like a phone keyboard; each new letter is an event the edit turns into a
// light key click. Lines type one after another; the card fades out at the end.
// Usage (Higgsfield sandbox, /home/user/ov): node typed.mjs spec.json outDir [--still]
// spec: {fps, cards: [{key, frames, y, cps?, items: [
//   {k: "kicker", t}     a small line (the series)
//   {k: "title", t}      the big Arabic line
//   {k: "line", t}       a medium Arabic line
//   {k: "caps", t}       English in spaced serif capitals
//   {k: "italic", t}     English in serif italic
// ]}]}   cps = letters per second (default 26); scrim: true puts a soft dark glow (no shape, no edge) behind the
// lines where the picture is bright
// Writes outDir/<key>/f###.png and outDir/<key>/events.json (the frames where a letter appears).
import { chromium } from "/usr/local/lib/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const still = args.includes("--still");
const [specPath, outDir = "typ"] = args.filter((a) => !a.startsWith("--"));
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const FS = "file:///home/user/ov/node_modules/@fontsource";
const MAXW = 620;   // the safe width x 230-850
const css = `
@font-face{font-family:Mes;font-weight:700;src:url(${FS}/el-messiri/files/el-messiri-arabic-700-normal.woff2)}
@font-face{font-family:Mes;font-weight:600;src:url(${FS}/el-messiri/files/el-messiri-arabic-600-normal.woff2)}
@font-face{font-family:MesL;font-weight:700;src:url(${FS}/el-messiri/files/el-messiri-latin-700-normal.woff2)}
@font-face{font-family:PF;font-weight:600;src:url(${FS}/playfair-display/files/playfair-display-latin-600-normal.woff2)}
@font-face{font-family:PF;font-weight:600;font-style:italic;src:url(${FS}/playfair-display/files/playfair-display-latin-600-italic.woff2)}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.wrap{position:absolute;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:8px}
.blk{display:flex;justify-content:center}
.u{display:inline-block;white-space:nowrap;color:#fff;
  text-shadow:0 2px 3px rgba(0,0,0,.45),0 3px 16px rgba(0,0,0,.55),0 0 2px rgba(0,0,0,.5)}
.kicker{font:600 30px/1.3 Mes,MesL,serif;opacity:.92;direction:rtl}
.title{font:700 92px/1.15 Mes,MesL,serif;direction:rtl}
.line{font:700 60px/1.2 Mes,MesL,serif;direction:rtl}
.caps{font:600 34px/1.25 PF,serif;letter-spacing:.2em;text-transform:uppercase;direction:ltr}
.italic{font:600 italic 36px/1.25 PF,serif;direction:ltr}
.scrim{position:absolute;left:50%;top:50%;width:980px;height:calc(100% + 220px);transform:translate(-50%,-50%);z-index:-1;
  background:radial-gradient(closest-side,rgba(0,0,0,.42),rgba(0,0,0,.18) 60%,rgba(0,0,0,0));pointer-events:none}`;

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
for (const c of spec.cards) {
  const fps = spec.fps, cps = c.cps || 26, EXIT = 6, GAP = 3;
  const dir = path.join(outDir, c.key);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const blocks = c.items.map((it, i) => `<div class="blk"><span class="u ${it.k}" data-i="${i}"></span></div>`).join("");
  const tmp = path.join(outDir, `_${c.key}.html`);
  fs.writeFileSync(tmp, `<html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="wrap" style="top:${c.y}px">${c.scrim ? '<div class="scrim"></div>' : ""}${blocks}</div></body></html>`);
  await page.goto("file://" + path.resolve(tmp));
  // graphemes, then measure each line at full length and pin its width so typing grows from the start edge
  const plan = await page.evaluate(({ items, MAXW }) => {
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return [...document.querySelectorAll(".u")].map((u, i) => {
      const g = [...seg.segment(items[i].t)].map((x) => x.segment);
      return g;
    });
  }, { items: c.items, MAXW });
  await page.evaluate((items) => document.querySelectorAll(".u").forEach((u, i) => { u.textContent = items[i].t; }), c.items);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.evaluate((MAXW) => document.querySelectorAll(".u").forEach((u) => {
    const w = u.getBoundingClientRect().width;
    u.style.width = `${Math.ceil(w) + 2}px`; u.style.textAlign = "start";
    const f = w > MAXW ? MAXW / w : 1; u.parentElement.style.transform = `scale(${f})`;
  }), MAXW);
  // the typing schedule: lines one after another, letters at cps, a small gap between lines
  const fpc = fps / cps, starts = [], events = [];
  let t = 0;
  plan.forEach((g) => {
    starts.push(t);
    g.forEach((ch, j) => { if (ch.trim()) events.push(Math.round(t + (j + 1) * fpc)); });
    t += g.length * fpc + GAP;
  });
  const n = c.frames;
  fs.writeFileSync(path.join(dir, "events.json"), JSON.stringify(events.filter((e) => e < n - EXIT)));
  const frames = still ? [Math.min(n - EXIT - 1, Math.ceil(t) + 2)] : [...Array(n).keys()];
  for (const f of frames) {
    await page.evaluate(({ f, n, plan, starts, fpc, EXIT }) => {
      const q = Math.max(0, Math.min(1, (f - (n - EXIT)) / EXIT));
      document.querySelectorAll(".u").forEach((u, i) => {
        const k = Math.max(0, Math.min(plan[i].length, Math.floor((f - starts[i]) / fpc)));
        u.textContent = plan[i].slice(0, k).join("");
        u.style.opacity = 1 - q;
        u.style.transform = `translateY(${-8 * q}px)`;
      });
      const sc = document.querySelector(".scrim");
      if (sc) sc.style.opacity = Math.min(1, f / 6) * (1 - q);
    }, { f, n, plan, starts, fpc, EXIT });
    await page.screenshot({ path: path.join(dir, `f${String(f).padStart(3, "0")}.png`), omitBackground: true });
  }
  fs.unlinkSync(tmp);
  console.log(c.key, frames.length, "frames,", events.length, "letters, typed by frame", Math.ceil(t));
}
await browser.close();
