// ============================================
// LogisAI - JavaScript Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for # only (mobile toggle)
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // INTERSECTION OBSERVER - ANIMATE ON SCROLL WITH ZOOM
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class with slight delay for better effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 50);

                // Optionally unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class and add staggered delays
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el, index) => {
        // Add delay classes to cards in grids
        const gridParent = el.closest('.grid, .features-grid, .stats-grid');
        if (gridParent) {
            const siblings = gridParent.querySelectorAll('.animate-on-scroll');
            const indexInGrid = Array.from(siblings).indexOf(el);
            if (indexInGrid > 0) {
                el.style.transitionDelay = `${indexInGrid * 0.1}s`;
            }
        }
        observer.observe(el);
    });

    // ============================================
    // PARALLAX & ZOOM EFFECT ON HERO
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    const heroText = document.querySelector('.hero-text');

    if (heroSection && heroVisual) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;

            if (scrolled < heroHeight) {
                // Parallax effect
                const parallaxRate = scrolled * 0.3;

                // Zoom out effect (scale down as you scroll)
                const zoomProgress = scrolled / heroHeight;
                const scale = 1 - (zoomProgress * 0.15); // Scale from 1 to 0.85
                const opacity = 1 - (zoomProgress * 0.3); // Slight fade

                heroVisual.style.transform = `translateY(${parallaxRate}px) scale(${scale})`;
                heroVisual.style.opacity = opacity;

                // Subtle zoom on text too
                if (heroText) {
                    const textScale = 1 - (zoomProgress * 0.05);
                    heroText.style.transform = `scale(${textScale})`;
                }
            }
        });
    }

    // ============================================
    // COUNTER ANIMATION FOR STATS
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounter = (element) => {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isFraction = target.includes('/');

        if (isPercentage) {
            const value = parseInt(target);
            let current = 0;
            const increment = value / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    element.textContent = value + '%';
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + '%';
                }
            }, 30);
        }
    };

    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => animateCounter(stat));
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ============================================
    // FORM VALIDATION (if form is added later)
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            // Basic validation
            let isValid = true;
            const required = this.querySelectorAll('[required]');

            required.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#EF4444';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (isValid) {
                // Here you would typically send the form data to a server
                console.log('Form submitted:', Object.fromEntries(formData));

                // Show success message
                alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
                this.reset();
            } else {
                alert('Por favor completa todos los campos requeridos.');
            }
        });
    }

    // ============================================
    // FLOATING ANIMATION FOR CARDS
    // ============================================
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        card.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });

    // ============================================
    // CURSOR GLOW EFFECT (Optional Premium Touch)
    // ============================================
    const createCursorGlow = () => {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
            opacity: 0;
        `;
        document.body.appendChild(glow);

        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            glow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });

        const animate = () => {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;
            glow.style.left = glowX + 'px';
            glow.style.top = glowY + 'px';
            requestAnimationFrame(animate);
        };

        animate();
    };

    // Uncomment to enable cursor glow on desktop
    // if (window.innerWidth > 1024) {
    //     createCursorGlow();
    // }

    // ============================================
    // PRELOAD ANIMATION (Optional)
    // ============================================
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // ============================================
    // LAZY LOAD IMAGES (if you add more images)
    // ============================================
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ============================================
    // CONSOLE BRANDING
    // ============================================
    console.log('%c⚡ LogisAI', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cAutomatizaciones que fluyen en tu negocio', 'font-size: 14px; color: #64748B;');
    console.log('%c¿Interesado en trabajar con nosotros? facuetcheverry4@gmail.com', 'font-size: 12px; color: #2563EB;');

});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
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

// Request animation frame polyfill
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());
