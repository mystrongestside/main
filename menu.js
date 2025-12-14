(() => {
  const root = document.documentElement;

  function init() {
    const toggle = document.querySelector('.site-header__toggle');
    const nav = document.querySelector('.site-nav');
    const label = toggle?.querySelector('.site-header__toggle-label');
    const header = document.querySelector('.site-header');

    if (!toggle || !nav || !header) return;

    const headerH = Math.round(header.getBoundingClientRect().height);

    const applyOpenStyles = (open) => {
      if (open) {
        // Force visible + fixed overlay (bypasses sticky/height bugs)
        nav.style.position = 'fixed';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.top = `${headerH}px`;
        nav.style.height = `calc(100vh - ${headerH}px)`;
        nav.style.maxHeight = 'none';
        nav.style.overflow = 'auto';
        nav.style.webkitOverflowScrolling = 'touch';
        nav.style.background = '#fff';
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
        nav.style.visibility = 'visible';
        nav.style.pointerEvents = 'auto';
        nav.style.zIndex = '2147483646';

        header.style.zIndex = '2147483647';
        toggle.style.zIndex = '2147483647';
      } else {
        // Remove forced styles
        nav.removeAttribute('style');
        header.style.zIndex = '';
        toggle.style.zIndex = '';
      }
    };

    const setOpen = (open) => {
      nav.classList.toggle('site-nav--open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      root.classList.toggle('nav-open', open);
      document.body.classList.toggle('nav-open', open);
      if (label) label.textContent = open ? 'Lukk menyen' : 'Vis menyen';
      applyOpenStyles(open);
    };

    const isOpen = () => nav.classList.contains('site-nav--open');

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      setOpen(!isOpen());
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
