/* ==========================================================================
   SJ GRACE — formulaire.js : validation des formulaires + préparation WhatsApp
   --------------------------------------------------------------------------
   Le site étant 100 % frontend, aucun message n'est envoyé à un serveur.
   Après validation, le message est préparé et l'utilisateur l'envoie
   lui-même via WhatsApp (ou le copie). Pour un envoi par e-mail automatique,
   voir docs/DEPLOIEMENT.md (Formspree, Netlify Forms ou script PHP).
   ========================================================================== */
'use strict';

const REGLES = {
  nom: v => v.length >= 2 && v.length <= 80 && /^[\p{L}\s'’.-]+$/u.test(v) || 'Indiquez votre nom (lettres uniquement, 2 caractères minimum).',
  telephone: v => /^\+?[\d\s.-]{8,20}$/.test(v) || 'Indiquez un numéro valide (ex. 07 00 00 00 00).',
  email: v => !v || /^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i.test(v) || 'Adresse e-mail invalide.',
  service: v => !!v || 'Choisissez un service.',
  message: v => (v.length >= 15 && v.length <= 1000) || 'Décrivez votre projet (15 à 1000 caractères).',
  consentement: (v, el) => el.checked || 'Votre accord est nécessaire pour être recontacté.'
};

/** Nettoie une saisie : supprime balises et caractères de contrôle */
const nettoyer = s => String(s).replace(/<[^>]*>/g, '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim();

function validerChamp(el) {
  const regle = REGLES[el.name];
  if (!regle) return true;
  const valeur = el.type === 'checkbox' ? '' : nettoyer(el.value);
  const res = regle(valeur, el);
  const fb = el.closest('.field')?.querySelector('.invalid-feedback');
  if (res === true) {
    el.classList.remove('is-invalid');
    el.removeAttribute('aria-invalid');
    return true;
  }
  el.classList.add('is-invalid');
  el.setAttribute('aria-invalid', 'true');
  if (fb) fb.textContent = res;
  return false;
}

function construireMessage(form) {
  const d = new FormData(form);
  const lignes = [
    'Bonjour ' + window.SJ.nom + ' 👋',
    '',
    'Nom : ' + nettoyer(d.get('nom')),
    'Téléphone : ' + nettoyer(d.get('telephone')),
  ];
  const email = nettoyer(d.get('email') || '');
  if (email) lignes.push('E-mail : ' + email);
  lignes.push('Service : ' + nettoyer(d.get('service')), '', nettoyer(d.get('message')));
  return lignes.join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-form="contact"]').forEach(form => {
    const champs = form.querySelectorAll('input, select, textarea');
    const resultat = form.parentElement.querySelector('.form-result');
    const msg = form.querySelector('textarea[name="message"]');
    const compteur = form.querySelector('.char-count');

    if (msg && compteur) {
      msg.addEventListener('input', () => { compteur.textContent = msg.value.length + ' / 1000'; });
    }
    champs.forEach(c => {
      c.addEventListener('blur', () => { if (c.value || c.type === 'checkbox') validerChamp(c); });
      c.addEventListener('input', () => { if (c.classList.contains('is-invalid')) validerChamp(c); });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (form.querySelector('[name="site_web"]')?.value) return;   // pot de miel anti-robots
      let ok = true; let premier = null;
      champs.forEach(c => { if (!validerChamp(c)) { ok = false; premier = premier || c; } });
      if (!ok) {
        premier.focus();
        notifier('Merci de corriger les champs signalés', 'bi-exclamation-triangle-fill');
        return;
      }
      const texte = construireMessage(form);
      const lien = 'https://wa.me/' + window.SJ.whatsapp + '?text=' + encodeURIComponent(texte);
      if (resultat) {
        resultat.querySelector('[data-wa-link]').href = lien;
        resultat.querySelector('[data-copy-msg]').onclick = async () => {
          const c = await copierTexte(texte);
          notifier(c ? 'Message copié 📋' : 'Copie impossible', c ? 'bi-clipboard-check' : 'bi-exclamation-circle');
        };
        resultat.classList.add('show');
        resultat.setAttribute('tabindex', '-1');
        resultat.focus();
      }
      notifier('Votre message est prêt ✅ Il reste à l’envoyer via WhatsApp');
    });

    form.addEventListener('reset', () => {
      champs.forEach(c => { c.classList.remove('is-invalid'); c.removeAttribute('aria-invalid'); });
      if (resultat) resultat.classList.remove('show');
      if (compteur) compteur.textContent = '0 / 1000';
    });
  });
});
