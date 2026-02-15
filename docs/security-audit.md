# Security audit – mystrongestside.no

## 1) Hosting og deploy

**Primær hosting/deploy:** Netlify.

**Bevis i repo:**
- `netlify.toml` finnes og styrer `publish = "."`, build-miljø og headere.
- `kontakt.html` bruker `data-netlify="true"` og `netlify-honeypot`, som bekrefter Netlify Forms.
- `CNAME` peker custom domain til statisk hosting-oppsett.

**Konklusjon:** Siden publiseres som statisk nettside via Netlify med custom domain `mystrongestside.no`.

---

## 2) Tredjepartsressurser lastet fra HTML (scripts/forms/widgets)

Kartleggingen er gjort ved å skanne HTML for `src`, `action` og consent-gated script-kilder.

### A. Analyse/statistikk
- `https://www.googletagmanager.com/gtag/js?id=G-LK0WY59R15`
  - Type: ekstern script-loader (GA4)
  - Bruk: statistikk/sporing
  - Finnes på mange sider, bl.a. `index.html`, `kontakt.html`, `personvern.html`, `treningstilbud/*.html`, `qr/trening/index.html`.

### B. Cookie-samtykke (historisk/legacy)
- `https://consent.cookiebot.com/uc.js`
  - Type: ekstern cookie consent script
  - Bruk: samtykke-widget på eldre sider
  - Finnes på flere HTML-filer (legacy sider), bl.a. `gruppetrening.html`, `kurs og seminar.html`, `treningstilbud/*.html`, `public/index.html`.

### C. Sosiale medier / embed widgets
- `https://widgets.sociablekit.com/instagram-feed/widget.js`
  - Type: widget script
  - Bruk: Instagram-feed på forsiden (`index.html`), nå consent-gated.
- `https://www.instagram.com/mystrongestside/`
  - Type: ekstern lenke/brand-kanal
  - Bruk: sosiale lenker i footer og fallback-lenker.

### D. Event-/påmeldingswidgets (Checkin)
- `https://registration.checkin.no/registration.loader.js`
  - Type: ekstern script-loader
  - Bruk: dynamisk påmeldingsskjema/embed på flere påmeldingssider i `treningstilbud/`.
- `https://static.checkin.no/loaders/eventindex/loader.js`
  - Type: ekstern script-loader
  - Bruk: event-oversikt (`kurs og seminar.html`).
- `https://event.checkin.no/...`
  - Type: ekstern påmeldingslenke
  - Bruk: direkte påmelding.

### E. Nyhetsbrev/skjema (Mailchimp)
- `https://mystrongestside.us19.list-manage.com/subscribe/post?...`
  - Type: ekstern form-action endpoint
  - Bruk: nyhetsbrevskjema i `qr/trening/index.html`.

### F. Eksterne skjematjenester
- `https://www.cognitoforms.com/MyStrongestSide1/FrivilligeMyStrongestSide`
  - Type: ekstern skjema-lenke
  - Bruk: frivillighetsregistrering.

### G. Andre tredjepartslenker (ikke embeds/scripts)
- Sosiale plattformer: Facebook, LinkedIn, Instagram-lenker.
- Kartlenker: `maps.google.com`.
- Samarbeidspartnere: `atteraas.no`, `cp.no`, `hvlskape.no`, `mio.no`.

---

## 3) Risikoobservasjoner (før hardening)

1. Flere sider har fortsatt direkte tredjeparts scripts (GA/Cookiebot/Checkin) uten sentral, enhetlig consent-kontroll.
2. CSP finnes i Netlify-oppsett, men bør holdes i `Report-Only` med tydelig TODO-whitelist per faktisk behov.
3. Kontaktflyt må ha bot-beskyttelse og enkel klient-side rate-limit i tillegg til Netlify spam-filter/honeypot.

---

## 4) Anbefalt hardening-tilnærming (lav risiko)

1. **Behold Netlify som enforcement-punkt** for ekte sikkerhetsheadere.
2. **Bruk CSP Report-Only først** for å unngå funksjonsbrudd.
3. **Gat alle tredjeparts embeds/scripts bak samtykke** (minimum analytics + marketing).
4. **Bruk Netlify Forms + honeypot + Netlify spam protection**, samt enkel frontend rate-limit for støyreduksjon.
5. **Dokumenter cookies/personvern tydelig** og gi bruker en enkel måte å endre samtykke.
