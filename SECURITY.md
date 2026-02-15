# Security Policy

## Rapporter sårbarhet
Oppdager du en mulig sårbarhet? Ikke publiser den offentlig.

Send e-post til: **security@mystrongestside.no**

Inkluder gjerne:
- Beskrivelse av sårbarheten
- Steg for å reprodusere
- Berørte URL-er/sider
- Forslag til avhjelping

## Forventet responstid
- **Bekreftelse på mottak:** innen 2 virkedager.
- **Første vurdering/triage:** innen 5 virkedager.
- **Løpende statusoppdatering:** minst ukentlig for åpne saker til de er lukket.

## Intern sikkerhetssjekkliste (kort)
- [ ] Verifiser at Netlify sender alle sikkerhetsheadere i produksjon.
- [ ] Gå gjennom CSP report-only brudd og whitelist kun nødvendige domener.
- [ ] Bekreft at tredjeparts embeds er blokkert uten samtykke.
- [ ] Test at kontaktskjema bruker honeypot + enkel rate limiting + Netlify spam protection.
- [ ] Sjekk at `target="_blank"` alltid kombineres med `rel="noopener noreferrer"`.
- [ ] Kontroller at personvern- og cookies-dokumentasjon er oppdatert.
