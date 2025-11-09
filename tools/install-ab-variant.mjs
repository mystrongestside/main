import fs from 'fs';
import path from 'path';

const HTML = 'treningstilbud/barn-ungdom.html';
const CSS  = 'assets/css/sales.css';
const JS   = 'assets/js/ab-variant.js';

// 1) Append variant-B CSS til sales.css
fs.mkdirSync(path.dirname(CSS), { recursive: true });
let css = fs.existsSync(CSS) ? fs.readFileSync(CSS,'utf8') : '';
if (!/\.offer-sell\[data-variant="B"]/.test(css)) {
  css += `
/* === A/B: Variant B (større pris, førpris på samme linje) === */
.offer-sell[data-variant="B"] .price-card{
  display:flex; flex-wrap:wrap; align-items:baseline; gap:.35rem .6rem; padding-top:1.1rem;
}
.offer-sell[data-variant="B"] .price-card .ribbon{ top:-10px; left:-10px; }
.offer-sell[data-variant="B"] .price-card > .now{ order:1; font-size:2.05rem; font-weight:900; line-height:1; }
.offer-sell[data-variant="B"] .price-card > div:first-of-type{ order:2; }
.offer-sell[data-variant="B"] .price-card > div:first-of-type .before{
  display:inline-block; opacity:.7; text-decoration:line-through; margin-left:.35rem;
}
.offer-sell[data-variant="B"] .price-card > div:first-of-type .before::before{ content:"Før "; }
.offer-sell[data-variant="B"] .price-card > .save{ order:3; flex-basis:100%; margin-top:.1rem; font-weight:700; color:var(--blue); }

/* Generelle lesbarhetsforbedringer */
.offer-sell{ color:var(--blue); }
.bullets li{ color:var(--blue); line-height:1.45; font-weight:600; }
.bullets li::before{ margin-right:.35rem; }

/* Luft for sticky CTA på mobil */
@media (max-width:900px){
  body{ padding-bottom: calc(72px + env(safe-area-inset-bottom)); }
}
`;
  fs.writeFileSync(CSS, css, 'utf8');
}

// 2) ab-variant.js (randomiserer og husker)
fs.mkdirSync(path.dirname(JS), { recursive: true });
const js = `
// assets/js/ab-variant.js
(() => {
  const KEY = 'offerVariant';
  const url = new URL(window.location.href);
  let v = url.searchParams.get('v');
  if (v !== 'A' && v !== 'B') v = localStorage.getItem(KEY);
  if (v !== 'A' && v !== 'B') v = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(KEY, v);

  const box = document.querySelector('.offer-sell');
  if (box) box.setAttribute('data-variant', v);

  // (Valgfritt) vis hvilken variant i devtools
  // console.info('Offer variant:', v);
})();
`;
fs.writeFileSync(JS, js, 'utf8');

// 3) Koble inn CSS + JS i HTML
let html = fs.readFileSync(HTML,'utf8');
if (!/assets\/css\/sales\.css/.test(html)) {
  html = html.replace(/<\/head>/i, `  <link rel="stylesheet" href="../assets/css/sales.css?v=3">\n</head>`);
} else {
  html = html.replace(/sales\.css\?v=\d+/i, 'sales.css?v=3');
}
if (!/ab-variant\.js/.test(html)) {
  html = html.replace(/<\/body>/i, `  <script src="../assets/js/ab-variant.js?v=1" defer></script>\n</body>`);
}
fs.writeFileSync(HTML, html, 'utf8');

console.log('✔ A/B-variant installert: Variant B CSS lagt til, ab-variant.js koblet, sales.css v=3');
