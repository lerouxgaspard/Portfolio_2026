# GASPARD.exe

Portfolio personnel interactif en point-and-click, inspire des CD-ROMs 90-2000.

Stack volontairement simple : HTML, CSS et JavaScript vanilla. Aucun framework, aucun bundler, aucun npm.

## Lancer le projet

Depuis la racine :

```bash
python3 -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000
```

Eviter l'ouverture directe en `file://`, moins fiable pour tester les chargements d'assets.

## Structure

```text
.
├── index.html
├── style.css
├── game.js
├── data.js
├── assets/
│   ├── optimized/  # fonds de scenes compresses pour le web
│   ├── rooms/      # sources PNG + calques transparents de hover
│   └── objects/    # reserve pour de futurs objets separes
```

## Performance

Les fonds de scene utilises par le jeu sont dans `assets/optimized/`.
Les PNG d'origine restent dans `assets/rooms/` comme sources et fallback.

Les calques de hover restent en PNG car ils ont besoin de transparence.

Le chargement fonctionne avec :

- cache d'images en JavaScript ;
- preload des assets apres l'affichage initial ;
- transition qui attend le chargement de la scene suivante ;
- fallback PNG si un fond optimise manque.

## Hotspots

Chaque hotspot a deux couches :

- une image `.hotspot-visual` plein ecran, non cliquable ;
- un bouton invisible `.hotspot-trigger` positionne en pourcentages.

Les positions se modifient dans `game.js`, dans les champs `css` et `mobileCss`.

## Chat

Par defaut, le chat utilise un mode local scripté pour eviter d'exposer une cle API sur GitHub Pages.

Deux options existent dans `index.html` :

```js
window.OPENAI_API_KEY = '';
window.CHAT_API_ENDPOINT = '';
```

Pour une version publique professionnelle, preferer `CHAT_API_ENDPOINT` avec un proxy serverless
plutot qu'une cle OpenAI exposee dans le navigateur.

## Priorites restantes

- Ajouter de vraies photos/videos dans les fiches projets.
- Continuer la reecriture des textes objet par objet.
- Calibrer finement les hotspots mobile.
- Creer un endpoint serverless pour GPT si le chatbot dynamique reste dans la V1.
