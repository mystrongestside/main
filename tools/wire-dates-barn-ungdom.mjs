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
