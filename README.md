# Maison Brume

Prototype interactif d'un site de commerce électronique de mobilier, réalisé avec
React et Vite.

Maison Brume vend du mobilier calme et éditorial pensé pour une personne qui
aménage son premier vrai appartement. Le site met en œuvre trois processus
interactifs : l'achat guidé par étapes, l'exploration du catalogue par recherche
à facettes, et un court sondage de satisfaction.

## Fonctionnalités

- **Recherche à facettes** — filtres par pièce, catégorie, matière, couleur,
  style, disponibilité et prix, avec compteurs en direct, puces retirables et tri.
- **Panier et caisse par étapes** — tiroir de panier, puis un parcours
  « Panier → Coordonnées → Paiement → Confirmation » qui indique en tout temps
  l'étape faite, l'étape en cours et ce qui reste à faire.
- **Sondage** — une courte enquête de satisfaction, accessible après l'achat et
  depuis le pied de page.
- **Aide** — une foire aux questions sur la livraison, les retours et les
  dimensions.

## Prérequis

- [Node.js](https://nodejs.org/) 18 ou plus récent (npm inclus).

## Installation et lancement

```bash
npm install      # installe les dépendances
npm run dev      # démarre le serveur de développement (Vite)
```

Le serveur de développement affiche l'URL locale à ouvrir dans le navigateur
(par défaut http://localhost:5173).

## Scripts disponibles

- `npm run dev` — lance le serveur de développement local.
- `npm run build` — génère la version de production dans `dist/`.
- `npm run preview` — sert localement la version construite pour vérification.

## Technologies

React 19 et Vite 7. Aucune dépendance externe ni variable d'environnement n'est
requise. Les illustrations de meubles sont dessinées en SVG dans le code : aucune
image externe n'est chargée.
