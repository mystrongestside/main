document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('[data-js="contact-form"]');
  if (!form) return;
  var feedback = form.querySelector('[data-js="form-feedback"]');

  form.addEventListener('submit', function (event) {
    var hp = form.querySelector('input[name="company"]');
    if (hp && hp.value.trim() !== '') {
      event.preventDefault();
      return;
    }

    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    if (feedback) {
      feedback.hidden = false;
      feedback.textContent = 'Sender melding ...';
    }
  });
});
