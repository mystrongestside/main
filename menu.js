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

  updateFooterYear();
  syncAria();
})();
