// SNZ Education - Main JavaScript File

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      hamburger.classList.toggle('active');
      
      // Animate hamburger icon
      const bars = hamburger.querySelectorAll('span');
      bars.forEach(bar => bar.classList.toggle('active'));
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        hamburger.classList.remove('active');
        const bars = hamburger.querySelectorAll('span');
        bars.forEach(bar => bar.classList.remove('active'));
      });
    });
  }

  // Mobile Services Dropdown Toggle
  const mobileServicesBtn = document.getElementById('mobile-services-btn');
  const mobileServicesMenu = document.getElementById('mobile-services-menu');
  const mobileServicesArrow = document.getElementById('mobile-services-arrow');
  
  if (mobileServicesBtn && mobileServicesMenu && mobileServicesArrow) {
    mobileServicesBtn.addEventListener('click', function(e) {
      e.preventDefault();
      mobileServicesMenu.classList.toggle('hidden');
      mobileServicesArrow.classList.toggle('rotate-180');
    });
    
    // Close mobile services menu when clicking on a service link
    const serviceLinks = mobileServicesMenu.querySelectorAll('.nav-link');
    serviceLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileServicesMenu.classList.add('hidden');
        mobileServicesArrow.classList.remove('rotate-180');
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Scroll animations - Ultra subtle fade-in approach
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '50px 0px 50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation with slight stagger
  document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
    // Small stagger for visual flow
    const delay = Math.min(index * 0.08, 0.1); // Max 0.5s delay
    el.style.transitionDelay = `${delay}s`;
    observer.observe(el);
  });

  // Sticky header on scroll - Always keep white background for visibility
  const header = document.getElementById('main-header');
  const topBar = document.querySelector('.fixed.top-0.bg-gray-100');
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('shadow-lg', 'bg-white');
      if (topBar) {
        topBar.classList.add('shadow-sm');
      }
    } else {
      header.classList.remove('shadow-lg');
      if (topBar) {
        topBar.classList.remove('shadow-sm');
      }
      // Keep white background always for visibility
      header.classList.add('bg-white');
    }
  });

  // Form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      let isValid = true;
      const errors = [];

      // Name validation
      if (name === '') {
        isValid = false;
        errors.push('Name is required');
        document.getElementById('name').classList.add('border-red-500');
      } else {
        document.getElementById('name').classList.remove('border-red-500');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '') {
        isValid = false;
        errors.push('Email is required');
        document.getElementById('email').classList.add('border-red-500');
      } else if (!emailRegex.test(email)) {
        isValid = false;
        errors.push('Please enter a valid email address');
        document.getElementById('email').classList.add('border-red-500');
      } else {
        document.getElementById('email').classList.remove('border-red-500');
      }

      // Message validation
      if (message === '') {
        isValid = false;
        errors.push('Message is required');
        document.getElementById('message').classList.add('border-red-500');
      } else {
        document.getElementById('message').classList.remove('border-red-500');
      }

      // Show success or error message
      const formMessage = document.getElementById('form-message');
      if (formMessage) {
        if (isValid) {
          formMessage.className = 'mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg';
          formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
          contactForm.reset();
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'hidden';
          }, 5000);
        } else {
          formMessage.className = 'mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg';
          formMessage.textContent = errors.join('. ');
        }
      }
    });
  }

  // Hero Carousel Auto-Scroll
  const heroSlides = document.querySelectorAll('.hero-slide');
  const carouselIndicators = document.querySelectorAll('.carousel-indicator');
  let currentSlide = 0;
  let carouselInterval;

  function showSlide(index) {
    // Remove active class from all slides and indicators
    heroSlides.forEach(slide => slide.classList.remove('active'));
    carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (heroSlides[index]) {
      heroSlides[index].classList.add('active');
    }
    if (carouselIndicators[index]) {
      carouselIndicators[index].classList.add('active');
    }
    
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % heroSlides.length;
    showSlide(next);
  }

  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
  }

  // Initialize carousel
  if (heroSlides.length > 0) {
    showSlide(0);
    startCarousel();

    // Add click handlers to indicators
    carouselIndicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        stopCarousel();
        showSlide(index);
        startCarousel();
      });
    });

    // Pause on hover (optional)
    const carouselContainer = document.querySelector('.hero-carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopCarousel);
      carouselContainer.addEventListener('mouseleave', startCarousel);
    }
  }
});

