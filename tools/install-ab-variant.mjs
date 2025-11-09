#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIR, '..');

const INDEX_PATH = resolve(PROJECT_ROOT, 'index.html');
const STYLES_PATH = resolve(PROJECT_ROOT, 'styles.css');

const HERO_LINES = [
  '<section class="hero-card" data-experiment="hero-ab">',
  '  <img src="bilder/hero-large.jpg" alt="Trening og fellesskap på My Strongest Side" class="hero-image">',
  '  <div class="hero-overlay">',
  '    <p class="hero-label">Tilrettelagt styrketrening i Bergen</p>',
  '    <h1>Tren trygt med fagpersoner som heier på deg<span class="dot">.</span></h1>',
  '    <p class="hero-subtext">Små grupper, universell utforming og individuell veiledning hver eneste uke.</p>',
  '    <ul class="hero-benefits">',
  '      <li>Tilpassede økter for ulike funksjonsnivåer</li>',
  '      <li>Fast team av ergoterapeuter, fysioterapeuter og frivillige</li>',
  '      <li>Styrkerom med tilgjengelige hjelpemidler og løsninger</li>',
  '    </ul>',
  '    <div class="hero-cta">',
  '      <a href="paamelding.html" class="btn-primary">Meld deg på nå</a>',
  '      <a href="#treningstilbud" class="btn-secondary">Se alle kurs</a>',
  '    </div>',
  '    <p class="hero-note">Oppstart 18. september – plasser fordeles fortløpende.</p>',
  '  </div>',
  '</section>',
];
const HERO_BLOCK = HERO_LINES.map((line) => `    ${line}`).join('\n');

const CSS_BLOCK = `/* === Hero variant B experiment === */
.hero-card[data-experiment="hero-ab"] {
  position: relative;
}

.hero-card[data-experiment="hero-ab"] .hero-image {
  min-height: clamp(220px, 55vh, 480px);
  object-position: center 35%;
}

.hero-card[data-experiment="hero-ab"] .hero-overlay {
  align-items: flex-start;
  text-align: left;
  gap: clamp(0.75rem, 2vw, 1.3rem);
  padding: clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 4vw, 3rem);
}

.hero-card[data-experiment="hero-ab"] .hero-label {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
}

.hero-card[data-experiment="hero-ab"] .hero-subtext {
  font-size: clamp(1.05rem, 2.1vw, 1.3rem);
  line-height: 1.6;
  max-width: 40rem;
  color: rgba(255, 255, 255, 0.92);
  margin: 0;
}

.hero-card[data-experiment="hero-ab"] .hero-benefits {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.hero-card[data-experiment="hero-ab"] .hero-benefits li {
  position: relative;
  padding-left: 1.6rem;
  font-weight: 500;
}

.hero-card[data-experiment="hero-ab"] .hero-benefits li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.4rem;
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 999px;
  background: #f77c37;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.18);
}

.hero-card[data-experiment="hero-ab"] .hero-cta {
  justify-content: flex-start;
  gap: 0.75rem;
}

.hero-card[data-experiment="hero-ab"] .hero-note {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.hero-card[data-experiment="hero-ab"] .btn-secondary {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.85);
  color: #fff;
}

.hero-card[data-experiment="hero-ab"] .btn-secondary:hover,
.hero-card[data-experiment="hero-ab"] .btn-secondary:focus-visible {
  border-color: #fff;
  color: #0c2742;
  background: #fff;
}

@media (max-width: 900px) {
  .hero-card[data-experiment="hero-ab"] .hero-overlay {
    align-items: stretch;
  }
}

@media (max-width: 720px) {
  .hero-card[data-experiment="hero-ab"] .hero-overlay {
    text-align: left;
  }

  .hero-card[data-experiment="hero-ab"] .hero-cta {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-card[data-experiment="hero-ab"] .btn-primary,
  .hero-card[data-experiment="hero-ab"] .btn-secondary {
    width: 100%;
    text-align: center;
  }
}
`;

function updateIndex() {
  let html = readFileSync(INDEX_PATH, 'utf8');
  const heroPattern = /(    <!-- HERO -->)\s*[\s\S]*?(<!-- MARQUEE -->)/m;
  if (!heroPattern.test(html)) {
    throw new Error('Fant ikke hero-blokken i index.html');
  }

  html = html.replace(heroPattern, `$1\n${HERO_BLOCK}\n\n    $2`);

  if (!/id="treningstilbud"/.test(html)) {
    html = html.replace('    <section class="section">', '    <section id="treningstilbud" class="section">');
  }

  writeFileSync(INDEX_PATH, html, 'utf8');
}

function updateStyles() {
  let css = readFileSync(STYLES_PATH, 'utf8');
  if (!css.includes('Hero variant B experiment')) {
    css = `${css.trimEnd()}\n\n${CSS_BLOCK.trimEnd()}\n`;
    writeFileSync(STYLES_PATH, css, 'utf8');
  }
}

updateIndex();
updateStyles();

console.log('✔ Hero-variant B installert i index.html og styles.css');
