// Animated on-video cards (owner, 2026-11-16: «ليش ما تعمل الكلام effects animation باحترافية وغير الستايل الأبيض مش حلو»).
// Sticker style in the brand's gold and black: each line pops in with an overshoot, staggered, a shine sweeps the gold
// line once, a quick fade at the end. Renders one transparent 1080x1920 PNG per frame for each card.
// Usage (Higgsfield sandbox, next to /home/user/ov/node_modules): node anim.mjs spec.json outDir
// spec: {fps, cards: [{key, frames, y, title?, lines: [{t, kind: "gold" | "black"}], en}]}
import { chromium } from "/usr/local/lib/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const [specPath, outDir = "anim"] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const FS = "file:///home/user/ov/node_modules/@fontsource";
const css = `
@font-face{font-family:Taj;font-weight:900;src:url(${FS}/tajawal/files/tajawal-arabic-900-normal.woff2)}
@font-face{font-family:Taj;font-weight:800;src:url(${FS}/tajawal/files/tajawal-arabic-800-normal.woff2)}
@font-face{font-family:IS;font-weight:700;src:url(${FS}/instrument-sans/files/instrument-sans-latin-700-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.wrap{position:absolute;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:12px}
.el{display:inline-block;will-change:transform,opacity;white-space:nowrap}
.box{position:relative;overflow:hidden;font:900 66px/1.12 Taj,'Noto Color Emoji',sans-serif;direction:rtl;
  padding:6px 30px 16px;border-radius:18px;box-shadow:0 12px 30px rgba(0,0,0,.5)}
.gold{background:linear-gradient(180deg,#F8D978 0%,#E8B442 55%,#D99A26 100%);color:#141414}
.black{background:rgba(12,12,12,.93);color:#F2C14E;border:3px solid rgba(242,193,78,.6)}
.title{font:800 34px/1.2 Taj,sans-serif;direction:rtl;color:#F2C14E;background:rgba(12,12,12,.78);
  padding:5px 20px 9px;border-radius:999px;letter-spacing:.5px}
.en{font:700 28px/1.2 IS,'Noto Color Emoji',sans-serif;color:#fff;background:rgba(12,12,12,.62);
  padding:6px 16px 8px;border-radius:10px;letter-spacing:.4px;white-space:normal;max-width:520px;text-align:center}
.shine{position:absolute;top:-20%;bottom:-20%;width:34%;left:-50%;transform:skewX(-20deg);
  background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.75),rgba(255,255,255,0))}`;

const clamp = (x) => Math.max(0, Math.min(1, x));
const backOut = (p) => { const c = 1.9; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
const easeOut = (p) => 1 - Math.pow(1 - p, 3);
const ENTER = 7, STAGGER = 3, EXIT = 4, SHINE0 = 10, SHINE = 9;

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
for (const c of spec.cards) {
  const dir = path.join(outDir, c.key);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const els = [];
  if (c.title) els.push(`<div class="el title">${c.title}</div>`);
  c.lines.forEach((l, i) => els.push(`<div class="el box ${l.kind}" style="--rot:${l.kind === "gold" ? -2 : 1.6}deg">${l.t}${l.kind === "gold" ? '<span class="shine"></span>' : ""}</div>`));
  if (c.en) els.push(`<div class="el en">${c.en}</div>`);
  const html = `<html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="wrap" style="top:${c.y}px">${els.join("")}</div></body></html>`;
  const tmp = path.join(outDir, `_${c.key}.html`);
  fs.writeFileSync(tmp, html);
  await page.goto("file://" + path.resolve(tmp));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.evaluate(() => document.querySelectorAll(".box").forEach((b) => {   // keep every line inside x 240-840
    const w = b.getBoundingClientRect().width; if (w > 600) b.style.fontSize = `${(66 * 600) / w}px`; }));
  const n = c.frames, n0 = Math.min(n - EXIT, ENTER + STAGGER * (els.length - 1) + SHINE0 + SHINE);
  const state = async (f) => {
    await page.evaluate(({ f, n, ENTER, STAGGER, EXIT, SHINE0, SHINE }) => {
      const clamp = (x) => Math.max(0, Math.min(1, x));
      const backOut = (p) => { const c = 1.9; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
      const easeOut = (p) => 1 - Math.pow(1 - p, 3);
      const q = clamp((f - (n - EXIT)) / EXIT);   // exit progress
      document.querySelectorAll(".el").forEach((e, k) => {
        const p = clamp((f - k * STAGGER) / ENTER);
        const s = (0.4 + 0.6 * backOut(p)) * (1 - 0.1 * q);
        const o = clamp(p * 2.5) * (1 - q);
        const y = (1 - easeOut(p)) * 34;
        const rot = getComputedStyle(e).getPropertyValue("--rot") || "0deg";
        e.style.transform = `translateY(${y}px) rotate(${rot}) scale(${s})`;
        e.style.opacity = o;
      });
      const sp = clamp((f - SHINE0) / SHINE);
      document.querySelectorAll(".shine").forEach((sh) => { sh.style.left = `${-50 + 190 * sp}%`; sh.style.opacity = sp > 0 && sp < 1 ? 1 : 0; });
    }, { f, n, ENTER, STAGGER, EXIT, SHINE0, SHINE });
  };
  let hold = null;
  for (let f = 0; f < n; f++) {
    const file = path.join(dir, `f${String(f).padStart(3, "0")}.png`);
    if (f > n0 && f < n - EXIT && hold) { fs.copyFileSync(hold, file); continue; }
    await state(f);
    await page.screenshot({ path: file, omitBackground: true });
    if (f === n0) hold = file;
  }
  fs.unlinkSync(tmp);
  console.log(c.key, n, "frames");
}
await browser.close();
