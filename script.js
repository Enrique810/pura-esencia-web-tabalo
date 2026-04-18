/* ============================================================
   PURA ESENCIA FLAMENCO — script.js
   ============================================================ */

/* ── Scroll fade-in (Intersection Observer) ── */
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
);

fadeEls.forEach((el) => observer.observe(el));


/* ── Nav: sticky background al hacer scroll ── */
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(13,4,4,0.99)';
  } else {
    nav.style.background = 'rgba(26,10,10,0.97)';
  }
}, { passive: true });


/* ── Menú hamburguesa (móvil) ── */
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

/* Cerrar menú al hacer click en un enlace */
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* Cerrar menú al hacer click fuera */
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  }
});


/* ── Smooth scroll para anclas internas ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = nav.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ── Imagen placeholder: fondo degradado si no carga ── */
document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', function () {
    this.style.background = 'linear-gradient(135deg, #2A1515 0%, #1A0A0A 100%)';
    this.style.minHeight  = this.closest('.hero-media') ? '100%' : '220px';
    this.removeAttribute('src'); // evita bucle de error
  });
});
