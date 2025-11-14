// ==================== HAMBURGER MENU ==================== 
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
    });
});

// ==================== SCROLL ANIMATION ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.querySelectorAll('.project-card, .skill-category, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== FORM SUBMISSION ==================== 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aqui você pode integrar com um serviço de email
        // Por enquanto, vamos apenas mostrar uma mensagem
        alert('Obrigado! Sua mensagem foi recebida. Entraremos em contato em breve!');
        contactForm.reset();
    });
}

// ==================== ACTIVE NAV LINK ==================== 
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ==================== SMOOTH SCROLL ==================== 
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

// ==================== DARK MODE TOGGLE (Opcional) ==================== 
function initDarkMode() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Chamar ao carregar
document.addEventListener('DOMContentLoaded', initDarkMode);

// ==================== CONTADOR ANIMADO ==================== 
function animateCounters() {
    const stats = document.querySelectorAll('.stat-card h4');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let count = 0;
        
        const increment = target / 50;
        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                stat.textContent = target + '+';
                clearInterval(interval);
            } else {
                stat.textContent = Math.floor(count) + '+';
            }
        }, 20);
    });
}

// Chamar quando os stats ficarem visíveis
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const aboutSection = document.querySelector('.about-stats');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ==================== RIPPLE EFFECT ==================== 
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ==================== UTILITY FUNCTIONS ==================== 
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

// ==================== MOBILE RESPONSIVE MENU ==================== 
function setupMobileMenu() {
    if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'var(--dark-bg)';
        navLinks.style.borderBottom = '1px solid var(--border-color)';
        navLinks.style.padding = '1rem';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.position = 'static';
        navLinks.style.backgroundColor = 'transparent';
        navLinks.style.borderBottom = 'none';
    }
}

window.addEventListener('resize', debounce(setupMobileMenu, 250));
window.addEventListener('DOMContentLoaded', setupMobileMenu);

// ==================== LOADING ANIMATION ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
