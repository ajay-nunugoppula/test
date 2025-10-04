// Skills Data
const skillsData = {
    frontend: [
        { name: 'HTML', icon: 'fab fa-html5' },
        { name: 'CSS', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'React', icon: 'fab fa-react' },
        { name: 'Bootstrap', icon: 'fab fa-bootstrap' }
    ],
    backend: [
        { name: 'Backend Dev', icon: 'fas fa-server' },
        { name: 'SQL', icon: 'fas fa-database' },
        { name: 'Python', icon: 'fab fa-python' }
    ],
    languages: [
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'C', icon: 'fas fa-copyright' },
        { name: 'Java', icon: 'fab fa-java' }
    ],
    tools: [
        { name: 'GitHub', icon: 'fab fa-github' },
        { name: 'LLMs', icon: 'fas fa-robot' },
        { name: 'Git', icon: 'fab fa-git-alt' }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initSkillsTabs();
    initScrollAnimations();
    initNavbar();
    initSmoothScroll();
});

// Particles Animation
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Skills Tabs
function initSkillsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillsContainer = document.getElementById('skills-container');
    
    // Display all skills initially
    displaySkills('frontend');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category and display skills
            const category = this.getAttribute('data-category');
            displaySkills(category);
        });
    });
}

function displaySkills(category) {
    const skillsContainer = document.getElementById('skills-container');
    const skills = skillsData[category];
    
    // Clear container with fade out
    skillsContainer.style.opacity = '0';
    
    setTimeout(() => {
        skillsContainer.innerHTML = '';
        
        skills.forEach((skill, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6';
            
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.style.animationDelay = (index * 0.1) + 's';
            
            skillCard.innerHTML = `
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <div class="skill-name">${skill.name}</div>
            `;
            
            col.appendChild(skillCard);
            skillsContainer.appendChild(col);
        });
        
        // Fade in
        skillsContainer.style.opacity = '1';
    }, 300);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

// Add hover effect to skill cards
document.addEventListener('DOMContentLoaded', function() {
    const addSkillCardEffects = () => {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    };
    
    // Add effects after skills are loaded
    setTimeout(addSkillCardEffects, 500);
    
    // Re-add effects when tabs change
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            setTimeout(addSkillCardEffects, 400);
        });
    });
});

// Typing Effect for Hero Section (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add cursor blink effect
function addCursorBlink() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        .cursor {
            display: inline-block;
            width: 3px;
            height: 1em;
            background: var(--primary-color);
            margin-left: 5px;
            animation: blink 1s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Performance optimization: Debounce scroll events
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

// Optimized scroll handler
window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
}, 100));

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        triggerEasterEgg();
    }
});

function triggerEasterEgg() {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    let colorIndex = 0;
    
    const interval = setInterval(() => {
        document.documentElement.style.setProperty('--primary-color', colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length;
    }, 200);
    
    setTimeout(() => {
        clearInterval(interval);
        document.documentElement.style.setProperty('--primary-color', '#6366f1');
    }, 3000);
}

// Console message for developers
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cInterested in the code? Check out the GitHub repo!', 'font-size: 14px; color: #8b5cf6;');
console.log('%c🚀 Built with HTML, CSS, JavaScript, and Bootstrap', 'font-size: 12px; color: #94a3b8;');
