/**
 * Iron Fence Cyber Solutions - Main JavaScript
 * Handles navigation, form validation, and core interactions
 */

class IronFenceCyber {
    constructor() {
        this.currentSection = 'home';
        this.sections = ['home', 'about', 'services', 'contact', 'tools'];
        this.isScrolling = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        this.init();
    }

    init() {
        this.initLoading();
        this.initNavigation();
        this.initScrollEffects();
        this.initFormValidation();
        this.initStatCounters();
        this.initParticleSystem();
        this.initKeyboardNavigation();
        this.initTouchGestures();
        this.initIntersectionObserver();
        
        // Initialize after DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.finishInit();
            });
        } else {
            this.finishInit();
        }
    }

    finishInit() {
        // Remove loading screen after a delay
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2000);

        // Set initial active section
        this.showSection('home');
        
        // Initialize animations
        this.initAnimations();
    }

    initLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = loadingScreen?.querySelector('.loading-progress');
        
        if (progressBar) {
            // Simulate loading progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                progressBar.style.width = `${progress}%`;
            }, 100);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    initNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Hamburger menu toggle
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu?.classList.toggle('active');
        });

        // Navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                if (section) {
                    this.navigateToSection(section);
                    // Close mobile menu
                    hamburger?.classList.remove('active');
                    navMenu?.classList.remove('active');
                }
            });
        });

        // Button navigation
        document.querySelectorAll('[data-section]').forEach(button => {
            if (!button.classList.contains('nav-link')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = button.getAttribute('data-section');
                    if (section) {
                        this.navigateToSection(section);
                    }
                });
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
        });
    }

    navigateToSection(sectionName) {
        if (this.isScrolling || !this.sections.includes(sectionName)) return;
        
        this.isScrolling = true;
        this.currentSection = sectionName;
        
        // Update navigation active state
        this.updateNavigation(sectionName);
        
        // Show target section
        this.showSection(sectionName);
        
        // Reset scrolling flag
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }

    updateNavigation(activeSection) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === activeSection) {
                link.classList.add('active');
            }
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Update URL hash
        history.pushState(null, null, `#${sectionName}`);
    }

    initScrollEffects() {
        // Wheel navigation
        window.addEventListener('wheel', (e) => {
            if (this.isScrolling) return;
            
            const delta = e.deltaY;
            const currentIndex = this.sections.indexOf(this.currentSection);
            
            if (delta > 0 && currentIndex < this.sections.length - 1) {
                // Scroll down
                this.navigateToSection(this.sections[currentIndex + 1]);
            } else if (delta < 0 && currentIndex > 0) {
                // Scroll up
                this.navigateToSection(this.sections[currentIndex - 1]);
            }
        }, { passive: false });

        // Handle hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && this.sections.includes(hash)) {
                this.navigateToSection(hash);
            }
        });

        // Set initial section from URL
        const initialHash = window.location.hash.substring(1);
        if (initialHash && this.sections.includes(initialHash)) {
            this.currentSection = initialHash;
        }
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isScrolling) return;
            
            const currentIndex = this.sections.indexOf(this.currentSection);
            
            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    e.preventDefault();
                    if (currentIndex < this.sections.length - 1) {
                        this.navigateToSection(this.sections[currentIndex + 1]);
                    }
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        this.navigateToSection(this.sections[currentIndex - 1]);
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    this.navigateToSection('home');
                    break;
                case 'End':
                    e.preventDefault();
                    this.navigateToSection(this.sections[this.sections.length - 1]);
                    break;
            }
        });
    }

    initTouchGestures() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (this.isScrolling) return;
            
            this.touchEndY = e.changedTouches[0].clientY;
            const diff = this.touchStartY - this.touchEndY;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                const currentIndex = this.sections.indexOf(this.currentSection);
                
                if (diff > 0 && currentIndex < this.sections.length - 1) {
                    // Swipe up - go to next section
                    this.navigateToSection(this.sections[currentIndex + 1]);
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe down - go to previous section
                    this.navigateToSection(this.sections[currentIndex - 1]);
                }
            }
        }, { passive: true });
    }

    initFormValidation() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm(contactForm)) {
                this.submitForm(contactForm);
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${this.getFieldLabel(field)} is required.`;
            isValid = false;
        }
        // Email validation
        else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
        }
        // Phone validation (if phone field exists)
        else if (fieldName === 'phone' && value && !this.isValidPhone(value)) {
            errorMessage = 'Please enter a valid phone number.';
            isValid = false;
        }
        // Name validation
        else if ((fieldName === 'firstName' || fieldName === 'lastName') && value && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long.';
            isValid = false;
        }
        // Message length validation
        else if (fieldName === 'message' && value && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long.';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup?.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('error');
    }

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--danger-color)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--spacing-xs)';
        
        formGroup.appendChild(errorElement);
    }

    getFieldLabel(field) {
        const label = field.closest('.form-group')?.querySelector('label');
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    async submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(new FormData(form));
            
            // Show success message
            this.showFormMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
            form.reset();
            
        } catch (error) {
            // Show error message
            this.showFormMessage('error', 'Sorry, there was an error sending your message. Please try again later.');
            console.error('Form submission error:', error);
            
        } finally {
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    }

    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    showFormMessage(type, message) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        const styles = {
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--border-radius-md)',
            marginTop: 'var(--spacing-lg)',
            fontSize: 'var(--font-size-sm)',
            border: '1px solid',
            animation: 'fadeInUp 0.3s ease'
        };

        if (type === 'success') {
            styles.backgroundColor = 'rgba(0, 255, 136, 0.1)';
            styles.borderColor = 'var(--success-color)';
            styles.color = 'var(--success-color)';
        } else {
            styles.backgroundColor = 'rgba(255, 68, 68, 0.1)';
            styles.borderColor = 'var(--danger-color)';
            styles.color = 'var(--danger-color)';
        }

        Object.assign(messageElement.style, styles);

        const contactForm = document.getElementById('contact-form');
        contactForm?.appendChild(messageElement);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    initStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 20);
        });
    }

    initParticleSystem() {
        const homeSection = document.getElementById('home');
        if (!homeSection) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        homeSection.appendChild(particlesContainer);

        // Create particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createParticle(particlesContainer);
            }, i * 100);
        }

        // Continuously create new particles
        setInterval(() => {
            this.createParticle(particlesContainer);
        }, 300);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;
        const duration = 3 + Math.random() * 3;
        
        particle.style.left = startX + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() + 's';
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000 + 1000);
    }

    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe animated elements
        document.querySelectorAll('.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .scale-in-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    initAnimations() {
        // Add animation classes to elements
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            card.classList.add('fade-in-on-scroll');
            card.style.animationDelay = `${index * 0.1}s`;
        });

        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.classList.add('scale-in-on-scroll');
            card.style.animationDelay = `${index * 0.1}s`;
        });

        document.querySelectorAll('.tool-card').forEach((card, index) => {
            card.classList.add('slide-in-left-on-scroll');
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Glitch effect for hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.classList.add('glitch');
            heroTitle.setAttribute('data-text', heroTitle.textContent);
        }
    }

    // Utility methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the application
const app = new IronFenceCyber();

// Add CSS for form errors
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: var(--danger-color);
        box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1);
    }
    
    .error-message {
        animation: fadeInUp 0.3s ease;
    }
`;
document.head.appendChild(errorStyles);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IronFenceCyber;
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.ironFenceApp = new IronFenceCyber();
});
