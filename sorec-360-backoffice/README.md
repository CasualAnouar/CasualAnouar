# SOREC 360 — Back-office Communauté

Front-end Angular 21 du back-office de modération de la communauté des turfistes SOREC,
implémenté d'après la maquette Figma `SOREC_360` (section **BO Community**).

## Stack

| Élément | Choix |
|---|---|
| Framework | Angular 21, composants 100 % standalone |
| Réactivité | Signals (`signal`, `computed`, `input`, `output`) + zoneless |
| Routage | Lazy loading par feature (`loadComponent`) |
| Styles | SCSS, tokens centralisés dans `src/styles/_variables.scss` |
| i18n | `ngx-translate`, chaînes dans `public/i18n/fr.json` |
| Police | Montserrat |

## Écrans

| Route | Écran maquette | Contenu |
|---|---|---|
| `/pilotage/vue-ensemble` | F1 — CRAN 01 | KPI, filtre de période, file prioritaire, derniers sujets |
| `/moderation/file` | F2 — CRAN 02 | File de modération, onglets *En attente* / *Traités* |
| `/moderation/sujets` | F3 — CRAN 03 | Sujets & discussions, filtres et tri |
| `/moderation/sujets/:id` | F3 / Sujet — CRAN 04 | Fil de discussion, modération message par message |
| `/moderation/membres` | F4 — CRAN 05 | Membres, réputation, blocage / réactivation |
| `/configuration/parametres` | F5 — CRAN 06 | Utilisateurs et catégories, avec les deux modales |

## Architecture

```
src/app/
├── core/services/      # Singletons applicatifs (toast)
├── layout/             # Shell : sidebar, topbar, main-layout
├── shared/             # Composants UI sans logique métier
├── features/           # Domaines métier, chargés à la demande
└── data/
    ├── models/         # Interfaces TypeScript
    └── services/       # Accès aux données
```

Règles suivies : aucun `any`, pas d'import croisé entre features, services en
`providedIn: 'root'`, contrôle de flux `@if` / `@for`, aucune valeur de couleur
ou de taille codée en dur dans les composants.

## Démarrage

```bash
npm install
npm start          # http://localhost:4200
npm run build      # bundle de production dans dist/
```

## Jeu de données

Les services de `data/services` exposent un jeu de données de démonstration repris
de la maquette. Ils sont conçus pour être remplacés par des appels `HttpClient`
sans modifier les composants : seul le contenu des services change.

## Points à finaliser

- Le logo de la marque est une approximation vectorielle ; remplacer
  `public/favicon.svg` et le `<svg>` de `layout/sidebar` par l'asset officiel.
- Les icônes sont des tracés SVG intégrés dans `shared/icon` ; à substituer par
  la bibliothèque d'icônes officielle si elle existe.
- La pagination des écrans Sujets et Membres est affichée mais non branchée
  (page 1 uniquement), conformément à l'état de la maquette.
