(function () {
  'use strict';

  var toggle  = document.querySelector('.mobile-menu-toggle');
  var nav     = document.querySelector('.mobile-nav');
  var overlay = document.querySelector('.mobile-nav-overlay');
  var links   = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !nav) return;

  function openNav() {
    nav.classList.add('open');
    overlay.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
    var first = nav.querySelector('.mobile-nav-link');
    if (first) setTimeout(function () { first.focus(); }, 80);
  }

  function closeNav() {
    nav.classList.remove('open');
    overlay.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
    toggle.focus();
  }

  toggle.addEventListener('click', function () {
    toggle.getAttribute('aria-expanded') === 'true' ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  links.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeNav();
    }
  });
})();
