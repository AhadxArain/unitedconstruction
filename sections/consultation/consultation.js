(function () {
  'use strict';

  var form    = document.getElementById('consult-form');
  var success = document.getElementById('form-success');

  if (!form) return;

  function q(sel) { return form.querySelector(sel); }
  function err(id) { return document.getElementById('err-' + id); }

  function setErr(inp, errEl, msg) {
    inp.classList.add('error');
    inp.setAttribute('aria-invalid', 'true');
    errEl.textContent = msg;
  }

  function clearErr(inp, errEl) {
    inp.classList.remove('error');
    inp.removeAttribute('aria-invalid');
    errEl.textContent = '';
  }

  function validate(inp) {
    var v = inp.value.trim();
    if (inp.required && !v)         return 'This field is required.';
    if (inp.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
                                    return 'Please enter a valid email address.';
    if (inp.type === 'tel'   && v && !/^[\d\s()\-+.]{7,}$/.test(v))
                                    return 'Please enter a valid phone number.';
    return '';
  }

  ['name','phone','email'].forEach(function (id) {
    var inp   = q('[name="' + id + '"]');
    var errEl = err(id);
    if (!inp || !errEl) return;

    inp.addEventListener('blur', function () {
      var msg = validate(inp);
      msg ? setErr(inp, errEl, msg) : clearErr(inp, errEl);
    });

    inp.addEventListener('input', function () {
      if (inp.classList.contains('error')) {
        if (!validate(inp)) clearErr(inp, errEl);
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;

    ['name','phone','email'].forEach(function (id) {
      var inp   = q('[name="' + id + '"]');
      var errEl = err(id);
      if (!inp || !errEl) return;
      var msg = validate(inp);
      if (msg) {
        setErr(inp, errEl, msg);
        if (ok) { inp.focus(); }
        ok = false;
      } else {
        clearErr(inp, errEl);
      }
    });

    if (!ok) return;

    form.hidden = true;
    if (success) {
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
})();
