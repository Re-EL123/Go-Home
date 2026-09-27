/**
 * Re-EL store.js
 * - Client-side cart backed by localStorage
 * - Ambient calming music engine (Web Audio API, self-contained)
 * - Mute / unmute control + cart nav badge
 * No external audio files required.
 */
(function () {
  'use strict';

  /* =========================================================
     CART
  ========================================================= */
  const CART_KEY = 'reel_cart';

  function readCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function writeCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartBadge();
    if (typeof window.ReELCartRender === 'function') {
      try { window.ReELCartRender(); } catch (e) {}
    }
  }
  function addToCart(item) {
    const items = readCart();
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      items.push(Object.assign({ qty: 1 }, item));
    }
    writeCart(items);
    if (window.showSuccessMessage) window.showSuccessMessage('Added to cart');
    else if (window.ReELUtils && ReELUtils.showToast) ReELUtils.showToast('Added to cart', 'success');
  }
  function removeFromCart(id) {
    writeCart(readCart().filter(i => i.id !== id));
  }
  function changeQty(id, delta) {
    const items = readCart();
    const it = items.find(i => i.id === id);
    if (!it) return;
    it.qty = Math.max(1, (it.qty || 1) + delta);
    writeCart(items);
  }
  function cartCount() {
    return readCart().reduce((s, i) => s + (i.qty || 1), 0);
  }
  function cartTotal() {
    return readCart().reduce((s, i) => s + (i.qty || 1) * (i.price || 0), 0);
  }
  function updateCartBadge() {
    document.querySelectorAll('.cart-count').forEach(el => {
      const c = cartCount();
      el.textContent = c;
      el.style.display = c > 0 ? 'inline-flex' : 'none';
    });
  }

  // expose cart API
  window.ReELCart = {
    add: addToCart,
    remove: removeFromCart,
    changeQty: changeQty,
    items: readCart,
    count: cartCount,
    total: cartTotal,
    clear: function () { writeCart([]); }
  };

  /* =========================================================
     AMBIENT MUSIC ENGINE (Web Audio API)
     Soft, calming generative pad — no external files.
  ========================================================= */
  const Music = (function () {
    let ctx = null, master = null, started = false, muted = false;
    const TARGET_VOL = 0.06; // low volume

    function build() {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : TARGET_VOL;
      master.connect(ctx.destination);

      // Calming chord: soft major-ish pad (A2, E3, A3, C#4, E4)
      const freqs = [110.0, 164.81, 220.0, 277.18, 329.63];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = f;

        const g = ctx.createGain();
        g.gain.value = 0.0;
        // slow swell per voice for a breathing, calming feel
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.05 + idx * 0.013;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.18;
        lfo.connect(lfoGain).connect(g.gain);
        g.gain.value = 0.22;

        osc.connect(g).connect(master);
        osc.start();
        lfo.start();
      });

      // gentle filtered noise "air" layer
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;
      noise.loop = true;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.value = 600;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.04;
      noise.connect(noiseFilter).connect(noiseGain).connect(master);
      noise.start();
    }

    function start() {
      if (started) return;
      try {
        if (!ctx) build();
        if (ctx.state === 'suspended') ctx.resume();
        started = true;
      } catch (e) { /* audio not supported */ }
    }
    function setMuted(m) {
      muted = m;
      if (master) master.gain.setTargetAtTime(muted ? 0 : TARGET_VOL, ctx.currentTime, 0.4);
      reflectButton();
    }
    function toggle() { setMuted(!muted); }
    function isMuted() { return muted; }
    function isStarted() { return started; }
    function reflectButton() {
      document.querySelectorAll('.music-toggle').forEach(btn => {
        const icon = btn.querySelector('.music-icon');
        const label = btn.querySelector('.music-label');
        if (muted) {
          btn.setAttribute('aria-pressed', 'false');
          btn.classList.add('is-muted');
          if (icon) icon.setAttribute('data-lucide', 'volume-x');
          if (label) label.textContent = 'Music Off';
        } else {
          btn.setAttribute('aria-pressed', 'true');
          btn.classList.remove('is-muted');
          if (icon) icon.setAttribute('data-lucide', 'volume-2');
          if (label) label.textContent = 'Music On';
        }
      });
      if (window.lucide) window.lucide.createIcons();
    }
    return { start, setMuted, toggle, isMuted, isStarted, reflectButton };
  })();

  window.ReELMusic = Music;

  /* =========================================================
     BOOT
  ========================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    updateCartBadge();

    // ---- Add-to-cart buttons (data-add JSON) ----
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-add]');
      if (!btn) return;
      try {
        var item = JSON.parse(btn.getAttribute('data-add'));
        window.ReELCart.add(item);
      } catch (err) { /* ignore malformed */ }
    });

    // render lucide icons now that DOM is ready
    if (window.lucide) window.lucide.createIcons();

    // ---- Music toggle button(s) ----
    document.querySelectorAll('.music-toggle').forEach(btn => {
      btn.addEventListener('click', function () {
        Music.start();          // required to satisfy autoplay policy
        if (!Music.isStarted()) return;
        Music.toggle();
      });
    });

    // Start ambient music on first interaction (browser autoplay policy)
    function firstInteraction() {
      Music.start();
      if (!Music.isMuted()) Music.reflectButton();
      window.removeEventListener('click', firstInteraction);
      window.removeEventListener('keydown', firstInteraction);
      window.removeEventListener('touchstart', firstInteraction);
    }
    window.addEventListener('click', firstInteraction);
    window.addEventListener('keydown', firstInteraction);
    window.addEventListener('touchstart', firstInteraction);

    // initial button state
    Music.reflectButton();
  });
})();
