(() => {
  const root = document.documentElement;
  let initialized = false;
  let observer;

  const updateFooterYear = () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  };

  const initMenu = () => {
    if (initialized) return true;

    const toggle = document.querySelector('.site-header__toggle');
    const nav = document.querySelector('.site-nav');
    const header = toggle?.closest('header') || document.querySelector('.site-header');
    const label = toggle?.querySelector('.site-header__toggle-label');

    if (!toggle || !nav || !header) return false;

    const syncHeaderHeightVar = () => {
      root.style.setProperty('--header-height', `${Math.round(header.getBoundingClientRect().height)}px`);
    };

    const setOpen = (open) => {
      syncHeaderHeightVar();
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.classList.toggle('is-open', open);
      root.classList.toggle('nav-open', open);
      document.body.classList.toggle('nav-open', open);
      if (label) label.textContent = open ? 'Lukk menyen' : 'Vis menyen';
    };

    const isOpen = () => root.classList.contains('nav-open');

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

    document.addEventListener('click', (e) => {
      if (!isOpen()) return;
      const inside = nav.contains(e.target) || toggle.contains(e.target);
      if (!inside) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) setOpen(false);
    });

    window.addEventListener('resize', () => {
      if (isOpen()) syncHeaderHeightVar();
    });

    syncHeaderHeightVar();
    updateFooterYear();

    initialized = true;
    return true;
  };

  const attemptInit = () => {
    if (initMenu() && observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const waitForMenu = () => {
    if (initialized) return;

    observer = new MutationObserver(() => {
      attemptInit();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  const onReady = () => {
    attemptInit();
    if (!initialized) {
      waitForMenu();
      attemptInit();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
