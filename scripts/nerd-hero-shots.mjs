// Screenshots nerd-hero at frozen timeline points (desktop and phone sizes),
// then plays it in real time: autoplay, click to reverse, drag to scrub.
// Prints the page titles it saw and any console errors.
//
// usage: node scripts/nerd-hero-shots.mjs <outDir> [url]
//   TIMES=0,0.62,1.0  frozen points (seconds; impact is at 0.72)
//   PUPPETEER_FROM    a package.json whose node_modules has puppeteer-core
//                     (default: knotmaze's)
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(process.env.PUPPETEER_FROM ||
  'C:/Users/lsl/Repositories/knotmaze/package.json');
const puppeteer = require('puppeteer-core');

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = process.argv[2];
if (!outDir) throw new Error('usage: node scripts/nerd-hero-shots.mjs <outDir> [url]');
fs.mkdirSync(outDir, { recursive: true });
const base = process.argv[3] || pathToFileURL(path.join(here, '../nerd-hero/index.html')).href;
const times = (process.env.TIMES || '0,0.2,0.45,0.62,0.74,0.85,1.0,1.6,2.3').split(',');
const sizes = [{ n: 'd', w: 1280, h: 800, s: 1 }, { n: 'm', w: 412, h: 860, s: 2 }];

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});
const errors = [];
const page = await browser.newPage();
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`console.${m.type()}: ${m.text()}`); });
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));

const settle = () => page.evaluate(async () => {
  await document.fonts.ready;
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

for (const sz of sizes) {
  await page.setViewport({ width: sz.w, height: sz.h, deviceScaleFactor: sz.s });
  for (const t of times) {
    await page.goto(`${base}?t=${t}`, { waitUntil: 'networkidle0' });
    await settle();
    await page.screenshot({ path: `${outDir}/t${t}_${sz.n}.png` });
  }
}

// Real time: autoplay starts 1.5 s after load, and the timeline plays at
// a third of real time (SPEED), so impact lands at 1.5 + 3 * 0.72 s.
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
await page.goto(base, { waitUntil: 'networkidle0' });
await settle();
const t0 = Date.now();
for (const ms of [1000, 2600, 3300, 3900, 5500, 9000]) {
  await sleep(Math.max(0, ms - (Date.now() - t0)));
  await page.screenshot({ path: `${outDir}/rt${ms}.png` });
}
const titleAfterPlay = await page.title();
await page.mouse.click(640, 400);
await sleep(5000);
await page.screenshot({ path: `${outDir}/rt_back.png` });
const titleAfterReverse = await page.title();
await page.mouse.move(300, 400);
await page.mouse.down();
await page.mouse.move(500, 400, { steps: 8 });
await page.screenshot({ path: `${outDir}/rt_scrub.png` });
await page.mouse.up();

console.log(JSON.stringify({ titleAfterPlay, titleAfterReverse, errors }, null, 2));
await browser.close();
