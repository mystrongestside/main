// /components/footer-links.js
(() => {
  const mount = (selector, title, items) => {
    const host = document.querySelector(selector);
    if (!host) return;

    // Ikke overskriv hvis noe allerede ligger der
    if (host.childElementCount > 0) return;

    const esc = (s) => String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

    host.innerHTML = `
      <h3 class="site-footer__title">${esc(title)}</h3>
      <ul class="site-footer__list">
        ${items.map(i => `
          <li>
            <a class="site-footer__link" href="${esc(i.href)}">${esc(i.label)}</a>
          </li>
        `).join("")}
      </ul>
    `;
  };

  const init = () => {
    mount("[data-footer-links-info]", "Informasjon", [
      { label: "Presse og media", href: "/presse-og-media.html" },
      { label: "Samarbeid", href: "/samarbeid.html" },
      { label: "Personvern", href: "/personvern.html" }
    ]);

    mount("[data-footer-links-brand]", "My Strongest Side", [
      { label: "Kontakt", href: "/kontakt.html" },
      { label: "Teamet", href: "/teamet.html" }
    ]);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
