// Re-EL Main JavaScript - Production Ready - Enhanced
// Handles all interactive functionality, form submissions, WhatsApp integration, and user feedback

// DOM Ready Event
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
  setupPhoneNumberFormatting();
  setupButtonHoverEffects();
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

// Setup phone number formatting for form inputs
function setupPhoneNumberFormatting() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      if (value.length > 10) {
        value = value.substring(0, 10);
      }
      this.value = value;
    });
  });
}

// Setup button hover effects for enhanced interactivity
function setupButtonHoverEffects() {
  const buttons = document.querySelectorAll('button.btn, a.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 10px 20px rgba(255, 193, 7, 0.2)';
    });
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });
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

// Enhanced form submission to WhatsApp with better UX
function submitToWhatsApp(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  
  // Show loading state
  if (submitButton) {
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
  }
  
  // Validate form
  if (!validateForm(form)) {
    if (submitButton) {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
    showErrorMessage('Please fill in all required fields');
    return;
  }
  
  try {
    const formData = new FormData(form);
    let message = 'Service Enquiry from Re-EL Website:%0A%0A';
    
    formData.forEach((value, key) => {
      if (value) {
        const label = capitalizeString(key);
        message += encodeURIComponent(`${label}: ${value}%0A`);
      }
    });
    
    const phoneNumber = '27813864024';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Show success message
    showSuccessMessage('Opening WhatsApp... Please check if the window opened.');
    
    // Open WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      form.reset();
      
      if (submitButton) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    }, 500);
  } catch (error) {
    console.error('Error submitting form:', error);
    showErrorMessage('An error occurred. Please try again.');
    
    if (submitButton) {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  }
}

// Show success message to user
function showSuccessMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'success-message';
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-size: 14px;
  `;
  
  document.body.appendChild(messageDiv);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

// Show error message to user
function showErrorMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'error-message';
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-size: 14px;
  `;
  
  document.body.appendChild(messageDiv);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

// Add CSS animations for messages
function addMessageAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Call the animation setup on load
addMessageAnimations();

// Capitalize string utility
function capitalizeString(str) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, char => char.toUpperCase())
    .trim();
}

// Form validation with detailed feedback
function validateForm(formElement) {
  const requiredFields = formElement.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    const value = field.value.trim();
    
    // Clear previous error state
    field.classList.remove('error');
    
    // Validate field
    if (!value) {
      field.classList.add('error');
      isValid = false;
      return;
    }
    
    // Email validation
    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        field.classList.add('error');
        isValid = false;
      }
    }
    
    // Phone validation
    if (field.type === 'tel') {
      const phoneRegex = /^[0-9]{10,}$/;
      if (field.value && !phoneRegex.test(field.value.replace(/\D/g, ''))) {
        field.classList.add('error');
        isValid = false;
      }
    }
  });
  
  return isValid;
}

// Setup form handlers
function setupFormHandlers() {
  const forms = document.querySelectorAll('form[id*="enquiry"], form[id*="contact"], form[id*="service"]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      submitToWhatsApp(e);
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

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for use in HTML
window.submitToWhatsApp = submitToWhatsApp;
window.validateForm = validateForm;
window.initializeLucideIcons = initializeLucideIcons;
window.showSuccessMessage = showSuccessMessage;
window.showErrorMessage = showErrorMessage;
