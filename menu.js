(() => {
  const root = document.documentElement;
  const body = document.body;

  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.site-header__toggle');
  const header = document.querySelector('.site-header');

  const updateFooterYear = () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  };

  const isOpen = () => root.classList.contains('nav-open');

  const setHeaderFadeVars = (o = '1', y = '0px') => {
    root.style.setProperty('--hdr-o', o);
    root.style.setProperty('--hdr-y', y);
  };

  // Bruk første tekst i hero som referanse (eyebrow eller h1)
  const firstText =
    document.querySelector('.section.section--light .eyebrow') ||
    document.querySelector('.section.section--light h1');

  const clamp01 = (n) => Math.max(0, Math.min(1, n));
  let ticking = false;

  const updateHeaderScrollFade = () => {
    ticking = false;

    // Hvis vi ikke har header/hero-tekst: sørg for normal header
    if (!header || !firstText) {
      setHeaderFadeVars('1', '0px');
      return;
    }

    // Ikke fade når menyen er åpen
    if (isOpen()) {
      setHeaderFadeVars('1', '0px');
      return;
    }

    const headerH = header.offsetHeight || 80;
    const textTop = firstText.getBoundingClientRect().top;

    const start = headerH * 2.2;
    const end = headerH * 0.9;

    const denom = (start - end) || 1; // failsafe mot deling på 0
    const p = clamp01((start - textTop) / denom);

    setHeaderFadeVars(String(1 - p), `${-p * (headerH + 12)}px`);
  };

  const requestFadeUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateHeaderScrollFade);
  };

  const setOpen = (open) => {
    if (nav) nav.classList.toggle('site-nav--open', open);

    root.classList.toggle('nav-open', open);
    body.classList.toggle('nav-open', open);

    if (toggle) {
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

      const label = toggle.querySelector('.site-header__toggle-label');
      if (label) label.textContent = open ? 'Lukk menyen' : 'Vis menyen';
    }

    // Viktig: etter endring av meny-state, oppdater fade riktig
    requestFadeUpdate();
  };

  // Click-håndtering
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    // Toggle åpne/lukk
    if (target.closest('.site-header__toggle')) {
      event.preventDefault();
      setOpen(!isOpen());
      return;
    }

    // Klikk på lenke i meny lukker
    if (target.closest('.site-nav a')) {
      setOpen(false);
    }
  });

  // ESC lukker
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setOpen(false);
  });

  // Init
  updateFooterYear();
  if (toggle) toggle.setAttribute('aria-expanded', isOpen() ? 'true' : 'false');

  // Fade listeners (bare hvis vi faktisk har noe å fade mot)
  window.addEventListener('scroll', requestFadeUpdate, { passive: true });
  window.addEventListener('resize', requestFadeUpdate);
  updateHeaderScrollFade();
})();
