/**
 * Re-EL mobile navigation
 * Injects a hamburger toggle + full-screen overlay menu into the static header.
 * The overlay is built from the page's existing desktop <nav>, so links can
 * never drift out of sync across pages. No HTML edits required on each page
 * beyond including this script.
 */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MENU_ID = 'mobile-menu';

  function syncCartBadge(list) {
    var count =
      window.ReELCart && typeof window.ReELCart.count === 'function'
        ? window.ReELCart.count()
        : 0;
    list.querySelectorAll('.cart-count').forEach(function (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  function init() {
    var header = document.querySelector('.header-container');
    if (!header) return;
    var desktopNav = header.querySelector('nav');
    if (!desktopNav) return;
    if (document.getElementById(MENU_ID)) return;

    // ---- Toggle button ----
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', MENU_ID);
    for (var i = 0; i < 3; i++) {
      toggle.appendChild(document.createElement('span')).className = 'nav-toggle-line';
    }
    header.appendChild(toggle);

    // ---- Overlay panel ----
    var panel = document.createElement('div');
    panel.className = 'mobile-menu';
    panel.id = MENU_ID;
    panel.setAttribute('aria-hidden', 'true');

    var label = document.createElement('p');
    label.className = 'mobile-menu-eyebrow';
    label.textContent = 'Navigate';
    panel.appendChild(label);

    var list = document.createElement('nav');
    list.className = 'mobile-menu-nav';
    list.setAttribute('aria-label', 'Mobile navigation');

    Array.prototype.forEach.call(desktopNav.querySelectorAll('a'), function (link, idx) {
      var clone = link.cloneNode(true);
      clone.classList.add('mobile-menu-link');
      if (!REDUCED) clone.style.transitionDelay = (0.06 * (idx + 1)).toFixed(2) + 's';
      list.appendChild(clone);
    });

    panel.appendChild(list);

    var footer = document.createElement('div');
    footer.className = 'mobile-menu-footer';
    var wa = document.createElement('a');
    wa.className = 'mobile-menu-wa';
    wa.href = 'https://wa.me/27813864024?text=Hi%20Re-EL!%20I%20want%20to%20discuss%20my%20project';
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.innerHTML = '<svg class="lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg><span>WhatsApp us</span>';
    footer.appendChild(wa);
    panel.appendChild(footer);

    document.body.appendChild(panel);
    syncCartBadge(list);

    // ---- Open / close state ----
    var lastFocused = null;

    function isOpen() {
      return panel.classList.contains('is-open');
    }
    function openMenu() {
      lastFocused = document.activeElement;
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.documentElement.classList.add('nav-lock');
      var first = list.querySelector('a');
      if (first) first.focus();
    }
    function closeMenu(restoreFocus) {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.documentElement.classList.remove('nav-lock');
      if (restoreFocus !== false && lastFocused && lastFocused.focus) lastFocused.focus();
    }

    toggle.addEventListener('click', function () {
      if (isOpen()) closeMenu();
      else openMenu();
    });

    list.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu(false);
    });

    panel.addEventListener('click', function (e) {
      if (e.target === panel || e.target === footer) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) closeMenu();
    });

    // Simple focus trap while open
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !isOpen()) return;
      var focusables = panel.querySelectorAll('a[href], button:not([disabled])');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // Keep the cloned cart badge in sync when store.js pushes updates
    document.addEventListener('reel:cart', function () { syncCartBadge(list); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();