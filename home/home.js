document.addEventListener('DOMContentLoaded', () => {
    // Typing
    const text = "Welcome !";
    let i = 0;
    const typeEl = document.getElementById('type');
    function type() {
        typeEl.textContent = text.slice(0, i++);
        if (i <= text.length) setTimeout(type, 100);
    }

    // 2D canvas
    (() => {
        const canvas = document.getElementById('bg');
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });

        const state = {
            particles: [],
            baseCount: 70,  // baseline density
            lastT: 0,
            w: 0, h: 0, dpr: 1,
        };


        const styles = getComputedStyle(document.documentElement);
        const ACCENT = styles.getPropertyValue('--accent')?.trim() || '#8fbc8f';

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
            const target = prefersReduced ? 0 : Math.round(state.baseCount * Math.max(0.6, scale));
            rebuildParticles(target);
        }

        function rebuildParticles(count) {
            const p = [];
            for (let i = 0; i < count; i++) {
                p.push({
                    x: Math.random() * state.w,
                    y: Math.random() * state.h,
                    r: 0.6 + Math.random() * 2.3,
                    vx: (Math.random() - 0.5) * 0.36,
                    vy: (Math.random() - 0.5) * 0.36,
                });
            }
            state.particles = p;
        }

        function step(t) {
            const dt = Math.min(32, (t - state.lastT) || 16);
            state.lastT = t;

            // CLEAR
            ctx.clearRect(0, 0, state.w, state.h);

            const P = state.particles;

            ctx.lineWidth = 1;
            ctx.strokeStyle = ACCENT + '33';
            for (let i = 0; i < P.length; i++) {
                const a = P[i];
                for (let j = i + 1; j < P.length; j++) {
                    const b = P[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < 120 * 120) {
                        const alpha = 1 - Math.sqrt(d2) / 120;
                        ctx.globalAlpha = alpha * 0.6;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;

            // Particles
            ctx.fillStyle = ACCENT;
            for (let i = 0; i < P.length; i++) {
                const p = P[i];
                p.x += p.vx * (dt / 16);
                p.y += p.vy * (dt / 16);

                // Wrap edges
                if (p.x < -10) p.x = state.w + 10;
                if (p.x > state.w + 10) p.x = -10;
                if (p.y < -10) p.y = state.h + 10;
                if (p.y > state.h + 10) p.y = -10;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(step);
        }

        //resize handling
        const ro = new ResizeObserver(resize);
        ro.observe(document.body);
        window.addEventListener('orientationchange', resize);

        resize();
        requestAnimationFrame(step);
    })();
    type();
});