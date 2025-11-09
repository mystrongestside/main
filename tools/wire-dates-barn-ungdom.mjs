import fs from 'fs';

const htmlPath = 'treningstilbud/barn-ungdom.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// A) Sett inn placeholders etter tilbudsseksjonen eller etter <h1>
const hasNext = /id="next-session"/.test(html);
const injectBlock = `
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

if (!hasNext) {
  if (/class="price-offer"/.test(html)) {
    html = html.replace(/(<\/section>\s*)<!-- end price-offer -->?/i, `$1\n${injectBlock}\n`);
  } else {
    html = html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)/i, `$1\n${injectBlock}\n`);
  }
}

// B) Sørg for at “Neste økt …” også nevnes i CTA hvis du vil (valgfritt):
html = html.replace(
  /Det er få plasser tilgjengelig[^\n<]*/i,
  'Kun 2 ledige plasser – meld deg på nå. Prøvetime: 50 kr.'
);

// C) Legg til litt CSS hvis ikke finnes (valgfritt)
if (!/\.date-list/.test(html)) {
  html = html.replace(
    /<\/head>/i,
    `<style>.small{margin-top:.5rem;color:#24344d}.date-list{margin:.5rem 0 0 1rem}.date-list li{margin:.15rem 0}</style>\n</head>`
  );
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✔ Dato-plassholdere og skript satt opp i', htmlPath);
#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIR, '..');

const FILES = {
  detail: resolve(PROJECT_ROOT, 'treningstilbud/barn-ungdom.html'),
  overview: resolve(PROJECT_ROOT, 'treningstilbud.html'),
  index: resolve(PROJECT_ROOT, 'index.html'),
  updateDates: resolve(PROJECT_ROOT, 'updateDates.js'),
};

const MONTH_NAMES_LONG = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember',
];

const MONTH_NAMES_SHORT = [
  'JAN.',
  'FEB.',
  'MAR.',
  'APR.',
  'MAI',
  'JUN.',
  'JUL.',
  'AUG.',
  'SEP.',
  'OKT.',
  'NOV.',
  'DES.',
];

const WEEKDAY_NAMES = [
  'Søndag',
  'Mandag',
  'Tirsdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lørdag',
];

const pad = (value) => String(value).padStart(2, '0');

function parseDate(text) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const match = normalized.match(/(\d{1,2})\.\s*([a-zæøå]+)\s+(\d{4})/i);
  if (!match) {
    throw new Error(`Klarte ikke å tolke datoen "${text}"`);
  }

  const day = Number(match[1]);
  const monthName = match[2].toLowerCase();
  const year = Number(match[3]);
  const monthIndex = MONTH_NAMES_LONG.indexOf(monthName);

  if (monthIndex === -1) {
    throw new Error(`Ukjent månedsnavn i datoen "${text}"`);
  }

  const utcDate = new Date(Date.UTC(year, monthIndex, day));
  const weekday = WEEKDAY_NAMES[utcDate.getUTCDay()];

  return {
    iso: `${year}-${pad(monthIndex + 1)}-${pad(day)}`,
    year,
    monthIndex,
    day,
    weekday,
    monthLong: MONTH_NAMES_LONG[monthIndex],
    monthShort: MONTH_NAMES_SHORT[monthIndex],
  };
}

function buildDateListBlock(dates, ulIndent = '') {
  const itemIndent = `${ulIndent}  `;

  const items = dates
    .map((date) => `${itemIndent}<li>${date.weekday} ${date.day}. ${date.monthLong} ${date.year}</li>`)
    .join('\n');

  return `${ulIndent}<ul class="date-list">\n${items}\n${ulIndent}</ul>`;
}

function updateDetailPage(content, dates) {
  const match = content.match(/^[ \t]*<ul class="date-list">[\s\S]*?<\/ul>/m);
  if (!match) {
    throw new Error('Fant ikke dato-listen i barn-ungdom.html');
  }

  const indentMatch = match[0].match(/^([ \t]*)<ul/);
  const ulIndent = indentMatch ? indentMatch[1] : '';

  const newBlock = buildDateListBlock(dates, ulIndent);
  return content.replace(match[0], newBlock);
}

function formatAriaLabel(start, end) {
  return `Periode ${start.day}. ${start.monthLong} til ${end.day}. ${end.monthLong}`;
}

function updateIndexPage(content, start, end) {
  const articleMatch = content.match(/<article class="training-card[\s\S]*?data-gruppe="barn"[\s\S]*?<\/article>/);
  if (!articleMatch) {
    throw new Error('Fant ikke ungdomskortet i index.html');
  }

  let article = articleMatch[0];
  const ariaPattern = /(<div class="date-badge"[^>]*aria-label=")[^"]*(")/;
  article = article.replace(ariaPattern, `$1${formatAriaLabel(start, end)}$2`);

  const startText = `${start.monthShort.replace(/\./g, '')} ${start.day}.`;
  const endText = `TIL ${end.day}. ${end.monthShort}`;

  article = article.replace(/<span class="date-start">[^<]*<\/span>/, `<span class="date-start">${startText}<\/span>`);
  article = article.replace(/<span class="date-end">[^<]*<\/span>/, `<span class="date-end">${endText}<\/span>`);

  return content.replace(articleMatch[0], article);
}

function updateOverviewPage(content, start, end) {
  const articleMatch = content.match(/<article class="news-card"[\s\S]*?data-gruppe="barn"[\s\S]*?<\/article>/);
  if (!articleMatch) {
    throw new Error('Fant ikke ungdomskortet i treningstilbud.html');
  }

  let article = articleMatch[0];
  const ariaPattern = /(<div class="date-badge"[^>]*aria-label=")[^"]*(")/;
  article = article.replace(ariaPattern, `$1${formatAriaLabel(start, end)}$2`);

  article = article.replace(/<span class="date-month">[^<]*<\/span>/, `<span class="date-month">${start.monthShort}<\/span>`);
  article = article.replace(/<span class="date-day">[^<]*<\/span>/, `<span class="date-day">${start.day}.<\/span>`);
  article = article.replace(/<span class="date-range">[^<]*<\/span>/, `<span class="date-range">TIL ${end.day}. ${end.monthShort}<\/span>`);

  return content.replace(articleMatch[0], article);
}

function updateUpdateDates(content, dates) {
  const groupIndex = content.indexOf("gruppe: 'barn'");
  if (groupIndex === -1) {
    throw new Error("Fant ikke dato-array for 'barn' i updateDates.js");
  }

  const arrayStart = content.indexOf('[', groupIndex);
  if (arrayStart === -1) {
    throw new Error('Fant ikke start på dato-listen for barn');
  }

  let depth = 0;
  let arrayEnd = -1;
  for (let i = arrayStart; i < content.length; i += 1) {
    const char = content[i];
    if (char === '[') {
      depth += 1;
    } else if (char === ']') {
      depth -= 1;
      if (depth === 0) {
        arrayEnd = i;
        break;
      }
    }
  }

  if (arrayEnd === -1) {
    throw new Error('Fant ikke slutt på dato-listen for barn');
  }

  const before = content.slice(0, arrayStart + 1);
  const after = content.slice(arrayEnd);
  const isoLines = dates.map((date) => `      '${date.iso}',`).join('\n');
  const newContent = `${before}\n${isoLines}\n    ${after}`;

  return newContent;
}

async function readDatesFromDetailPage() {
  const detailHtml = await readFile(FILES.detail, 'utf8');
  const listMatch = detailHtml.match(/<ul class="date-list">([\s\S]*?)<\/ul>/);
  if (!listMatch) {
    throw new Error('Fant ikke dato-listen i barn-ungdom.html');
  }

  const items = [...listMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) => match[1].trim()).filter(Boolean);
  if (items.length === 0) {
    throw new Error('Dato-listen i barn-ungdom.html er tom');
  }

  const uniqueDates = new Map();
  for (const item of items) {
    const parsed = parseDate(item);
    uniqueDates.set(parsed.iso, parsed);
  }

  const dates = [...uniqueDates.values()].sort((a, b) => a.iso.localeCompare(b.iso));
  return { dates, detailHtml };
}

async function writeIfChanged(filePath, original, nextContent) {
  if (original === nextContent) {
    console.log(`Ingen endringer for ${filePath.replace(PROJECT_ROOT + '/', '')}`);
    return;
  }

  await writeFile(filePath, nextContent);
  console.log(`Oppdaterte ${filePath.replace(PROJECT_ROOT + '/', '')}`);
}

async function main() {
  try {
    const { dates, detailHtml } = await readDatesFromDetailPage();
    const start = dates[0];
    const end = dates[dates.length - 1];

    const updatedDetail = updateDetailPage(detailHtml, dates);
    await writeIfChanged(FILES.detail, detailHtml, updatedDetail);

    const indexHtml = await readFile(FILES.index, 'utf8');
    const updatedIndex = updateIndexPage(indexHtml, start, end);
    await writeIfChanged(FILES.index, indexHtml, updatedIndex);

    const overviewHtml = await readFile(FILES.overview, 'utf8');
    const updatedOverview = updateOverviewPage(overviewHtml, start, end);
    await writeIfChanged(FILES.overview, overviewHtml, updatedOverview);

    const updateDatesJs = await readFile(FILES.updateDates, 'utf8');
    const updatedUpdateDates = updateUpdateDates(updateDatesJs, dates);
    await writeIfChanged(FILES.updateDates, updateDatesJs, updatedUpdateDates);

    console.log('Ferdig!');
  } catch (error) {
    console.error('Feil ved oppdatering av datoer:', error.message);
    process.exitCode = 1;
  }
}

await main();
