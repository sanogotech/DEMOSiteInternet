# Cahier des charges fonctionnel — Site SJGRACE MULTISERVICE

## 1. Contexte
SJGRACE MULTISERVICE (Cocody Angré Château, Abidjan) accompagne particuliers, propriétaires,
investisseurs et entreprises dans leurs projets immobiliers et de construction.
Source unique des contenus : la plaquette commerciale (10 pages). **Aucune information n'a été inventée.**

## 2. Objectifs
| # | Objectif | Indicateur |
|---|---|---|
| O1 | Présenter clairement les 4 métiers et 3 services complémentaires | Accès à chaque service en ≤ 2 clics |
| O2 | Générer des demandes de contact / devis | Formulaire + WhatsApp + téléphone visibles sur chaque page |
| O3 | Inspirer confiance (image premium, cohérente avec la plaquette) | Charte marine / or reprise |
| O4 | Être trouvé sur Google (« gestion immobilière Abidjan », « étude géotechnique Abidjan »…) | Balises SEO + Schema.org |
| O5 | Être simple à maintenir et à héberger | HTML/CSS/JS statique, sans compilation |

## 3. Cibles
Particuliers 🏠 · Propriétaires 🔑 · Investisseurs 📈 · Entreprises 🏭 — majoritairement sur smartphone.

## 4. Arborescence
```
Accueil
├── À propos (identité, approche, engagements, clients, valeurs)
├── Nos services
│   ├── #immobilier     Gestion immobilière
│   ├── #foncier        Vente de terrains et développement foncier
│   ├── #genie-civil    Matériels et équipements
│   ├── #geotechnique   Études géotechniques
│   └── #complementaires Assurances · Véhicules · Prestations diverses
├── Galerie (filtres par domaine)
├── FAQ
├── Contact
└── Pied de page : Mentions légales · Confidentialité · Plan du site
```

## 5. Exigences fonctionnelles
| Réf. | Exigence | Statut |
|---|---|---|
| F1 | Menu responsive, page active signalée | ✅ |
| F2 | Formulaire validé côté client ; préparation du message et envoi WhatsApp par l'utilisateur | ✅ |
| F3 | Demande rapide en modale avec service pré-rempli | ✅ |
| F4 | Galerie filtrable + visionneuse (clavier, tactile) | ✅ |
| F5 | FAQ accordéon + recherche locale | ✅ |
| F6 | Partage réseaux sociaux + copie de lien | ✅ |
| F7 | Bouton WhatsApp flottant, retour en haut, notifications | ✅ |
| F8 | Envoi automatique d'e-mail | ⏳ Préparé — nécessite un service serveur (voir DEPLOIEMENT.md §5) |

## 6. Exigences non fonctionnelles
Responsive mobile first · WCAG 2.2 AA · HTML sémantique · SEO on-page · images WebP et lazy loading ·
sécurité frontend (pas de secret, saisies nettoyées, `textContent`, `rel="noopener"`) · compatibilité navigateurs modernes.

## 7. Hors périmètre (faute de contenu source)
Pages Réalisations et Actualités, chiffres d'activité, témoignages clients, horaires d'ouverture, e-mail.
