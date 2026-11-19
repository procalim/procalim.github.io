// Story intro (selfie, his voice): the overlay layer, rendered frame by frame to transparent PNGs.
// Typed subtitles (El Messiri / Playfair, the reels' typed-card look, no clicks over the voice), photo cards that pop
// in over the selfie (the book cover, the three episodes with their protein, the free PDF) and the reply bubble.
// Usage (Higgsfield sandbox, /home/user/intro): node intro_overlay.mjs cues.json ovl
import { chromium } from "/usr/local/lib/node_modules/playwright/index.mjs";
import fs from "fs";
import path from "path";

const [specPath, outDir = "ovl"] = process.argv.slice(2);
const S = JSON.parse(fs.readFileSync(specPath, "utf8"));
const FS = "file:///home/user/ov/node_modules/@fontsource";
const here = path.resolve(path.dirname(specPath));
fs.mkdirSync(outDir, { recursive: true });

const css = `
@font-face{font-family:Mes;font-weight:700;src:url(${FS}/el-messiri/files/el-messiri-arabic-700-normal.woff2)}
@font-face{font-family:MesL;font-weight:700;src:url(${FS}/el-messiri/files/el-messiri-latin-700-normal.woff2)}
@font-face{font-family:PF;font-weight:600;src:url(${FS}/playfair-display/files/playfair-display-latin-600-normal.woff2)}
@font-face{font-family:PF;font-weight:600;font-style:italic;src:url(${FS}/playfair-display/files/playfair-display-latin-600-italic.woff2)}
html,body{margin:0;width:1080px;height:1920px;background:transparent;overflow:hidden}
.sub{position:absolute;left:60px;right:60px;top:${S.subY}px;display:flex;flex-direction:column;align-items:center;gap:6px}
.scrim{position:absolute;left:50%;top:50%;width:1000px;height:340px;transform:translate(-50%,-50%);z-index:-1;
  background:radial-gradient(closest-side,rgba(0,0,0,.55),rgba(0,0,0,.25) 60%,rgba(0,0,0,0))}
.ar,.en,.big{color:#fff;text-align:center;text-shadow:0 2px 3px rgba(0,0,0,.45),0 3px 16px rgba(0,0,0,.55),0 0 2px rgba(0,0,0,.5)}
.ar{font:700 64px/1.22 Mes,MesL,serif;direction:rtl;max-width:960px}
.ar.title{font-size:92px;line-height:1.15}
.big{font:600 74px/1.15 PF,serif;letter-spacing:.06em;text-transform:uppercase}
.en{font:600 italic 36px/1.25 PF,serif;direction:ltr;opacity:.95}
.gold{color:#E3B547;-webkit-text-stroke:3px rgba(20,12,0,.7);paint-order:stroke fill}
.card{position:absolute;border-radius:26px;overflow:hidden;border:3px solid rgba(227,181,71,.92);
  box-shadow:0 34px 70px rgba(0,0,0,.65),0 6px 18px rgba(0,0,0,.5);background:#0a0a0a;opacity:0}
.card img{position:absolute;display:block}
.pill{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);white-space:nowrap;padding:6px 22px 10px;
  border-radius:999px;background:#E3B547;color:#111;font:700 40px/1.2 Mes,MesL,serif;direction:rtl}
.badge{position:absolute;top:18px;left:18px;padding:6px 20px 10px;border-radius:999px;background:#E3B547;color:#111;
  font:700 38px/1.2 Mes,MesL,serif;direction:rtl}
.bubble{position:absolute;left:50%;top:${S.bubbleY}px;transform:translateX(-50%);opacity:0;padding:14px 46px 20px;
  border-radius:999px;background:rgba(255,255,255,.96);color:#111;font:700 58px/1.2 Mes,MesL,serif;direction:rtl;
  box-shadow:0 16px 40px rgba(0,0,0,.45)}
.arrow{position:absolute;left:50%;top:${S.bubbleY + 120}px;width:40px;height:40px;margin-left:-20px;opacity:0;
  border-right:9px solid #fff;border-bottom:9px solid #fff;transform:rotate(45deg);filter:drop-shadow(0 3px 6px rgba(0,0,0,.6))}`;

const cardsHtml = S.cards.map((c, i) => {
  const img = `<img src="${path.join(here, c.src)}" style="left:${c.img.left}px;top:${c.img.top}px;width:${c.img.w}px;height:${c.img.h}px">`;
  const pill = c.pill ? `<div class="pill">${c.pill}</div>` : "";
  const badge = c.badge ? `<div class="badge">${c.badge}</div>` : "";
  return `<div class="card" id="c${i}" style="left:${c.x - c.w / 2}px;top:${c.y - c.h / 2}px;width:${c.w}px;height:${c.h}px">${img}${pill}${badge}</div>`;
}).join("");
const html = `<html><head><meta charset="utf-8"><style>${css}</style></head><body>
${cardsHtml}
<div class="sub"><div class="scrim"></div><div id="l1"></div><div id="l2"></div></div>
<div class="bubble" id="bub"></div><div class="arrow" id="arr"></div></body></html>`;
const tmp = path.join(here, "_ovl.html");
fs.writeFileSync(tmp, html);

const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto("file://" + tmp);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);

for (let f = 0; f < S.frames; f++) {
  const t = f / S.fps;
  await page.evaluate(({ t, S }) => {
    const seg = new Intl.Segmenter("ar", { granularity: "grapheme" });
    const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
    const back = (x) => { x = Math.min(1, Math.max(0, x)); const c = 1.6; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
    // subtitles: the cue on screen, typed at cps from its start, out over the last 0.12 s
    const cue = S.cues.find((c) => t >= c.s && t < c.e);
    const l1 = document.getElementById("l1"), l2 = document.getElementById("l2");
    const sc = document.querySelector(".scrim");
    if (!cue) { l1.innerHTML = ""; l2.innerHTML = ""; sc.style.opacity = 0; }
    else {
      const parts = cue.ar;   // [[text, gold?], ...]
      const total = parts.reduce((n, p) => n + [...seg.segment(p[0])].length, 0);
      let k = Math.floor((t - cue.s) * S.cps);
      const out = 1 - Math.min(1, Math.max(0, (t - (cue.e - 0.12)) / 0.12));
      let h = "";
      for (const [txt, gold] of parts) {
        const g = [...seg.segment(txt)].map((x) => x.segment);
        const n = Math.max(0, Math.min(g.length, k)); k -= g.length;
        const v = g.slice(0, n).join("").replace(/\n/g, "<br>");
        h += gold ? `<span class="gold">${v}</span>` : v;
      }
      l1.className = cue.kind || "ar"; l1.innerHTML = h; l1.style.opacity = out;
      const typedAll = (t - cue.s) * S.cps >= total;
      const en = cue.en || "";
      const ke = typedAll ? Math.floor((t - cue.s - total / S.cps) * S.cps * 1.4) : 0;
      l2.className = "en"; l2.textContent = en.slice(0, Math.max(0, ke)); l2.style.opacity = out;
      sc.style.opacity = Math.min(1, (t - cue.s) / 0.2) * out;
    }
    // photo cards: pop in (scale back-ease, fade), hold, fade out
    S.cards.forEach((c, i) => {
      const el = document.getElementById("c" + i);
      const a = (t - c.s) / 0.28, b = (c.e - t) / 0.2;
      if (t < c.s || t > c.e) { el.style.opacity = 0; return; }
      const sIn = 0.82 + 0.18 * back(a);
      el.style.opacity = Math.min(1, ease(a) * 1.2, Math.max(0, b));
      el.style.transform = `rotate(${c.rot}deg) scale(${sIn * (1 + 0.025 * Math.min(1, (t - c.s) / (c.e - c.s)))})`;
    });
    // the reply bubble: types the keyword, the arrow bounces toward the reply bar
    const bub = document.getElementById("bub"), arr = document.getElementById("arr");
    const B = S.bubble;
    if (t >= B.s && t < B.e) {
      const g = [...seg.segment(B.text)].map((x) => x.segment);
      const n = Math.min(g.length, Math.floor((t - B.s - 0.25) * 12) + 1);
      bub.textContent = n > 0 ? g.slice(0, n).join("") : "‏";
      const o = Math.min(1, ease((t - B.s) / 0.25), (B.e - t) / 0.2);
      bub.style.opacity = o; bub.style.transform = `translateX(-50%) scale(${0.85 + 0.15 * back((t - B.s) / 0.3)})`;
      arr.style.opacity = o; arr.style.marginTop = `${10 * Math.abs(Math.sin((t - B.s) * Math.PI * 2.2))}px`;
    } else { bub.style.opacity = 0; arr.style.opacity = 0; }
  }, { t, S });
  await page.screenshot({ path: path.join(outDir, `f${String(f).padStart(3, "0")}.png`), omitBackground: true });
}
await browser.close();
fs.unlinkSync(tmp);
console.log("overlay", S.frames, "frames");
