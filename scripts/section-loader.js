(function () {
  'use strict';

  var SECTIONS = [
    {
      mountId: 'section-header',
      htmlPath: '/sections/header/header.fragment',
      cssPath:  '/sections/header/header.css',
      jsPath:   '/sections/header/header.js'
    },
    {
      mountId: 'section-hero',
      htmlPath: '/sections/hero/hero.fragment',
      cssPath:  '/sections/hero/hero.css',
      jsPath:   null
    },
    {
      mountId: 'section-trust',
      htmlPath: '/sections/trust/trust.fragment',
      cssPath:  '/sections/trust/trust.css',
      jsPath:   null
    },
    {
      mountId: 'section-capabilities',
      htmlPath: '/sections/capabilities/capabilities.fragment',
      cssPath:  '/sections/capabilities/capabilities.css',
      jsPath:   null
    },
    {
      mountId: 'section-about',
      htmlPath: '/sections/about/about.fragment',
      cssPath:  '/sections/about/about.css',
      jsPath:   null
    },
    {
      mountId: 'section-process',
      htmlPath: '/sections/process/process.fragment',
      cssPath:  '/sections/process/process.css',
      jsPath:   null
    },
    {
      mountId: 'section-projects',
      htmlPath: '/sections/projects/projects.fragment',
      cssPath:  '/sections/projects/projects.css',
      jsPath:   null
    },
    {
      mountId: 'section-reviews',
      htmlPath: '/sections/reviews/reviews.fragment',
      cssPath:  '/sections/reviews/reviews.css',
      jsPath:   null
    },
    {
      mountId: 'section-consultation',
      htmlPath: '/sections/consultation/consultation.fragment',
      cssPath:  '/sections/consultation/consultation.css',
      jsPath:   '/sections/consultation/consultation.js'
    },
    {
      mountId: 'section-location',
      htmlPath: '/sections/location/location.fragment',
      cssPath:  '/sections/location/location.css',
      jsPath:   null
    },
    {
      mountId: 'section-final-cta',
      htmlPath: '/sections/final-cta/final-cta.fragment',
      cssPath:  '/sections/final-cta/final-cta.css',
      jsPath:   null
    },
    {
      mountId: 'section-footer',
      htmlPath: '/sections/footer/footer.fragment',
      cssPath:  '/sections/footer/footer.css',
      jsPath:   null
    },
    {
      mountId: 'section-mobile-bar',
      htmlPath: '/sections/mobile-bar/mobile-bar.fragment',
      cssPath:  '/sections/mobile-bar/mobile-bar.css',
      jsPath:   null
    }
  ];

  var loadedCss = {};
  var loadedJs  = {};

  function loadCss(href) {
    if (loadedCss[href]) return Promise.resolve();
    return new Promise(function (resolve) {
      var link = document.createElement('link');
      link.rel  = 'stylesheet';
      link.href = href;
      link.onload = function () { loadedCss[href] = true; resolve(); };
      link.onerror = function () {
        console.warn('[SectionLoader] CSS failed:', href);
        resolve();
      };
      document.head.appendChild(link);
    });
  }

  function loadJs(src) {
    if (loadedJs[src]) return Promise.resolve();
    return new Promise(function (resolve) {
      var script = document.createElement('script');
      script.src = src;
      script.onload = function () { loadedJs[src] = true; resolve(); };
      script.onerror = function () {
        console.warn('[SectionLoader] JS failed:', src);
        resolve();
      };
      document.body.appendChild(script);
    });
  }

  function loadSection(section) {
    var mount = document.getElementById(section.mountId);
    if (!mount) {
      console.warn('[SectionLoader] Mount not found:', section.mountId);
      return Promise.resolve();
    }

    var cssPromise = section.cssPath ? loadCss(section.cssPath) : Promise.resolve();

    return cssPromise
      .then(function () {
        return fetch(section.htmlPath, { cache: 'no-store' });
      })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + section.htmlPath);
        return res.text();
      })
      .then(function (html) {
        mount.innerHTML = html;
        if (section.jsPath) return loadJs(section.jsPath);
      })
      .catch(function (err) {
        console.error('[SectionLoader] Failed:', section.mountId, err.message);
      });
  }

  function loadAll() {
    var chain = Promise.resolve();
    SECTIONS.forEach(function (section) {
      chain = chain.then(function () { return loadSection(section); });
    });
    return chain.then(function () {
      document.dispatchEvent(new CustomEvent('sections:loaded'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAll);
  } else {
    loadAll();
  }
})();
