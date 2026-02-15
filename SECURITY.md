# Security Policy

## Rapporter sårbarhet
Oppdager du en mulig sårbarhet? Ikke publiser den offentlig.

Send e-post til: **security@mystrongestside.no**

Inkluder gjerne:
- Beskrivelse av sårbarheten
- Steg for å reprodusere
- Berørte URL-er/sider
- Forslag til avhjelping

Vi bekrefter mottak så raskt som mulig og følger opp fortløpende.

## Intern sikkerhetssjekkliste (kort)
- [ ] Oppdater tredjepartsbiblioteker og fjern ubrukte scripts.
- [ ] Gjennomgå CSP-rapporter og stram inn policyen.
- [ ] Verifiser at alle `target="_blank"` har `rel="noopener noreferrer"`.
- [ ] Test samtykkebanner og blokkering av embeds uten samtykke.
- [ ] Sjekk at kontaktskjema avviser bots (honeypot) og validerer input.
- [ ] Bekreft at sikkerhetsheadere fortsatt sendes i produksjon.
