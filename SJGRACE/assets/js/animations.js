/* ==========================================================================
   SJ GRACE — animations.js : apparition au défilement et compteurs
   ========================================================================== */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window) || reduit) {
    elements.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); obs.unobserve(en.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(el => io.observe(el));
  }

  /* Compteurs animés : <span data-count="4">4</span> */
  const compteurs = document.querySelectorAll('[data-count]');
  const animer = el => {
    const cible = parseInt(el.dataset.count, 10) || 0;
    if (reduit) { el.textContent = cible; return; }
    const duree = 1400; const debut = performance.now();
    const pas = t => {
      const p = Math.min((t - debut) / duree, 1);
      el.textContent = Math.round(cible * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(pas);
    };
    requestAnimationFrame(pas);
  };
  if ('IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { animer(en.target); obs.unobserve(en.target); } });
    }, { threshold: .6 });
    compteurs.forEach(c => io2.observe(c));
  }
});
