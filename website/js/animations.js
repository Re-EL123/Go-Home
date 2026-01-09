/**
 * Re-EL Digital Agency - Enhanced Animations & Interactivity Script
 * Handles scroll reveals, form interactions, and dynamic visual effects
 */

(function() {
  'use strict';

  // Intersection Observer for Scroll Reveals
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card, .service-card, .testimonial-card');
    const sections = document.querySelectorAll('section');
    [...cards, ...sections].forEach(el => {
      if (!el.classList.contains('fade-up')) observer.observe(el);
    });
  });

  // Header Scroll Effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Form Interactions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function() {
      this.classList.add('submitting');
    });
  });

  // Button Ripple Effect
  const buttons = document.querySelectorAll('.btn, button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Input Field Focus Effects
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement?.classList.add('focused');
    });
    input.addEventListener('blur', function() {
      this.parentElement?.classList.remove('focused');
    });
    input.addEventListener('input', function() {
      if (this.value.trim()) {
        this.classList.add('filled');
      } else {
        this.classList.remove('filled');
      }
    });
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Email Validation
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  forms.forEach(form => {
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
          this.classList.add('error');
        } else {
          this.classList.remove('error');
        }
      });
    });
  });

  // Accessibility: Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // Toast Notification Handler
  window.showNotification = function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  console.log('Re-EL Enhanced Animations loaded successfully');

})();


/* CANVAS HERO ANIMATION */
class CanvasHeroAnimation {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
    if (!this.container) return;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas-hero';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resizeCanvas();
    this.initParticles();
    this.animate();
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  resizeCanvas() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  }
  initParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#FFD700' : '#0A84FF'
      });
    }
  }
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (hero && !document.getElementById('canvas-hero')) {
    new CanvasHeroAnimation('.hero');
  }
});
