# SJGRACE MULTISERVICE — Site Internet officiel

Site vitrine professionnel de **SJGRACE MULTISERVICE** (Cocody Angré Château, Abidjan) :
gestion immobilière, vente de terrains, matériels de génie civil, études géotechniques,
assurances, location et vente de véhicules.

> **Stack** : HTML5 · CSS3 · JavaScript Vanilla ES6+ · Bootstrap 5.3.8 · Bootstrap Icons 1.13.2 · Google Fonts (Manrope + Inter).
> Aucun framework, aucune compilation, aucun backend : le site s'ouvre directement dans un navigateur.

---

## 1. Démarrage rapide

```bash
# Option 1 : double-cliquer sur index.html (fonctionne hors ligne, sauf polices Google)
# Option 2 : serveur local (recommandé, simule l'hébergement réel)
cd site-web
python3 -m http.server 8080      # puis ouvrir http://localhost:8080
```

## 2. Arborescence

```
site-web/
├── index.html                  Accueil
├── 404.html                    Page d'erreur personnalisée
├── robots.txt / sitemap.xml    Référencement
├── pages/
│   ├── a-propos.html           Identité, approche (onglets), valeurs
│   ├── services.html           7 services, sous-menu collant, demandes de devis
│   ├── galerie.html            19 images, filtres + visionneuse (lightbox)
│   ├── faq.html                11 questions, accordéon + recherche instantanée
│   ├── contact.html            Coordonnées, formulaire validé, WhatsApp, plan
│   ├── mentions-legales.html
│   └── confidentialite.html
├── assets/
│   ├── css/  style.css (composants) · animations.css · responsive.css
│   ├── js/   main.js · animations.js · formulaire.js · galerie.js · faq.js
│   ├── images/photos/          11 photos de la plaquette (WebP + JPEG de repli)
│   ├── images/illustrations/   8 illustrations SVG originales
│   ├── images/og-sjgrace.jpg   Visuel de partage réseaux sociaux (1200×630)
│   ├── icons/                  Logo, favicon, icône Apple
│   └── vendor/                 Bootstrap + Bootstrap Icons (hébergés en local)
└── docs/
    ├── CAHIER-DES-CHARGES.md
    ├── CHARTE-GRAPHIQUE.md
    └── DEPLOIEMENT.md
```

## 3. Fonctionnalités

| Fonctionnalité | Où | Fichier |
|---|---|---|
| Menu responsive (fermeture au clic / Échap), en-tête qui se densifie au défilement | toutes | `main.js` |
| Animations d'apparition au défilement, compteurs animés | toutes | `animations.js` |
| Formulaire de contact validé (temps réel, anti-robot « pot de miel », nettoyage des saisies) → message prêt à envoyer sur WhatsApp ou à copier | contact, modale | `formulaire.js` |
| Modale « Demande rapide » avec service pré-sélectionné | accueil, services | `main.js` |
| Galerie : filtres par catégorie avec compteurs, visionneuse clavier/tactile | galerie | `galerie.js` |
| FAQ accordéon + recherche instantanée (insensible aux accents) | FAQ | `faq.js` |
| Onglets (approche / engagements / clients) | à propos | Bootstrap |
| Sous-navigation collante avec section active | services | `main.js` |
| Partage WhatsApp / Facebook / LinkedIn / copie du lien | à propos, services, contact | `main.js` |
| Notifications (toasts), bouton WhatsApp flottant, retour en haut | toutes | `main.js` |

## 4. Modifier le contenu

- **Coordonnées** : rechercher/remplacer `27 24 53 71 21`, `01 40 15 61 78` et `2250140156178` (numéro WhatsApp) dans les fichiers HTML, et mettre à jour l'objet `window.SJ` en tête de `assets/js/main.js`.
- **Domaine** : remplacer `https://www.votre-domaine.ci` dans tous les `.html`, `sitemap.xml` et `robots.txt`.
- **Couleurs / polices** : variables CSS en tête de `assets/css/style.css` (voir `docs/CHARTE-GRAPHIQUE.md`).
- **Images** : déposer la nouvelle photo en `.webp` **et** `.jpg` avec le même nom dans `assets/images/photos/`.
- **Mentions légales** : compléter les zones signalées `[À compléter : …]`.

## 5. Points à valider avant mise en ligne ⚠️

1. **Numéro WhatsApp** : le formulaire et les boutons utilisent le **01 40 15 61 78**. Confirmer que ce numéro est bien actif sur WhatsApp.
2. **E-mail, RCCM, hébergeur** : absents de la plaquette, à compléter dans les mentions légales.
3. **Photos haute définition** : les photos extraites de la plaquette PDF sont en basse résolution (≈ 200–400 px d'origine, agrandies et accentuées). Fournir les originaux HD améliorera nettement le rendu.
4. **Réalisations et actualités** : pages non créées faute de contenu dans la plaquette (aucune information n'a été inventée). Elles peuvent être ajoutées sur le modèle de `galerie.html`.

## 6. Qualité — tests effectués

- ✅ Validation HTML (html-validate, règles recommandées) : 0 erreur sur les 9 pages.
- ✅ Accessibilité (axe-core, WCAG 2.2 AA) : 0 violation (contrastes, labels, ARIA, navigation clavier, lien d'évitement).
- ✅ Tests automatisés (Playwright) : aucun lien interne cassé, aucune erreur JavaScript, aucun débordement horizontal en 390 px et 1440 px, formulaire / galerie / FAQ / modale / menu mobile fonctionnels.
- ✅ SEO : titres et descriptions uniques, Open Graph, URL canoniques, Schema.org (`LocalBusiness`, `FAQPage`, `ItemList`), sitemap, robots.
- ✅ Performance : images WebP + chargement différé, dimensions déclarées (pas de décalage de mise en page), scripts `defer`, bibliothèques locales.

Voir `docs/DEPLOIEMENT.md` pour la mise en ligne.
