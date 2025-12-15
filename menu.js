(() => {
  const headerTemplate = `
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
        <a href="index.html" class="site-header__logo">
          <img src="bilder/myss-logo-header.png" alt="My Strongest Side" />
        </a>
      </div>

      <div class="site-header__right site-header__actions">
        <a href="kontakt.html" class="btn btn--primary">Kontakt oss</a>
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
                  <li><a href="gruppetrening.html" class="site-nav__link">Gruppetrening på apparat</a></li>
                  <li><a href="Individuelloppfølging.html" class="site-nav__link">Individuell oppfølging</a></li>
                  <li><a href="foresatte.html" class="site-nav__link">Kurs og seminar</a></li>
                  <li><a href="qr/trening/index.html" class="site-nav__link">QR/NFC treningssystem</a></li>
                </ul>
              </div>

              <div class="site-nav__column">
                <h2 class="site-nav__heading">Informasjon</h2>
                <ul class="site-nav__list">
                  <li><a href="presse.html" class="site-nav__link">Presse og media</a></li>
                  <li><a href="samarbeid.html" class="site-nav__link">Samarbeid</a></li>
                </ul>
              </div>

              <div class="site-nav__column">
                <h2 class="site-nav__heading">My Strongest Side</h2>
                <ul class="site-nav__list">
                  <li><a href="index.html" class="site-nav__link">Forside</a></li>
                  <li><a href="kontakt.html" class="site-nav__link">Kontakt</a></li>
                </ul>
              </div>
            </div>
          </div>
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
    const root = document.documentElement;
    const body = document.body;
    const mount = document.querySelector("[data-component='site-header']");

    if (mount) {
      mount.classList.add("site-header");
      mount.innerHTML = headerTemplate;
    }

    const header = mount?.classList.contains("site-header") ? mount : document.querySelector(".site-header");
    const nav = header?.querySelector(".site-nav") || document.querySelector(".site-nav");
    const toggle = header?.querySelector(".site-header__toggle") || document.querySelector(".site-header__toggle");

    const updateFooterYear = () => {
      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    };

    // Hvis helt grunnleggende mangler, stopp uten å kræsje
    if (!header || !toggle || !nav) {
      updateFooterYear();
      return;
    }

    const isOpen = () => root.classList.contains("nav-open");

    const setFadeVars = (o, y) => {
      root.style.setProperty("--hdr-o", String(o));
      root.style.setProperty("--hdr-y", String(y));
    };

    // Finn "første tekst" i hero (tåler at den ikke finnes på alle sider)
    const findFirstText = () =>
      document.querySelector(".section.section--light .eyebrow") ||
      document.querySelector(".section.section--light h1");

    const clamp01 = (n) => Math.max(0, Math.min(1, n));

    // ---- Fade (robust) ----
    let ticking = false;

    const updateHeaderFade = () => {
      ticking = false;

      // Hvis ingen header eller ingen hero-tekst: ikke gjør noe fancy
      if (!header) {
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

      // Lengre, roligere fade
      const start = headerH * 3.2;
      const end = headerH * 1.2;
      const denom = (start - end) || 1;

      let p = clamp01((start - textTop) / denom);

      // smoothstep (myk kurve)
      p = p * p * (3 - 2 * p);

      const opacity = 1 - p;
      const translateY = -p * 18; // mest fade, lite flytt

      setFadeVars(opacity, `${translateY}px`);
    };

    const requestFadeUpdate = () => {
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

      // Etter state change, normaliser header-fade
      requestFadeUpdate();
    };

    // Toggle click (bruk capture=false, og stopp hvis nødvendig)
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      setOpen(!isOpen());
    });

    // Klikk på lenke i meny lukker
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

    // ESC lukker
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) setOpen(false);
    });

    // Fade listeners
    window.addEventListener("scroll", requestFadeUpdate, { passive: true });
    window.addEventListener("resize", requestFadeUpdate);

    // Init
    updateFooterYear();
    toggle.setAttribute("aria-expanded", isOpen() ? "true" : "false");
    requestFadeUpdate();
  });
})();
