#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const HTML_PATH = resolve(SCRIPT_DIR, '../treningstilbud/barn-ungdom.html');

let html = readFileSync(HTML_PATH, 'utf8');

const hasNextParagraph = /id="next-session"/.test(html);
const injectionBlock = `
<p id="next-session" class="small" hidden>Neste økt: …</p>
<ul id="remaining-dates" class="date-list"></ul>
<script id="sessions-barn-ungdom" type="application/json">
[
  "2025-09-18T16:30:00+02:00",
  "2025-10-02T16:30:00+02:00",
  "2025-10-16T16:30:00+02:00",
  "2025-10-30T16:30:00+01:00",
  "2025-11-13T16:30:00+01:00",
  "2025-11-27T16:30:00+01:00",
  "2025-12-11T16:30:00+01:00",
  "2026-01-08T16:30:00+01:00"
]
</script>
<script src="../assets/js/updateDates.js?v=1"></script>`;

if (!hasNextParagraph) {
  if (/class="price-offer"/.test(html)) {
    html = html.replace(/(<\/section>\s*)<!-- end price-offer -->?/i, `$1\n${injectionBlock}\n`);
  } else {
    html = html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)/i, `$1\n${injectionBlock}\n`);
  }
}

html = html.replace(
  /Det er få plasser tilgjengelig[^\n<]*/i,
  'Kun 2 ledige plasser – meld deg på nå. Prøvetime: 50 kr.'
);

if (!/\.date-list/.test(html)) {
  html = html.replace(
    /<\/head>/i,
    `<style>.small{margin-top:.5rem;color:#24344d}.date-list{margin:.5rem 0 0 1rem}.date-list li{margin:.15rem 0}</style>\n</head>`
  );
}

writeFileSync(HTML_PATH, html, 'utf8');
console.log('✔ Dato-plassholdere og skript satt opp i treningstilbud/barn-ungdom.html');
