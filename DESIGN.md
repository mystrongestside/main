# Designregler for mystrongestside.no

Gjelder sider som har `<body class="design-2026">`. Verdiene står i
`css/myss-2026.css` som variabler. Denne fila forklarer hvordan de brukes.

Nettsiden er i samme familie som Tæpp og tren-appen: marineblå bakgrunn,
Archivo, stor hvit skrift og én oransje hovedknapp. Variabler som starter med
`--tt-` har samme verdi som i appen (`beinpress/taepp-regler.css`). Variabler
som starter med `--w-` er det nettsiden legger til.

Det folk skal huske: det store bildet øverst på forsiden med overskriften i
stor hvit skrift, ukedagene i sidens største skrift og portrettet i
svart-hvitt helt ut til kanten. Farge og kraft kommer fra fotografiene og
skriften, ikke fra fargede felt. Resten skal være rolig.

## Dette skal ikke endres

- Tekster, sider, menypunkter og adressene til sidene.
- Påmelding, kontaktskjema og alt annet som sender eller lagrer noe.
- WCAG 2.1 AA, synlig fokus, alt kan brukes med tastatur, trykkflater på minst
  48 px, og bevegelse som følger innstillingen for redusert bevegelse.
- Ingen nye sporingsverktøy og ingen rammeverk. Skriften ligger i
  `assets/fonts/`. Siden skal ikke bli tyngre å laste.
- Ekte bilder fra treningene. Ingen arkivbilder og ingen KI-bilder.

## Farger

Mørkt parti er standard. Lyst parti (`.lys`) brukes der det er mye å lese.
Bolker er bare hvite eller marineblå. Det finnes ingen fargefelt.

| Variabel | Verdi | Brukes til |
|---|---|---|
| `--tt-bg` | `#08263A` | Bakgrunn i topp, bunnfelt og mørke partier |
| `--tt-surface` | `#0F3A56` | Flater man kan trykke på i mørkt parti |
| `--tt-text` | `#FFFFFF` | Titler og knappetekst på mørkt |
| `--tt-text-soft` | `#E3EDF3` | Brødtekst på mørkt |
| `--tt-text-muted` | `#C9D9E3` | Hjelpetekst på mørkt |
| `--tt-accent` | `#F77C37` | Hovedknappen og trinn-tallene |
| `--tt-on-accent` | `#0B1F2C` | Tekst og pil på oransje, tekst i skjemafelt |
| `--tt-accent-text` | `#FFB58C` | Overlinjen og små overskrifter i meny og bunnfelt |
| `--tt-line` | hvit 55 % | Kant på rolige knapper på mørkt |
| `--tt-line-soft` | hvit 25 % | Tynne skillestreker på mørkt |
| `--tt-focus` | `#7CC8FF` | Fokusring på mørkt |
| `--w-paper` | `#FFFFFF` | Bakgrunn i lyst parti. Ren hvit, som logoen og skiltet står på |
| `--w-ink` | `#08263A` | Titler på lyst |
| `--w-ink-soft` | `#1D3545` | Brødtekst på lyst |
| `--w-ink-muted` | `#3F5666` | Hjelpetekst og plassholdertekst på lyst |
| `--w-ink-line` | marineblå 60 % | Kant på felt, valg og rolige knapper på lyst |
| `--w-ink-line-soft` | marineblå 20 % | Tynne skillestreker på lyst |
| `--w-paper-surface` | `#EEF2F5` | Flater man kan trykke på i lyst parti |
| `--w-ink-focus` | `#0B5CAD` | Fokusring på lyst |
| `--w-brand` | `#13577A` | Logoens blå. Bare tekst på hvitt (7,9:1): stedene under ukedagene. Aldri bakgrunn |

Reglene bruker `--c-`variablene (`--c-title`, `--c-text`, `--c-muted`,
`--c-line`, `--c-ring`, `--c-surface`, `--c-focus`). De peker på mørke eller
lyse verdier etter hvilket parti innholdet står i.

1. Oransje brukes bare til hovedknappen og til trinn-tallene på Tæpp og
   tren-siden (og trinn-tallet i skjermbildet av appen). Én oransje knapp
   per side. Trinn-tall står bare på mørk bakgrunn. Oransje brukes ikke som
   bakgrunn på bolker.
2. Hvit tekst står aldri på oransje. Bruk `--tt-on-accent`.
3. Oransje tekst (`--tt-accent-text`) brukes bare på mørkt.
4. Ingen nye fargekoder i reglene. Trengs en ny farge, legges den inn som
   variabel med målt kontrast i toppen av CSS-fila.
5. Ingen fargeoverganger som pynt. Den eneste overgangen er skyggen som gjør
   teksten lesbar oppå bildet øverst på forsiden.

### Hvite og marineblå bolker

1. Bolker har bare bakgrunnen `--w-paper` (hvit) eller `--tt-bg`
   (marineblå), satt med `background-color` på bolken (`.lys`, `.moerk`),
   eller på en `div.lys` rundt flere bolker i samme parti.
2. Minst halvparten av forsidens høyde under toppbildet er hvit.
3. Oransje, fersken, rosa, beige og lys blå brukes ikke som bakgrunn på
   bolker. Undersidene åpner i marineblått.
4. Feltene møtes kant i kant, uten strek, skygge eller overgang. Ingenting
   stikker inn i feltet over.

## Skrift

Archivo i 400, 600 og 700, fra én fil (`assets/fonts/archivo.woff2`).
Sju størrelser. De tre største vokser med skjermbredden.

| Variabel | Mobil – PC | Brukes til |
|---|---|---|
| `--w-type-hero` | 40 – 88 px | Overskriften på forsiden |
| `--w-type-display` | 40 – 64 px | Tittelen øverst på en underside, «Tæpp og tren» på forsiden |
| `--w-type-title` | 32 – 48 px | Tittelen på en bolk |
| `--w-type-lead` | 19 – 22 px | Ingress, hovedknappen, overskrift på et ledd, tid og sted ved ukedagene |
| `--w-type-body` | 17 – 18 px | Lesetekst, lenker, felt |
| `--w-type-small` | 15 px | Overlinje, hjelpetekst |
| `--w-type-micro` | 13 px | Linjen nederst i bunnfeltet |

`--w-type-menu` (24 – 32 px) er bare for lenkene i den åpne menyen.

`--w-type-number` (64 – 88 px) er bare for trinn-tallet (`.trinn`), som i appen.

`--w-type-dag` (50 – 136 px) er bare for ukedagene på forsiden (`.tider`).
De er sidens største skrift og får hele sidebredden. Ved siden av (under på
mobil) står tiden i marineblått og stedet i logoens blå. Under ukedagene
står én linje om når sesongen slutter, med lenke til ventelisten
(`.dager__slutt`). Et tidsrom står i `.klokke`, så det ikke brytes midt i.

1. Én stor tittel per side. Venstrestilt.
2. Overlinjen er kort, i vanlig setningsform, og brukes bare øverst på siden
   og der den gir ny informasjon. Ikke store bokstaver, ikke over hver bolk.
3. Ingen sperring eller knepet skrift. Ingen emojier.
4. Lesetekst (`.lesetekst`) er aldri bredere enn 65 tegn, med linjeavstand 1,6.

## Sidebredde og luft

Innholdet er høyst 1200 px bredt (`.ramme`), med 20 px marg på mobil og 48 px
på PC. Luft: 4, 8, 12, 16, 24, 32, 48, 64 og 80 px (`--w-space-1` til `-9`).
Mellom bolker: 56 px på mobil og 104 px på PC (`--w-section`).
Farger står alltid som variabler. Noen få mål som bare brukes ett sted
(toppbildet, ukedagene, bunnfeltet), står rett i regelen.

1. Innholdet ligger rett på bakgrunnen. Ingen kort med ramme rundt tekst.
2. Portrettet går helt ut til kanten, uten radius: i full bredde på mobil,
   og ut til skjermkanten på PC (`.portrett`, `.person`).
3. Skill deler med luft. Trengs en strek, brukes `--c-line`.
4. Flater med farge er bare for ting man kan trykke på.
5. På PC står tittelen til venstre og innholdet til høyre (`.to-delt`).
   Mellom 900 og 1200 px er tittelspalten bredere, så lange ord får plass.
6. Lister med korte punkter skrives som ledd med strek imellom (`.ledd`),
   ikke som bokser. Stikkord uten forklaring står i to spalter (`.punkter`).
   De skal ikke se ut som knapper.

## Knapper og lenker

| Type | Regel |
|---|---|
| Hovedknapp (`.knapp-hoved`) | Oransje, 60 px høy, 18 px radius, tekst til venstre og pil til høyre. Én per side. Full bredde på mobil. |
| Rolig knapp (`.knapp-rolig`) | Gjennomsiktig med kant, 60 px høy. Lav utgave (48 px) i toppen. |
| Lenke med pil (`.pil-lenke`) | Understreket tekst og pil, minst 48 px høy. Fører videre til en annen side. |
| Hurtigvalg | Flate med kant, minst 56 px høy. Et hurtigvalg som går til en annen side (påmeldingen), er en lenke med pil til høyre. |

Alle trykkflater er minst 48 px. Fokusringen er 3 px i `--c-focus`.
Lenker inne i en setning er understreket.

## Topp og meny

Toppen er marineblå på alle sider: merket til venstre og «Vis menyen» til
høyre. På PC (fra 1240 px) står også fire snarveier og en rolig «Kontakt oss».
Får ikke snarveiene plass på én linje (økt tekstavstand), brytes de over to.
Menyen dekker hele skjermen, med de samme menypunktene som før i stor skrift.
Siden du står på, er merket med både farge og strek. Menyen kan åpnes og lukkes med tastatur, Escape
lukker, og fokus følger med inn og ut.

Toppen og menyen lages av `menu.js`. Sider med `design-2026` får den nye
utgaven. Andre sider får den gamle.

## Bunnfelt

Marineblått, likt på alle sider: merket og mottoet, fire lenkegrupper, og
nederst sosiale medier, organisasjonsnummer og varemerkelinjen. Sosiale
medier står som tekstlenker. Et ikon står aldri alene uten tekst.

## Skjema

1. Ledeteksten står over feltet og er alltid synlig.
2. Felt er 56 px høye, hvite, med kant i `--c-ring` og 12 px radius.
   Skriften i feltet er minst 17 px.
3. Fokus vises med ring og mørkere kant.
4. Send-knappen er sidens hovedknapp.
5. Navn, id-er, valideringsregler og skript i skjemaet røres ikke når
   utseendet endres.

## Bilder

1. Bilder av folk som trener får stor plass. Bildet øverst på forsiden går
   over hele bredden.
2. Legg inn bilder i riktig størrelse. Ingen bildefil over 300 kB på en side.
   Bruk `width` og `height`, og `loading="lazy"` på alt under første skjerm.
3. Et bilde kan vises i svart-hvitt med `.foto--sh`. Det samme bildet vises
   likt på alle sider. Portrettet av Alexander er svart-hvitt.
4. Bilder som bare er stemning, har tom `alt`. Bilder som viser noe leseren
   trenger, har en kort beskrivelse uten navn på personer. Unntak: portrettet
   av Alexander på Teamet har navnet hans som `alt`.
5. Portrettet vises i sitt eget format (`--w-foto-format`, 1200 / 954), så
   det ikke beskjæres. Unntaket er forsiden på PC når teksten er høyere
   enn bildet, se punkt 6. `--fokus` (58 % 41 %, der ansiktet er) holder
   da motivet på plass. Ingen tekst står oppå et ansikt.
6. Forsiden: «Bak My Strongest Side» står i et hvitt felt. På PC står
   teksten til venstre i sidebredden og portrettet til høyre, helt ut til
   skjermkanten og fra feltkant til feltkant. Portrettet er 44 % av
   vindusbredden (`--w-portrett`, minst 400 og høyst 880 px), så hele
   feltet får plass i vinduet. Blir teksten høyere enn bildet (vinduer
   under ca. 950 px, økt tekstavstand), fyller bildet høyden i feltet, og
   sidene beskjæres rundt `--fokus`. På mobil kommer teksten først og
   portrettet under i full bredde.
7. Teamet: portrettet går ut til venstre skjermkant på PC, teksten holder
   sidebredden. Portrettet står i en egen bolk i samme hvite parti som
   innledningen.
8. Treningsbildet brukes bare øverst på forsiden. Det gjentas ikke som
   bånd lenger ned.

### Tæpp og tren som produkt

Tæpp og tren vises med `.produkt`: det ekte skiltet og to ekte skjermbilder
av appen. Ingen tegnede apparater, og ingen skygger, fargeoverganger eller
skråstilte mobiler.

1. Skiltet står øverst til venstre (44 % av bredden), med valgskjermen
   under. Trinnskjermen med det oransje trinn-tallet står størst, til høyre
   (51 %). Luften under skiltet er 2,6 % av bredden.
2. Blokken er skåret rett under trinn-tallet (`aspect-ratio: 100 / 89`) og
   står nederst i feltet sitt, så mobilene kommer opp av kanten. Har feltet
   under samme farge, får feltet `.grunnlinje`.
3. Blokken er lik på forsiden og øverst på Tæpp og tren-siden. På mobil
   står teksten først og blokken under, også i koden. På PC er blokken
   5 av 12 spalter (opptil 467 px). Fra 1296 px følger den vindusbredden
   (`--w-produkt`, 36 % av vinduet, høyst 653 px), og teksten får resten.
4. Mobilrammen (`.mobil`) er en tynn kant i `--c-ring`, en mørk ramme i
   `--tt-on-accent` og skjermbildet. Skiltet har den samme kanten.
5. Figuren har én beskrivelse (`aria-label`), og bildene i den har tom
   `alt`. Ingenting i figuren kan trykkes.
6. Filene ligger i `bilder/app/`: skiltet som PNG og skjermbildene som WebP
   i to eller tre bredder med `srcset`. De veier til sammen 81–125 kB per
   side.
7. Et nytt skjermbilde må ha trinn-tallet på samme sted (rundt 81 % ned i
   bildet). Ellers må utsnittet regnes på nytt.

## Bevegelse

| Variabel | Verdi | Brukes til |
|---|---|---|
| `--tt-fast` | 140 ms | Svar på trykk og peker: knappen gir litt etter, flaten skifter farge |
| `--tt-ease` | `cubic-bezier(0.2, 0, 0, 1)` | All bevegelse |

1. Bevegelse skal svare på noe brukeren gjør. Ingenting beveger seg av seg
   selv, heller ikke når man ruller.
2. Ved redusert bevegelse er alt av. Variablene settes da til null i
   CSS-fila.
3. Ingen sprett, glød eller skygge som pynt.

## Oppbygging av en side

Forsiden: topp, bilde i full bredde med overskrift og hovedknapp på mørk
bakgrunn, hvitt felt med ukedagene i full bredde, mørkt Tæpp og tren-felt
som et bånd fra appen, hvitt felt med portrettet ut til kanten, og så hvite
bolker. Siden skal verken
være mørk eller lys hele veien ned.

Underside: topp, mørkt felt med overlinje, tittel og ingress (`.sidetopp`),
lyst parti med lesestoffet, eventuelt et mørkt felt til slutt med
hovedknappen, og bunnfelt. Hovedknappen står der sidens viktigste handling
først dukker opp. Andre knapper på siden er rolige.

## Slik legges en side om

1. Sett `design-2026` på `<body>` og bytt `styles.css` med
   `/css/myss-2026.css`. Fjern sidens egen `<style>`.
2. Bygg innholdet med klassene i CSS-fila. Tekstene flyttes uendret.
3. Legg inn toppen (`<header data-component="site-header">`), hopp-lenken og
   bunnfeltet slik de står på forsiden.
4. Sjekk i 390 × 844 og 1440 × 900: ingen vannrett rulling, én oransje knapp,
   alle trykkflater minst 48 px, kontrast, og at menyen virker med tastatur.
5. Har siden skjema: kontroller at det sender det samme som før.

Sider som ikke er lagt om, ser ut som før.

Lagt om per 14.11.2026: forsiden, Gruppetrening, Kontakt, Tæpp og tren,
Om oss og Teamet.
