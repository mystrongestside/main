(function () {
  var CONSENT_KEY = 'myss_cookie_consent_v1';

  function getConsent() {
    try {
      return JSON.parse(localStorage.getItem(CONSENT_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function setConsent(consent) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    document.dispatchEvent(new CustomEvent('myss:consent-changed', { detail: consent }));
  }

  function allowMarketing() {
    return !!getConsent().marketing;
  }

  function hasCategory(category) {
    var consent = getConsent();
    return !!consent[category];
  }

  function activateDeferredEmbeds() {
    if (allowMarketing()) {
      document.querySelectorAll('[data-consent-placeholder]').forEach(function (el) {
        el.hidden = true;
      });
    }

    document.querySelectorAll('script[data-consent-src][data-consent-category]').forEach(function (node) {
      var category = node.dataset.consentCategory;
      if (!hasCategory(category)) return;
      if (node.dataset.loaded === 'true') return;
      var script = document.createElement('script');
      script.src = node.dataset.consentSrc;
      script.defer = true;
      if (node.dataset.embedId) script.dataset.embedId = node.dataset.embedId;
      node.dataset.loaded = 'true';
      node.replaceWith(script);
    });
  }

  function showPlaceholdersIfBlocked() {
    if (allowMarketing()) return;
    document.querySelectorAll('[data-consent-placeholder]').forEach(function (el) {
      el.hidden = false;
    });
  }

  function buildBanner() {
    if (localStorage.getItem(CONSENT_KEY)) return;

    var banner = document.createElement('aside');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = [
      '<strong>Vi bruker informasjonskapsler</strong>',
      '<p>Vi bruker nødvendige cookies for drift og valgfrie cookies for statistikk/innhold fra tredjeparter.</p>',
      '<p>Du kan endre valget når som helst på <a href="/cookies.html" style="color:#93c5fd;">cookies-siden</a>.</p>',
      '<div class="cookie-banner__actions">',
      '  <button class="cookie-banner__btn cookie-banner__btn--secondary" type="button" data-consent="necessary">Kun nødvendige</button>',
      '  <button class="cookie-banner__btn cookie-banner__btn--primary" type="button" data-consent="accept">Godta alle</button>',
      '</div>'
    ].join('');

    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-consent]');
      if (!button) return;
      if (button.dataset.consent === 'accept') {
        setConsent({ necessary: true, marketing: true, analytics: true, updatedAt: new Date().toISOString() });
      } else {
        setConsent({ necessary: true, marketing: false, analytics: false, updatedAt: new Date().toISOString() });
      }
      banner.remove();
      activateDeferredEmbeds();
      showPlaceholdersIfBlocked();
    });

    document.body.appendChild(banner);
  }

  window.myssConsent = {
    get: getConsent,
    set: setConsent,
    reset: function () { localStorage.removeItem(CONSENT_KEY); },
  };

  document.addEventListener('DOMContentLoaded', function () {
    buildBanner();
    activateDeferredEmbeds();
    showPlaceholdersIfBlocked();
  });

  document.addEventListener('myss:consent-changed', function () {
    activateDeferredEmbeds();
    showPlaceholdersIfBlocked();
  });
})();
