// Hamburger toggle for mobil
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  const toggle = () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('active');
  };

  hamburger.addEventListener('click', toggle);

  // Lukk meny hvis du klikker lenke (mobil)
  navMenu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      hamburger.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    }
  });

  // Lukk ved escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hamburger.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    }
  });
}
