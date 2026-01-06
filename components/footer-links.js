(() => {
  const resolvePrefix = () => {
    if (typeof window !== "undefined") {
      if (typeof window.MYSS_PREFIX !== "undefined" && window.MYSS_PREFIX !== null) return window.MYSS_PREFIX;
      if (typeof window.__prefix !== "undefined" && window.__prefix) return window.__prefix;
      if (window.location.pathname.includes("/treningstilbud/")) return "../";
      if (window.location.pathname.includes("/qr/")) return "../../";
    }
    return "";
  };

  const footerLinksHTML = (prefix = "") => `
    <div class="site-nav__columns">
      <div class="site-nav__column">
        <h2 class="site-nav__heading">Våre tjenester</h2>
        <ul class="site-nav__list">
          <li><a href="${prefix}gruppetrening.html" class="site-nav__link">Gruppetrening på apparat</a></li>
          <li><a href="${prefix}kurs og seminar.html" class="site-nav__link">Kurs og seminar</a></li>
          <li><a href="${prefix}treningssystem.html" class="site-nav__link">QR/NFC treningssystem</a></li>
        </ul>
      </div>

      <div class="site-nav__column">
        <h2 class="site-nav__heading">Informasjon</h2>
        <ul class="site-nav__list">
          <li><a href="${prefix}om-oss.html" class="site-nav__link">Om oss</a></li>
          <li><a href="${prefix}Individuelloppfølging.html" class="site-nav__link">Teamet</a></li>
          <li><a href="${prefix}presse.html" class="site-nav__link">Presse og media</a></li>
          <li><a href="${prefix}samarbeid.html" class="site-nav__link">Samarbeid</a></li>
        </ul>
      </div>

      <div class="site-nav__column">
        <h2 class="site-nav__heading">My Strongest Side</h2>
        <ul class="site-nav__list">
          <li><a href="${prefix}index.html" class="site-nav__link">Forside</a></li>
          <li><a href="${prefix}kontakt.html" class="site-nav__link">Kontakt</a></li>
        </ul>
      </div>
    </div>
  `;

  const ready = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else fn();
  };

  ready(() => {
    const prefix = resolvePrefix();
    window.MYSS_PREFIX = prefix;
    window.__prefix = prefix;

    const slot = document.querySelector("[data-footer-links]");
    if (!slot) return;

    if (!slot.innerHTML || !slot.innerHTML.trim()) {
      slot.innerHTML = footerLinksHTML(prefix);
    }

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  });
})();
