#!/usr/bin/env node
// Checks every link in src/data/programs.json (program sites, sign-up forms, sources)
// and lists the ones that don't load. Run it as part of each weekly update:
//   npm run check-links
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync(new URL('../src/data/programs.json', import.meta.url)));
const links = new Map();
for (const p of data.programs) {
  for (const u of [p.website, p.tryout?.register, ...(p.sources ?? [])]) if (u) links.set(u, p.name);
}

async function check(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'User-Agent': 'Mozilla/5.0 (link check; bay-area-aau-tryouts)' } });
      if (res.ok || method === 'GET') return res.status;
    } catch (e) {
      if (method === 'GET') return e.name === 'TimeoutError' ? 'timeout' : e.message;
    }
  }
}

let bad = 0;
const results = await Promise.all([...links].map(async ([url, name]) => [url, name, await check(url)]));
for (const [url, name, status] of results) {
  const ok = typeof status === 'number' && status < 400;
  if (!ok) bad++;
  console.log(`${ok ? 'ok ' : 'BAD'} ${String(status).padEnd(8)} ${name} · ${url}`);
}
console.log(`\n${links.size - bad}/${links.size} links load${bad ? ` · ${bad} to look at (some sites block scripts; open those in a browser)` : ''}.`);
process.exitCode = bad ? 1 : 0;
