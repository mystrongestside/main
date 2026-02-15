document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('[data-js="contact-form"]');
  if (!form) return;

  var feedback = form.querySelector('[data-js="form-feedback"]');
  var RATE_KEY = 'myss_contact_rate_v1';
  var WINDOW_MS = 10 * 60 * 1000;
  var MAX_SUBMITS = 3;
  var MIN_FILL_MS = 4000;

  var startField = form.querySelector('input[name="formStartedAt"]');
  if (startField) startField.value = String(Date.now());

  function loadAttempts() {
    try {
      return JSON.parse(localStorage.getItem(RATE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveAttempts(list) {
    localStorage.setItem(RATE_KEY, JSON.stringify(list));
  }

  function withinWindow(list, now) {
    return list.filter(function (ts) { return now - ts < WINDOW_MS; });
  }

  form.addEventListener('submit', function (event) {
    var hp = form.querySelector('input[name="company"]');
    if (hp && hp.value.trim() !== '') {
      event.preventDefault();
      return;
    }

    var now = Date.now();
    var startedAt = Number((startField && startField.value) || now);
    if (now - startedAt < MIN_FILL_MS) {
      event.preventDefault();
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = 'Vent litt og prøv igjen.';
      }
      return;
    }

    var recent = withinWindow(loadAttempts(), now);
    if (recent.length >= MAX_SUBMITS) {
      event.preventDefault();
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = 'For mange forsøk på kort tid. Prøv igjen om noen minutter.';
      }
      return;
    }

    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    recent.push(now);
    saveAttempts(recent);

    if (feedback) {
      feedback.hidden = false;
      feedback.textContent = 'Sender melding ...';
    }
  });
});
