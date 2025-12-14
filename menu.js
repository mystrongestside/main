console.log("menu.js loaded");

(() => {
  const init = () => {
    const root = document.documentElement;

    // Footer-år
    const updateFooterYear = () => {
      const yearEl = document.getElementById('year');
      if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    };

    // Meny-state
    const isOpen = () => root.classList.contains('nav-open');

    // Fade scheduler (defineres senere, men brukes i setOpen)
    let requestFadeUpdate = () => {};

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

      // Viktig: oppdater fade etter åpne/lukk
      requestFadeUpdate();
    };

    // Klikk-håndtering
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

    // Synk ARIA ved init
    const syncAria = () => {
      const toggle = document.querySelector('.site-header__toggle');
      if (toggle) toggle.setAttribute('aria-expanded', isOpen() ? 'true' : 'false');
    };

    // ===== Header: gradvis fade ut når du nærmer deg hero-tekst =====
    const header = document.querySelector('.site-header');

    const getFirstText = () =>
      document.querySelector('.section.section--light .eyebrow') ||
      document.querySelector('.section.section--light h1');

    let ticking = false;
    const clamp01 = (n) => Math.max(0, Math.min(1, n));

   const updateHeaderScrollFade = () => {
  ticking = false;

  const firstText = getFirstText();

  // 1️⃣ Hvis vi er helt på toppen: header skal ALLTID være synlig
  if (window.scrollY === 0) {
    root.style.setProperty('--hdr-o', '1');
    root.style.setProperty('--hdr-y', '0px');
    return;
  }

  // 2️⃣ Hvis noe mangler: normal header
  if (!header || !firstText) {
    root.style.setProperty('--hdr-o', '1');
    root.style.setProperty('--hdr-y', '0px');
    return;
  }

  // 3️⃣ Ikke fade når menyen er åpen
  if (isOpen()) {
    root.style.setProperty('--hdr-o', '1');
    root.style.setProperty('--hdr-y', '0px');
    return;
  }

  const headerH = header.offsetHeight || 80;
  const textTop = firstText.getBoundingClientRect().top;

  // Rolig, lang fade
  const start = headerH * 3.2;
  const end   = headerH * 1.2;
  const denom = (start - end) || 1;

  let p = clamp01((start - textTop) / denom);

  // smoothstep
  p = p * p * (3 - 2 * p);

  root.style.setProperty('--hdr-o', String(1 - p));
  root.style.setProperty('--hdr-y', `${-p * 18}px`);
};
      ticking = false;

      const firstText = getFirstText();

      // Hvis noe mangler: sørg for normal header
      if (!header || !firstText) {
        root.style.setProperty('--hdr-o', '1');
        root.style.setProperty('--hdr-y', '0px');
        return;
      }

      // Ikke fade når menyen er åpen
      if (isOpen()) {
        root.style.setProperty('--hdr-o', '1');
        root.style.setProperty('--hdr-y', '0px');
        return;
      }

      const headerH = header.offsetHeight || 80;
      const textTop = firstText.getBoundingClientRect().top;

      // Lengre og roligere fade
      const start = headerH * 3.2; // start senere
      const end = headerH * 1.2;   // slutt senere

      const denom = (start - end) || 1;

      // progress 0..1
      let p = clamp01((start - textTop) / denom);

      // myk kurve (ease-in-out)
      p = p * p * (3 - 2 * p);

      root.style.setProperty('--hdr-o', String(1 - p));

      // Juster glid opp: bruk liten verdi for mest fade, lite flytt
      root.style.setProperty('--hdr-y', `${-p * 18}px`);
    };

    requestFadeUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateHeaderScrollFade);
    };

    window.addEventListener('scroll', requestFadeUpdate, { passive: true });
    window.addEventListener('resize', requestFadeUpdate);

    // Init
    updateFooterYear();
    syncAria();
    requestFadeUpdate();
  };

  // Kjør når DOM er klar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
