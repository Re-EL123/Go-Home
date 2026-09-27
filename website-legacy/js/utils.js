// Re-EL Utilities - Helper functions for production use

/**
 * Form utilities and helpers
 */

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex
const phoneRegex = /^[0-9]{10,}$/;

/**
 * Validate email address
 */
function isValidEmail(email) {
  return emailRegex.test(email);
}

/**
 * Validate phone number
 */
function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return phoneRegex.test(digits);
}

/**
 * Format phone number to (###) ###-####
 */
function formatPhoneNumber(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

/**
 * Sanitize form input to prevent XSS
 */
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Get form data as object
 */
function getFormData(formElement) {
  const formData = new FormData(formElement);
  const data = {};
  
  formData.forEach((value, key) => {
    if (value) {
      data[key] = sanitizeInput(value);
    }
  });
  
  return data;
}

/**
 * Build WhatsApp message from form data
 */
function buildWhatsAppMessage(formData) {
  let message = 'Service Enquiry from Re-EL Website:%0A%0A';
  
  Object.entries(formData).forEach(([key, value]) => {
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, char => char.toUpperCase())
      .trim();
    message += encodeURIComponent(`${label}: ${value}%0A`);
  });
  
  return message;
}

/**
 * Debounce function for performance optimization
 */
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

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Add loading spinner (Uiverse loader) to element
 */
function addLoadingSpinner(element) {
  const spinner = document.createElement('div');
  spinner.className = 're-el-spinner';
  spinner.innerHTML =
    '<div class="loader" aria-label="Loading">' +
      '<svg viewBox="0 0 44 44">' +
        '<rect x="2" y="2" width="40" height="40" rx="4"></rect>' +
      '</svg>' +
    '</div>';
  element.appendChild(spinner);
  return spinner;
}

/**
 * Remove loading spinner from element
 */
function removeLoadingSpinner(element) {
  const spinner = element.querySelector('.re-el-spinner');
  if (spinner) {
    spinner.remove();
  }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info', duration = 5000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-size: 14px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element, offset = 80) {
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  window.scrollBy({
    top: elementPosition - offset,
    behavior: 'smooth'
  });
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy', 'error');
    });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Copied to clipboard!', 'success');
  }
}

/**
 * Get URL parameters
 */
function getUrlParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const pairs = queryString.split('&');
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });
  
  return params;
}

/**
 * Track analytics event (for future integration)
 */
function trackEvent(eventName, eventData = {}) {
  if (window.gtag) {
    gtag('event', eventName, eventData);
  }
  console.log('Event tracked:', eventName, eventData);
}

// Export utilities
window.ReELUtils = {
  isValidEmail,
  isValidPhone,
  formatPhoneNumber,
  sanitizeInput,
  getFormData,
  buildWhatsAppMessage,
  debounce,
  throttle,
  addLoadingSpinner,
  removeLoadingSpinner,
  showToast,
  isElementInViewport,
  smoothScrollTo,
  copyToClipboard,
  getUrlParams,
  trackEvent
};

// Global message functions for compatibility
window.showErrorMessage = function(message) {
  ReELUtils.showToast(message, 'error', 5000);
};

window.showSuccessMessage = function(message) {
  ReELUtils.showToast(message, 'success', 5000);
};

window.showInfoMessage = function(message) {
  ReELUtils.showToast(message, 'info', 5000);
};

// Initialize Toast animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);
