const btn = document.getElementById('hamburger');
const menu = document.getElementById('nav-menu');
btn?.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('active', !open); // viser/skjuler meny
});
