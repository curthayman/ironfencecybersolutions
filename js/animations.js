/**
 * Iron Fence Cyber Solutions - Advanced Animations
 * Handles complex animations, effects, and visual enhancements
 */

class CyberAnimations {
    constructor() {
        this.animationFrameId = null;
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.particles = [];
        this.matrixRain = [];
        this.glitchElements = new Set();
        
        this.init();
    }

    init() {
        if (this.isReducedMotion) {
            console.log('Reduced motion preference detected, limiting animations');
            return;
        }

        this.initMatrixRain();
        this.initGlitchEffects();
        this.initCyberGrid();
        this.initHologramEffects();
        this.initNeonEffects();
        this.initTypewriterEffects();
        this.initScrollAnimations();
        this.initMouseEffects();
        this.initPerformanceOptimizations();
        
        this.startAnimationLoop();
    }

    initMatrixRain() {
        const matrixContainer = document.querySelector('.matrix-rain');
        if (!matrixContainer) return;

        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        
        matrixContainer.innerHTML = '';
        matrixContainer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        this.matrixAnimation = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ffff';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    initGlitchEffects() {
        const glitchElements = document.querySelectorAll('[data-glitch]');
        
        glitchElements.forEach(element => {
            this.glitchElements.add(element);
            element.setAttribute('data-text', element.textContent);
            
            // Random glitch intervals
            setInterval(() => {
                this.triggerGlitch(element);
            }, 3000 + Math.random() * 5000);
        });
    }

    triggerGlitch(element) {
        element.classList.add('glitch-active');
        
        setTimeout(() => {
            element.classList.remove('glitch-active');
        }, 200 + Math.random() * 300);
    }

    initCyberGrid() {
        const gridContainer = document.querySelector('.grid-overlay');
        if (!gridContainer) return;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.pointerEvents = 'none';
        svg.style.opacity = '0.1';

        // Create animated grid lines
        for (let i = 0; i < 20; i++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', `${i * 5}%`);
            line.setAttribute('y1', '0%');
            line.setAttribute('x2', `${i * 5}%`);
            line.setAttribute('y2', '100%');
            line.setAttribute('stroke', '#00ffff');
            line.setAttribute('stroke-width', '0.5');
            line.setAttribute('opacity', '0.3');
            
            const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate.setAttribute('attributeName', 'opacity');
            animate.setAttribute('values', '0.1;0.5;0.1');
            animate.setAttribute('dur', `${2 + Math.random() * 3}s`);
            animate.setAttribute('repeatCount', 'indefinite');
            animate.setAttribute('begin', `${Math.random() * 2}s`);
            
            line.appendChild(animate);
            svg.appendChild(line);
        }

        gridContainer.appendChild(svg);
    }

    initHologramEffects() {
        const hologramElements = document.querySelectorAll('.service-card, .feature-card');
        
        hologramElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.createHologramScanline(element);
            });
        });
    }

    createHologramScanline(element) {
        const scanline = document.createElement('div');
        scanline.className = 'hologram-scanline';
        scanline.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ffff, transparent);
            animation: scanline 0.8s ease-out;
            pointer-events: none;
            z-index: 10;
        `;

        element.style.position = 'relative';
        element.appendChild(scanline);

        setTimeout(() => {
            scanline.remove();
        }, 800);
    }

    initNeonEffects() {
        const neonElements = document.querySelectorAll('.section-title, .hero-title .text-glow');
        
        neonElements.forEach(element => {
            this.addNeonGlow(element);
        });
    }

    addNeonGlow(element) {
        const originalColor = getComputedStyle(element).color;
        
        element.addEventListener('mouseenter', () => {
            element.style.textShadow = `
                0 0 5px currentColor,
                0 0 10px currentColor,
                0 0 15px currentColor,
                0 0 20px currentColor
            `;
        });

        element.addEventListener('mouseleave', () => {
            element.style.textShadow = '';
        });
    }

    initTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.typewriterSpeed) || 50;
            
            element.textContent = '';
            element.style.borderRight = '2px solid #00ffff';
            
            this.typewriterEffect(element, text, speed);
        });
    }

    typewriterEffect(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }

    initScrollAnimations() {
        // Parallax effects
        window.addEventListener('scroll', this.throttle(() => {
            this.updateParallax();
        }, 16));

        // Reveal animations
        this.initRevealAnimations();
    }

    updateParallax() {
        const scrollY = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    initRevealAnimations() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.reveal || 'fadeInUp';
                    const delay = parseFloat(element.dataset.revealDelay) || 0;
                    
                    setTimeout(() => {
                        element.classList.add(`animate-${animation}`);
                        element.style.opacity = '1';
                    }, delay * 1000);
                    
                    revealObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            revealObserver.observe(element);
        });
    }

    initMouseEffects() {
        // Cursor trail effect
        if (!this.isReducedMotion) {
            this.initCursorTrail();
        }

        // Interactive elements glow
        this.initInteractiveGlow();
    }

    initCursorTrail() {
        const trail = [];
        const trailLength = 10;
        
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - (i / trailLength)};
                transform: scale(${1 - (i / trailLength)});
                transition: opacity 0.1s ease, transform 0.1s ease;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }

        let mouseX = 0, mouseY = 0;
        let lastTime = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const updateTrail = (currentTime) => {
            if (currentTime - lastTime > 16) { // 60fps throttle
                trail.forEach((dot, index) => {
                    if (index === 0) {
                        dot.style.left = mouseX + 'px';
                        dot.style.top = mouseY + 'px';
                    } else {
                        const prevDot = trail[index - 1];
                        const prevX = parseFloat(prevDot.style.left);
                        const prevY = parseFloat(prevDot.style.top);
                        
                        dot.style.left = prevX + 'px';
                        dot.style.top = prevY + 'px';
                    }
                });
                lastTime = currentTime;
            }
            requestAnimationFrame(updateTrail);
        };
        
        requestAnimationFrame(updateTrail);
    }

    initInteractiveGlow() {
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .tool-card, .service-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createGlowEffect(e.target);
            });
        });
    }

    createGlowEffect(element) {
        const glow = document.createElement('div');
        glow.className = 'glow-effect';
        glow.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #00ffff, #0066ff, #ff0080);
            border-radius: inherit;
            opacity: 0;
            z-index: -1;
            animation: glowPulse 0.5s ease-out;
        `;

        element.style.position = 'relative';
        element.appendChild(glow);

        setTimeout(() => {
            glow.remove();
        }, 500);
    }

    initPerformanceOptimizations() {
        // Use Intersection Observer for expensive animations
        this.setupPerformanceObserver();
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }

    setupPerformanceObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const element = entry.target;
                    if (entry.isIntersecting) {
                        element.classList.add('in-viewport');
                    } else {
                        element.classList.remove('in-viewport');
                    }
                });
            });

            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }
    }

    pauseAnimations() {
        document.querySelectorAll('.particle, .matrix-rain canvas').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        document.querySelectorAll('.particle, .matrix-rain canvas').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }

    startAnimationLoop() {
        const animate = () => {
            if (this.matrixAnimation) {
                this.matrixAnimation();
            }
            
            this.animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Public methods for external control
    enableAnimations() {
        this.isReducedMotion = false;
        this.init();
    }

    disableAnimations() {
        this.isReducedMotion = true;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        // Clean up cursor trail
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
        
        // Clean up glow effects
        document.querySelectorAll('.glow-effect').forEach(el => el.remove());
    }
}

// Additional CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes glowPulse {
        0% { opacity: 0; transform: scale(0.95); }
        50% { opacity: 0.7; transform: scale(1.02); }
        100% { opacity: 0; transform: scale(1); }
    }
    
    @keyframes scanline {
        0% { top: 0; opacity: 1; }
        100% { top: 100%; opacity: 0; }
    }
    
    .glitch-active::before,
    .glitch-active::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .glitch-active::before {
        animation: glitch-1 0.3s infinite;
        color: #ff00ff;
        z-index: -1;
    }
    
    .glitch-active::after {
        animation: glitch-2 0.3s infinite;
        color: #00ffff;
        z-index: -2;
    }
    
    @keyframes glitch-1 {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
    
    @keyframes glitch-2 {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(2px, -2px); }
        40% { transform: translate(2px, 2px); }
        60% { transform: translate(-2px, -2px); }
        80% { transform: translate(-2px, 2px); }
    }
    
    .cursor-trail {
        transition: left 0.1s ease, top 0.1s ease !important;
    }
    
    .in-viewport {
        animation-play-state: running;
    }
    
    .animate-on-scroll {
        animation-play-state: paused;
    }
`;

document.head.appendChild(animationStyles);

// Initialize animations
const cyberAnimations = new CyberAnimations();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CyberAnimations;
}
