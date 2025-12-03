// app.js - Navika Green Consulting
// Clean version without duplicates

// ============================================================
// 1. NAVBAR & NAVIGATION
// ============================================================

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

mobileMenuBackdrop.addEventListener('click', () => {
  mobileMenuToggle.classList.remove('active');
  navMenu.classList.remove('active');
  mobileMenuBackdrop.classList.remove('active');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    mobileMenuBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
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

// ============================================================
// 2. ACTIVE NAV LINK BASED ON SCROLL
// ============================================================

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

// ============================================================
// 3. INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================

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

const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(element => {
  observer.observe(element);
});

// ============================================================
// 4. PARALLAX EFFECT FOR HERO
// ============================================================

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

// ============================================================
// 5. UTILITY FUNCTIONS
// ============================================================

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

function setMobileVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// ============================================================
// 6. CONTACT FORM HANDLER - SINGLE IMPLEMENTATION
// ============================================================

function initializeContactForm() {
  console.log('🔧 Initializing contact form...');
  
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) {
    console.warn('⚠️ Contact form not found with ID "contactForm"');
    return;
  }
  
  console.log('✅ Contact form found');
  
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('📋 Form submitted');
    
    // Get form fields
    const firstNameInput = contactForm.querySelector('input[name="firstName"]');
    const lastNameInput = contactForm.querySelector('input[name="lastName"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const subjectInput = contactForm.querySelector('input[name="subject"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const newsletterInput = contactForm.querySelector('input[name="newsletter"]');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Validation - Check if fields exist
    if (!firstNameInput || !emailInput || !subjectInput || !messageInput) {
      console.error('❌ Missing form fields');
      showFormStatus('Form error: Missing required fields', 'error', formStatus);
      return;
    }
    
    // Get values
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput ? lastNameInput.value.trim() : '';
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();
    const newsletter = newsletterInput ? newsletterInput.checked : false;
    
    console.log('📝 Form data:', { firstName, lastName, email, subject, message, newsletter });
    
    // Validate required fields
    if (!firstName || !email || !subject || !message) {
      console.warn('⚠️ Validation failed: Missing required fields');
      showFormStatus('Please fill in all required fields', 'error', formStatus);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('⚠️ Validation failed: Invalid email');
      showFormStatus('Please enter a valid email address', 'error', formStatus);
      return;
    }
    
    // Prepare payload
    const formData = {
      firstName,
      lastName,
      email,
      subject,
      message,
      newsletter
    };
    
    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.style.opacity = '0.6';
    }
    
    try {
      console.log('🚀 Sending to backend: http://localhost:3000/api/contact');
      
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      console.log('📊 Response status:', response.status);
      
      const result = await response.json();
      console.log('✉️ Response data:', result);
      
      if (result.success) {
        console.log('✅ Success! Email sent');
        showFormStatus('✅ Message sent successfully! We will get back to you soon.', 'success', formStatus);
        contactForm.reset();
      } else {
        console.error('❌ Server error:', result.message);
        showFormStatus('❌ ' + (result.message || 'Failed to send message'), 'error', formStatus);
      }
      
    } catch (error) {
      console.error('❌ Network error:', error.message);
      showFormStatus('❌ Error sending message. Please check if backend is running on http://localhost:3000', 'error', formStatus);
    } finally {
      // Restore button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
        submitBtn.style.opacity = '1';
      }
    }
  });
}

// Show form status message
function showFormStatus(message, type, formStatus) {
  if (!formStatus) {
    console.warn('⚠️ Form status element not found');
    return;
  }
  
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.style.display = 'block';
  
  console.log(`📢 Status: [${type.toUpperCase()}] ${message}`);
  
  // Auto-hide success after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 5000);
  }
}

// ============================================================
// 7. IMAGE LOADING ANIMATIONS
// ============================================================

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

// ============================================================
// 8. CARD HOVER EFFECTS
// ============================================================

const cards = document.querySelectorAll('.advantage-card, .team-card, .mission-card, .tilt-service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  });
});

// ============================================================
// 9. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================================
// 10. STAGGER ANIMATION FOR GRID ITEMS
// ============================================================

function addStaggerAnimation() {
  const grids = document.querySelectorAll('.advantages-grid, .team-grid, .mission-grid, .tilt-services-grid');
  
  grids.forEach(grid => {
    const items = grid.querySelectorAll('.animate-on-scroll');
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  });
}

addStaggerAnimation();

// ============================================================
// 11. KEYBOARD NAVIGATION
// ============================================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    mobileMenuBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    mobileMenuToggle.focus();
  }
});

// ============================================================
// 12. ACCESSIBILITY - REDUCED MOTION SUPPORT
// ============================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.documentElement.style.setProperty('--duration-fast', '0ms');
  document.documentElement.style.setProperty('--duration-normal', '0ms');
  document.documentElement.style.setProperty('--duration-slow', '0ms');
}

// ============================================================
// 13. DEBOUNCED SCROLL FUNCTIONS
// ============================================================

const debouncedUpdateNav = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedUpdateNav);

if (window.innerWidth <= 1023) {
  window.addEventListener('resize', debounce(setMobileVH, 100));
  setMobileVH();
}

// ============================================================
// 14. INITIALIZATION ON DOM READY
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Navika Green Consulting website initialized');
  
  // Initialize form handler
  initializeContactForm();
  
  // Trigger initial nav update
  updateActiveNavLink();
  
  // Animate hero content
  setTimeout(() => {
    if (heroContent) {
      heroContent.style.opacity = '1';
    }
  }, 100);
  
  // Set mobile viewport height
  setMobileVH();
  
  console.log('✅ All modules loaded successfully');
});

console.log('📄 app.js loaded');
