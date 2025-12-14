(() => {
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

    const nav = document.querySelector(".site-nav");
    const toggle = document.querySelector(".site-header__toggle");
    const header = document.querySelector(".site-header");

    // Hvis helt grunnleggende mangler, stopp uten å kræsje
    if (!toggle || !nav) {
      console.warn("menu.js: mangler .site-header__toggle eller .site-nav");
      return;
    }

    const updateFooterYear = () => {
      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    };

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
