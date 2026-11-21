// Meme-line overlay (the @veganer.wandel style: black text on a white rounded box), a transparent 1080x1920 PNG.
// Usage: node meme.mjs out.png "text<br>line 2" centerY [fontPx=58]
// The POV line: one line at 46 px, centerY 290 (the top band, y about 245-335). The send line: 2 lines at 46 px,
// centerY 275. Never the middle of the frame (owner, 2026-11-21). Runs in the Higgsfield sandbox (Playwright there).
import { chromium } from "/usr/local/lib/node_modules/playwright/index.mjs";
const [out, text, cy, fs = "58"] = process.argv.slice(2);
const FS = "file:///home/user/ov/node_modules/@fontsource/instrument-sans/files";
const html = `<html><head><style>
@font-face{font-family:IS;font-weight:600;src:url(${FS}/instrument-sans-latin-600-normal.woff2)}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.w{position:absolute;left:0;right:0;top:${cy}px;transform:translateY(-50%);display:flex;justify-content:center}
.b{max-width:880px;background:#fff;color:#000;font:600 ${fs}px/1.22 IS,sans-serif;padding:16px 30px 18px;border-radius:18px;text-align:center;letter-spacing:-0.3px}
</style></head><body><div class="w"><div class="b">${text}</div></div></body></html>`;
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(html); await p.evaluate(() => document.fonts.ready);
await p.screenshot({path: out, omitBackground: true}); await b.close();
