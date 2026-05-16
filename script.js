// ==================== HAMBURGER MENU TOGGLE ==================== 

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLLING ==================== 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ACTIVE NAVIGATION LINK ==================== 

const sections = document.querySelectorAll('section');

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

// ==================== COUNTER ANIMATION ==================== 

const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const target = parseInt(entry.target.getAttribute('data-target'));
            let count = 0;
            const increment = target / 50;
            
            const counter = setInterval(() => {
                count += increment;
                if (count >= target) {
                    entry.target.textContent = target;
                    clearInterval(counter);
                } else {
                    entry.target.textContent = Math.floor(count);
                }
            }, 30);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// ==================== SKILL BAR ANIMATION ==================== 

const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ==================== FORM SUBMISSION ==================== 

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('.submit-btn');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
        btn.style.color = '#050811';
        
        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.color = '';
        }, 3000);
    });
}

// ==================== TYPING ANIMATION FOR TERMINAL ==================== 

const terminalBody = document.querySelector('.terminal-body');

if (terminalBody) {
    const commands = terminalBody.querySelectorAll('.command, .output');
    let delay = 0;
    
    commands.forEach(cmd => {
        const text = cmd.textContent;
        cmd.textContent = '';
        cmd.style.animation = `typeText 0.8s ease forwards`;
        cmd.style.animationDelay = `${delay}s`;
        cmd.setAttribute('data-text', text);
        
        delay += 0.5;
    });
}

// Add typing animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes typeText {
        0% {
            width: 0;
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        100% {
            width: 100%;
            opacity: 1;
        }
    }
    
    [data-text] {
        position: relative;
    }
    
    [data-text]::after {
        content: attr(data-text);
        animation: typeWriter 0.8s steps(40, end) forwards;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
    }
    
    @keyframes typeWriter {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);

// Reveal terminal text on load
window.addEventListener('load', () => {
    commands.forEach((cmd, index) => {
        setTimeout(() => {
            cmd.textContent = cmd.getAttribute('data-text');
            cmd.removeAttribute('data-text');
        }, index * 600);
    });
});

// ==================== PARALLAX EFFECT ==================== 

window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax');
        const yPos = window.scrollY * speed;
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ==================== GLITCH TEXT EFFECT ON HOVER ==================== 

const glitchElements = document.querySelectorAll('.glow-text, .neon-text');

glitchElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.textShadow = `
            3px 3px 0px #00d4ff,
            6px 6px 0px #ff00ff,
            9px 9px 0px #00ff88
        `;
    });
    
    el.addEventListener('mouseleave', function() {
        this.style.textShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
    });
});

// ==================== SCROLL TO TOP BUTTON ==================== 

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background: linear-gradient(135deg, #00ff88, #00d4ff);
    border: 2px solid #00ff88;
    color: #050811;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 999;
    opacity: 0;
    transition: all 0.3s ease;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    font-weight: bold;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.15) rotate(-5deg)';
    scrollTopBtn.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.8)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
    scrollTopBtn.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
});

// ==================== INTERSECTION OBSERVER FOR FADE-IN ==================== 

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and about cards
const cardsToObserve = document.querySelectorAll('.project-card, .about-card, .contact-card, .skill-category');

cardsToObserve.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ==================== MOUSE FOLLOW EFFECT FOR SPECIAL ELEMENTS ==================== 

document.addEventListener('mousemove', (e) => {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < 100) {
            const angle = Math.atan2(y, x);
            const moveX = Math.cos(angle + Math.PI) * 20;
            const moveY = Math.sin(angle + Math.PI) * 20;
            
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// ==================== NEON PULSE EFFECT ==================== 

const createPulse = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes neonPulse {
            0%, 100% {
                box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
            }
            50% {
                box-shadow: 0 0 30px rgba(0, 255, 136, 0.9);
            }
        }
        
        .neon-border {
            animation: neonPulse 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
};

createPulse();

// ==================== CONSOLE WELCOME MESSAGE ==================== 

console.clear();
console.log(
    `%c
    ╔═══════════════════════════════════════╗
    ║  Welcome to MEET SUTHAR'S PORTFOLIO   ║
    ║                                       ║
    ║  Full Stack Developer & Tech Geek     ║
    ║  Built with HTML5, CSS3 & JavaScript  ║
    ║  Theme: Cyberpunk | Neon Style        ║
    ╚═══════════════════════════════════════╝
    `,
    'color: #00ff88; font-weight: bold; font-family: monospace;'
);

console.log(
    '%c✨ Check out the projects and get in touch! ✨',
    'color: #00d4ff; font-size: 14px; font-weight: bold;'
);

console.log(
    '%cMade with ❤️ by Meet Suthar',
    'color: #ff00ff; font-size: 12px;'
);

// ==================== DARK MODE TOGGLE READY (for future enhancement) ==================== 

// This can be implemented later with localStorage for theme switching

// ==================== ENHANCED PROJECT CARD HOVER ==================== 

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.6)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// ==================== NAVBAR ANIMATION ON SCROLL ==================== 

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.3)';
    } else {
        navbar.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)';
    }
    
    lastScrollTop = scrollTop;
});

// ==================== LOAD ANIMATIONS ==================== 

window.addEventListener('load', () => {
    console.log('🚀 Portfolio loaded successfully!');
    
    // Trigger initial animations
    document.body.style.animation = 'fadeIn 0.5s ease';
});

const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(fadeInStyle);
