 (() => {
  const root = document.documentElement;

  const updateFooterYear = () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  };

  const isOpen = () => root.classList.contains('nav-open');

  const setOpen = (open) => {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.site-header__toggle');

    if (nav) nav.classList.toggle('site-nav--open', open);

    root.classList.toggle('nav-open', open);
    document.body.classList.toggle('nav-open', open);

    if (toggle) {
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      const label = toggle.querySelector('.site-header__toggle-label');
      if (label) label.textContent = open ? 'Lukk menyen' : 'Vis menyen';
    }
  };

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest('.site-header__toggle')) {
      event.preventDefault();
      setOpen(!isOpen());
      return;
    }

    if (target.closest('.site-nav__close')) {
      setOpen(false);
      return;
    }

    if (target.closest('.site-nav a')) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
    }
  });

  const syncAria = () => {
    const toggle = document.querySelector('.site-header__toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', isOpen() ? 'true' : 'false');
    }
  };

  // Init
  updateFooterYear();
  syncAria();

  // Header: fade/glid opp mens du scroller ned mot første tekst i hero
  const header = document.querySelector('.site-header');

  const firstText =
    document.querySelector('.section.section--light .eyebrow') ||
    document.querySelector('.section.section--light h1');

  let ticking = false;

  const clamp01 = (n) => Math.max(0, Math.min(1, n));

  const updateHeaderScrollFade = () => {
    ticking = false;
    if (!header || !firstText) return;

    // Ikke fade når menyen er åpen
    if (root.classList.contains('nav-open')) {
      root.style.setProperty('--hdr-o', '1');
      root.style.setProperty('--hdr-y', '0px');
      return;
    }

    const headerH = header.offsetHeight || 80;
    const textTop = firstText.getBoundingClientRect().top;

    const start = headerH * 2.0;   // start fade
    const end = headerH + 10;      // ferdig fade

    const p = clamp01((start - textTop) / (start - end));

    root.style.setProperty('--hdr-o', String(1 - p));
    root.style.setProperty('--hdr-y', `${-p * (headerH + 12)}px`);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateHeaderScrollFade);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateHeaderScrollFade);
  updateHeaderScrollFade();
})();

