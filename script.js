const buildHeaderTemplate = (prefix = '') => `
<header class="site-header" data-component="site-header">
  <nav class="navbar" role="navigation" aria-label="Hovedmeny">
    <div class="navbar-inner">
      <div class="navbar-left">
        <a href="${prefix}index.html" aria-label="Hjem">
          <img src="${prefix}hlogo.png" alt="My Strongest Side" class="logo">
        </a>
      </div>

      <div class="navbar-center" id="navbar-menu">
        <ul class="nav-links">
          <li><a href="${prefix}index.html" data-page="index.html">Forside</a></li>
          <li class="has-sub">
            <a href="#" class="nav-has-sub" aria-haspopup="true" aria-expanded="false">Tilbud</a>
            <ul class="dropdown">
              <li><a href="${prefix}treningstilbud/voksne-lett.html" data-page="voksne-lett.html">Styrketrening for voksne – lett nivå</a></li>
              <li><a href="${prefix}treningstilbud/tett-oppfolging.html" data-page="tett-oppfolging.html">Tilrettelagt styrketrening – tett oppfølging</a></li>
              <li><a href="${prefix}treningstilbud/barn-ungdom.html" data-page="barn-ungdom.html">Styrketrening for barn og ungdom</a></li>
              <li><a href="${prefix}foresatte.html" data-page="foresatte.html">Foresatte</a></li>
            </ul>
          </li>
          <li><a href="${prefix}om-oss.html" data-page="om-oss.html">Om oss</a></li>
          <li><a href="${prefix}treningstilbud.html" data-page="treningstilbud.html,voksne-lett.html,tett-oppfolging.html,barn-ungdom.html">Treningstilbud</a></li>
          <li><a href="${prefix}kurs.html" data-page="kurs.html">Kurs</a></li>
          <li><a href="${prefix}frivillig.html" data-page="frivillig.html">Frivillig</a></li>
          <li><a href="${prefix}kontakt.html" data-page="kontakt.html">Kontakt</a></li>
        </ul>
      </div>

      <div class="navbar-right show-desktop">
        <a href="${prefix}index.html#treningstilbud" class="btn-pill btn-pill--orange">Se våre treningstilbud</a>
      </div>

      <button id="hamburger" class="hamburger show-mobile" aria-expanded="false" aria-controls="navbar-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="nav-overlay" data-js="nav-overlay" hidden></div>
</header>
`;

const buildFooterTemplate = (prefix = '') => `
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
      <img src="${prefix}logo-orange.png" alt="My Strongest Side" class="footer-logo" />
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

const resolvePathPrefix = () => (window.location.pathname.includes('/treningstilbud/') ? '../' : '');

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
  const prefix = resolvePathPrefix();
  const headerTarget = document.querySelector('[data-component="site-header"]');
  if (headerTarget) {
    headerTarget.outerHTML = buildHeaderTemplate(prefix);
  } else if (!document.querySelector('.site-header')) {
    document.body.insertAdjacentHTML('afterbegin', buildHeaderTemplate(prefix));
  }

  const footerTarget = document.querySelector('[data-component="site-footer"]');
  if (footerTarget) {
    footerTarget.outerHTML = buildFooterTemplate(prefix);
  } else if (!document.querySelector('.site-footer')) {
    document.body.insertAdjacentHTML('beforeend', buildFooterTemplate(prefix));
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

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
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

const LOCATION_META = {
  text: 'Bergen – Fantoft',
  iconSrc: 'icons/location.svg',
};

const getGmfcsMetaForTitle = (titleText = '') => {
  const normalized = titleText.toLowerCase();

  if (normalized.includes('lett')) {
    return {
      src: 'gmfcs1-2_myss.png',
      alt: 'GMFCS nivå I–II – Lett funksjonsnivå',
    };
  }

  if (normalized.includes('tett')) {
    return {
      src: 'gmfcs3-5_myss.png',
      alt: 'GMFCS nivå III–V – Tett oppfølging',
    };
  }

  if (normalized.includes('ungdom') || normalized.includes('barn')) {
    return {
      src: 'gmfcs-all.png',
      alt: 'Alle GMFCS-nivåer – Barn og ungdom',
    };
  }

  if (
    normalized.includes('kognitiv') ||
    normalized.includes('lærevansker') ||
    normalized.includes('pu')
  ) {
    return {
      src: 'kognitivstøtte_myss.png',
      alt: 'Kognitiv støtte – Tilpasset læring og veiledning',
    };
  }

  return {
    src: 'gmfcs-all.png',
    alt: 'Tilrettelagt trening',
  };
};

const initNewsCardMeta = () => {
  document.querySelectorAll('.news-card').forEach((card) => {
    if (card.querySelector('.card-meta')) {
      return;
    }

    const titleText = card.querySelector('.news-title')?.textContent ?? '';
    const { src, alt } = getGmfcsMetaForTitle(titleText);

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

    const icon = document.createElement('img');
    icon.classList.add('gmfcs-icon');
    icon.src = src;
    icon.alt = alt;
    meta.appendChild(icon);

    const image = card.querySelector('.news-media') ?? card.querySelector('img');
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
