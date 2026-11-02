/* ==========================================================================
   SJ GRACE — faq.js : recherche locale instantanée dans la FAQ
   ========================================================================== */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const champ = document.getElementById('faqRecherche');
  if (!champ) return;
  const items = Array.from(document.querySelectorAll('.accordion-pro .accordion-item'));
  const vide = document.querySelector('.faq-empty');
  const statut = document.getElementById('faqStatut');
  const normaliser = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const index = items.map(it => normaliser(it.textContent));

  champ.addEventListener('input', () => {
    const q = normaliser(champ.value.trim());
    let n = 0;
    items.forEach((it, i) => {
      const ok = !q || index[i].includes(q);
      it.classList.toggle('is-hidden', !ok);
      if (ok) n++;
    });
    vide.style.display = n ? 'none' : 'block';
    statut.textContent = q ? n + ' question(s) trouvée(s)' : '';
  });
});
