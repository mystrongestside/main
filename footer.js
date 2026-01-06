/* /footer.js (eller /components/site-footer.js)
   MySS footer – 4 kolonner, stabile prefix-lenker, samme innhold som menyen
*/
(() => {
  const resolvePrefix = () => {
    if (typeof window !== "undefined") {
      if (typeof window.MYSS_PREFIX !== "undefined" && window.MYSS_PREFIX !== null)
        return window.MYSS_PREFIX;
      if (typeof window.__prefix !== "undefined" && window.__prefix)
        return window.__prefix;

      // samme logikk som header: tilpass ved behov
      if (window.location.pathname.includes("/treningstilbud/")) return "../";
      if (window.location.pathname.includes("/qr/")) return "../../";
    }
    return "";
  };

  // 🔁 Bytt kun href-ene her så de matcher menyen 1:1
  // (teksten kan stå slik den er i skjermbildet)
  const footerTemplate = (p = "") => `
    <div class="site-footer__inner container">
      <div class="site-footer__grid" role="navigation" aria-label="Bunnmeny">
        
    

       <div class="site-footer__col">
  <h3 class="site-footer__title">Informasjon</h3>
  <nav class="site-footer__nav" aria-label="Informasjon">
    <a class="site-footer__link" href="${p}presse-og-media.html">Presse og media</a>
    <a class="site-footer__link" href="${p}samarbeid.html">Samarbeid</a>
    <a class="site-footer__link" href="${p}personvern.html">Personvern</a>
  </nav>
</div>

<div class="site-footer__col">
  <h3 class="site-footer__title">My Strongest Side</h3>
  <nav class="site-footer__nav" aria-label="My Strongest Side">
    <a class="site-footer__link" href="${p}kontakt.html">Kontakt</a>
    <a class="site-footer__link" href="${p}teamet.html">Teamet</a>
  </nav>
</div>

        <div class="site-footer__col">
          <h3 class="site-footer__title">Kontakt</h3>
          <div class="site-footer__text">
            <div>My Strongest Side AS</div>
            <div>Brages veg 3</div>
            <div>5221 Nesttun</div>

            <div style="height:.75rem"></div>

            <div>E-post:</div>
            <div><a class="site-footer__link" href="mailto:post@mystrongestside.no">post@mystrongestside.no</a></div>

            <div style="height:.75rem"></div>

            <div>Telefon: <a class="site-footer__link" href="tel:+4741439384">+47 41 43 93 84</a></div>
          </div>
        </div>

      </div>
    </div>
  `;

  const inject = () => {
    const host = document.querySelector('[data-component="site-footer"]');
    if (!host) return;
    const p = resolvePrefix();
    host.innerHTML = footerTemplate(p);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
