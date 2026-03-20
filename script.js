/* ============================================
   InfinityHook Website - JavaScript
   Interactive Features & Animations
   ============================================ */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 100
    });

    // Initialize all features
    initializeNavigation();
    initializeCounters();
    initializeParallax();
    initializeScrollIndicator();
    initializeHamburgerMenu();
    initializeThemeEnhancements();
});

/* ============================================
   Navigation Enhancements
   ============================================ */

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 255, 136, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

/* ============================================
   Hamburger Menu Toggle
   ============================================ */

function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

/* ============================================
   Animated Counters
   ============================================ */

function initializeCounters() {
    const counters = document.querySelectorAll('.animated-counter');
    let hasAnimated = false;

    // IntersectionObserver to trigger animation when counter is in view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateAllCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing all counters
    counters.forEach(counter => {
        observer.observe(counter);
    });

    function animateAllCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const startTime = Date.now();

            function updateCounter() {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                const current = Math.floor(progress * target);

                // Format large numbers with commas
                if (target > 1000) {
                    counter.textContent = current.toLocaleString();
                } else {
                    counter.textContent = current;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    // Final value
                    if (target > 1000) {
                        counter.textContent = target.toLocaleString();
                    } else {
                        counter.textContent = target;
                    }
                }
            }

            updateCounter();
        });
    }
}

/* ============================================
   Parallax Effect
   ============================================ */

function initializeParallax() {
    const heroImageContainer = document.querySelector('.hero-image-container');
    const heroContent = document.querySelector('.hero-content');

    if (heroImageContainer) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const parallaxSpeed = 0.5;
            
            if (scrollPosition < 1000) {
                heroImageContainer.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
                heroContent.style.transform = `translateY(${scrollPosition * parallaxSpeed * 0.7}px)`;
            }
        });
    }

    // Mouse parallax effect on hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        document.addEventListener('mousemove', function(e) {
            if (window.scrollY < 1000) {
                const x = (e.clientX / window.innerWidth) * 10 - 5;
                const y = (e.clientY / window.innerHeight) * 10 - 5;
                
                if (heroImageContainer) {
                    heroImageContainer.style.transform = `translateY(${window.scrollY * 0.5}px) 
                        perspective(1000px) rotateX(${y * 0.5}deg) rotateY(${x * 0.5}deg)`;
                }
            }
        });
    }
}

/* ============================================
   Scroll Indicator
   ============================================ */

function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        // Hide scroll indicator after first scroll
        window.addEventListener('scroll', function hideIndicator() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
                window.removeEventListener('scroll', hideIndicator);
            }
        });
    }
}

/* ============================================
   Theme Enhancements & Effects
   ============================================ */

function initializeThemeEnhancements() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            // Add ripple animation keyframe dynamically if not exists
            if (!document.querySelector('style[data-ripple]')) {
                const style = document.createElement('style');
                style.setAttribute('data-ripple', 'true');
                style.textContent = `
                    @keyframes ripple {
                        to {
                            width: 300px;
                            height: 300px;
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add glow effects to feature cards on hover
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate angle of mouse position
            const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180 / Math.PI;
            this.style.setProperty('--angle', angle + 'deg');
        });
    });

    // Animate stat boxes on scroll into view
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach(box => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });
        observer.observe(box);
    });
}

/* ============================================
   Additional Interactive Features
   ============================================ */

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Keyboard navigation
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 100, behavior: 'smooth' });
    }
    
    if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
});

// Add smooth scroll behavior for all anchor links
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target && target.href.includes('#')) {
        e.preventDefault();
        const id = target.getAttribute('href');
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

/* ============================================
   Performance Optimizations
   ============================================ */

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ============================================
   Mobile Responsiveness Enhancements
   ============================================ */

// Handle mobile viewport changes
window.addEventListener('resize', function() {
    // Reset parallax on mobile
    if (window.innerWidth < 768) {
        const heroImageContainer = document.querySelector('.hero-image-container');
        if (heroImageContainer) {
            heroImageContainer.style.transform = 'none';
        }
    }
});

/* ============================================
   Analytics & Event Tracking (Optional)
   ============================================ */

// Track button clicks
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        // You can integrate with analytics service like Google Analytics
        // Example: ga('send', 'event', 'button', 'click', this.textContent);
        console.log('Download button clicked:', this.textContent);
    });
});

// Track navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Navigation to:', this.getAttribute('href'));
    });
});

/* ============================================
   Utility Functions
   ============================================ */

// Debounce function for performance
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

// Throttle function for scroll events
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

// Intersection Observer polyfill fallback
if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported in this browser');
}

/* ============================================
   Advanced Animations
   ============================================ */

// Create a gradient animation effect
function createGradientAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
    `;
    document.head.appendChild(style);
}

createGradientAnimation();

// Smooth reveal animations on scroll
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-aos]');
    
    const revealOnScroll = throttle(() => {
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !element.hasAttribute('data-revealed')) {
                element.setAttribute('data-revealed', 'true');
            }
        });
    }, 100);

    window.addEventListener('scroll', revealOnScroll);
}

setupRevealAnimations();

/* ============================================
   Feature Highlight System
   ============================================ */

// Highlight features based on scroll position
function highlightOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', throttle(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

highlightOnScroll();

/* ============================================
   Dynamic Theme Switching (Optional)
   ============================================ */

// Check for dark mode preference
function initializeThemeSwitcher() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.style.colorScheme = 'light';
        }
    });
}

initializeThemeSwitcher();

/* ============================================
   Console Easter Eggs
   ============================================ */

// Fun console message
console.clear();
console.log(
    '%c🚀 InfinityHook - Unleash Your PC Performance',
    'font-size: 16px; font-weight: bold; color: #00ff88; text-shadow: 0 0 10px #00ff88;'
);
console.log(
    '%cDeveloped by Enumx0 | Community-driven Windows Optimization',
    'font-size: 12px; color: #00cc55;'
);
console.log(
    '%cJoin us: Discord',
    'font-size: 11px; color: #6b7280;'
);

// Export for use in other scripts if needed
window.InfinityHook = {
    version: '3.2.1',
    animate: {
        counter: initializeCounters,
        parallax: initializeParallax
    },
    ui: {
        initNav: initializeNavigation,
        initTheme: initializeThemeEnhancements
    }
};
