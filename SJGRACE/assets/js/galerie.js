/* ==========================================================================
   SJ GRACE — galerie.js : filtres dynamiques + visionneuse (lightbox) accessible
   ========================================================================== */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const grille = document.querySelector('.gallery-grid');
  if (!grille) return;
  const items = Array.from(grille.querySelectorAll('.gallery-item'));
  const filtres = document.querySelectorAll('.filter-btn');
  const statut = document.getElementById('galerieStatut');

  /* Compteurs par catégorie */
  filtres.forEach(btn => {
    const f = btn.dataset.filter;
    const n = f === 'tous' ? items.length : items.filter(i => i.dataset.cat === f).length;
    const span = btn.querySelector('.count');
    if (span) span.textContent = '(' + n + ')';
  });

  /* Filtrage */
  filtres.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filtres.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    let visibles = 0;
    items.forEach(it => {
      const ok = f === 'tous' || it.dataset.cat === f;
      it.classList.toggle('is-hidden', !ok);
      if (ok) visibles++;
    });
    if (statut) statut.textContent = visibles + ' image(s) affichée(s)';
  }));

  /* Lightbox */
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lb-caption');
  const lbCount = lb.querySelector('.counter');
  let courant = 0; let declencheur = null;

  const visibles = () => items.filter(i => !i.classList.contains('is-hidden'));
  const afficher = idx => {
    const liste = visibles();
    courant = (idx + liste.length) % liste.length;
    const it = liste[courant];
    lbImg.src = it.dataset.full;
    lbImg.alt = it.querySelector('img').alt;
    lbCap.textContent = it.dataset.title;
    lbCount.textContent = (courant + 1) + ' / ' + liste.length;
  };
  const ouvrir = it => {
    declencheur = it;
    afficher(visibles().indexOf(it));
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  };
  const fermer = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    if (declencheur) declencheur.focus();
  };

  items.forEach(it => it.addEventListener('click', () => ouvrir(it)));
  lb.querySelector('.lb-close').addEventListener('click', fermer);
  lb.querySelector('.lb-prev').addEventListener('click', () => afficher(courant - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => afficher(courant + 1));
  lb.addEventListener('click', e => { if (e.target === lb) fermer(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') fermer();
    if (e.key === 'ArrowLeft') afficher(courant - 1);
    if (e.key === 'ArrowRight') afficher(courant + 1);
    if (e.key === 'Tab') {                       // piège de focus dans la visionneuse
      const f = Array.from(lb.querySelectorAll('button'));
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  /* Balayage tactile */
  let x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) afficher(courant + (dx < 0 ? 1 : -1));
    x0 = null;
  });
});
