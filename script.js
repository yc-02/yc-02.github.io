document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    const logoItems = document.querySelectorAll('.logo-item');
    const mouseGlow = document.querySelector('.mouse-glow');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('skill-section')) {
                    logoItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('show');
                        }, index * 70);
                    });
                }
            } else {
                entry.target.classList.remove('visible');

                if (entry.target.classList.contains('skill-section')) {
                    logoItems.forEach((item) => {
                        item.classList.remove('show');
                    });
                }
            }
        });
    }, {
        threshold: 0.16
    });

    reveals.forEach(section => revealObserver.observe(section));

    document.addEventListener('mousemove', (e) => {
        if (!mouseGlow) return;
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
    });


    (() => {
        const canvas = document.getElementById('bg');
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });

        const state = {
            particles: [],
            baseCount: 72,
            w: 0,
            h: 0,
            dpr: 1,
            mouse: {
                x: null,
                y: null,
                radius: 150
            }
        };

        const styles = getComputedStyle(document.documentElement);
        const ACCENT = styles.getPropertyValue('--accent')?.trim() || '#4da3ff';
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function hexToRgba(hex, alpha) {
            let h = hex.replace('#', '').trim();

            if (h.length === 3) {
                h = h.split('').map(ch => ch + ch).join('');
            }

            const bigint = parseInt(h, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;

            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        function resize() {
            state.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            state.w = Math.floor(window.innerWidth);
            state.h = Math.floor(window.innerHeight);

            canvas.style.width = state.w + 'px';
            canvas.style.height = state.h + 'px';
            canvas.width = Math.floor(state.w * state.dpr);
            canvas.height = Math.floor(state.h * state.dpr);

            ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

            const area = state.w * state.h;
            const scale = Math.sqrt(area) / 800;
            const target = prefersReduced ? 0 : Math.round(state.baseCount * Math.max(0.62, scale));
            rebuildParticles(target);
        }

        function rebuildParticles(count) {
            const particles = [];

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * state.w,
                    y: Math.random() * state.h,
                    r: 0.9 + Math.random() * 2.1,
                    vx: (Math.random() - 0.5) * 0.24,
                    vy: (Math.random() - 0.5) * 0.24
                });
            }

            state.particles = particles;
        }

        function drawConnections(P) {
            for (let i = 0; i < P.length; i++) {
                const a = P[i];

                for (let j = i + 1; j < P.length; j++) {
                    const b = P[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;

                    if (d2 < 130 * 130) {
                        const alpha = (1 - Math.sqrt(d2) / 130) * 0.28;
                        ctx.strokeStyle = hexToRgba(ACCENT, alpha);
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function drawParticles(P) {
            for (let i = 0; i < P.length; i++) {
                const p = P[i];

                p.x += p.vx;
                p.y += p.vy;

                if (state.mouse.x !== null && state.mouse.y !== null) {
                    const dx = p.x - state.mouse.x;
                    const dy = p.y - state.mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < state.mouse.radius && dist > 0) {
                        const force = (state.mouse.radius - dist) / state.mouse.radius;
                        p.x += (dx / dist) * force * 0.8;
                        p.y += (dy / dist) * force * 0.8;
                    }
                }

                if (p.x < -10) p.x = state.w + 10;
                if (p.x > state.w + 10) p.x = -10;
                if (p.y < -10) p.y = state.h + 10;
                if (p.y > state.h + 10) p.y = -10;

                ctx.fillStyle = hexToRgba(ACCENT, 0.88);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function step() {
            ctx.clearRect(0, 0, state.w, state.h);
            ctx.lineWidth = 1;

            const P = state.particles;
            drawConnections(P);
            drawParticles(P);

            requestAnimationFrame(step);
        }

        const ro = new ResizeObserver(resize);
        ro.observe(document.body);

        window.addEventListener('resize', resize);
        window.addEventListener('orientationchange', resize);

        window.addEventListener('mousemove', (e) => {
            state.mouse.x = e.clientX;
            state.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            state.mouse.x = null;
            state.mouse.y = null;
        });

        resize();
        requestAnimationFrame(step);
    })();
});