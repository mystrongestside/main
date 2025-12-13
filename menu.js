document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.site-header__toggle');
  const nav = document.querySelector('.site-nav');
  const yearSpan = document.getElementById('year');

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('site-nav--open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

    document.documentElement.classList.toggle('nav-open', open);
    document.body.classList.toggle('nav-open', open);

    const label = toggle.querySelector('.site-header__toggle-label');
    if (label) label.textContent = open ? 'Lukk menyen' : 'Vis menyen';
  }

  // Start lukket
  setOpen(false);

  // ÉN event som er stabil på mobil
  toggle.addEventListener('pointerup', (e) => {
    e.preventDefault();
    setOpen(!nav.classList.contains('site-nav--open'));
  });

  // ESC lukker
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  // Klikk på lenke lukker
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
});
