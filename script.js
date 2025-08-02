const startTime = new Date("2025-01-01T00:00:00Z");

function formatNum(n, isHero = false, maxLength = 10) {
    const num = Math.floor(n);

    if (isHero) {
        return num.toLocaleString("en-IN");
    }

    const formatted = num.toLocaleString("en-IN");
    if (formatted.length > maxLength) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
    }

    return formatted;
}

function secondsSinceStart() {
    return (Date.now() - startTime.getTime()) / 1000;
}

function updateStats() {
    const s = secondsSinceStart();

    const trees = 150 * s + Math.random() * 50;
    const species = 8700 + s * 0.001 + Math.random() * 3;
    const forestLoss = s * 0.25 + Math.random() * 2;
    const aqi = Math.max(0, Math.round(75 + Math.sin(s / 1200) * 8 + (Math.random() - 0.5) * 5));

    updateElement("trees", formatNum(trees)); 
    updateElement("species", formatNum(species)); 
    updateElement("forest-loss", formatNum(forestLoss)); 
    updateElement("aqi", aqi); 
    updateElement("hero-trees", formatNum(trees, true)); 
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;

        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.querySelector('.navbar');

    if (navToggle && navbar) {
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('nav-open');

            const spans = navToggle.querySelectorAll('span');
            if (navbar.classList.contains('nav-open')) {
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

function initSmoothScrolling() {
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
}

function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });
}

function initCardHoverEffects() {

    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.borderColor = 'var(--primary-green)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.borderColor = 'var(--neutral-200)';
        });
    });
}

function initButtonEffects() {
    document.querySelectorAll('.cta-button, .nav-btn').forEach(button => {
        button.addEventListener('click', function(e) {

            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function initDashboardAnimation() {
    const chartLines = document.querySelectorAll('.chart-line');

    setInterval(() => {
        chartLines.forEach((line, index) => {
            const randomHeight = Math.random() * 80 + 20;
            line.style.height = randomHeight + '%';
        });
    }, 3000);
}

function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .nav-open .nav-btn {
            display: block !important;
            margin-top: 1rem;
        }

        @media (max-width: 768px) {
            .nav-open {
                background: rgba(255, 255, 255, 0.98) !important;
                backdrop-filter: blur(20px);
            }
        }

        .stat-number {
            transition: transform 0.2s ease-out;
        }

        .stat-card {
            min-height: auto;
            height: auto;
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {

    initMobileNav();
    initSmoothScrolling();
    initNavbarScrollEffect();
    initCardHoverEffects();
    initButtonEffects();
    initDashboardAnimation();
    addRippleStyles();

    updateStats();
    setInterval(updateStats, 800);

    document.body.classList.add('loaded');

    console.log('Leafline Environmental Tracker loaded successfully');
});

window.addEventListener('resize', () => {

    const cards = document.querySelectorAll('.stat-card');
    cards.forEach(card => {
        card.style.height = 'auto';
    });
});

window.LeaflineTracker = {
    updateStats,
    formatNum,
    secondsSinceStart
};