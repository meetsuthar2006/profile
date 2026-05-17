/* ═══════════════════════════════════════════
   Meet Suthar Portfolio — Advanced Script
   ═══════════════════════════════════════════ */

'use strict';

// ─── LENIS SMOOTH SCROLL ───
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync GSAP ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ─── GSAP SETUP ───
gsap.registerPlugin(ScrollTrigger);

// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
const cursorText = document.getElementById('cursorText');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

const isMobile = () => window.innerWidth <= 900 || /Mobi|Android/i.test(navigator.userAgent);

if (!isMobile()) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor follow
  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    cursorText.style.left = curX + 'px';
    cursorText.style.top = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor states
  document.addEventListener('mouseenter', () => cursor.classList.add('active'));
  document.addEventListener('mouseleave', () => cursor.classList.remove('active'));

  document.querySelectorAll('a, button, .project-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('link'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('link'));
  });

  document.querySelectorAll('.project-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorText.classList.add('visible');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorText.classList.remove('visible');
    });
  });

  // Magnetic effect on buttons
  document.querySelectorAll('.btn-primary, .nav-cta, .form-submit').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(this, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', function() {
      gsap.to(this, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ─── NAVIGATION ───
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Scroll state
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile menu
let menuOpen = false;
let navOverlay = null;

navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navToggle.classList.toggle('open', menuOpen);

  if (menuOpen) {
    // Create overlay
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    const clonedLinks = navLinks.cloneNode(true);
    navOverlay.appendChild(clonedLinks);
    document.body.appendChild(navOverlay);
    lenis.stop();

    requestAnimationFrame(() => navOverlay.classList.add('open'));

    navOverlay.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  } else {
    closeMenu();
  }
});

function closeMenu() {
  menuOpen = false;
  navToggle.classList.remove('open');
  if (navOverlay) {
    navOverlay.classList.remove('open');
    setTimeout(() => { navOverlay?.remove(); navOverlay = null; }, 600);
  }
  lenis.start();
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      allNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) lenis.scrollTo(target, { offset: -80, duration: 1.6 });
  });
});

// ─── HERO ENTRANCE ANIMATION ───
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

heroTl
  .to('.hero-label', { opacity: 1, y: 0, duration: 1, delay: 0.3 })
  .to('.hero-title .title-line', {
    y: '0%', opacity: 1, duration: 1.2,
    stagger: 0.12, ease: 'power4.out'
  }, '-=0.6')
  .to('.hero-bottom', { opacity: 1, y: 0, duration: 1 }, '-=0.5');

// ─── SECTION TITLE REVEALS ───
document.querySelectorAll('.reveal-title').forEach(title => {
  // Wrap each word in a span for stagger
  const words = title.innerHTML.split(/(<br\s*\/?>|\n)/gi);
  // Use a simpler approach: animate the whole title
  gsap.fromTo(title,
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
});

// ─── REVEAL UP ELEMENTS ───
gsap.utils.toArray('.reveal-up').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
    }
  );
});

// ─── ABOUT SECTION ───
gsap.fromTo('.about-text',
  { opacity: 0, y: 40 },
  {
    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-right', start: 'top 80%', toggleActions: 'play none none reverse' }
  }
);

gsap.fromTo('.about-link',
  { opacity: 0, y: 20 },
  {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-link', start: 'top 90%', toggleActions: 'play none none reverse' }
  }
);

// ─── COUNTER ANIMATION ───
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      gsap.to({ val: 0 }, {
        val: target, duration: 2.5, ease: 'power2.out',
        onUpdate: function() { el.textContent = Math.floor(this.targets()[0].val); },
        onComplete: function() { el.textContent = target + (target === 100 ? '' : '+'); }
      });
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// ─── PROJECT ITEMS STAGGER ───
gsap.fromTo('.project-item',
  { opacity: 0, y: 60 },
  {
    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.projects-list', start: 'top 80%', toggleActions: 'play none none reverse' }
  }
);

// Project image parallax
document.querySelectorAll('.project-img-wrap').forEach(wrap => {
  gsap.to(wrap.querySelector('img'), {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: wrap,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    }
  });
});

// ─── SKILLS BARS ───
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const width = el.dataset.w + '%';
      gsap.to(el, { width, duration: 1.4, ease: 'power3.out', delay: 0.1 });
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(el => skillObserver.observe(el));

// Skill blocks stagger
gsap.fromTo('.skill-block',
  { opacity: 0, y: 50 },
  {
    opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
  }
);

// ─── CONTACT SECTION ───
gsap.fromTo('.contact-detail-item',
  { opacity: 0, x: -30 },
  {
    opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-details', start: 'top 85%', toggleActions: 'play none none reverse' }
  }
);

gsap.fromTo('.contact-right',
  { opacity: 0, y: 50 },
  {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-right', start: 'top 80%', toggleActions: 'play none none reverse' }
  }
);

// ─── CONTACT FORM ───
const contactForm = document.getElementById('contactForm');
const formSubmit = document.getElementById('formSubmit');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    formSubmit.classList.add('sending');
    formSubmit.querySelector('.submit-text').textContent = 'Sending...';

    // Simulate send (replace with real API call)
    await new Promise(resolve => setTimeout(resolve, 1500));

    formSubmit.classList.remove('sending');
    formSubmit.classList.add('sent');
    formSubmit.querySelector('.submit-text').textContent = '✓ Message Sent!';

    gsap.fromTo(formSubmit, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });

    contactForm.reset();

    setTimeout(() => {
      formSubmit.classList.remove('sent');
      formSubmit.querySelector('.submit-text').textContent = 'Send Message';
    }, 3000);
  });

  // Input focus animations
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
      gsap.to(this.closest('.form-field').querySelector('label'), {
        color: '#c8ff00', duration: 0.3
      });
    });
    input.addEventListener('blur', function() {
      gsap.to(this.closest('.form-field').querySelector('label'), {
        color: '', duration: 0.3
      });
    });
  });
}

// ─── HERO ORB PARALLAX ───
if (!isMobile()) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    gsap.to('.orb-1', { x: x * 1.2, y: y * 1.2, duration: 2, ease: 'power2.out' });
    gsap.to('.orb-2', { x: -x * 0.8, y: -y * 0.8, duration: 2, ease: 'power2.out' });
  });
}

// ─── FOOTER BACK TO TOP ───
document.querySelector('.footer-back')?.addEventListener('click', (e) => {
  e.preventDefault();
  lenis.scrollTo(0, { duration: 2 });
});

// ─── PAGE LOAD PROGRESS BAR ───
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 2px;
  background: #c8ff00; z-index: 10000;
  width: 0%; transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.appendChild(progressBar);

lenis.on('scroll', ({ progress }) => {
  progressBar.style.width = (progress * 100) + '%';
});

// ─── SCROLL TRIGGER REFRESH ───
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

// ─── CONSOLE SIGNATURE ───
console.log(
  '%c Meet Suthar ',
  'background: #c8ff00; color: #0a0a0a; font-weight: 900; font-size: 14px; padding: 8px 16px; border-radius: 2px;'
);
console.log(
  '%c Full Stack Developer — meetsuthar2006@gmail.com ',
  'color: #c8ff00; font-size: 11px;'
);
