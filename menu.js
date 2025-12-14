 (() => {
  document.addEventListener('DOMContentLoaded', () => {
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

      // Oppdater fade etter meny-åpning/lukking
      requestFadeUpdate();
    };

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest('.site-header__toggle')) {
        event.preventDefault();
        setOpen(!isOpen());
        return;
      }

      if (target.closest('.site-nav a')) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) setOpen(false);
    });

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
      if (!header || !firstText) {
        root.style.setProperty('--hdr-o', '1');
        root.style.setProperty('--hdr-y', '0px');
        return;
      }

      if (isOpen()) {
        root.style.setProperty('--hdr-o', '1');
        root.style.setProperty('--hdr-y', '0px');
        return;
      }

      const headerH = header.offsetHeight || 80;
      const textTop = firstText.getBoundingClientRect().top;

      const start = headerH * 2.2;
      const end = headerH * 0.9;
      const denom = (start - end) || 1;

      const p = clamp01((start - textTop) / denom);

      root.style.setProperty('--hdr-o', String(1 - p));
      root.style.setProperty('--hdr-y', `${-p * (headerH + 12)}px`);
    };

    const requestFadeUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateHeaderScrollFade);
    };

    window.addEventListener('scroll', requestFadeUpdate, { passive: true });
    window.addEventListener('resize', requestFadeUpdate);

    updateFooterYear();
    requestFadeUpdate();
  });
})();

