/* ─────────────────────────────────────────────────────────────────── */
/* Advanced Custom Cursor                                               */
/* ─────────────────────────────────────────────────────────────────── */
const cursorDot = document.createElement('div');
const cursorRing = document.createElement('div');
cursorDot.className = 'cursor-dot';
cursorRing.className = 'cursor-ring';
document.body.append(cursorDot, cursorRing);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let isMoving = false;
let hideTimer = null;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '0.4';

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
        isMoving = false;
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    }, 3000);

    cursorDot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px) scale(1)`;
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();


const nav = document.querySelector('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    nav.classList.toggle('scrolled', currentScrollY > 30);
    lastScrollY = currentScrollY;
});


const navDialog = document.getElementById('nav-dialog');
function handleMenu() {
    navDialog.classList.toggle('hidden');
    document.body.style.overflow = navDialog.classList.contains('hidden') ? '' : 'hidden';
}


const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, parseInt(entry.target.dataset.delay || 0));
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


document.querySelectorAll('[data-stagger]').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
        child.style.animationDelay = (i * 100) + 'ms';
    });
});


document.querySelectorAll('dt').forEach(dt => {
    dt.classList.add('interactive');
    dt.addEventListener('click', () => {
        const ddId = dt.getAttribute('aria-controls');
        const dd = document.getElementById(ddId);
        const arrow = dt.querySelector('i');
        const item = dt.closest('.faq-item');

        // Close other open items
        document.querySelectorAll('.faq-item dd.open').forEach(openDd => {
            if (openDd !== dd && openDd.parentElement !== item) {
                openDd.classList.remove('open');
                openDd.classList.add('hidden');
            }
        });

        if (dd) {
            const isOpen = dd.classList.contains('open');
            dd.classList.toggle('hidden', isOpen);
            dd.classList.toggle('open', !isOpen);
        }
        if (arrow) arrow.classList.toggle('-rotate-180');
    });
});


document.querySelectorAll('.gradient-hover-outer').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        card.style.transform = `
            perspective(1000px)
            translateY(-4px)
            rotateY(${x * 12}deg)
            rotateX(${-y * 12}deg)
            scale(1.02)
        `;
        card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s cubic-bezier(.16,1,.3,1)';
    });
});

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    const initialValue = 0;

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = 1 - Math.pow(1 - progress, 2);
        const current = Math.round(easeOutQuad * target);
        
        el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.animated) {
            e.target.dataset.animated = 'true';
            animateCounter(e.target);
            counterObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));


const blob = document.querySelector('.hero-blob');
if (blob) {
    window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50;
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        blob.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Reset on mouse leave
    window.addEventListener('mouseleave', () => {
        blob.style.transform = 'translate(0, 0)';
    });
}


const parallaxElements = document.querySelectorAll('[data-parallax]');
if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = window.scrollY * speed;
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}


document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            pointer-events: none;
            transform: scale(1);
            animation: ripple-out 0.6s ease-out;
        `;

        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-out {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.querySelectorAll('[data-fade-in]').forEach(el => {
        el.style.animation = 'fadeIn 0.8s ease forwards';
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


['a', 'button', 'input', '[role="button"]'].forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px) scale(0.5)`;
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px) scale(1)`;
        });
    });
});


document.querySelectorAll('button, a, [onclick], .interactive').forEach(el => {
    el.classList.add('interactive');
});


if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.onload = () => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                };
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}


const elementsToPreload = document.querySelectorAll('[data-preload]');
const preloadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('preloaded');
            preloadObserver.unobserve(entry.target);
        }
    });
}, { rootMargin: '50px' });

elementsToPreload.forEach(el => preloadObserver.observe(el));

console.log('✨ Advanced animations initialized');