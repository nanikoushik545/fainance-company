
// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('loaded');
    }
});

// Custom Cursor
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
const hasTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

if (!hasTouch && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) { // also check prefers-reduced-motion for custom cursor
    document.body.classList.remove('no-custom-cursor');
    window.addEventListener('mousemove', (e) => {
        if (cursorDot) { cursorDot.style.left = `${e.clientX}px`; cursorDot.style.top = `${e.clientY}px`; }
        if (cursorOutline) { cursorOutline.style.left = `${e.clientX}px`; cursorOutline.style.top = `${e.clientY}px`; }
    });
    document.querySelectorAll('a, button, input[type="submit"], input[type="button"], .nav-toggle, .service-card, .strength-item, .text-link, .partner-logo, .mdrt-badge, .stat-item, .testimonial-item').forEach(el => {
        el.addEventListener('mouseenter', () => { if (cursorOutline) cursorOutline.classList.add('cursor-outline-scaled'); });
        el.addEventListener('mouseleave', () => { if (cursorOutline) cursorOutline.classList.remove('cursor-outline-scaled'); });
    });
    document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach(el => {
        el.addEventListener('mouseenter', () => { if (cursorOutline) cursorOutline.classList.add('cursor-outline-text-input'); });
        el.addEventListener('mouseleave', () => { if (cursorOutline) cursorOutline.classList.remove('cursor-outline-text-input'); });
    });
} else {
    document.body.classList.add('no-custom-cursor');
    if(cursorDot) cursorDot.style.display = 'none';
    if(cursorOutline) cursorOutline.style.display = 'none';
}

const pageHeader = document.getElementById('pageHeader');
const mainNavMenu = document.getElementById('mainNavMenu');
const navToggleBtn = document.getElementById('navToggleBtn');
const backToTopBtn = document.getElementById('backToTopBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const scrollProgressBarJS = document.getElementById('scrollProgressBar');
const contactFormJS = document.getElementById('contactForm');
const formSubmissionMessageJS = document.getElementById('formSubmissionMessage');
const heroH1JS = document.querySelector('#hero .hero-content h1');
const aboutImageParallax = document.getElementById('aboutImageParallax');


// Animated Counters
function animateValue(obj, start, end, duration, suffix) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        obj.innerHTML = end + (suffix || "");
        return;
    }
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        obj.innerHTML = Math.floor(easedProgress * (end - start) + start);
        if (easedProgress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end + (suffix || "");
        }
    };
    window.requestAnimationFrame(step);
}
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                const suffix = target.getAttribute('data-suffix') || "";
                animateValue(target, 0, countTo, 2200, suffix);
                target.classList.add('counted');
            }
        });
    }, { threshold: 0.4 });
    statNumbers.forEach(num => statsObserver.observe(num));
}

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
         if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (this.type === 'submit' && this.form && !this.form.checkValidity()) {}
        else {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Form Input Validation Visuals
if (contactFormJS) {
    document.querySelectorAll('#contactForm input[required], #contactForm textarea[required]').forEach(input => {
        function validateInputVisuals(el) {
             if (el.value.trim() === '' && !el.matches(':focus')) { el.classList.remove('valid', 'invalid'); return; }
            if (el.checkValidity()) { el.classList.remove('invalid'); el.classList.add('valid'); }
            else { el.classList.remove('valid'); el.classList.add('invalid'); }
        }
        input.addEventListener('input', function() { validateInputVisuals(this); });
        input.addEventListener('blur', function() { validateInputVisuals(this); });
    });
}

let navHeightVar = 70;
function updateNavHeight() {
    if (pageHeader) { navHeightVar = pageHeader.offsetHeight; }
}
window.addEventListener('load', updateNavHeight);
window.addEventListener('resize', updateNavHeight);


if (heroH1JS && !heroH1JS.querySelector('.word') && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroH1JS.innerHTML = heroH1JS.textContent.trim().split(/\s+/).map(word => `<span class="word">${word}</span>`).join(' ');
}

// Scroll based UI changes
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) { if(pageHeader) pageHeader.classList.add('scrolled'); }
    else { if(pageHeader) pageHeader.classList.remove('scrolled'); }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        if(scrollProgressBarJS) scrollProgressBarJS.style.width = scrolled + "%";
    } else {
         if(scrollProgressBarJS) scrollProgressBarJS.style.display = 'none';
    }


    if (scrollY > 300) {
        if(backToTopBtn) backToTopBtn.classList.add('visible');
        if(whatsappBtn) whatsappBtn.classList.add('visible');
    } else {
        if(backToTopBtn) backToTopBtn.classList.remove('visible');
        if(whatsappBtn) whatsappBtn.classList.remove('visible');
    }
    changeNavActiveState();

    // Subtle Parallax for About Image
    if (aboutImageParallax && window.innerWidth > 992 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const elementRect = aboutImageParallax.parentElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (elementRect.top < viewportHeight && elementRect.bottom > 0) {
            const scrollCenter = scrollY + viewportHeight / 2;
            const elementCenter = elementRect.top + scrollY + elementRect.height / 2;
            const parallaxOffset = (scrollCenter - elementCenter) * 0.03; // Reduced parallax intensity
            aboutImageParallax.style.transform = `perspective(1500px) rotateY(-8deg) translateY(${parallaxOffset}px)`;
        }
    } else if (aboutImageParallax) {
         // Reset for smaller screens or if reduced motion is on
         aboutImageParallax.style.transform = 'perspective(1500px) rotateY(-8deg) translateY(0px)';
         if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
             aboutImageParallax.style.transform = 'none'; // Completely remove transform for reduced motion
         }
    }


}, {passive: true});


// Mobile Nav Toggle
if (navToggleBtn && mainNavMenu) {
    navToggleBtn.addEventListener('click', () => {
        const isNavOpen = mainNavMenu.classList.toggle('nav-active');
        navToggleBtn.classList.toggle('nav-open', isNavOpen);
        navToggleBtn.setAttribute('aria-expanded', isNavOpen.toString());
        document.body.classList.toggle('mobile-nav-active', isNavOpen);
    });
}


const navLinksJS = document.querySelectorAll('#mainNavMenu ul li a');
const sectionsJS = document.querySelectorAll('main section[id]');

// Active Nav Link Highlighting
function changeNavActiveState() {
    if (!pageHeader || navLinksJS.length === 0 || sectionsJS.length === 0) return;
    let scrollYWithOffset = window.scrollY + pageHeader.offsetHeight + (window.innerHeight * 0.4);
    let currentSectionId = 'hero';

    for (let i = sectionsJS.length - 1; i >= 0; i--) {
        const section = sectionsJS[i];
        if (section.offsetTop <= scrollYWithOffset) {
            currentSectionId = section.id;
            break;
        }
    }
     if ((window.innerHeight + window.scrollY + 50) >= document.body.offsetHeight) {
         currentSectionId = sectionsJS[sectionsJS.length - 1].id;
     }

    navLinksJS.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('load', changeNavActiveState);


// Smooth Scroll for Nav Links & other anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hrefAttribute = this.getAttribute('href');
        if (!hrefAttribute || hrefAttribute === "#" || hrefAttribute.startsWith("#carousel")) return;

        e.preventDefault();
        const targetId = hrefAttribute.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            let offsetPosition = targetElement.offsetTop - (pageHeader ? pageHeader.offsetHeight : navHeightVar);
            if (targetElement.classList.contains('section-divider') && targetElement.classList.contains('top-angle') && targetId !== 'hero') {
                const dividerHeight = (window.innerWidth <= 768) ? 30 : 40;
                offsetPosition += dividerHeight;
            }
             const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 'auto' : 'smooth';
            window.scrollTo({ top: offsetPosition, behavior: behavior });

            if (mainNavMenu && mainNavMenu.classList.contains('nav-active') && this.closest('#mainNavMenu')) {
                mainNavMenu.classList.remove('nav-active');
                if(navToggleBtn) {
                    navToggleBtn.classList.remove('nav-open');
                    navToggleBtn.setAttribute('aria-expanded', 'false');
                }
                document.body.classList.remove('mobile-nav-active');
            }
        }
    });
});


if(backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 'auto' : 'smooth';
        window.scrollTo({ top: 0, behavior: behavior });
    });
}

// General Scroll Animations & H2 Underline Animation
const animatedElementsJS = document.querySelectorAll('.animate-on-scroll');
if (animatedElementsJS.length > 0 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observerOptions = { rootMargin: '0px 0px -50px 0px', threshold: 0.1 };
    const observerJS = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else if (!entry.target.classList.contains('no-reset-animation')) {
                // entry.target.classList.remove('is-visible'); // Option to reset on scroll out
            }
        });
    }, observerOptions);

    animatedElementsJS.forEach(el => {
        const hasSpecificAnimation = ['aos-fade-up', 'aos-fade-down', 'aos-fade-left', 'aos-fade-right', 'aos-zoom-in', 'aos-zoom-out', 'aos-flip-left', 'aos-flip-right', 'aos-skew-fade-up', 'aos-reveal-cover-left', 'aos-reveal-cover-right', 'aos-rotate-in'].some(cls => el.classList.contains(cls));
        if (!hasSpecificAnimation && !el.classList.contains('aos-scale-sm')) {
             el.classList.add('aos-fade-up'); // Default animation
        }
        observerJS.observe(el);
    });
} else if (animatedElementsJS.length > 0) { // If reduced motion, make all initially visible
    animatedElementsJS.forEach(el => el.classList.add('is-visible'));
}


// Contact Form Submission
if(contactFormJS) {
    contactFormJS.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!formSubmissionMessageJS) return;

        formSubmissionMessageJS.style.display = 'block';
        formSubmissionMessageJS.className = '';
        let isValid = true;
        const requiredFields = contactFormJS.querySelectorAll('input[required], textarea[required]');

        requiredFields.forEach(input => {
            input.dispatchEvent(new Event('input')); // Trigger validation visuals
            input.dispatchEvent(new Event('blur')); // Trigger validation visuals
            if (!input.checkValidity() || input.value.trim() === '') {
                isValid = false;
            }
        });

        if (!isValid) {
            formSubmissionMessageJS.textContent = 'Please fill in all required fields correctly.';
            formSubmissionMessageJS.classList.add('error');
            const firstInvalid = contactFormJS.querySelector('.invalid, input:invalid, textarea:invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        formSubmissionMessageJS.textContent = 'Sending your message...';
        formSubmissionMessageJS.classList.remove('error', 'success');

        setTimeout(() => {
            formSubmissionMessageJS.textContent = 'Thank you! Your message has been sent (simulated). I will get back to you soon.';
            formSubmissionMessageJS.classList.add('success');
            contactFormJS.reset();
            contactFormJS.querySelectorAll('.form-group input, .form-group textarea').forEach(inputEl => {
                inputEl.classList.remove('valid', 'invalid');
            });
        }, 1500);
    });
}

const currentYearEl = document.getElementById('currentYear');
if(currentYearEl) currentYearEl.textContent = new Date().getFullYear().toString();

// Grid Focus Effect (JS part to toggle parent class)
if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll('.grid-focus-effect').forEach(grid => {
        const items = Array.from(grid.children);
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                grid.classList.add('has-hover');
            });
            item.addEventListener('mouseleave', () => {
                const isAnyChildHovered = items.some(child => child.matches(':hover'));
                if (!isAnyChildHovered) {
                    grid.classList.remove('has-hover');
                }
            });
        });
    });
}

function fun1(){
    document.getElementById("rc1").innerHTML=`TATA AIA IS BEST`
  }

  function fun2(){
    document.getElementById("rc2").innerHTML=`STAR HEALTH IS BEST`
  }

    function fun3(){
    document.getElementById("rc3").innerHTML=`TATA AIA IS BEST`
  }

    function fun4(){
    document.getElementById("rc4").innerHTML=`TATA AIA IS BEST`
  }

    function fun5(){
    document.getElementById("rc5").innerHTML=`PRUDENT IS BEST`
  }

    function fun6(){
    document.getElementById("rc6").innerHTML=`AIRTEL PAYMENT BAMK IS BEST`
  }
