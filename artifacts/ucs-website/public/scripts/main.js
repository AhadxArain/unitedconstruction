(function () {
  'use strict';

  /* Opt-in to scroll-reveal animations — content is visible without this class */
  document.documentElement.classList.add('js-reveal');

  /* ── Scroll reveal ── */
  var revealObserver = null;

  function revealAll() {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal:not(.revealed)');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    /* Reuse observer if already created */
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
      );
    }

    els.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ── Header scroll ── */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var lastScrollY = window.scrollY;
    var ticking     = false;

    function update() {
      var y = window.scrollY;

      if (y > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      if (y > lastScrollY && y > 200) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }

      lastScrollY = y;
      ticking     = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Current year ── */
  function updateYear() {
    var el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── Mobile action bar hides near footer ── */
  function initMobileBar() {
    var bar    = document.querySelector('.mobile-action-bar');
    var footer = document.querySelector('.site-footer');
    if (!bar || !footer || !('IntersectionObserver' in window)) return;

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            bar.classList.add('bar-hidden');
          } else {
            bar.classList.remove('bar-hidden');
          }
        });
      },
      { threshold: 0.05 }
    );
    obs.observe(footer);
  }

  /* ── Init all ── */
  function init() {
    initScrollReveal();
    initHeaderScroll();
    updateYear();
    initMobileBar();
  }

  document.addEventListener('sections:loaded', init);

  /* Safety net: if sections:loaded never fires, run init after 3 s */
  var initFired = false;
  document.addEventListener('sections:loaded', function () { initFired = true; });
  setTimeout(function () {
    if (!initFired) { init(); }
    /* Always force-reveal any stuck elements after 5 s */
  }, 3000);
  setTimeout(revealAll, 5000);
})();
