// Re-EL Main JavaScript - Production Ready
// Handles all interactive functionality, form submissions, and WhatsApp integration

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// Main initialization function
function initializeApp() {
  setupEventListeners();
  initializeLucideIcons();
  setupFormHandlers();
  setupScrollAnimations();
  setupMobileMenu();
  setupAOS();
}

// Initialize Lucide Icons
function initializeLucideIcons() {
  try {
    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (e) {
    console.log('Lucide Icons not loaded yet');
  }
}

// Setup Intersection Observer for scroll animations
function setupScrollAnimations() {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, options);

  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
}

// Setup AOS (Animate On Scroll)
function setupAOS() {
  try {
    if (window.AOS) {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      });
    }
  } catch (e) {
    console.log('AOS not initialized');
  }
}

// Setup Mobile Menu Toggle
function setupMobileMenu() {
  const menuButton = document.querySelector('[data-mobile-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');

  if (menuButton && menu) {
    menuButton.addEventListener('click', function() {
      menu.classList.toggle('active');
    });

    // Close menu when clicking on links
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        menu.classList.remove('active');
      });
    });
  }
}

// Setup general event listeners
function setupEventListeners() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    const dropdowns = document.querySelectorAll('[data-dropdown].open');
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });
}

// Form submission to WhatsApp
function submitToWhatsApp(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // Build message
  let message = 'Service Enquiry from Re-EL Website:%0A%0A';
  
  formData.forEach((value, key) => {
    if (value) {
      message += encodeURIComponent(`${capitalizeString(key)}: ${value}%0A`);
    }
  });
  
  const phoneNumber = '27813864024';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  
  window.open(whatsappUrl, '_blank');
  form.reset();
}

// Utility: Capitalize string
function capitalizeString(str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, char => char.toUpperCase()).trim();
}

// Form validation
function validateForm(formElement) {
  const requiredFields = formElement.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      isValid = false;
    } else {
      field.classList.remove('error');
    }
  });

  return isValid;
}

// Setup form handlers
function setupFormHandlers() {
  const forms = document.querySelectorAll('form[id*="enquiry"], form[id*="contact"], form[id*="service"]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (validateForm(this)) {
        submitToWhatsApp(e);
      } else {
        e.preventDefault();
        console.log('Form validation failed');
      }
    });
  });
}

// Dynamic Lucide icon insertion
function insertLucideIcon(element, iconName) {
  try {
    if (window.lucide && window.lucide[camelToKebab(iconName)]) {
      const svgString = window.lucide[camelToKebab(iconName)]();
      element.innerHTML = svgString;
    }
  } catch (e) {
    console.log('Error inserting icon:', e);
  }
}

// Convert camel case to kebab case
function camelToKebab(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

// Scroll tracking for header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Export functions for use in HTML
window.submitToWhatsApp = submitToWhatsApp;
window.validateForm = validateForm;
window.initializeLucideIcons = initializeLucideIcons;}
