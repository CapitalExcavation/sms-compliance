/* Opt-in form: client-side validation + mailto handoff to Capital Excavation IT.
   Static hosting only — no data is stored or transmitted by this page itself. */
(function () {
  var form = document.getElementById('optin-form');
  if (!form) return;

  var summary = document.getElementById('form-error-summary');
  var confirmation = document.getElementById('confirmation');
  var consentError = document.getElementById('consent-error');

  function fieldWrap(input) {
    return input.closest('.form-field');
  }

  function setInvalid(input, invalid) {
    var wrap = fieldWrap(input);
    if (wrap) wrap.classList.toggle('invalid', invalid);
  }

  function normalizePhone(value) {
    var digits = value.replace(/\D/g, '');
    if (digits.length === 11 && digits.charAt(0) === '1') digits = digits.slice(1);
    return digits;
  }

  function validPhone(value) {
    return normalizePhone(value).length === 10;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstName = document.getElementById('first-name');
    var lastName = document.getElementById('last-name');
    var phone = document.getElementById('phone');
    var role = document.getElementById('role');
    var email = document.getElementById('email');
    var consent = document.getElementById('consent');

    var invalid = [];

    setInvalid(firstName, !firstName.value.trim());
    if (!firstName.value.trim()) invalid.push(firstName);

    setInvalid(lastName, !lastName.value.trim());
    if (!lastName.value.trim()) invalid.push(lastName);

    setInvalid(phone, !validPhone(phone.value));
    if (!validPhone(phone.value)) invalid.push(phone);

    setInvalid(role, !role.value);
    if (!role.value) invalid.push(role);

    var emailBad = email.value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    setInvalid(email, emailBad);
    if (emailBad) invalid.push(email);

    consentError.style.display = consent.checked ? 'none' : 'block';
    if (!consent.checked) invalid.push(consent);

    if (invalid.length) {
      summary.style.display = 'block';
      invalid[0].focus();
      return;
    }
    summary.style.display = 'none';

    var digits = normalizePhone(phone.value);
    var formatted = '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
    var ref = 'CE-' + digits.slice(-4) + '-' + String(Date.now()).slice(-6);

    var body =
      'SMS timecard notification opt-in request\n\n' +
      'Reference: ' + ref + '\n' +
      'Name: ' + firstName.value.trim() + ' ' + lastName.value.trim() + '\n' +
      'Mobile number: ' + formatted + '\n' +
      'Role: ' + role.value + '\n' +
      (email.value.trim() ? 'Work email: ' + email.value.trim() + '\n' : '') +
      '\nConsent: I am a current Capital Excavation employee or authorized team member, the ' +
      'mobile number above is my own, and I consent to receive recurring SMS timecard ' +
      'notifications from Capital Excavation at that number. I understand msg & data rates may ' +
      'apply, msg frequency varies, consent is not a condition of employment, and I can reply ' +
      'HELP for help or STOP to cancel at any time.\n' +
      'Agreed to Terms & Conditions and Privacy Policy at https://apps.capitalexcavation.com/sms/\n' +
      'Consent recorded: ' + new Date().toISOString();

    document.getElementById('ref-code').textContent = ref;
    form.style.display = 'none';
    confirmation.style.display = 'block';
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.location.href = 'mailto:marshall@cloudmarsh.com' +
      '?subject=' + encodeURIComponent('SMS opt-in request ' + ref) +
      '&body=' + encodeURIComponent(body);
  });
})();
