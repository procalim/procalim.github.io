// Render each <section> of slides.html to a 1080x1350 PNG, plus a phone-width contact sheet.
const { chromium } = require('playwright');
const path = require('path');
const dir = __dirname;
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.goto('file://' + path.join(dir, 'slides.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['s1','s2','s3','s4','s5','s6','s7','s8','s9'];
  for (const id of ids) {
    await page.locator('#' + id).screenshot({ path: path.join(dir, 'out', id + '.png') });
  }
  const fonts = await page.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight + ' ' + f.style));
  console.log('loaded fonts:', fonts.join(' | '));
  await browser.close();
})();
