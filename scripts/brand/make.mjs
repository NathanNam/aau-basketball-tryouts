#!/usr/bin/env node
// Favicon set + 1200×630 share image.
//
//   npm i --no-save puppeteer-core@23.11.1
//   npm run build && npx astro preview --port 4321 &
//   node scripts/brand/make.mjs [http://localhost:4321/]
//
// Needs Google Chrome at CHROME_PATH (default: the macOS app path).
// Outputs (committed): public/icon.svg, public/favicon.ico, public/favicon-32.png,
// public/apple-touch-icon.png, public/og.png

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const pub = path.join(root, 'public');
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = process.argv[2] || 'http://localhost:4321/';

// An inked basketball with red motion lines, on paper.
const ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#f6f1e6"/>
  <rect x="2.5" y="2.5" width="59" height="59" rx="8" fill="none" stroke="#111" stroke-width="5"/>
  <path d="M8 22 h10 M6 32 h10 M8 42 h10" stroke="#d7192a" stroke-width="4.5" stroke-linecap="round"/>
  <circle cx="38" cy="32" r="18" fill="#111"/>
  <path d="M20 32 H56 M38 14 V50 M26 19 Q38 32 26 45 M50 19 Q38 32 50 45" stroke="#f6f1e6" stroke-width="3" fill="none"/>
</svg>`;

function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, buf }, i) => {
    const o = 6 + 16 * i;
    header.writeUInt8(size, o); header.writeUInt8(size, o + 1);
    header.writeUInt16LE(1, o + 4); header.writeUInt16LE(32, o + 6);
    header.writeUInt32LE(buf.length, o + 8); header.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.buf)]);
}

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
try {
  fs.writeFileSync(path.join(pub, 'icon.svg'), ICON);
  const page = await browser.newPage();
  const png = async (size) => {
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    await page.setContent(`<style>*{margin:0}body{background:#f6f1e6}svg{display:block;width:${size}px;height:${size}px}</style>${ICON}`);
    return page.screenshot({ omitBackground: size !== 180 });
  };
  const [p16, p32, p48, p180] = [await png(16), await png(32), await png(48), await png(180)];
  fs.writeFileSync(path.join(pub, 'favicon-32.png'), p32);
  fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), p180);
  fs.writeFileSync(path.join(pub, 'favicon.ico'), ico([{ size: 16, buf: p16 }, { size: 32, buf: p32 }, { size: 48, buf: p48 }]));
  console.log('wrote public/icon.svg, favicon-32.png, apple-touch-icon.png, favicon.ico');

  // Share image: the splash panel and the season note, framed at 1200×630.
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: 'body{zoom:1.0909}.splash{margin-top:24px;min-height:400px}.narr{margin-top:-40px}.score,.filters,.meta,.sec,.empty,footer{display:none}' });
  await page.screenshot({ path: path.join(pub, 'og.png') });
  console.log('wrote public/og.png');
} finally {
  await browser.close();
}
