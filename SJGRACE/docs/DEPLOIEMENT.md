# Guide de déploiement — Site SJGRACE MULTISERVICE

Le site est 100 % statique : il suffit de copier le contenu du dossier `site-web/` à la racine d'un hébergement web.

## 1. Avant la mise en ligne (checklist)
- [ ] Remplacer `https://www.votre-domaine.ci` par le vrai domaine (tous les `.html`, `sitemap.xml`, `robots.txt`).
- [ ] Confirmer le numéro WhatsApp (`window.SJ.whatsapp` dans `assets/js/main.js` + liens `wa.me/2250140156178`).
- [ ] Compléter les mentions légales (`[À compléter : …]`).
- [ ] Remplacer les photos par leurs versions HD si disponibles (mêmes noms, `.webp` + `.jpg`).

## 2. Option A — Hébergement mutualisé (cPanel, o2switch, Hostinger, LWS…)
1. Se connecter au gestionnaire de fichiers ou en FTP (FileZilla).
2. Envoyer **le contenu** de `site-web/` dans `public_html/` (ou `www/`).
3. Activer le certificat SSL gratuit (Let's Encrypt) dans le panneau.
4. Ajouter un fichier `.htaccess` à la racine :
```apache
ErrorDocument 404 /404.html
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header set Content-Security-Policy "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; frame-ancestors 'self'"
</IfModule>
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/xml
</IfModule>
```
> Les scripts JSON-LD (`application/ld+json`) ne sont pas exécutés et restent compatibles avec cette CSP.

## 3. Option B — Hébergement gratuit (Netlify, Cloudflare Pages, GitHub Pages)
- **Netlify** : app.netlify.com → *Add new site* → *Deploy manually* → glisser le dossier `site-web/`.
- **Cloudflare Pages** : *Create project* → *Direct upload* → dossier `site-web/`.
- **GitHub Pages** : pousser le contenu de `site-web/` dans un dépôt → *Settings › Pages* → branche `main`, dossier `/`.
Puis relier le nom de domaine dans les paramètres DNS de l'hébergeur.

## 4. Après la mise en ligne
1. Google Search Console : ajouter le domaine, soumettre `sitemap.xml`.
2. Créer / mettre à jour la fiche **Google Business Profile** (adresse Cocody Angré Château, téléphones).
3. Tester : PageSpeed Insights (Lighthouse), https://validator.w3.org, test des données structurées Google.

## 5. Envoi automatique des e-mails (évolution)
Le formulaire prépare aujourd'hui un message WhatsApp. Pour recevoir aussi un e-mail automatique :
- **Netlify Forms** : ajouter `data-netlify="true"` et `name="contact"` au `<form>` puis envoyer les données en `fetch` dans `formulaire.js`.
- **Formspree** : créer un formulaire, puis `fetch('https://formspree.io/f/VOTRE_ID', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })`.
- **Hébergement PHP** : petit script `contact.php` avec `mail()` ou PHPMailer, validation serveur et protection anti-spam.
Dans tous les cas : **ne jamais placer de clé secrète dans le JavaScript** et valider à nouveau côté serveur.

## 6. Production (optionnel)
Minifier CSS/JS (ex. https://www.toptal.com/developers/cssminifier) et ajuster les chemins. Le site reste fonctionnel sans cette étape.
