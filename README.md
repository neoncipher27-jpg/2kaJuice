# 2KA Juice — site vitrine

Version autonome du site vitrine de 2KA Juice. Le dossier contient le code du site et tous les visuels utilisés, y compris l’affiche et la vidéo publicitaire. Les médias sont stockés localement dans `public/assets/` : le site n’a pas besoin des fichiers privés Manus pour fonctionner après extraction.

## Démarrage rapide

Prérequis : Node.js 20 ou plus récent. Le site n’utilise aucune dépendance npm externe; `npm install` n’est pas nécessaire.

```sh
npm start
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000). Le serveur sert le site depuis le dossier `public/`.

## Préparer une version statique

```sh
npm run build
```

Le dossier `dist/` contient la version statique prête à être hébergée sur un hébergement de fichiers statiques.

## Fonctions incluses

- Présentation responsive de 2KA Juice, de son identité visuelle et de son adresse à Ab-Calavi, Zoca, Bénin.
- Catalogue des sept boissons visibles sur l’affiche, avec photos recadrées depuis la référence fournie, nouveautés, filtres et boutons d’ajout au panier.
- Panier permettant de modifier les quantités et de retirer des articles; son contenu reste dans le navigateur (`localStorage`).
- Formulaire de commande qui prépare un récapitulatif et ouvre WhatsApp au **+229 01 41 19 04 08**. Le client vérifie le message et l’envoie lui-même.
- Affiche originale et publicité vidéo comprises dans le dossier.

Les prix et formats ne figurant pas sur l’affiche, ils sont indiqués comme à confirmer avec l’équipe. Le panier transmet une demande par WhatsApp; il ne traite pas de paiement en ligne et n’envoie pas automatiquement la commande. Le formulaire ouvre le lien WhatsApp, mais le site ne stocke pas les renseignements saisis sur un serveur.

## Contenu du dossier

```text
README.md                 Guide de démarrage
package.json              Commandes npm sans dépendances externes
server.mjs                Serveur local Node.js
scripts/build.mjs         Copie du site statique vers dist/
app.config.ts             Métadonnée du logo pour Webdev
plan.md, TODO.md          Plan et suivi des fonctionnalités
public/index.html         Contenu du site
public/styles.css         Style responsive
public/app.js             Catalogue, filtres et panier
public/manus-routes.json  Déclaration de route
public/assets/            Logo, affiche, vidéo et visuels des boissons
```

Les polices DM Sans et Manrope sont chargées en ligne lorsqu’une connexion est disponible; des polices système de remplacement restent prévues.
