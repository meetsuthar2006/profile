/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Meet Suthar Portfolio â€” Advanced Script
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
'use strict';

// â”€â”€â”€ PRELOADER â”€â”€â”€
const preloader    = document.getElementById('preloader');
const preloaderBar = document.getElementById('preloaderBar');
const preloaderPct = document.getElementById('preloaderPct');

let loadPct = 0;
const loadInterval = setInterval(() => {
  loadPct += Math.random() * 18;
  if (loadPct >= 100) { loadPct = 100; clearInterval(loadInterval); }
  preloaderBar.style.width = loadPct + '%';
  preloaderPct.textContent = Math.floor(loadPct) + '%';
  if (loadPct === 100) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      startHeroAnimation();
    }, 400);
  }
}, 120);

// â”€â”€â”€ LENIS SMOOTH SCROLL â”€â”€â”€
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// â”€â”€â”€ GSAP SETUP â”€â”€â”€
gsap.registerPlugin(ScrollTrigger);

// â”€â”€â”€ HELPERS â”€â”€â”€
const isMobile = () => window.innerWidth <= 900 || /Mobi|Android/i.test(navigator.userAgent);

// â”€â”€â”€ CUSTOM CURSOR â”€â”€â”€
const cursor     = document.getElementById('cursor');
const cursorText = document.getElementById('cursorText');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

if (!isMobile()) {
  document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

  (function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    cursorText.style.left = curX + 'px';
    cursorText.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.addEventListener('mouseenter', () => cursor.classList.add('active'));
  document.addEventListener('mouseleave', () => cursor.classList.remove('active'));

  document.querySelectorAll('a, button, .project-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('link'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('link'));
  });

  document.querySelectorAll('.project-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorText.classList.add('visible'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorText.classList.remove('visible'); });
  });

  document.querySelectorAll('.btn-primary, .nav-cta, .form-submit').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const r = this.getBoundingClientRect();
      gsap.to(this, { x: (e.clientX - r.left - r.width/2) * 0.25, y: (e.clientY - r.top - r.height/2) * 0.25, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', function() {
      gsap.to(this, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    });
  });
}

// â”€â”€â”€ PARTICLE CANVAS â”€â”€â”€
(function initParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = isMobile() ? 35 : 75;
  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * 1400, y: Math.random() * 900,
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    color: Math.random() > 0.55 ? '200,255,0' : '102,0,255',
    alpha: Math.random() * 0.45 + 0.08,
  }));

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });
    // Connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(200,255,0,${0.055 * (1 - d/110)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  })();
})();

// â”€â”€â”€ TYPEWRITER â”€â”€â”€
function typeWriter(el, text, speed = 52) {
  let i = 0;
  el.textContent = '';
  const iv = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(iv);
  }, speed);
}

// â”€â”€â”€ HERO ENTRANCE ANIMATION (fires after preloader) â”€â”€â”€
// --- HERO ENTRANCE ANIMATION (fires after preloader) ---
function startHeroAnimation() {
  const labelTyped = document.getElementById('labelTyped');
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl
    .fromTo('.nav',
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.hero-grid span',
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 1.4, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero-hlines span',
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out' },
      '-=1.0'
    )
    .to('.hero-label',
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.6'
    )
    .add(() => { if (labelTyped) typeWriter(labelTyped, 'AI / ML Engineer & Researcher'); }, '-=0.1')
    .to('.hero-title .title-line',
      { y: '0%', opacity: 1, duration: 1.1, stagger: 0.15 },
      '-=0.3'
    )
    .to('.hero-counters',
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    )
    .to('.hero-bottom',
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.5'
    )
    .to('.hero-photo-col',
      { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out' },
      '-=1.4'
    )
    .to('.hero-chips',
      { opacity: 1, duration: 0.7 },
      '-=0.5'
    )
    .fromTo('.code-snip',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.15 },
      '-=0.4'
    )
    .fromTo('.hero-marquee-wrap',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    );

  // Hero counters count up after entrance
  setTimeout(() => {
    document.querySelectorAll('.hc-num').forEach(el => {
      const target = parseInt(el.dataset.target);
      gsap.to({ val: 0 }, {
        val: target, duration: 2, ease: 'power2.out',
        onUpdate: function() { el.textContent = Math.floor(this.targets()[0].val); },
        onComplete: function() { el.textContent = target + '+'; }
      });
    });
  }, 1800);
}

// â”€â”€â”€ NAVIGATION â”€â”€â”€
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

let menuOpen = false, navOverlay = null;
navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navToggle.classList.toggle('open', menuOpen);
  if (menuOpen) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    navOverlay.appendChild(navLinks.cloneNode(true));
    document.body.appendChild(navOverlay);
    lenis.stop();
    requestAnimationFrame(() => navOverlay.classList.add('open'));
    navOverlay.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));
  } else { closeMenu(); }
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

const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      allNavLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    }
  });
}, { threshold: 0.4 }).observe && sections.forEach(s =>
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        allNavLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.4 }).observe(s)
);

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const t = document.querySelector(this.getAttribute('href'));
    if (t) lenis.scrollTo(t, { offset: -80, duration: 1.6 });
  });
});

// â”€â”€â”€ SECTION REVEALS â”€â”€â”€
document.querySelectorAll('.reveal-title').forEach(title => {
  gsap.fromTo(title,
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
      scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none reverse' }
    }
  );
});

gsap.utils.toArray('.reveal-up').forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
    }
  );
});

// â”€â”€â”€ ABOUT â”€â”€â”€
gsap.fromTo('.about-text', { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-right', start: 'top 80%', toggleActions: 'play none none reverse' }
  }
);
gsap.fromTo('.about-link', { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-link', start: 'top 90%', toggleActions: 'play none none reverse' }
  }
);

// â”€â”€â”€ COUNTER â”€â”€â”€
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      gsap.to({ val: 0 }, {
        val: target, duration: 2.5, ease: 'power2.out',
        onUpdate: function() { el.textContent = Math.floor(this.targets()[0].val); },
        onComplete: function() { el.textContent = target + '+'; }
      });
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// â”€â”€â”€ PROJECTS â”€â”€â”€
gsap.fromTo('.project-item', { opacity: 0, y: 60 },
  { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.projects-list', start: 'top 80%', toggleActions: 'play none none reverse' }
  }
);
document.querySelectorAll('.project-img-wrap').forEach(wrap => {
  gsap.to(wrap.querySelector('img'), {
    yPercent: -10, ease: 'none',
    scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
  });
});

// â”€â”€â”€ SKILLS BARS â”€â”€â”€
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.to(entry.target, { width: entry.target.dataset.w + '%', duration: 1.4, ease: 'power3.out', delay: 0.1 });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-fill').forEach(el => skillObserver.observe(el));

gsap.fromTo('.skill-block', { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
  }
);

// â”€â”€â”€ CONTACT â”€â”€â”€
gsap.fromTo('.contact-detail-item', { opacity: 0, x: -30 },
  { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-details', start: 'top 85%', toggleActions: 'play none none reverse' }
  }
);
gsap.fromTo('.contact-right', { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-right', start: 'top 80%', toggleActions: 'play none none reverse' }
  }
);

const contactForm = document.getElementById('contactForm');
const formSubmit  = document.getElementById('formSubmit');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    //e.preventDefault();
    formSubmit.classList.add('sending');
    formSubmit.querySelector('.submit-text').textContent = 'Sending...';
    await new Promise(r => setTimeout(r, 1500));
    formSubmit.classList.remove('sending');
    formSubmit.classList.add('sent');
    formSubmit.querySelector('.submit-text').textContent = 'âœ“ Message Sent!';
    gsap.fromTo(formSubmit, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
    contactForm.reset();
    setTimeout(() => { formSubmit.classList.remove('sent'); formSubmit.querySelector('.submit-text').textContent = 'Send Message'; }, 3000);
  });
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() { gsap.to(this.closest('.form-field').querySelector('label'), { color: '#c8ff00', duration: 0.3 }); });
    input.addEventListener('blur',  function() { gsap.to(this.closest('.form-field').querySelector('label'), { color: '', duration: 0.3 }); });
  });
}

// â”€â”€â”€ EDUCATION TIMELINE â”€â”€â”€
const eduObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
      eduObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.edu-item').forEach(el => eduObserver.observe(el));

// â”€â”€â”€ ACHIEVEMENTS â”€â”€â”€
const achObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      achObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.ach-card').forEach(el => achObserver.observe(el));

// â”€â”€â”€ ORB MOUSE PARALLAX â”€â”€â”€
if (!isMobile()) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    gsap.to('.orb-1', { x: x * 1.2, y: y * 1.2, duration: 2, ease: 'power2.out' });
    gsap.to('.orb-2', { x: -x * 0.8, y: -y * 0.8, duration: 2, ease: 'power2.out' });
    gsap.to('.orb-3', { x: x * 0.5, y: -y * 0.5, duration: 2.5, ease: 'power2.out' });
  });
}

// â”€â”€â”€ SCROLL PROGRESS BAR â”€â”€â”€
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:#c8ff00;z-index:10000;width:0%;transition:width 0.1s linear;pointer-events:none;box-shadow:0 0 8px #c8ff00;';
document.body.appendChild(progressBar);
lenis.on('scroll', ({ progress }) => { progressBar.style.width = (progress * 100) + '%'; });

// â”€â”€â”€ FOOTER BACK TO TOP â”€â”€â”€
document.querySelector('.footer-back')?.addEventListener('click', (e) => {
  e.preventDefault();
  lenis.scrollTo(0, { duration: 2 });
});

// â”€â”€â”€ RESIZE â”€â”€â”€
window.addEventListener('resize', () => ScrollTrigger.refresh());

// â”€â”€â”€ CONSOLE â”€â”€â”€
console.log('%c Meet Suthar ', 'background:#c8ff00;color:#0a0a0a;font-weight:900;font-size:14px;padding:8px 16px;border-radius:2px;');
console.log('%c AI / ML Engineer â€” meetsuthar2006@gmail.com ', 'color:#c8ff00;font-size:11px;');
