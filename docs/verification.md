# Verifikasjon etter sikkerhetshardening

## Tester som skal kjøres

1. **Security Headers (production URL)**
   - Kjør: `https://securityheaders.com/` mot `https://mystrongestside.no`.
   - Kontroller at følgende headere finnes:
     - `Strict-Transport-Security`
     - `Content-Security-Policy-Report-Only`
     - `X-Content-Type-Options`
     - `Referrer-Policy`
     - `X-Frame-Options`
     - `Permissions-Policy`
     - `Cross-Origin-Opener-Policy`
     - `Cross-Origin-Resource-Policy`

2. **SSL Labs (TLS-konfigurasjon)**
   - Kjør: `https://www.ssllabs.com/ssltest/` mot `mystrongestside.no`.
   - Kontroller sertifikatkjede, protokoller og cipher suites.

3. **Manuell samtykketest i nettleser**
   - Uten samtykke: Instagram-feed skal ikke laste.
   - Klikk “Vis Instagram”: feed lastes.
   - Nullstill samtykke på `cookies.html`: banner vises igjen.

4. **Kontaktskjema test**
   - Vanlig innsending skal fungere.
   - Honeypot utfylt skal blokkeres.
   - Flere raske innsendinger skal trigge frontend rate limit.

## Akseptkriterier

- SecurityHeaders-score er minimum **A-**, uten manglende kritiske headere.
- SSL Labs-score er minimum **A**.
- Ingen tredjeparts embed lastes før samtykke.
- Kontaktflyt avviser enkle botforsøk (honeypot/tids- og rate-kontroll).
- Ingen regressjon i kritiske brukerreiser (forside, påmelding, kontakt).
