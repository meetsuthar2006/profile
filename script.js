// Initialize Lenis for smooth scroll
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: false,
    mirror: true,
    offset: 100
});

// Initialize Splitting for text animations
Splitting();

// GSAP and ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);

// Cursor Follower Animation
const cursorDot = document.querySelector('.cursor-dot');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Detect if mobile device
const isMobile = () => {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

if (!isMobile()) {
    document.body.classList.remove('mobile');
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    gsap.to({}, 0.016, {
        repeat: -1,
        onUpdate: function() {
            followerX += (mouseX - followerX) * 0.3;
            followerY += (mouseY - followerY) * 0.3;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
        }
    });
} else {
    document.body.classList.add('mobile');
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target') || stat.textContent);
                gsap.to(stat, {
                    duration: 2.5,
                    ease: 'power2.out',
                    textContent: target,
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        stat.textContent = Math.floor(stat.textContent);
                    }
                });
            });
        }
    });
}, { threshold: 0.3 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    counterObserver.observe(aboutStats);
}

// Smooth scroll links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target);
        }
    });
});

// Form submission with animation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        
        // Animate button
        gsap.to(submitBtn, {
            duration: 0.3,
            backgroundColor: '#d4af37',
            color: '#000'
        });
        
        submitBtn.textContent = '✓ Message Sent!';
        
        // Reset form
        contactForm.reset();
        
        setTimeout(() => {
            gsap.to(submitBtn, {
                duration: 0.3,
                backgroundColor: '#000',
                color: '#fff'
            });
            submitBtn.textContent = originalText;
        }, 2000);
    });
}

// Hover effects on work items
const workItems = document.querySelectorAll('.work-item');
workItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            y: -10
        });
    });
    
    item.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            y: 0
        });
    });
});

// Hover effects on skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1.1
        });
    });
    
    tag.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1
        });
    });
});

// Parallax effect on scroll
gsap.utils.toArray('.work-item, .skill-category').forEach((element) => {
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'top center',
            scrub: 0.5,
            markers: false
        },
        opacity: 1,
        y: 0
    });
});

// Animate hero title on load
gsap.from('.hero-title', {
    duration: 1,
    opacity: 0,
    y: 50,
    ease: 'power3.out'
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Console message
console.log('%c Welcome to Meet Suthar\'s Portfolio ', 'background: #d4af37; color: #000; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('%c Built with modern web technologies and smooth animations ', 'color: #d4af37; font-weight: bold;');
