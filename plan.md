# Plan — Site vitrine 2KA Juice

## Produit et fonctionnement

Site vitrine français, responsive et statique. Présentation de 2KA Juice et de sa gamme, intégration de la publicité vidéo, panier avec ajout/modification/retrait et collecte des coordonnées, puis transmission du récapitulatif de commande par WhatsApp au **+229 01 41 19 04 08**. Appel direct, adresse à Ab-Calavi, Zoca, République du Bénin.

Les produits visibles sont jus de pastèque, jus d’ananas-gingembre, jus detox, jus de bissap clou de girofle gingembre, jus d’ananas, jus de tamarin et café au lait. L’affiche ne fournit pas de prix ni de formats : le site ne les invente pas et indique « Prix et formats à confirmer sur WhatsApp ». Le panier recueille une demande de commande; le passage de commande ouvre WhatsApp avec le texte déjà composé. Pas de stockage serveur, base de données ni paiement en ligne dans cette version; les articles sont conservés dans le navigateur (localStorage).

## Architecture

- `public/index.html` : site, sémantique, sections et formulaires.
- `public/styles.css` : identité graphique responsive, composants et animations légères.
- `public/app.js` : catalogue, panier persistant, quantités, validation du formulaire et lien wa.me.
- `public/assets/` : logo recadré depuis l’affiche originale, affiche et média vidéo ainsi que ses recadrages produits.
- `public/manus-routes.json` : déclaration des routes.
- `server.mjs` : serveur Node minimal sur le port 3000, sert les fichiers statiques en Preview.
- `plan.md` et `TODO.md` : plan adopté et suivi des fonctionnalités.

Le build de publication copie/sert le répertoire statique `public`; le serveur sert le même contenu en local/Preview. Dépendances réduites au minimum.

## Direction artistique confirmée par la référence fournie

- **Mouvement** : éditorial tropical et artisanal, inspiré directement de l’affiche 2KA Juice.
- **Principes** : logo et couleurs fidèles; fruits et verres au premier plan; informations lisibles et concrètes; commande WhatsApp directe.
- **Philosophie couleur** : vert profond pour l’ancrage naturel, jaune citron pour l’énergie, tons crème/bois pour une chaleur artisanale, avec des touches colorées dérivées des jus.
- **Mise en page** : bandeau de marque, héro asymétrique avec accroche et vidéo/visuel, bandeau de catégories, section produits, nouveautés, présentation, commande et contact. Grilles produits seulement lorsque cela aide le choix.
- **Signatures** : feuilles/contours végétaux en accents, traits-badges inspirés des coups de pinceau de l’affiche, pastille fraîcheur.
- **Interaction/animation** : panier latéral ou dialog accessible, boutons tactiles évidents, transitions brèves et sobres; respecter `prefers-reduced-motion`.
- **Typographie** : sans-serif ronde en titres et sans-serif neutre pour le texte courant; hiérarchie large et généreuse inspirée des titres de l’affiche.
- **Essence de marque** : des boissons naturelles et rafraîchissantes préparées par 2KA Juice pour la clientèle d’Ab-Calavi; personnalité fraîche, chaleureuse, authentique.
- **Voix** : directe, accueillante et appétissante. Exemples : « Le goût naturel du bonheur ! »; « Ajoutez vos envies, envoyez votre commande sur WhatsApp. »
- **Logo** : reprendre sans redessiner l’emblème et le logotype 2KA Juice visibles sur l’affiche fournie; le recadrage du logo existant sert à garder ses proportions/couleurs.
- **Couleur signature** : vert feuillage profond de l’affiche, rehaussé du jaune vif de 2KA Juice.

## Structure

```text
public/
  index.html
  styles.css
  app.js
  manus-routes.json
  assets/
    logo.png
    affiche-2ka-juice.png
    publicite-2ka-juice.mp4
    produit-*.webp
server.mjs
plan.md
TODO.md
```
