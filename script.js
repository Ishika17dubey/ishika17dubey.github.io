/* ================================================================
   ISHIKA DUBEY — PORTFOLIO INTERACTIONS
   Features: Particle Canvas · Custom Cursor · 3D Tilt Cards
             Scroll Reveal · Role Slider · Stat Counters
             Skill Bar Animation · Nav Effects · Mobile Menu
================================================================ */

(() => {
  'use strict';

  /* ────────────────────────────────────────────
     1. PARTICLE CANVAS
  ──────────────────────────────────────────── */
  const canvas  = document.getElementById('particleCanvas');
  const ctx     = canvas.getContext('2d');
  let particles = [];
  let mouse     = { x: null, y: null };

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x    = Math.random() * canvas.width;
      this.y    = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx   = (Math.random() - 0.5) * 0.3;
      this.vy   = (Math.random() - 0.5) * 0.3;
      const palette = ['rgba(0,245,212,', 'rgba(139,92,246,', 'rgba(244,63,94,'];
      this.color = palette[Math.floor(Math.random() * palette.length)];
      this.alpha = Math.random() * 0.4 + 0.05;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // Mouse repulsion
      if (mouse.x !== null) {
        const dx  = this.x - mouse.x;
        const dy  = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          this.x += dx / dist * force * 2;
          this.y += dy / dist * force * 2;
        }
      }
      // Boundary
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
      this.draw();
    }
  }

  function initParticles() {
    const count = Math.floor((canvas.width * canvas.height) / 12000);
    particles = Array.from({ length: Math.min(count, 100) }, () => new Particle());
  }
  initParticles();

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,245,212,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    connectParticles();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  /* ────────────────────────────────────────────
     2. CUSTOM CURSOR
  ──────────────────────────────────────────── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring) {
    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    let curMouseX = 0, curMouseY = 0;

    document.addEventListener('mousemove', e => {
      curMouseX = e.clientX;
      curMouseY = e.clientY;
    });

    function animateCursor() {
      dotX  += (curMouseX - dotX)  * 0.9;
      dotY  += (curMouseY - dotY)  * 0.9;
      ringX += (curMouseX - ringX) * 0.12;
      ringY += (curMouseY - ringY) * 0.12;
      dot.style.left  = dotX  + 'px';
      dot.style.top   = dotY  + 'px';
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .tilt-card, .tech-pill, .about-chips span, .cert-chip');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }

  /* ────────────────────────────────────────────
     3. 3D TILT CARD EFFECT
  ──────────────────────────────────────────── */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotX   = ((y - cy) / cy) * -8;
      const rotY   = ((x - cx) / cx) *  8;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });

  /* ────────────────────────────────────────────
     4. NAVBAR SCROLL EFFECT
  ──────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ────────────────────────────────────────────
     5. MOBILE MENU
  ──────────────────────────────────────────── */
  const burger    = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');

  burger && burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const isOpen = mobileNav.classList.contains('open');
    burger.style.transform = isOpen ? 'rotate(90deg)' : '';
    burger.style.transition = 'transform 0.3s ease';
  });

  mobileNav && mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burger.style.transform = '';
    });
  });

  /* ────────────────────────────────────────────
     6. SCROLL REVEAL
  ──────────────────────────────────────────── */
  const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ────────────────────────────────────────────
     7. SMOOTH SCROLL
  ──────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ────────────────────────────────────────────
     8. ROLE SLIDER
  ──────────────────────────────────────────── */
  const roles = document.querySelectorAll('.role');
  let roleIdx = 0;

  if (roles.length > 0) {
    setInterval(() => {
      roles[roleIdx].classList.remove('active');
      roleIdx = (roleIdx + 1) % roles.length;
      roles[roleIdx].classList.add('active');
    }, 2400);
  }

  /* ────────────────────────────────────────────
     9. STAT COUNTERS (hero)
  ──────────────────────────────────────────── */
  function animateNum(el, target, dur = 2000) {
    const start = performance.now();
    const update = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * ease);
      if (p < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
  }

  const heroStatsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.hstat-num').forEach(el => {
          animateNum(el, parseInt(el.dataset.target));
        });
        heroStatsObs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroStatsObs.observe(heroStats);

  /* ────────────────────────────────────────────
     10. SKILL BARS
  ──────────────────────────────────────────── */
  const skillBarObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
        });
        skillBarObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  const skillSection = document.querySelector('.section-skills');
  if (skillSection) skillBarObs.observe(skillSection);

  /* ────────────────────────────────────────────
     11. ACTIVE NAV LINK
  ──────────────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--cyan)' : '';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObs.observe(s));

  /* ────────────────────────────────────────────
     12. PROFILE CARD CLICK TO UPLOAD PHOTO HINT
  ──────────────────────────────────────────── */
  // Profile image fallback already handled inline via onerror

  /* ────────────────────────────────────────────
     13. TECH PILL RIPPLE
  ──────────────────────────────────────────── */
  document.querySelectorAll('.tech-pill').forEach(pill => {
    pill.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;border-radius:50%;
        background:rgba(0,245,212,0.25);
        width:100px;height:100px;
        left:${e.offsetX - 50}px;top:${e.offsetY - 50}px;
        transform:scale(0);animation:rippleEffect 0.5s ease forwards;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = `@keyframes rippleEffect{to{transform:scale(3);opacity:0}}`;
  document.head.appendChild(style);

  /* ────────────────────────────────────────────
     14. PAGE LOAD ANIMATION TRIGGER
  ──────────────────────────────────────────── */
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 50);
  });

  console.log('%c⚡ Ishika Dubey Portfolio Loaded', 'color:#00f5d4;font-size:14px;font-weight:bold;');
  console.log('%c🚀 Built with precision & craft', 'color:#8b5cf6;font-size:12px;');
})();
