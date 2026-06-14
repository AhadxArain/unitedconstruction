(function () {
  'use strict';

  function updateYear() {
    var el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener('sections:loaded', updateYear);
})();
