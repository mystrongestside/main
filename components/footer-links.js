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

  const footerLinksHTML = (prefix = "") => ({
    services: `
      <h3 class="footer-title">Våre tjenester</h3>
      <ul class="footer-list">
        <li><a href="${prefix}gruppetrening.html">Gruppetrening på apparat</a></li>
        <li><a href="${prefix}kurs og seminar.html">Kurs og seminar</a></li>
        <li><a href="${prefix}treningssystem.html">QR/NFC treningssystem</a></li>
      </ul>
    `,
    info: `
      <h3 class="footer-title">Informasjon</h3>
      <ul class="footer-list">
        <li><a href="${prefix}om-oss.html">Om oss</a></li>
        <li><a href="${prefix}Individuelloppfølging.html">Teamet</a></li>
        <li><a href="${prefix}presse.html">Presse og media</a></li>
        <li><a href="${prefix}samarbeid.html">Samarbeid</a></li>
      </ul>
    `,
    brand: `
      <h3 class="footer-title">My Strongest Side</h3>
      <ul class="footer-list">
        <li><a href="${prefix}index.html">Forside</a></li>
        <li><a href="${prefix}kontakt.html">Kontakt</a></li>
      </ul>
    `,
    legacy: `
      <div class="footer-links-grid">
        <div class="footer-col">
          <h3 class="footer-title">Våre tjenester</h3>
          <ul class="footer-list">
            <li><a href="${prefix}gruppetrening.html">Gruppetrening på apparat</a></li>
            <li><a href="${prefix}kurs og seminar.html">Kurs og seminar</a></li>
            <li><a href="${prefix}treningssystem.html">QR/NFC treningssystem</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-title">Informasjon</h3>
          <ul class="footer-list">
            <li><a href="${prefix}om-oss.html">Om oss</a></li>
            <li><a href="${prefix}Individuelloppfølging.html">Teamet</a></li>
            <li><a href="${prefix}presse.html">Presse og media</a></li>
            <li><a href="${prefix}samarbeid.html">Samarbeid</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-title">My Strongest Side</h3>
          <ul class="footer-list">
            <li><a href="${prefix}index.html">Forside</a></li>
            <li><a href="${prefix}kontakt.html">Kontakt</a></li>
          </ul>
        </div>
      </div>
    `,
  });

  const ready = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else fn();
  };

  ready(() => {
    const prefix = resolvePrefix();
    window.MYSS_PREFIX = prefix;
    window.__prefix = prefix;

    const sections = footerLinksHTML(prefix);
    const servicesSlots = document.querySelectorAll("[data-footer-links-services]");
    const infoSlots = document.querySelectorAll("[data-footer-links-info]");
    const brandSlots = document.querySelectorAll("[data-footer-links-brand]");
    const legacySlot = document.querySelector("[data-footer-links]");

    if (servicesSlots.length || infoSlots.length || brandSlots.length) {
      servicesSlots.forEach((slot) => {
        slot.innerHTML = sections.services;
      });
      infoSlots.forEach((slot) => {
        slot.innerHTML = sections.info;
      });
      brandSlots.forEach((slot) => {
        slot.innerHTML = sections.brand;
      });
    } else if (legacySlot) {
      legacySlot.innerHTML = sections.legacy;
    } else {
      return;
    }

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  });
})();
