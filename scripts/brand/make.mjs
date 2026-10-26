#!/usr/bin/env node
// Favicon set + 1200×630 share image.
//
//   npm i --no-save puppeteer-core@23.11.1
//   node scripts/brand/make.mjs
//
// The share image is a poster built from src/data/programs.json and the site's fonts.
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
const data = JSON.parse(fs.readFileSync(path.join(root, 'src/data/programs.json'), 'utf8'));
const font = (pkg, file) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(root, 'node_modules/@fontsource', pkg, 'files', file)).toString('base64')})`;

// An inked basketball with red motion lines, on paper.
const ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#f6f1e6"/>
  <rect x="2.5" y="2.5" width="59" height="59" rx="8" fill="none" stroke="#111" stroke-width="5"/>
  <path d="M8 22 h10 M6 32 h10 M8 42 h10" stroke="#d7192a" stroke-width="4.5" stroke-linecap="round"/>
  <circle cx="38" cy="32" r="18" fill="#111"/>
  <path d="M20 32 H56 M38 14 V50 M26 19 Q38 32 26 45 M50 19 Q38 32 50 45" stroke="#f6f1e6" stroke-width="3" fill="none"/>
</svg>`;

function poster() {
  // A dated card only if the date is at least two weeks out, so a shared link
  // doesn't advertise a tryout that has already happened.
  const soonest = new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10);
  const upcoming = data.programs.filter((p) => p.status === 'set' && p.tryout?.date >= soonest);
  const pick = [...upcoming, ...data.programs.filter((p) => p.status === 'soon'), ...data.programs.filter((p) => p.status === 'tba')].slice(0, 3);
  const day = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const stamp = { set: 'GO!', soon: 'SOON', tba: 'TBA' };
  const card = (p, i) => {
    const t = p.tryout || {};
    const when = t.date ? day(t.date) : t.when ? t.when.replace(/ \(.*\)/, '') : 'Date TBA';
    const tags = [p.area, ...(p.genders || []), (p.ages || []).length ? `${p.ages[0]}–${p.ages.at(-1)}` : ''].filter(Boolean);
    return `<div class="pn c${i}"><div class="stamp ${p.status}">${stamp[p.status]}</div><h3>${p.name}</h3>
      <div class="tags">${tags.map((x) => `<span>${x}</span>`).join('')}</div>
      <div class="when"><b>${when}</b>${t.venue ? `<small>${t.venue}</small>` : ''}</div></div>`;
  };
  return `<!doctype html><style>
  @font-face{font-family:"Dela Gothic One";src:${font('dela-gothic-one', 'dela-gothic-one-latin-400-normal.woff2')}}
  @font-face{font-family:Bangers;src:${font('bangers', 'bangers-latin-400-normal.woff2')}}
  @font-face{font-family:Z;font-weight:500;src:${font('zen-kaku-gothic-new', 'zen-kaku-gothic-new-latin-500-normal.woff2')}}
  @font-face{font-family:Z;font-weight:700;src:${font('zen-kaku-gothic-new', 'zen-kaku-gothic-new-latin-700-normal.woff2')}}
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;position:relative;color:#111;font:500 16px/1.4 Z,sans-serif;background:#f6f1e6;background-image:radial-gradient(#0000000f 1px,transparent 1.2px);background-size:6px 6px}
  .frame{position:absolute;inset:22px;border:5px solid #111;background:#fff;overflow:hidden}
  .frame:before{content:"";position:absolute;inset:-60%;background:repeating-conic-gradient(from 0deg at 74% 50%,#0000 0 2.2deg,#111 2.2deg 2.8deg);opacity:.13}
  .frame:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#fff 0 40%,#fff0 56%),radial-gradient(circle at 74% 50%,#fff 0 10%,#fff0 40%)}
  .left{position:absolute;z-index:2;left:64px;top:62px;width:560px}
  .kicker{display:inline-block;background:#111;color:#fff;font:400 17px "Dela Gothic One";padding:5px 12px;transform:skew(-8deg)}
  h1{font:400 76px/.98 "Dela Gothic One";margin:20px 0 22px;text-shadow:4px 4px 0 #fff,7px 7px 0 #d7192a}
  .tl{font:700 26px/1.3 Z,sans-serif}
  .sub{margin-top:12px;color:#555;font-size:18px;line-height:1.5}
  .url{position:absolute;z-index:2;left:64px;bottom:58px;font:700 22px Z,sans-serif;border:3px solid #111;background:#fff;padding:7px 16px;box-shadow:5px 5px 0 #111}
  .sfx{position:absolute;z-index:3;right:54px;top:40px;font:400 76px Bangers;color:#d7192a;-webkit-text-stroke:3px #111;letter-spacing:.04em;transform:rotate(-10deg)}
  .pn{position:absolute;z-index:2;width:420px;background:#fff;border:4px solid #111;padding:14px 16px 0;box-shadow:6px 6px 0 #111}
  .pn h3{font:400 22px/1.15 "Dela Gothic One";margin-right:70px}
  .c0{right:84px;top:116px;transform:rotate(1.5deg)}
  .c1{right:136px;top:262px;transform:rotate(-1.5deg);background-image:radial-gradient(#0002 1px,transparent 1.3px);background-size:5px 5px}
  .c2{right:66px;top:408px;transform:rotate(1deg)}
  .tags{display:flex;gap:5px;margin:8px 0 10px}.tags span{font:700 12px Z,sans-serif;border:2px solid #111;padding:0 7px;background:#fff}
  .when{background:#111;color:#fff;margin:0 -16px;padding:7px 16px}
  .when b{display:block;font:400 22px/1.1 Bangers;letter-spacing:.04em;color:#ffd84a}
  .when small{display:block;font-size:12px;color:#ddd}
  .stamp{position:absolute;top:8px;right:10px;width:58px;height:58px;border:3px solid #d7192a;border-radius:50%;color:#d7192a;display:grid;place-items:center;font:400 16px/1 Bangers;letter-spacing:.04em;transform:rotate(12deg);background:#fff}
  .stamp.soon{color:#111;border-color:#111}.stamp.tba{color:#77726a;border-color:#77726a}
  </style>
  <div class="frame"></div>
  <div class="left">
    <div class="kicker">${data.season} season · High school 14U–17U</div>
    <h1>BAY AREA<br>AAU TRYOUTS</h1>
    <p class="tl">Club basketball tryouts around the Bay,<br>in one place.</p>
    <p class="sub">${data.programs.length} programs, checked by hand · dates only when<br>the program posts them · updated weekly in season</p>
  </div>
  <div class="url">aau-basketball-tryouts.vercel.app</div>
  <div class="sfx">SWISH!</div>
  ${pick.map(card).join('')}`;
}

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

  // Share image: a poster like the other projects' (title, tagline, URL on the
  // left) beside three tryout panels from the data, with the site's stamps.
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(poster(), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(pub, 'og.png') });
  console.log('wrote public/og.png');
} finally {
  await browser.close();
}
