/* ════════════════════════════════════════
   JAMES AKINOLA — PORTFOLIO SCRIPTS
   Minimal, purposeful JavaScript
════════════════════════════════════════ */

(function () {
  'use strict';

  // ── 1. Scroll Progress Bar ───────────────────────────────────
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  // ── 2. Navbar: scrolled class + active links ─────────────────
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    const scrollY = window.scrollY;

    // Scrolled state
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlight
    let currentSection = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      if (scrollY >= top) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // ── 3. Scroll Reveal (Intersection Observer) ─────────────────
  const revealEls = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // ── 4. Skill Bar Animation ────────────────────────────────────
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillFills.forEach((el) => skillObserver.observe(el));

  // ── 5. Mobile Menu ────────────────────────────────────────────
  const menuBtn = document.getElementById('menu-btn');
  const menuIcon = document.getElementById('menu-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const hamburgerPath = 'M4 6h16M4 12h16M4 18h16';
  const closePath = 'M6 18L18 6M6 6l12 12';

  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('hidden', !menuOpen);
    menuIcon.querySelector('path').setAttribute('d', menuOpen ? closePath : hamburgerPath);
    menuBtn.setAttribute('aria-expanded', menuOpen);
  }

  menuBtn.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (menuOpen) toggleMenu();
    });
  });

  // ── 6. Smooth Scroll for all anchor links ─────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── 7. Throttled Scroll Handler ───────────────────────────────
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        updateNav();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── 8. Hero on-load reveal ────────────────────────────────────
  window.addEventListener('load', () => {
    const heroReveal = document.querySelector('#hero .reveal-up');
    if (heroReveal) {
      setTimeout(() => heroReveal.classList.add('in-view'), 100);
    }
  });

  // ── 9. Keyboard: Escape closes mobile menu ────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) toggleMenu();
  });

  // ── 10. Initial state ─────────────────────────────────────────
  updateProgress();
  updateNav();

})();
