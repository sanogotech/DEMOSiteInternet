/* ==========================================================================
   SJGRACE — main.js : configuration, en-tête, navigation, notifications, partage
   ========================================================================== */
'use strict';

/** Configuration centrale : modifier ici les coordonnées utilisées par les scripts. */
window.SJ = Object.freeze({
  nom: 'SJGRACE MULTISERVICE',
  whatsapp: '2250140156178',          // numéro au format international, sans "+" ni espace
  telFixe: '+2252724537121',
  telMobile: '+2250140156178'
});

document.documentElement.classList.add('js');

/** Affiche une notification (toast Bootstrap) */
window.notifier = function (message, icone = 'bi-check-circle-fill') {
  let zone = document.querySelector('.toast-zone');
  if (!zone) {
    zone = document.createElement('div');
    zone.className = 'toast-zone';
    zone.setAttribute('aria-live', 'polite');
    zone.setAttribute('aria-atomic', 'true');
    document.body.appendChild(zone);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  const body = document.createElement('div');
  body.className = 'toast-body';
  const i = document.createElement('i');
  i.className = 'bi ' + icone + ' text-gold';
  i.setAttribute('aria-hidden', 'true');
  const txt = document.createElement('span');
  txt.textContent = message;                 // textContent : aucune injection HTML possible
  body.append(i, txt);
  toast.appendChild(body);
  zone.appendChild(toast);
  if (window.bootstrap) {
    const t = new bootstrap.Toast(toast, { delay: 3200 });
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
    t.show();
  } else {
    setTimeout(() => toast.remove(), 3200);
  }
};

/** Copie un texte dans le presse-papiers, avec repli si l'API est refusée */
window.copierTexte = async function (texte) {
  try {
    await navigator.clipboard.writeText(texte);
    return true;
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = texte;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    ta.remove();
    return ok;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const btnTop = document.querySelector('.fab-top');

  /* En-tête : fond plein au défilement */
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (btnTop) btnTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Bouton retour en haut */
  if (btnTop) btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Menu mobile : fermeture au clic sur un lien ou sur Échap */
  const collapseEl = document.getElementById('menuPrincipal');
  if (collapseEl && window.bootstrap) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
    collapseEl.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => {
      if (collapseEl.classList.contains('show')) bsCollapse.hide();
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && collapseEl.classList.contains('show')) bsCollapse.hide();
    });
  }

  /* Année courante dans le pied de page */
  document.querySelectorAll('[data-annee]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* Boutons de partage : liens construits à partir de l'URL de la page */
  document.querySelectorAll('[data-share]').forEach(el => {
    const url = encodeURIComponent(location.href.split('#')[0]);
    const titre = encodeURIComponent(document.title);
    const type = el.dataset.share;
    if (type === 'whatsapp') el.href = 'https://wa.me/?text=' + titre + '%20' + url;
    if (type === 'facebook') el.href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
    if (type === 'linkedin') el.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
    if (type === 'copier') {
      el.addEventListener('click', async () => {
        const ok = await copierTexte(location.href.split('#')[0]);
        notifier(ok ? 'Lien de la page copié 👍' : 'Copie impossible : sélectionnez l’adresse dans la barre du navigateur', ok ? 'bi-link-45deg' : 'bi-exclamation-circle');
      });
    }
  });

  /* Copie d'un numéro de téléphone */
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', async () => {
      const ok = await copierTexte(el.dataset.copy);
      notifier(ok ? 'Numéro copié : ' + el.dataset.copy + ' 📞' : 'Copie impossible', ok ? 'bi-telephone-fill' : 'bi-exclamation-circle');
    });
  });

  /* Sous-navigation (page Services) : lien actif selon la section visible */
  const subLinks = document.querySelectorAll('.subnav .nav-link');
  if (subLinks.length && 'IntersectionObserver' in window) {
    const map = new Map();
    subLinks.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) map.set(s, l); });
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          subLinks.forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
          const l = map.get(en.target);
          l.classList.add('active');
          l.setAttribute('aria-current', 'true');
          l.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, s) => io.observe(s));
  }

  /* Pré-sélection d'un service dans la modale "Demande rapide" */
  document.querySelectorAll('[data-bs-target="#modalDevis"][data-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sel = document.querySelector('#modalDevis select[name="service"]');
      if (sel) sel.value = btn.dataset.service;
    });
  });
});
