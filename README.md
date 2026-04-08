# GASPARD.exe — Portfolio point-and-click

Portfolio interactif style CD-ROM années 90-2000. Zéro framework, zéro dépendance.

## Mise en route

### 1. Placer les images

Dépose tes 4 images dans `assets/rooms/` avec exactement ces noms :

```
assets/rooms/room_main.png      ← plan principal (chambre)
assets/rooms/room_bureau.png    ← plan bureau (fond de la fenêtre projets)
assets/rooms/room_photos.png    ← plan photos
assets/rooms/room_posters.png   ← plan posters
```

Si une image manque, un placeholder vert s'affiche à la place — le site fonctionne quand même.

### 2. Configurer la clé API

Ouvre `config.js` et remplace la valeur :

```js
window.OPENAI_API_KEY = 'sk-...ta-vraie-clé...';
```

Sans clé, le chatbot affiche `[ configure config.js avec ta clé API ]`.

### 3. Lancer

Ouvre `index.html` avec **Live Server** dans VS Code (clic droit → Open with Live Server).

> Ne pas ouvrir directement en `file://` : les images ne se chargeront pas à cause des restrictions CORS.

## Déployer

1. Push le repo sur GitHub (config.js est dans .gitignore — il ne sera pas publié)
2. Va dans Settings → Pages → Source : `main` / `/ (root)`
3. GitHub Pages génère une URL publique

## Structure

```
portfolio/
├── index.html       — structure HTML
├── style.css        — styles (terminal vert, scanlines, chatbox)
├── game.js          — logique : scènes, hotspots, typewriter, chatbot
├── data.js          — SYSTEM_PROMPT du chatbot
├── config.js        — clé API (non versionné)
├── .gitignore
└── assets/
    └── rooms/
        ├── room_main.png
        ├── room_bureau.png
        ├── room_photos.png
        └── room_posters.png
```

## Ajuster les hotspots

Chaque hotspot est défini dans `game.js` avec des positions en pourcentages (`left`, `top`, `width`, `height`). Modifie ces valeurs pour les aligner précisément sur tes images.

## Contact

leroux.gaspard56500@gmail.com
