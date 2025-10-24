const headerTemplate = `
<header class="site-header" data-component="site-header">
  <nav class="navbar" role="navigation" aria-label="Hovedmeny">
    <div class="navbar-inner">
      <div class="navbar-left">
        <a href="index.html" aria-label="Hjem">
          <img src="hlogo.png" alt="My Strongest Side" class="logo">
        </a>
      </div>

      <div class="navbar-center" id="navbar-menu">
        <ul class="nav-links">
          <li><a href="index.html" data-page="index.html">Forside</a></li>
          <li class="has-sub">
            <a href="#" class="nav-has-sub" aria-haspopup="true" aria-expanded="false">Tilbud</a>
            <ul class="dropdown">
              <li><a href="voksne-lett.html" data-page="voksne-lett.html">Voksne – lett tilpasning</a></li>
              <li><a href="voksne-tett.html" data-page="voksne-tett.html">Voksne – tett oppfølging</a></li>
              <li><a href="ungdom.html" data-page="ungdom.html">Ungdom</a></li>
              <li><a href="foresatte.html" data-page="foresatte.html">Foresatte</a></li>
            </ul>
          </li>
          <li><a href="om-oss.html" data-page="om-oss.html">Om oss</a></li>
          <li><a href="aktiviteter.html" data-page="aktiviteter.html">Aktiviteter</a></li>
          <li><a href="kurs.html" data-page="kurs.html">Kurs</a></li>
          <li><a href="frivillig.html" data-page="frivillig.html">Frivillig</a></li>
          <li><a href="kontakt.html" data-page="kontakt.html">Kontakt</a></li>
        </ul>
      </div>

      <div class="navbar-right show-desktop">
        <a href="index.html#aktiviteter" class="btn-pill btn-pill--orange">Se våre treningstilbud</a>
      </div>

      <button id="hamburger" class="hamburger show-mobile" aria-expanded="false" aria-controls="navbar-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="nav-overlay" data-js="nav-overlay" hidden></div>
</header>
`;

const footerTemplate = `
<footer class="site-footer" data-component="site-footer">
  <div class="marquee marquee--footer" role="region" aria-label="MyStrongestSide statements nederst">
    <div class="marquee__wrap">
      <div class="marquee__row">
        <span>Tilrettelagt.</span><span>Fellesskap.</span><span>Trygt.</span><span>Kompetanse.</span>
        <span>Tilhørighet.</span><span>Mestring.</span><span>Åpent for alle.</span><span>Kunnskap.</span>
        <span>Universelt.</span><span>Inkluderende.</span><span>Sertifisert.</span><span>Standardisert.</span>
        <span>Enkelt.</span><span>Profesjonelt.</span><span>Tilgjengelig.</span><span>Godkjent.</span>
      </div>
      <div class="marquee__row" aria-hidden="true">
        <span>Tilrettelagt.</span><span>Fellesskap.</span><span>Trygt.</span><span>Kompetanse.</span>
        <span>Tilhørighet.</span><span>Mestring.</span><span>Åpent for alle.</span><span>Kunnskap.</span>
        <span>Universelt.</span><span>Inkluderende.</span><span>Sertifisert.</span><span>Standardisert.</span>
        <span>Enkelt.</span><span>Profesjonelt.</span><span>Tilgjengelig.</span><span>Godkjent.</span>
      </div>
    </div>
  </div>

  <div class="footer-wrap">
    <section class="footer-col">
      <img src="logo-orange.png" alt="My Strongest Side" class="footer-logo" />
      <p class="footer-tagline">Gjør trening tilgjengelig for flest mulig.</p>
    </section>

    <section class="footer-col">
      <h3 class="footer-title">Kontakt</h3>
      <p>E-post: <a href="mailto:post@mystrongestside.no">post@mystrongestside.no</a></p>
      <p>Telefon: <a href="tel:+4741439384">+47 41 43 93 84</a></p>
      <p>Adresse: Brages veg 3, 5221 Nesttun</p>
    </section>

    <section class="footer-col">
      <h3 class="footer-title">Følg oss</h3>
      <p>
        <a href="#" aria-label="Instagram">Instagram</a><br />
        <a href="#" aria-label="Facebook">Facebook</a>
      </p>
    </section>
  </div>

  <div class="footer-bottom">
    <p>© <span data-js="current-year"></span> My Strongest Side® · Alle rettigheter forbeholdt</p>
  </div>
</footer>
`;

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

const injectLayout = () => {
  const headerTarget = document.querySelector('[data-component="site-header"]');
  if (headerTarget) {
    headerTarget.outerHTML = headerTemplate;
  } else if (!document.querySelector('.site-header')) {
    document.body.insertAdjacentHTML('afterbegin', headerTemplate);
  }

  const footerTarget = document.querySelector('[data-component="site-footer"]');
  if (footerTarget) {
    footerTarget.outerHTML = footerTemplate;
  } else if (!document.querySelector('.site-footer')) {
    document.body.insertAdjacentHTML('beforeend', footerTemplate);
  }
};

const initNavigation = () => {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('navbar-menu');
  const overlay = document.querySelector('[data-js="nav-overlay"]');

  if (!btn || !menu) {
    return;
  }

  const closeMenu = () => {
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('active');
    document.body.classList.remove('no-scroll');
    overlay?.setAttribute('hidden', '');
    menu.querySelectorAll('.has-sub').forEach((item) => {
      item.classList.remove('open');
    });
    menu.querySelectorAll('.nav-has-sub').forEach((link) => {
      link.setAttribute('aria-expanded', 'false');
    });
  };

  const openMenu = () => {
    btn.setAttribute('aria-expanded', 'true');
    menu.classList.add('active');
    document.body.classList.add('no-scroll');
    overlay?.removeAttribute('hidden');
  };

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  menu.addEventListener('click', (event) => {
    const toggleLink = event.target.closest('.nav-has-sub');
    if (toggleLink) {
      event.preventDefault();
      const parent = toggleLink.closest('.has-sub');
      const isOpen = parent?.classList.toggle('open');
      toggleLink.setAttribute('aria-expanded', String(Boolean(isOpen)));
      return;
    }

    const anchor = event.target.closest('a');
    if (anchor) {
      closeMenu();
    }
  });
};

const highlightNavigation = () => {
  const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const links = document.querySelectorAll('.nav-links a[data-page]');
  let activeLink = null;

  document.querySelectorAll('.nav-links .has-sub').forEach((item) => {
    item.classList.remove('is-active-parent');
    item.querySelector('.nav-has-sub')?.classList.remove('is-active');
  });

  links.forEach((link) => {
    const pages = link.dataset.page.split(',').map((page) => page.trim().toLowerCase());
    const match = pages.includes(currentPath);
    if (match) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
      activeLink = link;
    } else {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');
    }
  });

  if (!activeLink) {
    return;
  }

  const parentItem = activeLink.closest('.has-sub');
  if (parentItem) {
    parentItem.classList.add('is-active-parent');
    const trigger = parentItem.querySelector('.nav-has-sub');
    trigger?.classList.add('is-active');
  }
};

const initFooterYear = () => {
  const currentYear = String(new Date().getFullYear());
  document.querySelectorAll('[data-js="current-year"]').forEach((node) => {
    node.textContent = currentYear;
  });
};

const initContactForm = () => {
  const form = document.querySelector('[data-js="contact-form"]');
  if (!form) {
    return;
  }

  const feedback = form.querySelector('[data-js="form-feedback"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (feedback) {
      feedback.hidden = true;
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }

    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Respons ikke OK');
      }

      if (feedback) {
        feedback.textContent = 'Takk! Vi har mottatt meldingen din.';
        feedback.classList.add('success');
        feedback.hidden = false;
      }

      form.reset();
    } catch (error) {
      if (feedback) {
        feedback.textContent = 'Noe gikk galt. Prøv igjen senere.';
        feedback.classList.add('error');
        feedback.hidden = false;
      }
    }
  });
};

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

const oppdaterTreningskort = () => {
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
};

const LOCATION_DETAILS = {
  text: 'Bergen – Fantoft',
  icon: {
    src: 'icons/location.svg',
    alt: 'Lokasjon',
  },
};

const GROUP_META = {
  voksne: {
    icons: [{ src: 'icons/walk.svg', alt: 'Gående person' }],
    passerFor:
      'Deg som går selvstendig og ønsker veiledning til å tilpasse styrketrening etter egne behov.',
  },
  tett: {
    icons: [
      { src: 'icons/wheelchair.svg', alt: 'Rullestolbruker' },
      { src: 'icons/assist.svg', alt: 'Assistent' },
    ],
    passerFor:
      'Deg som bruker rullestol eller trenger forutsigbar og tett oppfølging gjennom hele treningsøkten.',
  },
  barn: {
    icons: [
      { src: 'icons/child.svg', alt: 'Barn' },
      { src: 'icons/child2.svg', alt: 'Ungdom' },
    ],
    passerFor:
      'Barn og ungdom som vil trene styrke i trygge omgivelser med støtte fra fagpersoner og frivillige.',
  },
};

const GROUP_KEYWORDS = [
  { key: 'voksne', keywords: ['voksne', 'lett'] },
  { key: 'tett', keywords: ['tett', 'oppfølging'] },
  { key: 'barn', keywords: ['barn', 'ungdom'] },
];

const DEFAULT_GROUP_META = {
  icons: [
    { src: 'icons/walk.svg', alt: 'Gående person' },
    { src: 'icons/wheelchair.svg', alt: 'Rullestolbruker' },
    { src: 'icons/assist.svg', alt: 'Assistent' },
    { src: 'icons/child.svg', alt: 'Barn' },
    { src: 'icons/child2.svg', alt: 'Ungdom' },
  ],
  passerFor: 'Deltakere med ulike behov som ønsker trygg og tilrettelagt trening.',
};

const getGroupMeta = (card) => {
  const dataKey = card.dataset.gruppe;
  if (dataKey && GROUP_META[dataKey]) {
    return GROUP_META[dataKey];
  }

  const titleText = card.querySelector('.news-title')?.textContent?.toLowerCase() ?? '';
  const keywordMatch = GROUP_KEYWORDS.find(({ keywords }) =>
    keywords.some((keyword) => titleText.includes(keyword))
  );

  if (keywordMatch?.key && GROUP_META[keywordMatch.key]) {
    return GROUP_META[keywordMatch.key];
  }

  return DEFAULT_GROUP_META;
};

const createLocationInfo = () => {
  const container = document.createElement('div');
  container.classList.add('location-info');

  const icon = document.createElement('img');
  icon.classList.add('icon');
  icon.src = LOCATION_DETAILS.icon.src;
  icon.alt = LOCATION_DETAILS.icon.alt;
  container.appendChild(icon);

  const text = document.createElement('span');
  text.textContent = LOCATION_DETAILS.text;
  container.appendChild(text);

  return container;
};

const createGroupIcons = (icons = []) => {
  if (!icons.length) {
    return null;
  }

  const container = document.createElement('div');
  container.classList.add('group-icons');

  icons.forEach(({ src, alt }) => {
    const icon = document.createElement('img');
    icon.classList.add('icon');
    icon.src = src;
    icon.alt = alt;
    container.appendChild(icon);
  });

  return container;
};

const createGroupFit = (passerFor) => {
  if (!passerFor) {
    return null;
  }

  const paragraph = document.createElement('p');
  paragraph.classList.add('group-fit');

  const label = document.createElement('strong');
  label.textContent = 'Passer for:';
  paragraph.appendChild(label);
  paragraph.appendChild(document.createTextNode(` ${passerFor}`));

  return paragraph;
};

const initNewsCardMeta = () => {
  document.querySelectorAll('.news-card').forEach((card) => {
    if (card.querySelector('.card-meta')) {
      return;
    }

    const { icons, passerFor } = getGroupMeta(card);

    const meta = document.createElement('div');
    meta.classList.add('card-meta');

    meta.appendChild(createLocationInfo());

    const iconRow = createGroupIcons(icons);
    if (iconRow) {
      meta.appendChild(iconRow);
    }

    const fitText = createGroupFit(passerFor);
    if (fitText) {
      meta.appendChild(fitText);
    }

    const image = card.querySelector('img');
    if (image) {
      image.insertAdjacentElement('afterend', meta);
    } else {
      card.prepend(meta);
    }
  });
};

window.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  initNavigation();
  highlightNavigation();
  initFooterYear();
  initContactForm();
  oppdaterTreningskort();
  initNewsCardMeta();
});
