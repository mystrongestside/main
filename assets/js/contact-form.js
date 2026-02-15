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

  function validateFields() {
    var name = form.querySelector('#name');
    var email = form.querySelector('#email');
    var phone = form.querySelector('#phone');
    var message = form.querySelector('#message');

    if (!name || !email || !message) return true;

    if (name.value.trim().length < 2 || name.value.trim().length > 120) {
      name.setCustomValidity('Navn må være mellom 2 og 120 tegn.');
      name.reportValidity();
      return false;
    }
    name.setCustomValidity('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.setCustomValidity('Skriv inn en gyldig e-postadresse.');
      email.reportValidity();
      return false;
    }
    email.setCustomValidity('');

    if (phone && phone.value.trim() && !/^[0-9+()\s-]{6,20}$/.test(phone.value.trim())) {
      phone.setCustomValidity('Telefon må være 6-20 tegn og kan inneholde tall, +, mellomrom eller bindestrek.');
      phone.reportValidity();
      return false;
    }
    if (phone) phone.setCustomValidity('');

    if (message.value.trim().length < 10 || message.value.trim().length > 2000) {
      message.setCustomValidity('Meldingen må være mellom 10 og 2000 tegn.');
      message.reportValidity();
      return false;
    }
    message.setCustomValidity('');

    return true;
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

    if (!validateFields() || !form.checkValidity()) {
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
