(() => {
  const resolvePrefix = () => {
    if (typeof window !== "undefined") {
      if (typeof window.MYSS_PREFIX !== "undefined" && window.MYSS_PREFIX !== null)
        return window.MYSS_PREFIX;
      if (typeof window.__prefix !== "undefined" && window.__prefix)
        return window.__prefix;
      if (window.location.pathname.includes("/treningstilbud/")) return "../";
      if (window.location.pathname.includes("/qr/")) return "../../";
    }
    return "";
  };

  const headerTemplate = (prefix = "") => `
    <div class="site-header__inner container">
      <div class="site-header__left">
        <button class="site-header__toggle"
          aria-label="Åpne meny"
          aria-expanded="false"
          aria-controls="hovedmeny"
          type="button">
          <span class="site-header__toggle-box" aria-hidden="true">
            <span class="site-header__toggle-line"></span>
            <span class="site-header__toggle-line"></span>
            <span class="site-header__toggle-line"></span>
          </span>
          <span class="site-header__toggle-label">Vis menyen</span>
        </button>
      </div>

      <div class="site-header__center">
        <a href="${prefix}index.html" class="site-header__logo">
          <img src="${prefix}bilder/myss-logo-header.png" alt="My Strongest Side" />
        </a>
      </div>

      <div class="site-header__right site-header__actions">
        <a href="${prefix}kontakt.html" class="btn btn--primary">Kontakt oss</a>
      </div>
    </div>

    <nav class="site-nav" aria-label="Hovedmeny" id="hovedmeny">
      <div class="site-nav__top">
        <div class="site-nav__top-inner container">
          <div class="site-nav__brand">Meny</div>
          <button class="site-nav__close" type="button" aria-label="Lukk menyen">
            ✕ <span class="site-nav__close-label">Lukk menyen</span>
          </button>
        </div>
      </div>

      <div class="site-nav__scroll">
        <div class="site-nav__panel">
          <div class="site-nav__inner container nav-editorial">
            <div class="site-nav__columns">
              <div class="site-nav__column">
                <h2 class="site-nav__heading">Våre tjenester</h2>
                <ul class="site-nav__list">
                  <li><a href="${prefix}gruppetrening.html" class="site-nav__link">Gruppetrening på apparat</a></li>
                  <li><a href="${prefix}kurs og seminar.html" class="site-nav__link">Kurs og seminar</a></li>
                  <li><a href="${prefix}treningssystem.html" class="site-nav__link">Tæpp og tren</a></li>
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
          </div>
        </div>
      </div>
    </nav>
  `;

  // Topp og meny for sider med <body class="design-2026"> (se DESIGN.md).
  // Samme menypunkter og klassenavn som over, slik at koden under virker likt.
  const arrowIcon = `<svg class="pil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  const logo2026 = (prefix) => `
        <a href="${prefix}index.html" class="site-header__logo">
          <img src="${prefix}bilder/myss-logo-footer.png" alt="My Strongest Side" width="900" height="270" />
        </a>`;
  const navLink2026 = (prefix, href, label) =>
    `<li><a href="${prefix}${href}" class="site-nav__link">${label}${arrowIcon}</a></li>`;

  const headerTemplate2026 = (prefix = "") => `
    <div class="site-header__inner ramme">
      ${logo2026(prefix)}
      <nav class="site-header__snarveier" aria-label="Snarveier">
        <a href="${prefix}gruppetrening.html">Gruppetrening på apparat</a>
        <a href="${prefix}kurs og seminar.html">Kurs og seminar</a>
        <a href="${prefix}treningssystem.html">Tæpp og tren</a>
        <a href="${prefix}om-oss.html">Om oss</a>
      </nav>
      <a href="${prefix}kontakt.html" class="knapp-rolig knapp-rolig--lav site-header__kontakt">Kontakt oss</a>
      <button class="site-header__toggle" aria-expanded="false" aria-controls="hovedmeny" type="button">
        <svg class="pil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        <span class="site-header__toggle-label">Vis menyen</span>
      </button>
    </div>

    <nav class="site-nav" aria-label="Hovedmeny" id="hovedmeny">
      <div class="site-nav__top ramme">
        ${logo2026(prefix)}
        <button class="site-nav__close" type="button">
          <svg class="pil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>
          <span class="site-nav__close-label">Lukk menyen</span>
        </button>
      </div>
      <div class="site-nav__columns ramme">
        <div class="site-nav__column">
          <h2 class="site-nav__heading">Våre tjenester</h2>
          <ul class="site-nav__list">
            ${navLink2026(prefix, "gruppetrening.html", "Gruppetrening på apparat")}
            ${navLink2026(prefix, "kurs og seminar.html", "Kurs og seminar")}
            ${navLink2026(prefix, "treningssystem.html", "Tæpp og tren")}
          </ul>
        </div>
        <div class="site-nav__column">
          <h2 class="site-nav__heading">Informasjon</h2>
          <ul class="site-nav__list">
            ${navLink2026(prefix, "om-oss.html", "Om oss")}
            ${navLink2026(prefix, "Individuelloppfølging.html", "Teamet")}
            ${navLink2026(prefix, "presse.html", "Presse og media")}
            ${navLink2026(prefix, "samarbeid.html", "Samarbeid")}
          </ul>
        </div>
        <div class="site-nav__column">
          <h2 class="site-nav__heading">My Strongest Side</h2>
          <ul class="site-nav__list">
            ${navLink2026(prefix, "index.html", "Forside")}
            ${navLink2026(prefix, "kontakt.html", "Kontakt")}
          </ul>
        </div>
      </div>
    </nav>
  `;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  ready(() => {
    const prefix = resolvePrefix();
    window.MYSS_PREFIX = prefix;
    window.__prefix = prefix;

    const root = document.documentElement;
    const body = document.body;
    const is2026 = body.classList.contains("design-2026");

    const enforceSafeBlankLinks = () => {
      document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        const rel = new Set((link.getAttribute('rel') || '').toLowerCase().split(/\s+/).filter(Boolean));
        rel.add('noopener');
        rel.add('noreferrer');
        link.setAttribute('rel', Array.from(rel).join(' '));
      });
    };

    const updateFooterYear = () => {
      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    };

    enforceSafeBlankLinks();

    // 1) Finn mount – eller lag en hvis den mangler (slutt på “ingenting skjer”)
    let mount = document.querySelector("[data-component='site-header']");
    if (!mount) {
      // Hvis det finnes en eksisterende header, bruk den. Hvis ikke: lag en.
      mount = document.querySelector("header.site-header");
      if (!mount) {
        mount = document.createElement("header");
        mount.setAttribute("data-component", "site-header");
        body.insertBefore(mount, body.firstChild);
      }
    }

    // Injiser template kun hvis mount er tom ELLER er data-component mount.
    // (hindrer at du “overskriver” en manuelt bygget header ved uhell)
    const isComponentMount = mount.matches("[data-component='site-header']");
    const isEmpty = !mount.innerHTML || !mount.innerHTML.trim();

    if (isComponentMount || isEmpty) {
      mount.classList.add("site-header");
      mount.innerHTML = is2026 ? headerTemplate2026(prefix) : headerTemplate(prefix);
    }

    const header = mount.classList.contains("site-header") ? mount : document.querySelector(".site-header");
    const nav = header?.querySelector(".site-nav") || document.querySelector(".site-nav");
    const toggle = header?.querySelector(".site-header__toggle") || document.querySelector(".site-header__toggle");

    // Hvis helt grunnleggende mangler, stopp uten å kræsje (men oppdater år)
    if (!header || !toggle || !nav) {
      updateFooterYear();
      return;
    }

    const isOpen = () => root.classList.contains("nav-open");

    const setFadeVars = (o, y) => {
      root.style.setProperty("--hdr-o", String(o));
      root.style.setProperty("--hdr-y", String(y));
    };

    // Finn "første tekst" i hero (tåler at den ikke finnes)
    const findFirstText = () =>
      document.querySelector(".section.section--light .eyebrow") ||
      document.querySelector(".section.section--light h1");

    const clamp01 = (n) => Math.max(0, Math.min(1, n));

    // ---- Fade (fikset: aldri 0-opasitet + kan skrus av pr side) ----
    let ticking = false;

    const fadeDisabled =
      body.classList.contains("no-header-fade") ||
      (window.matchMedia && window.matchMedia("(max-width: 900px)").matches);

    const updateHeaderFade = () => {
      ticking = false;

      // Ikke fade på sider du har sagt "nei" til fade, eller på mobil
      if (fadeDisabled) {
        setFadeVars(1, "0px");
        return;
      }

      // Ikke fade når meny er åpen
      if (isOpen()) {
        setFadeVars(1, "0px");
        return;
      }

      // På toppen: alltid fullt synlig
      if (window.scrollY <= 0) {
        setFadeVars(1, "0px");
        return;
      }

      const firstText = findFirstText();
      if (!firstText) {
        setFadeVars(1, "0px");
        return;
      }

      const headerH = header.offsetHeight || 80;
      const textTop = firstText.getBoundingClientRect().top;

      const start = headerH * 3.2;
      const end = headerH * 1.2;
      const denom = (start - end) || 1;

      let p = clamp01((start - textTop) / denom);
      p = p * p * (3 - 2 * p);

      // ✅ Kritisk: aldri la header bli usynlig
      const opacity = Math.max(0.92, 1 - p);
      const translateY = -p * 10;

      setFadeVars(opacity, `${translateY}px`);
    };

    const requestFadeUpdate = () => {
      if (is2026) return; // den nye toppen står stille
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateHeaderFade);
    };

    // ---- Meny open/close ----
    const setOpen = (open) => {
      nav.classList.toggle("site-nav--open", open);

      root.classList.toggle("nav-open", open);
      body.classList.toggle("nav-open", open);

      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");

      const label = toggle.querySelector(".site-header__toggle-label");
      if (label) label.textContent = open ? "Lukk menyen" : "Vis menyen";

      // Nye sider: menyen dekker hele skjermen. Resten av siden settes ut av
      // spill mens den er åpen, og fokus følger med inn og ut.
      if (is2026) {
        document.querySelectorAll("main, footer, .skip-link, .site-header__inner").forEach((el) => { el.inert = open; });
        const target = open ? nav.querySelector(".site-nav__close") : toggle;
        if (target && (open || nav.contains(document.activeElement) || document.activeElement === body)) target.focus();
      }

      requestFadeUpdate();
    };

    // Nye sider: marker siden du står på i meny og snarveier.
    if (is2026) {
      const here = decodeURIComponent(window.location.pathname).replace(/\/index\.html$/, "/");
      header.querySelectorAll("a[href]").forEach((link) => {
        if (link.classList.contains("site-header__logo")) return;
        const path = decodeURIComponent(new URL(link.getAttribute("href"), window.location.href).pathname).replace(/\/index\.html$/, "/");
        if (path === here) link.setAttribute("aria-current", "page");
      });
    }

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      setOpen(!isOpen());
    });

    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      if (target.closest(".site-nav__close")) {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) setOpen(false);
    });

    window.addEventListener("scroll", requestFadeUpdate, { passive: true });
    window.addEventListener("resize", requestFadeUpdate);

    // Init
    updateFooterYear();
    toggle.setAttribute("aria-expanded", isOpen() ? "true" : "false");
    requestFadeUpdate();
  });
})();
