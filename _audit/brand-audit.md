# Brand audit: My Strongest Side®
_Generert: 2026-01-06 21:55_

## Oppsummering (totalt)

| Mønster | Treff |
|---|---:|
| `My Strongest Side®` | 115 |
| `My Strongest Side` (uten ®) | 273 |
| `My Strongest Side ®` (mellomrom-feil) | 1 |
| `MySS®` | 3 |
| `MySS` (uten ®) | 14 |

## Anbefalinger

**Anbefalt praksis (merkevare):**
- Header/logo: `My Strongest Side®`
- Footer: `My Strongest Side®`
- Første forekomst per side (hero/H1/ingress): `My Strongest Side®`
- Videre i brødtekst på samme side: `My Strongest Side` (uten ® for lesbarhet)

**Hva denne rapporten peker ut:**
- Sider som bruker merkenavnet, men mangler `®` helt.
- Sider som har *blandet bruk* (både med og uten ® i samme fil).
- Eventuelle skrivefeil som `Side ®` (mellomrom før ®).
- Forekomster av `MySS` uten `MySS®` (kun relevant hvis *MySS* også er registrert som varemerke).

## Funn-lister

### 1) Filer som nevner `My Strongest Side` men mangler ® helt (8 filer)

- `footer.js`
- `menu.js`
- `updateDates.js`
- `compat.css`
- `package.json`
- `hero.css`
- `components/footer-links.js`
- `partials/footer.html`

### 2) Filer med blandet bruk (både med og uten ®) (30 filer)

- `gruppetrening.html`
- `main.html`
- `foresatte.html`
- `styles-clean.css`
- `samarbeid.html`
- `kurs og seminar.html`
- `kontakt.html`
- `treningstilbud.html`
- `personvern.html`
- `treningssystem.html`
- `Individuelloppfølging.html`
- `index_live.html`
- `maintenance.html`
- `script.js`
- `index.html`
- `om-oss.html`
- `presse.html`
- `frivillig.html`
- `treningstilbud/testpaa.html`
- `treningstilbud/lett-påmelding.html`
- `treningstilbud/test.html`
- `treningstilbud/barn-ungdom.html`
- `treningstilbud/tett-oppfolging.html`
- `treningstilbud/ungdom-paamelding.html`
- `treningstilbud/tett-påmelding.html`
- `treningstilbud/voksne-lett.html`
- `_audit/brand-audit.md`
- `public/index.html`
- `qr/trening/index.html`
- `aktuelt/cp-bladet-myss.html`

### 3) Filer med skrivefeil `Side ®` (1 filer)

- `_audit/brand-audit.md`

### 4) Filer med `MySS` uten `MySS®` (6 filer)

_OBS: kun relevant hvis `MySS` også er registrert varemerke._

- `main.html`
- `styles-clean.css`
- `footer.js`
- `styles.css`
- `treningssystem.html`
- `treningstilbud/styles.css`

## Eksempler (utdrag)

### Eksempler: Mangler ®

**1. `footer.js`**
- linje 38: `<h3 class="site-footer__title">My Strongest Side</h3>`
- linje 39: `<nav class="site-footer__nav" aria-label="My Strongest Side">`
- linje 48: `<div>My Strongest Side AS</div>`
- linje 82: `© <span id="year"></span> My Strongest Side AS · Org.nr 935 786 053`

**2. `menu.js`**
- linje 33: `<img src="${prefix}bilder/myss-logo-header.png" alt="My Strongest Side" />`
- linje 76: `<h2 class="site-nav__heading">My Strongest Side</h2>`

**3. `updateDates.js`**
- linje 1: `// --- My Strongest Side: Oppdaterer treningsdatoer på forsiden ---`

**4. `compat.css`**
- linje 2: `GLOBAL LAYOUT FIX – My Strongest Side`

**5. `package.json`**
- linje 4: `"description": "Checkin.no integration for My Strongest Side site.",`

**6. `hero.css`**
- linje 2: `HERO-SEKSJON (My Strongest Side)`

**7. `components/footer-links.js`**
- linje 47: `mount("[data-footer-links-brand]", "My Strongest Side", [`

**8. `partials/footer.html`**
- linje 5: `<img src="/bilder/myss-logo-footer.png" alt="My Strongest Side" class="site-footer__logo" />`
- linje 17: `<div>My Strongest Side AS</div>`
- linje 42: `© <span id="year"></span> My Strongest Side AS · Org.nr 935 786 053`

### Eksempler: Mellomrom før ®

**1. `_audit/brand-audit.md`**
- linje 10: `| `My Strongest Side ®` (mellomrom-feil) | 0 |`
