// Initialize AOS
document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 100,
  });
});

// Navigation functionality
class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.hamburger = document.getElementById('hamburger');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');

    this.init();
  }

  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleSmoothScroll();
    this.handleActiveSection();

    // Event listeners
    window.addEventListener(
      'scroll',
      this.throttle(this.handleScroll.bind(this), 16)
    );
    this.hamburger.addEventListener('click', this.toggleMobileMenu.bind(this));

    // Close mobile menu when clicking on nav links
    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        !this.navbar.contains(e.target) &&
        this.navMenu.classList.contains('active')
      ) {
        this.closeMobileMenu();
      }
    });
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  handleMobileMenu() {
    // Close mobile menu on resize if window becomes large
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (this.navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleSmoothScroll() {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  handleActiveSection() {
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener(
      'scroll',
      this.throttle(() => {
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            this.navLinks.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
              }
            });
          }
        });
      }, 16)
    );
  }

  // Throttle function for performance
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }
}

// Form handling
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.inputs = this.form.querySelectorAll('input, textarea');

    this.init();
  }

  init() {
    this.handleFormSubmit();
    this.handleInputValidation();
    this.handleFloatingLabels();
  }

  handleFormSubmit() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData);

      // Validate form
      if (this.validateForm(data)) {
        this.submitForm(data);
      }
    });
  }

  validateForm(data) {
    let isValid = true;
    const errors = [];

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push('Please enter a valid email address');
      isValid = false;
    }

    // Subject validation
    if (!data.subject || data.subject.trim().length < 5) {
      errors.push('Subject must be at least 5 characters long');
      isValid = false;
    }

    // Message validation
    if (!data.message || data.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
      isValid = false;
    }

    if (!isValid) {
      this.showErrors(errors);
    }

    return isValid;
  }

  submitForm(data) {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      this.showSuccess();
      this.form.reset();

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Reset floating labels
      this.inputs.forEach((input) => {
        input.classList.remove('has-value');
      });
    }, 2000);
  }

  showErrors(errors) {
    // Remove existing error messages
    const existingErrors = this.form.querySelectorAll('.error-message');
    existingErrors.forEach((error) => error.remove());

    // Show new errors
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.style.cssText = `
            background: #ff6b6b;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        `;

    const errorList = document.createElement('ul');
    errorList.style.cssText = 'margin: 0; padding-left: 1rem;';

    errors.forEach((error) => {
      const errorItem = document.createElement('li');
      errorItem.textContent = error;
      errorList.appendChild(errorItem);
    });

    errorContainer.appendChild(errorList);
    this.form.insertBefore(errorContainer, this.form.firstChild);

    // Remove error after 5 seconds
    setTimeout(() => {
      errorContainer.remove();
    }, 5000);
  }

  showSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.cssText = `
            background: #51cf66;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
        `;
    successMessage.innerHTML =
      '<i class="fas fa-check-circle"></i> Message sent successfully!';

    this.form.insertBefore(successMessage, this.form.firstChild);

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  handleInputValidation() {
    this.inputs.forEach((input) => {
      input.addEventListener('blur', () => {
        this.validateInput(input);
      });

      input.addEventListener('input', () => {
        this.clearInputError(input);
      });
    });
  }

  validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (input.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'text':
        if (input.required && value.length < 2) {
          isValid = false;
          errorMessage = 'This field must be at least 2 characters long';
        }
        break;
      default:
        if (input.required && value.length < 5) {
          isValid = false;
          errorMessage = 'This field must be at least 5 characters long';
        }
    }

    if (!isValid) {
      this.showInputError(input, errorMessage);
    } else {
      this.clearInputError(input);
    }
  }

  showInputError(input, message) {
    this.clearInputError(input);

    const errorElement = document.createElement('span');
    errorElement.className = 'input-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
            color: #ff6b6b;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: block;
        `;

    input.parentNode.appendChild(errorElement);
    input.style.borderColor = '#ff6b6b';
  }

  clearInputError(input) {
    const errorElement = input.parentNode.querySelector('.input-error');
    if (errorElement) {
      errorElement.remove();
    }
    input.style.borderColor = '';
  }

  handleFloatingLabels() {
    this.inputs.forEach((input) => {
      // Check if input has value on page load
      if (input.value) {
        input.classList.add('has-value');
      }

      input.addEventListener('focus', () => {
        input.classList.add('has-value');
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          input.classList.remove('has-value');
        }
      });
    });
  }
}

// Scroll animations
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.handleParallax();
    this.handleCounters();
  }

  handleParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length > 0) {
      window.addEventListener(
        'scroll',
        this.throttle(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;

          parallaxElements.forEach((element) => {
            element.style.transform = `translateY(${rate}px)`;
          });
        }, 16)
      );
    }
  }

  handleCounters() {
    const counters = document.querySelectorAll('.stat h4');
    let hasAnimated = false;

    const animateCounters = () => {
      if (hasAnimated) return;

      counters.forEach((counter) => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent =
              Math.ceil(current) +
              (counter.textContent.includes('+') ? '+' : '') +
              (counter.textContent.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent =
              target +
              (counter.textContent.includes('+') ? '+' : '') +
              (counter.textContent.includes('%') ? '%' : '');
          }
        };

        updateCounter();
      });

      hasAnimated = true;
    };

    // Trigger when about section is in view
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounters();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(aboutSection);
    }
  }

  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }
}

// Performance optimizations
class Performance {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalAssets();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach((img) => {
        img.src = img.dataset.src || img.src;
      });
    }
  }

  preloadCriticalAssets() {
    // Preload critical images
    const criticalImages = ['assets/profile.jpg', 'assets/about-me.jpg'];

    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
}

// Particle System
class ParticleSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;

    this.init();
  }

  init() {
    this.createCanvas();
    this.createParticles();
    this.animate();
    this.handleResize();
  }

  createCanvas() {
    const container = document.getElementById('particles-js');
    if (!container) return;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';

    container.appendChild(this.canvas);

    this.resize();
  }

  resize() {
    if (!this.canvas) return;

    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  createParticles() {
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 15));

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * (this.canvas?.width || window.innerWidth),
        y: Math.random() * (this.canvas?.height || window.innerHeight),
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.getRandomColor(),
      });
    }
  }

  getRandomColor() {
    const colors = [
      'rgba(108, 92, 231, ',
      'rgba(162, 155, 254, ',
      'rgba(253, 121, 168, ',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animate() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Bounce off edges
      if (particle.x <= 0 || particle.x >= this.canvas.width) {
        particle.speedX *= -1;
      }
      if (particle.y <= 0 || particle.y >= this.canvas.height) {
        particle.speedY *= -1;
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color + particle.opacity + ')';
      this.ctx.fill();

      // Draw connections
      this.particles.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
              Math.pow(particle.y - otherParticle.y, 2)
          );

          if (distance < 100) {
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(otherParticle.x, otherParticle.y);
            this.ctx.strokeStyle = `rgba(108, 92, 231, ${
              0.1 * (1 - distance / 100)
            })`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }
      });
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.resize();
      this.particles = [];
      this.createParticles();
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      this.canvas.remove();
    }
  }
}

// Enhanced Hero Animations
class HeroAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.addFloatingElements();
    this.addMouseInteraction();
  }

  addFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create floating geometric shapes
    for (let i = 0; i < 5; i++) {
      const shape = document.createElement('div');
      shape.className = 'floating-shape';
      shape.style.cssText = `
                position: absolute;
                width: ${Math.random() * 40 + 20}px;
                height: ${Math.random() * 40 + 20}px;
                background: linear-gradient(45deg, rgba(108, 92, 231, 0.1), rgba(162, 155, 254, 0.1));
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                top: ${Math.random() * 80 + 10}%;
                left: ${Math.random() * 80 + 10}%;
                animation: floatRandom${i} ${
        Math.random() * 10 + 10
      }s ease-in-out infinite;
                z-index: 1;
            `;

      hero.appendChild(shape);

      // Create unique animation for each shape
      const style = document.createElement('style');
      style.textContent = `
                @keyframes floatRandom${i} {
                    0%, 100% { 
                        transform: translate(0, 0) rotate(0deg); 
                        opacity: 0.3;
                    }
                    25% { 
                        transform: translate(${Math.random() * 40 - 20}px, ${
        Math.random() * 40 - 20
      }px) rotate(90deg); 
                        opacity: 0.6;
                    }
                    50% { 
                        transform: translate(${Math.random() * 40 - 20}px, ${
        Math.random() * 40 - 20
      }px) rotate(180deg); 
                        opacity: 0.3;
                    }
                    75% { 
                        transform: translate(${Math.random() * 40 - 20}px, ${
        Math.random() * 40 - 20
      }px) rotate(270deg); 
                        opacity: 0.6;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }

  addMouseInteraction() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Move floating shapes based on mouse position
      const shapes = hero.querySelectorAll('.floating-shape');
      shapes.forEach((shape, index) => {
        const moveX = (x - 0.5) * (index + 1) * 5;
        const moveY = (y - 0.5) * (index + 1) * 5;
        shape.style.transform += ` translate(${moveX}px, ${moveY}px)`;
      });
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
  new ContactForm();
  new ScrollAnimations();
  new Performance();

  // Initialize particle system and hero animations
  const particleSystem = new ParticleSystem();
  const heroAnimations = new HeroAnimations();

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    particleSystem.destroy();
  });
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.animationPlayState = 'paused';
  } else {
    // Resume animations when page becomes visible
    document.body.style.animationPlayState = 'running';
  }
});
