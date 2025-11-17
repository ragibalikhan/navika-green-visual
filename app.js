// Scroll-based navbar enhancement
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle with scroll lock
mobileMenuToggle.addEventListener('click', () => {
  const isActive = navMenu.classList.contains('active');
  
  mobileMenuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  mobileMenuBackdrop.classList.toggle('active');
  
  if (!isActive) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth + 'px';
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
});

// Close menu when clicking backdrop
mobileMenuBackdrop.addEventListener('click', () => {
  mobileMenuToggle.classList.remove('active');
  navMenu.classList.remove('active');
  mobileMenuBackdrop.classList.remove('active');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Close mobile menu
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    mobileMenuBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    // Smooth scroll with offset
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  const scrollPosition = window.pageYOffset + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(element => {
  observer.observe(element);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  
  if (heroContent && scrolled < hero.offsetHeight) {
    heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 1.5;
  }
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    let isValid = true;
    
    // Simple validation
    if (nameInput.value.trim() === '') {
      nameInput.classList.add('error');
      isValid = false;
    } else {
      nameInput.classList.remove('error');
      nameInput.classList.add('success');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailInput.classList.add('error');
      isValid = false;
    } else {
      emailInput.classList.remove('error');
      emailInput.classList.add('success');
    }
    
    if (messageInput.value.trim() === '') {
      messageInput.classList.add('error');
      isValid = false;
    } else {
      messageInput.classList.remove('error');
      messageInput.classList.add('success');
    }
    
    if (isValid) {
      // Add loading state to button
      const submitButton = contactForm.querySelector('.btn-primary');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.classList.add('loading');
      
      // Simulate form submission
      setTimeout(() => {
        submitButton.textContent = 'Message Sent!';
        submitButton.style.background = 'var(--color-success)';
        
        // Reset form after 2 seconds
        setTimeout(() => {
          contactForm.reset();
          submitButton.textContent = originalText;
          submitButton.style.background = '';
          submitButton.classList.remove('loading');
          
          // Remove success classes
          nameInput.classList.remove('success');
          emailInput.classList.remove('success');
          messageInput.classList.remove('success');
        }, 2000);
      }, 1500);
    }
  });
  
  // Remove error state on input
  const formInputs = contactForm.querySelectorAll('.form-control');
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Add stagger effect to grid items
function addStaggerAnimation() {
  const grids = document.querySelectorAll('.advantages-grid, .team-grid, .mission-grid');
  
  grids.forEach(grid => {
    const items = grid.querySelectorAll('.animate-on-scroll');
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  });
}

// Initialize stagger animations
addStaggerAnimation();

// Enhanced image loading with fade-in effect
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.6s ease-in-out';
  
  if (img.complete) {
    img.style.opacity = '1';
  } else {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
  }
});

// Add hover sound effect simulation (visual feedback)
const cards = document.querySelectorAll('.advantage-card, .team-card, .mission-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  });
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

// Apply debounce to scroll-heavy functions
const debouncedUpdateNav = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedUpdateNav);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Escape key closes mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    mobileMenuBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    mobileMenuToggle.focus();
  }
});

// Add reduced motion support for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty('--duration-fast', '0ms');
  document.documentElement.style.setProperty('--duration-normal', '0ms');
  document.documentElement.style.setProperty('--duration-slow', '0ms');
}

// Mobile viewport height fix for iOS and Android
function setMobileVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

if (window.innerWidth <= 1023) {
  window.addEventListener('resize', debounce(setMobileVH, 100));
  setMobileVH();
}

// Initialize everything on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Navika Green Consulting website loaded successfully');
  
  // Trigger initial active nav update
  updateActiveNavLink();
  
  // Add animation class to hero content after a short delay
  setTimeout(() => {
    if (heroContent) {
      heroContent.style.opacity = '1';
    }
  }, 100);
  
  // Set initial mobile viewport height
  setMobileVH();
  
  // Add touch event handling for better mobile experience


  // Add this to your existing app.js file

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: contactForm.querySelector('input[name="firstName"]').value,
                lastName: contactForm.querySelector('input[name="lastName"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                subject: contactForm.querySelector('input[name="subject"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value,
                newsletter: contactForm.querySelector('input[name="newsletter"]').checked
            };
            
            // Get submit button
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            
            try {
                // Send to backend
                const response = await fetch('https://navika-backend.vercel.app/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Success message
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    // Error message
                    showNotification(result.message || 'Failed to send message. Please try again.', 'error');
                }
                
            } catch (error) {
                console.error('Error:', error);
                showNotification('Network error. Please check your connection and try again.', 'error');
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                submitBtn.style.opacity = '1';
            }
        });
    }
});

// Notification function
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#f44336';
        notification.style.color = 'white';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add CSS animation
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
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }
});
