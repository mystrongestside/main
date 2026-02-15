# Cookiebot-oppsett for mystrongestside.no

Følgende må konfigureres i Cookiebot Manager for å unngå feilen **"domain is not authorized"**.

1. Legg til både `mystrongestside.no` og `www.mystrongestside.no` i riktig **Domain Group** (som domener eller alias).
2. Bekreft at CBID i nettstedets script er det samme som CBID for denne Domain Group:
   - `918da94c-47e9-4fc0-9939-763b0c22c63d`
3. Publiser endringene i Cookiebot Manager.
4. Vent på ny scan/oppdatering hos Cookiebot før du verifiserer i produksjon.

Kodeendringer i nettstedet normaliserer i tillegg `www.mystrongestside.no` til apex-domenet `mystrongestside.no`, slik at trafikk samles på samme host.
