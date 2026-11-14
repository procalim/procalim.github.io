// Renders new-recipes.html to the PDF and a PNG preview of every page: node render.mjs
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const html = 'file://' + path.join(here, 'new-recipes.html');
const out = path.join(here, 'the-edible-codex-new-recipes.pdf');
const browser = await chromium.launch(fs.existsSync('/opt/pw-browsers/chromium') ? { executablePath: '/opt/pw-browsers/chromium' } : {});
const page = await browser.newPage();
await page.goto(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
const clash = await page.evaluate(() => [...document.querySelectorAll('section.page')].map((pg, i) => {
  const note = pg.querySelector('.note'); if (!note) return null;
  const top = note.getBoundingClientRect().top;
  const low = Math.max(...[...pg.querySelectorAll('.col')].map(c => c.lastElementChild.getBoundingClientRect().bottom));
  return low > top - 4 ? `page ${i + 1}: text ends ${Math.round(low - top + 4)} px into the note` : null;
}).filter(Boolean));
console.log(clash.length ? 'OVERLAP ' + clash.join('; ') : 'no overlaps');
if (process.argv.includes('--preview')) {
  const dir = path.join(here, 'preview');
  fs.mkdirSync(dir, { recursive: true });
  await page.setViewportSize({ width: 794, height: 1123 });
  const n = await page.locator('section.page').count();
  for (let i = 0; i < n; i++) {
    await page.locator('section.page').nth(i).screenshot({ path: path.join(dir, `p${String(i + 1).padStart(2, '0')}.png`) });
  }
}
await browser.close();
console.log('wrote', out, (fs.statSync(out).size / 1e6).toFixed(2), 'MB');
