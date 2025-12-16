/**
 * MySS – FEILSØK LASTING (CSS/JS + meny)
 * Limer du inn denne, får du tydelig logg på:
 * - Hvilke CSS/JS-filer som faktisk er linket inn
 * - Om de returnerer 200/404
 * - Om menu.js er lastet og om nav/header finnes i DOM
 */
(() => {
  const now = () => new Date().toISOString().slice(11, 19);
  const abs = (url) => new URL(url, location.href).href;

  const log = (...a) => console.log(`[%cMYSS ${now()}%c]`, "color:#105277;font-weight:700", "color:inherit", ...a);
  const warn = (...a) => console.warn(`[%cMYSS ${now()}%c]`, "color:#f77c37;font-weight:700", "color:inherit", ...a);
  const err  = (...a) => console.error(`[%cMYSS ${now()}%c]`, "color:#b00020;font-weight:700", "color:inherit", ...a);

  async function headCheck(url) {
    const target = abs(url);
    try {
      const r = await fetch(target, { method: "HEAD", cache: "no-store" });
      return { url: target, ok: r.ok, status: r.status, type: r.headers.get("content-type") || "" };
    } catch (e) {
      return { url: target, ok: false, status: 0, type: "", error: String(e) };
    }
  }

  function listResources() {
    const css = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .map(l => l.getAttribute("href")).filter(Boolean);
    const js = [...document.querySelectorAll("script[src]")]
      .map(s => s.getAttribute("src")).filter(Boolean);

    log("Side:", location.pathname);
    log("Dokument-base:", document.baseURI);
    log("Stylesheets (href):", css);
    log("Scripts (src):", js);

    // Vanlige MySS "må finnes"-elementer (juster selectors hvis du bruker andre klasser)
    const header = document.querySelector(".site-header");
    const nav = document.querySelector(".site-nav");
    const toggle = document.querySelector(".site-header__toggle");
    log("DOM-sjekk:", {
      ".site-header": !!header,
      ".site-nav": !!nav,
      ".site-header__toggle": !!toggle,
      "body.class": document.body.className
    });

    // Hvis du injiserer meny via JS, sjekk etter container (endre hvis du bruker annen)
    const menuMount =
      document.querySelector('[data-menu]') ||
      document.querySelector("#menu") ||
      document.querySelector(".menu-mount");
    log("Meny-mount funnet?", !!menuMount, menuMount);

    return { css, js };
  }

  async function verifyResources(css, js) {
    const urls = [...css, ...js];

    if (!urls.length) {
      warn("Fant ingen link/script ressurser å sjekke. (Har du glemt <link rel='stylesheet' ...>?)");
      return;
    }

    log("Sjekker HTTP-status på ressurser…");
    const results = await Promise.all(urls.map(headCheck));

    // Skriv pent
    results.forEach(r => {
      if (r.ok) log("OK", r.status, r.type, r.url);
      else err("FEIL", r.status, r.type, r.url, r.error ? ("| " + r.error) : "");
    });

    // Ekstra: pek ut typisk feil med relative paths
    const bad = results.filter(r => !r.ok);
    if (bad.length) {
      warn("Minst én ressurs feiler. Dette er nesten alltid grunnen til at meny/design ikke lastes.");
      warn("Tips: Hvis denne siden ligger i /treningstilbud/, må du ofte bruke ../styles.css og ../menu.js (ikke bare styles.css).");
    }
  }

  function catchRuntimeErrors() {
    window.addEventListener("error", (e) => {
      err("JS runtime error:", e.message, "(", e.filename + ":" + e.lineno + " )");
    });

    window.addEventListener("unhandledrejection", (e) => {
      err("Unhandled promise rejection:", e.reason);
    });
  }

  function detectCommonPathMistakes() {
    // Sjekk om du bruker relative paths som ofte blir feil i undermapper
    const cssLinks = [...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.getAttribute("href") || "");
    const jsLinks = [...document.querySelectorAll("script[src]")].map(s => s.getAttribute("src") || "");

    const likelyWrong = (p) => p && !p.startsWith("/") && !p.startsWith("http") && !p.startsWith("../");

    const cssSus = cssLinks.filter(likelyWrong);
    const jsSus = jsLinks.filter(likelyWrong);

    if (cssSus.length || jsSus.length) {
      warn("Mulig feil relative paths (mangler ../ eller /):", { cssSus, jsSus });
      warn("Hvis css/js ligger i root (main), bruk f.eks: /styles.css og /menu.js (absolutt), ELLER ../styles.css og ../menu.js (relativt).");
    } else {
      log("Relative paths ser OK ut (ingen åpenbare 'mangler ../' funnet).");
    }
  }

  // Kjør
  catchRuntimeErrors();

  // Vent til DOM er klar (for å ikke feiltolke at meny mangler)
  document.addEventListener("DOMContentLoaded", async () => {
    const { css, js } = listResources();
    detectCommonPathMistakes();
    await verifyResources(css, js);

    // Bonus: sjekk om CSS faktisk påvirker siden (veldig grovt)
    const bodyStyle = getComputedStyle(document.body);
    log("CSS-test (computed):", {
      fontFamily: bodyStyle.fontFamily,
      fontSize: bodyStyle.fontSize,
      lineHeight: bodyStyle.lineHeight
    });

    log("Feilsøk ferdig. Åpne Console + Network-tab for å se 404/blocked.");
  });
})();
