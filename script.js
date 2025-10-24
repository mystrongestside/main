const btn = document.getElementById('hamburger');
const menu = document.getElementById('nav-menu');
btn?.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('active', !open); // viser/skjuler meny
});

// ================================
//  AUTOMATISK OPPDATERING AV DATOER
// ================================

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

const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

const finnNesteDato = (datoListe) => {
  const idag = normalizeDate(new Date());
  return datoListe
    .map((datoStr) => normalizeDate(datoStr))
    .find((dato) => dato >= idag) ?? null;
};

const formatDatoKort = (dato) => {
  const måned = dato.toLocaleString('no-NO', { month: 'short' }).toUpperCase();
  const dag = dato.getDate();
  return `${måned} ${dag}.`;
};

const formatDatoLang = (dato) => {
  const dag = dato.getDate();
  const måned = dato.toLocaleString('no-NO', { month: 'short' }).toUpperCase();
  return `${dag}. ${måned}`;
};

window.addEventListener('DOMContentLoaded', () => {
  treninger.forEach(({ gruppe, datoer }) => {
    if (!datoer.length) return;

    const siste = normalizeDate(datoer[datoer.length - 1]);
    const neste = finnNesteDato(datoer);

    const card = document.querySelector(`[data-gruppe="${gruppe}"]`);
    if (!card) return;

    const monthEl = card.querySelector('.date-month');
    const dayEl = card.querySelector('.date-day');
    const rangeEl = card.querySelector('.date-range');

    if (monthEl && dayEl && neste) {
      const [måned, dag] = formatDatoKort(neste).split(' ');
      monthEl.textContent = måned;
      dayEl.textContent = dag;
    }

    if (rangeEl && siste) {
      rangeEl.textContent = `TIL ${formatDatoLang(siste)}`;
    }
  });
});
