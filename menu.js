 (() => {
  const root = document.documentElement;

  function initMenu() {
    const toggle = document.querySelector('.site-header__toggle');
    const nav = document.querySelector('.site-nav');
    const label = toggle?.querySelector('.site-header__toggle-label');

    if (!toggle || !nav) return;

    // Ensure nav has an id for aria-controls
    if (!nav.id) nav.id = 'site-nav';
    toggle.setAttribute('aria-controls', nav.id);

    const setOpen = (open) => {
      nav.classList.toggle('site-nav--open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      root.classList.toggle('nav-open', open);
      if (label) label.textContent = open ? 'Lukk menyen' : 'Vis menyen';

      // Optional: keep focus sane
      if (open) {
        // Focus first link in menu (if exists)
        const firstLink = nav.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
        firstLink?.focus?.();
      } else {
        toggle.focus?.();
      }
    };

    const isOpen = () => nav.classList.contains('site-nav--open');

    // Use BOTH click and pointerup. Some mobile setups swallow pointer events at top.
    const onToggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(!isOpen());
    };

    toggle.addEventListener('click', onToggle, { passive: false });
    toggle.addEventListener('pointerup', onToggle, { passive: false });

    // Close when clicking a link in the menu
    nav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) setOpen(false);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) setOpen(false);
    });

    // Close if you tap outside (important on mobile)
    document.addEventListener('click', (e) => {
      if (!isOpen()) return;
      const inside = nav.contains(e.target) || toggle.contains(e.target);
      if (!inside) setOpen(false);
    });

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }
})();

