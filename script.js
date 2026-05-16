// ==================== MOBILE MENU TOGGLE ==================== 

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
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

// ==================== NAVBAR BACKGROUND ON SCROLL ==================== 

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ==================== FORM SUBMISSION ==================== 

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    // Show success message
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;
    
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 3000);
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 

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

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observe skill categories
document.querySelectorAll('.skill-category').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observe resume items
document.querySelectorAll('.resume-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ==================== ACTIVE NAV LINK ON SCROLL ==================== 

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
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

// ==================== TYPING ANIMATION ==================== 

const greetingElement = document.querySelector('.greeting');
const originalText = greetingElement.textContent;
greetingElement.textContent = '';

let index = 0;
const typeSpeed = 100;

function typeText() {
    if (index < originalText.length) {
        greetingElement.textContent += originalText.charAt(index);
        index++;
        setTimeout(typeText, typeSpeed);
    }
}

// Start typing animation when page loads
window.addEventListener('load', typeText);

// ==================== SKILL BAR ANIMATION ==================== 

const skillBars = document.querySelectorAll('.skill-progress');

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
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Add animation class style
const style = document.createElement('style');
style.textContent = `
    .skill-progress.animated {
        animation: growWidth 1.5s ease forwards;
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ==================== SCROLL TO TOP BUTTON ==================== 

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    z-index: 999;
    opacity: 0;
    transition: all 0.3s ease;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
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
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// ==================== PRELOADER ==================== 

window.addEventListener('load', () => {
    // All animations are triggered on load
    console.log('Portfolio loaded successfully!');
});

// ==================== DARK MODE TOGGLE (Optional) ==================== 

const toggleDarkMode = () => {
    // This can be implemented later if needed
    // For now, the site has dark mode by default
};

// ==================== PARALLAX EFFECT ==================== 

const parallaxElements = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax');
        const yPos = window.scrollY * speed;
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ==================== COUNTER ANIMATION ==================== 

const stats = document.querySelectorAll('.stat-card h3');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const finalValue = entry.target.textContent;
            
            // Handle non-numeric values
            if (isNaN(finalValue)) {
                return;
            }
            
            let currentValue = 0;
            const increment = parseInt(finalValue) / 50;
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= parseInt(finalValue)) {
                    entry.target.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    entry.target.textContent = Math.floor(currentValue) + '+';
                }
            }, 30);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ==================== ENHANCED MOBILE MENU ==================== 

const navLink = document.querySelectorAll('.nav-link');

navLink.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== CONSOLE MESSAGE ==================== 

console.log('%cWelcome to Meet Suthar\'s Portfolio! 🚀', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cMade with ❤️ using HTML, CSS & JavaScript', 'font-size: 14px; color: #8b5cf6;');
console.log('%cFeel free to check out the code and projects!', 'font-size: 12px; color: #cbd5e1;');
