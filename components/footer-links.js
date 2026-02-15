(() => {
  const esc = (s) => String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const mount = (selector, title, items) => {
    const host = document.querySelector(selector);
    if (!host) return;

    // Ikke overskriv hvis noe allerede ligger der
    if (host.childElementCount > 0) return;

    const liClass = (idx) => {
      // match "reveal d2/d3/d4" (d2 for første, d3 for andre, d4 for tredje osv)
      const d = Math.min(2 + idx, 4);
      return `reveal d${d}`;
    };

    host.innerHTML = `
      <h3 class="site-footer__heading reveal d2">${esc(title)}</h3>
      <ul class="site-footer__list">
        ${items.map((i, idx) => `
          <li class="${liClass(idx)}">
            <a class="site-footer__link" href="${esc(i.href)}">${esc(i.label)}</a>
          </li>
        `).join("")}
      </ul>
    `;
  };

  const init = () => {
    mount("[data-footer-links-services]", "Våre tjenester", [
      { label: "Treningstilbud", href: "/gruppetrening.html" },
      { label: "Kurs / seminar", href: "/kurs%20og%20seminar.html" },
      { label: "Treningssystem", href: "/treningssystem.html" }
    ]);

    mount("[data-footer-links-info]", "Informasjon", [
      { label: "Presse og media", href: "/presse.html" },          // hvis du bruker presse.html
      { label: "Samarbeid", href: "/samarbeid.html" },
      { label: "Personvern", href: "/personvern.html" },
      { label: "Cookies", href: "/cookies.html" }
    ]);

    mount("[data-footer-links-brand]", "My Strongest Side", [
      { label: "Kontakt", href: "/kontakt.html" },
      { label: "Teamet", href: "/Individuelloppfølging.html" }             // hvis det er riktig url hos deg
    ]);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
