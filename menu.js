(() => {
  const root = document.documentElement;

  function init() {
    const toggle = document.querySelector('.site-header__toggle');
    const nav = document.querySelector('.site-nav');
    const label = toggle?.querySelector('.site-header__toggle-label');
    const header = document.querySelector('.site-header');

    if (!toggle || !nav || !header) return;

    const headerHeight = () => Math.round(header.getBoundingClientRect().height);

    const syncHeaderHeightVar = () => {
      root.style.setProperty('--header-height', `${headerHeight()}px`);
    };

    const syncAriaExpanded = (open) => {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    const setOpen = (open) => {
      syncHeaderHeightVar();
      syncAriaExpanded(open);
      nav.classList.toggle('site-nav--open', open);
      toggle.classList.toggle('is-open', open);
      root.classList.toggle('nav-open', open);
      document.body.classList.toggle('nav-open', open);
      if (label) label.textContent = open ? 'Lukk menyen' : 'Vis menyen';
    };

    const isOpen = () => nav.classList.contains('site-nav--open');

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      setOpen(!isOpen());
    });

    nav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.closest('a')) {
        setOpen(false);
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!isOpen()) return;
      const inside = nav.contains(e.target) || toggle.contains(e.target);
      if (!inside) setOpen(false);
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) setOpen(false);
    });

    // Keep overlay aligned when header size changes (e.g., resize or rotate)
    window.addEventListener('resize', () => {
      if (isOpen()) syncHeaderHeightVar();
    });

    // Initialize header height for first render
    syncHeaderHeightVar();

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
