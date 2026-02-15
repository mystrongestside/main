(function () {
  var STORAGE_KEY = 'myss_consent';
  var defaultConsent = { necessary: true, stats: false, marketing: false, ts: new Date().toISOString() };

  function normalize(raw) {
    if (!raw || typeof raw !== 'object') return null;
    return {
      necessary: true,
      stats: !!(raw.stats || raw.analytics),
      marketing: !!raw.marketing,
      ts: typeof raw.ts === 'string' ? raw.ts : new Date().toISOString()
    };
  }

  function getConsent() {
    try {
      return normalize(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } catch (e) {
      return null;
    }
  }

  function setConsent(next) {
    var payload = normalize(next) || defaultConsent;
    payload.ts = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    document.dispatchEvent(new CustomEvent('myss:consent-changed', { detail: payload }));
    applyConsent(payload);
    return payload;
  }

  function resetConsent() {
    localStorage.removeItem(STORAGE_KEY);
    var banner = document.querySelector('[data-myss-consent-banner]');
    if (banner) banner.hidden = false;
    applyConsent(null);
  }

  function shouldLoadCategory(category, consent) {
    if (!category) return true;
    var c = String(category).toLowerCase();
    if (c === 'necessary') return true;
    if (c === 'stats' || c === 'analytics') return !!(consent && consent.stats);
    if (c === 'marketing') return !!(consent && consent.marketing);
    return false;
  }

  function loadDeferredScripts(consent) {
    var nodes = document.querySelectorAll('script[data-consent-src]');
    nodes.forEach(function (el) {
      if (el.dataset.loaded === 'true') return;
      if (!shouldLoadCategory(el.dataset.consentCategory, consent)) return;
      var src = el.getAttribute('data-consent-src');
      if (!src) return;
      var s = document.createElement('script');
      s.src = src;
      s.defer = true;
      s.async = false;
      if (el.getAttribute('type')) s.type = el.getAttribute('type');
      s.dataset.loadedByConsent = 'true';
      document.head.appendChild(s);
      el.dataset.loaded = 'true';
    });
  }

  function initInstagram(consent) {
    var section = document.getElementById('instagram');
    if (!section) return;

    var placeholder = section.querySelector('[data-instagram-placeholder]') || section.querySelector('[data-consent-placeholder]');
    var linkOnly = section.querySelector('[data-instagram-link-only]') || section.querySelector('[data-ig-fallback]');
    var feed = section.querySelector('[data-instagram-feed]') || section.querySelector('.sk-instagram-feed');
    var button = section.querySelector('[data-instagram-load]') || section.querySelector('[data-consent-accept="marketing"]');

    var allowed = !!(consent && consent.marketing);
    if (placeholder) placeholder.hidden = !allowed;
    if (linkOnly) linkOnly.hidden = allowed;

    if (!feed || !allowed || !button) return;

    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', function () {
      if (!getConsent() || !getConsent().marketing) {
        setConsent({ necessary: true, stats: !!(getConsent() && getConsent().stats), marketing: true });
      }
      loadDeferredScripts(getConsent());
      button.disabled = true;
      button.textContent = 'Laster Instagram …';
    });
  }

  function applyConsent(consent) {
    var banner = document.querySelector('[data-myss-consent-banner]');
    if (banner) banner.hidden = !!consent;

    document.querySelectorAll('[data-consent-placeholder]').forEach(function (el) {
      var cat = el.dataset.consentCategory || 'marketing';
      el.hidden = shouldLoadCategory(cat, consent);
    });

    loadDeferredScripts(consent);
    initInstagram(consent);
  }

  function ensureBanner() {
    var banner = document.querySelector('[data-myss-consent-banner]');
    if (banner) return banner;
    banner = document.createElement('div');
    banner.className = 'myss-consent-banner';
    banner.setAttribute('data-myss-consent-banner', '');
    banner.innerHTML = '' +
      '<div class="myss-consent-banner__inner">' +
      '  <p class="myss-consent-banner__text">Vi bruker nødvendige lagringsmekanismer for å få siden til å fungere. Du kan også velge statistikk eller markedsføring (Instagram-innhold).</p>' +
      '  <div class="myss-consent-banner__actions">' +
      '    <button type="button" class="myss-consent-btn myss-consent-btn--necessary" data-consent-choice="necessary">Kun nødvendige</button>' +
      '    <button type="button" class="myss-consent-btn myss-consent-btn--stats" data-consent-choice="stats">Godta statistikk</button>' +
      '    <button type="button" class="myss-consent-btn myss-consent-btn--marketing" data-consent-choice="marketing">Godta markedsføring</button>' +
      '  </div>' +
      '</div>';
    document.body.appendChild(banner);
    return banner;
  }

  function bindBanner() {
    var banner = ensureBanner();
    banner.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-consent-choice]');
      if (!btn) return;
      var mode = btn.dataset.consentChoice;
      if (mode === 'necessary') return setConsent({ necessary: true, stats: false, marketing: false });
      if (mode === 'stats') return setConsent({ necessary: true, stats: true, marketing: false });
      if (mode === 'marketing') return setConsent({ necessary: true, stats: true, marketing: true });
    });
  }

  window.MySSConsent = {
    getConsent: getConsent,
    setConsent: setConsent,
    reset: resetConsent,
    resetConsent: resetConsent
  };

  document.addEventListener('DOMContentLoaded', function () {
    bindBanner();
    var consent = getConsent();
    applyConsent(consent);
  });
})();
