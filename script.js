// ==================== THEME TOGGLE ==================== 
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Initialize theme
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(currentTheme + '-theme');

themeToggle.addEventListener('click', () => {
    const isDarkTheme = body.classList.contains('dark-theme');
    if (isDarkTheme) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});

// ==================== HAMBURGER MENU ==================== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
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
            const increment = target / 40;
            
            const counter = setInterval(() => {
                count += increment;
                if (count >= target) {
                    entry.target.textContent = target + (entry.target.getAttribute('data-target') === '100' ? '%' : '');
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
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ==================== SMOOTH SCROLL ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ==================== FORM SUBMISSION ==================== 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('.btn-primary');
        const originalHTML = btn.innerHTML;
        
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = originalHTML;
            btn.style.background = '';
        }, 3000);
    });
}

// ==================== SCROLL TO TOP BUTTON ==================== 
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, rgb(99, 102, 241), rgb(236, 72, 153));
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'translateY(-5px)';
});

scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'translateY(0)';
});

// ==================== FADE IN ON SCROLL ==================== 
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

const cardsToObserve = document.querySelectorAll('.about-card, .skill-category, .project-card, .info-card');

cardsToObserve.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ==================== CONSOLE MESSAGE ==================== 
console.clear();
console.log(
    `%c Welcome to Meet Suthar's Portfolio %c
    A modern, elegant, and interactive digital experience.
    Built with HTML5, CSS3 & JavaScript
    
    Let's create something amazing together! 🚀`,
    'color: white; background: linear-gradient(135deg, #6366f1, #ec4899); padding: 10px; font-weight: bold; border-radius: 5px;',
    'color: #6366f1; font-weight: bold;'
);
