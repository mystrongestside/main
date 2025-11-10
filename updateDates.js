// --- My Strongest Side: Oppdaterer treningsdatoer på forsiden ---
console.log('[updateDates] Starter oppdatering');

const treninger = [
  {
    gruppe: 'voksne-lett',
    datoer: [
      '2025-09-25',
      '2025-10-09',
      '2025-10-23',
      '2025-11-06',
      '2025-11-20',
      '2025-12-04',
      '2026-01-15',
      '2026-01-29',
    ],
  },
  {
    gruppe: 'voksne-tett',
    datoer: [
      '2025-09-18',
      '2025-10-02',
      '2025-10-16',
      '2025-10-30',
      '2025-11-13',
      '2025-11-27',
      '2025-12-11',
      '2026-01-08',
    ],
  },
  {
    gruppe: 'barn-ungdom',
    datoer: [
      '2025-09-19',
      '2025-10-03',
      '2025-10-17',
      '2025-10-31',
      '2025-11-14',
      '2025-11-28',
      '2025-12-12',
      '2025-12-19',
    ],
  },
];

// --- Hjelpefunksjoner ---
const parseDate = str => {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const formatDate = d =>
  d.toLocaleDateString('no-NO', { day: '2-digit', month: 'short' }).replace('.', '').toUpperCase();

const today = new Date();
today.setHours(0, 0, 0, 0);

// --- Hovedfunksjon for hvert kort ---
treninger.forEach(({ gruppe, datoer }) => {
  const card = document.querySelector(`.training-card[data-gruppe="${gruppe}"]`);
  if (!card) return;

  const badge = card.querySelector('.date-badge');
  if (!badge) return;

  const parsed = datoer.map(parseDate).sort((a, b) => a - b);
  const next = parsed.find(d => d >= today);
  const last = parsed[parsed.length - 1];

  if (next) {
    badge.innerHTML = `
      <div class="date-info">
        <strong>Neste økt:</strong> ${formatDate(next)}<br>
        <small>Siste økt: ${formatDate(last)}</small>
      </div>
    `;
  } else {
    badge.innerHTML = `
      <div class="date-info">
        <strong>Sesongen er avsluttet</strong><br>
        <small>Siste økt var ${formatDate(last)}</small>
      </div>
    `;
  }
});

console.log('[updateDates] Ferdig oppdatert');

const finnSisteDato = (datoListe) => {
  for (let i = datoListe.length - 1; i >= 0; i -= 1) {
    const parsed = parseDate(datoListe[i]);
    if (parsed) {
      const normalized = normalizeDate(parsed);
      console.log(logPrefix, 'Fant siste dato', normalized.toString());
      return normalized;
    }
  }

  console.log(logPrefix, 'Fant ingen gyldige datoer i listen');
  return null;
};

const formatDatoKort = (dato) => {
  const month = dato.toLocaleString('no-NO', { month: 'short' }).toUpperCase();
  const day = `${dato.getDate()}.`;
  console.log(logPrefix, 'Formatterer kort dato', { month, day });
  return { month, day };
};

const formatDatoLang = (dato) => {
  const formatted = `${dato.getDate()}. ${dato
    .toLocaleString('no-NO', { month: 'short' })
    .toUpperCase()}`;
  console.log(logPrefix, 'Formatterer lang dato', formatted);
  return formatted;
};

const oppdaterKort = ({ gruppe, datoer }) => {
  console.log(logPrefix, 'Oppdaterer kort for gruppe', gruppe);
  if (!Array.isArray(datoer) || datoer.length === 0) {
    console.log(logPrefix, 'Ingen datoer å vise for', gruppe);
    return;
  }

  const card = document.querySelector(`.news-card[data-gruppe="${gruppe}"]`);
  if (!card) {
    console.log(logPrefix, 'Fant ikke kort for gruppe', gruppe);
    return;
  }

  const monthEl = card.querySelector('.date-month');
  const dayEl = card.querySelector('.date-day');
  const rangeEl = card.querySelector('.date-range');

  const nesteDato = finnNesteDato(datoer);
  const sisteDato = finnSisteDato(datoer);

  if (monthEl && dayEl && nesteDato) {
    const { month, day } = formatDatoKort(nesteDato);
    monthEl.textContent = month;
    dayEl.textContent = day;
    console.log(logPrefix, 'Oppdaterte kort dato for', gruppe, month, day);
  } else if (!nesteDato) {
    console.log(logPrefix, 'Ingen kommende datoer for', gruppe);
  } else {
    console.log(logPrefix, 'Mangler elementer for dato på kortet til', gruppe);
  }

  if (rangeEl && sisteDato) {
    rangeEl.textContent = `TIL ${formatDatoLang(sisteDato)}`;
    console.log(logPrefix, 'Oppdaterte datoperiode for', gruppe, rangeEl.textContent);
  } else if (!sisteDato) {
    console.log(logPrefix, 'Fant ingen gyldig sluttdato for', gruppe);
  } else {
    console.log(logPrefix, 'Mangler element for datoperiode på kortet til', gruppe);
  }
};

console.log(logPrefix, 'Starter oppdatering av treningdatoer');
treninger.forEach(oppdaterKort);
console.log(logPrefix, 'Ferdig med oppdatering av treningdatoer');

const LOCATION_META = {
  text: 'Bergen – Fantoft',
  iconSrc: 'icons/location.svg',
};

document.querySelectorAll('.news-card').forEach((card) => {
  if (card.querySelector('.card-meta')) {
    return;
  }

  const meta = document.createElement('div');
  meta.classList.add('card-meta');

  const location = document.createElement('span');
  location.classList.add('meta-location');

  const locationIcon = document.createElement('img');
  locationIcon.classList.add('meta-icon');
  locationIcon.src = LOCATION_META.iconSrc;
  locationIcon.alt = '';
  locationIcon.setAttribute('aria-hidden', 'true');
  location.appendChild(locationIcon);

  const locationText = document.createElement('span');
  locationText.classList.add('meta-location-text');
  locationText.textContent = LOCATION_META.text;
  location.appendChild(locationText);

  meta.appendChild(location);

  const image = card.querySelector('.news-media') ?? card.querySelector('img');
  if (image) {
    image.insertAdjacentElement('afterend', meta);
  } else {
    card.insertBefore(meta, card.firstChild);
  }
});
