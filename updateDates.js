const treninger = [
  {
    gruppe: 'voksne',
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
    gruppe: 'tett',
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
    gruppe: 'barn',
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
];

const logPrefix = '[updateDates]';

const parseDate = (dateString) => {
  console.log(logPrefix, 'Parser dato', dateString);
  if (typeof dateString !== 'string') {
    console.log(logPrefix, 'Dato er ikke en streng, hopper over', dateString);
    return null;
  }

  const parts = dateString.split('-').map((part) => Number(part));
  const [year, month, day] = parts;

  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    console.log(logPrefix, 'Ugyldig datoformat', dateString);
    return null;
  }

  const parsed = new Date(year, month - 1, day);
  console.log(logPrefix, 'Returnerer dato', parsed.toString());
  return parsed;
};

const normalizeDate = (date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  console.log(logPrefix, 'Normaliserer dato til', normalized.toString());
  return normalized;
};

const finnNesteDato = (datoListe) => {
  const idag = normalizeDate(new Date());
  console.log(logPrefix, 'I dag er', idag.toString());

  for (const datoStr of datoListe) {
    const parsed = parseDate(datoStr);
    if (!parsed) {
      console.log(logPrefix, 'Hopper over ugyldig dato', datoStr);
      continue;
    }

    const normalized = normalizeDate(parsed);
    if (normalized >= idag) {
      console.log(logPrefix, 'Fant neste dato', normalized.toString());
      return normalized;
    }
  }

  console.log(logPrefix, 'Fant ingen kommende datoer');
  return null;
};

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
