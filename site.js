/* Shared behaviour for the redesigned portfolio pages. */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var toggle = function () {
    header.classList.toggle('site-header--scrolled', window.scrollY > 8);
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
})();
(function () {
  var items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    items.forEach(function (el) { el.classList.add('is-revealed'); });
    return;
  }
  // data-reveal="load" fades in as soon as the page loads, whether or not it is on screen yet
  // (used for the first row of the homepage banner, which can sit right at the fold).
  var onLoad = Array.prototype.filter.call(items, function (el) { return el.getAttribute('data-reveal') === 'load'; });
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      onLoad.forEach(function (el) { el.classList.add('is-revealed'); });
    });
  });
  items = Array.prototype.filter.call(items, function (el) { return el.getAttribute('data-reveal') !== 'load'; });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // Sections already scrolled past (e.g. after a reload mid-page) show straight away.
      var passed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
      if (!entry.isIntersecting && !passed) return;
      if (passed) entry.target.style.transition = 'none';
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  items.forEach(function (el) { observer.observe(el); });
})();

/* Carousels: a [data-carousel] scroller with prev/next buttons that point at it via aria-controls. */
(function () {
  document.querySelectorAll('[data-carousel]').forEach(function (track) {
    var prev = document.querySelector('[data-carousel-prev][aria-controls="' + track.id + '"]');
    var next = document.querySelector('[data-carousel-next][aria-controls="' + track.id + '"]');
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 1;
      if (prev) prev.disabled = track.scrollLeft <= 1;
      if (next) next.disabled = track.scrollLeft >= max;
    };
    var step = function (dir) {
      track.scrollBy({ left: dir * Math.max(240, track.clientWidth * 0.8), behavior: 'smooth' });
    };
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // Re-check when the track's content changes size (late fonts, styles or images).
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(update);
      ro.observe(track);
      Array.prototype.forEach.call(track.children, function (child) { ro.observe(child); });
    }
    window.addEventListener('load', update);
    update();
  });
})();

/* Section nav: highlights the link for the section currently in view. */
(function () {
  var nav = document.querySelector('[data-scrollspy]');
  if (!nav) return;
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  var setActive = function () {
    var line = window.innerHeight * 0.3;
    var current = 0;
    sections.forEach(function (sec, i) {
      if (sec && sec.getBoundingClientRect().top <= line) current = i;
    });
    // At the very bottom, the last section wins even if it never reaches the line.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = sections.length - 1;
    links.forEach(function (a, i) {
      if (i === current) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    var active = links[current];
    if (active && nav.scrollWidth > nav.clientWidth) {
      var l = active.offsetLeft - 20;
      if (l < nav.scrollLeft || active.offsetLeft + active.offsetWidth > nav.scrollLeft + nav.clientWidth) nav.scrollTo({ left: l });
    }
  };
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);
  setActive();
})();
