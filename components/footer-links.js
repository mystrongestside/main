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

  const footerLinksHTML = (prefix = "", trainingPrefix = "", wrapTop = false) => `
    ${wrapTop ? '<div class="site-footer__top">' : ""}
      <div>
        <h3 class="site-footer__heading">Våre tjenester</h3>
        <ul class="site-footer__list">
          <li><a href="${trainingPrefix}voksne-lett.html">Voksne – lett funksjonsvariasjon</a></li>
          <li><a href="${prefix}gruppetrening.html">Gruppetrening</a></li>
          <li><a href="${prefix}frivillig.html">Frivilligprogram</a></li>
        </ul>
      </div>

      <div>
        <h3 class="site-footer__heading">Informasjon</h3>
        <ul class="site-footer__list">
          <li><a href="${prefix}presse.html">Presse og media</a></li>
          <li><a href="${prefix}samarbeid.html">Samarbeid</a></li>
          <li><a href="${prefix}personvern.html">Personvern</a></li>
        </ul>
      </div>

      <div>
        <h3 class="site-footer__heading">My Strongest Side</h3>
        <ul class="site-footer__list">
          <li><a href="${prefix}kontakt.html">Kontakt</a></li>
          <li><a href="${prefix}Individuelloppfølging.html">Teamet</a></li>
        </ul>
      </div>
    ${wrapTop ? "</div>" : ""}
  `;

  const footerLinksCompactHTML = (prefix = "", trainingPrefix = "") => `
    <h4>Våre tjenester</h4>
    <a href="${trainingPrefix}voksne-lett.html">Voksne – lett funksjonsvariasjon</a>
    <a href="${prefix}gruppetrening.html">Gruppetrening</a>
    <a href="${prefix}frivillig.html">Frivilligprogram</a>
    <h4>Informasjon</h4>
    <a href="${prefix}presse.html">Presse og media</a>
    <a href="${prefix}samarbeid.html">Samarbeid</a>
    <a href="${prefix}personvern.html">Personvern</a>
    <h4>My Strongest Side</h4>
    <a href="${prefix}kontakt.html">Kontakt</a>
    <a href="${prefix}Individuelloppfølging.html">Teamet</a>
  `;
  const ready = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else fn();
  };

  ready(() => {
    const prefix = resolvePrefix();
    const isTraining = window.location.pathname.includes("/treningstilbud/");
    const trainingPrefix = isTraining ? "" : `${prefix}treningstilbud/`;
    window.MYSS_PREFIX = prefix;
    window.__prefix = prefix;

    const slot = document.querySelector("[data-footer-links]");
    if (!slot) return;

    if (!slot.innerHTML || !slot.innerHTML.trim()) {
      if (slot.closest(".footer-links") && !slot.closest(".site-footer__top")) {
        slot.innerHTML = footerLinksCompactHTML(prefix, trainingPrefix);
      } else {
        const wrapTop = !slot.closest(".site-footer__top");
        slot.innerHTML = footerLinksHTML(prefix, trainingPrefix, wrapTop);
      }
    }

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  });
})();
