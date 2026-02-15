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

  function allowCategory(category) {
    return !!getConsent()[category];
  }

  function buildIframeFromPlaceholder(node) {
    var src = node.dataset.consentIframeSrc;
    if (!src || node.dataset.loaded === 'true') return;

    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.width = node.dataset.iframeWidth || '100%';
    iframe.height = node.dataset.iframeHeight || '500';
    iframe.title = node.dataset.iframeTitle || 'Tredjepartsinnhold';
    if (node.dataset.iframeAllow) iframe.setAttribute('allow', node.dataset.iframeAllow);
    if (node.dataset.iframeSandbox) iframe.setAttribute('sandbox', node.dataset.iframeSandbox);

    node.innerHTML = '';
    node.appendChild(iframe);
    node.dataset.loaded = 'true';
  }

  function activateDeferredEmbeds() {
    document.querySelectorAll('script[data-consent-src][data-consent-category]').forEach(function (node) {
      var category = node.dataset.consentCategory;
      if (!allowCategory(category)) return;
      if (node.dataset.loaded === 'true') return;

      var script = document.createElement('script');
      script.src = node.dataset.consentSrc;
      script.defer = true;
      if (node.dataset.embedId) script.dataset.embedId = node.dataset.embedId;
      node.dataset.loaded = 'true';
      node.replaceWith(script);
    });

    document.querySelectorAll('[data-consent-iframe-src][data-consent-category]').forEach(function (node) {
      var category = node.dataset.consentCategory;
      if (!allowCategory(category)) return;
      buildIframeFromPlaceholder(node);
    });

    document.querySelectorAll('[data-consent-placeholder]').forEach(function (el) {
      var category = el.dataset.consentCategory || 'marketing';
      el.hidden = allowCategory(category);
    });
  }

  function enforceSafeBlankLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
      var rel = (link.getAttribute('rel') || '').toLowerCase().split(/\s+/).filter(Boolean);
      if (rel.indexOf('noopener') === -1) rel.push('noopener');
      if (rel.indexOf('noreferrer') === -1) rel.push('noreferrer');
      link.setAttribute('rel', rel.join(' ').trim());
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
    });

    document.body.appendChild(banner);
  }

  function wireConsentButtons() {
    document.querySelectorAll('[data-consent-accept]').forEach(function (button) {
      button.addEventListener('click', function () {
        var category = button.dataset.consentAccept || 'marketing';
        var current = getConsent();
        current.necessary = true;
        current[category] = true;
        current.updatedAt = new Date().toISOString();
        setConsent(current);
      });
    });
  }

  window.myssConsent = {
    get: getConsent,
    set: setConsent,
    reset: function () { localStorage.removeItem(CONSENT_KEY); }
  };

  document.addEventListener('DOMContentLoaded', function () {
    enforceSafeBlankLinks();
    wireConsentButtons();
    buildBanner();
    activateDeferredEmbeds();
  });

  document.addEventListener('myss:consent-changed', function () {
    activateDeferredEmbeds();
  });
})();
