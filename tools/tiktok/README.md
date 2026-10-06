# Vidéos TikTok « fail »

Une vraie partie de TACKLE, filmée image par image à 30 images/s en 1080 × 1920, avec les sous-titres, les effets et les bruitages ajoutés par-dessus. Les écrans sont ceux du jeu : la vidéo montre le jeu réel, ce que demande TikTok pour une pub de jeu.

## Faire une vidéo

1. Écrire un scénario dans `scripts/` (copier `drogba.json`).
2. Lancer un serveur à la racine du dépôt :
   ```sh
   python3 -m http.server 8766
   ```
3. Filmer, puis monter (il faut Playwright et ffmpeg) :
   ```sh
   node tools/tiktok/director.cjs tools/tiktok/scripts/drogba.json /tmp/out-drogba
   python3 tools/tiktok/render.py /tmp/out-drogba tackle-tiktok-drogba
   ```
   La vidéo sort dans `/tmp/out-drogba/tackle-tiktok-drogba.mp4`.

Pour vérifier un scénario vite, `STILLS=1` n'enregistre qu'une image sur 15.

## Écrire un scénario

`card` est l'identifiant d'une carte Transfert **vérifiée**, par exemple `t043` pour Drogba. La partie se joue à 2 équipes : les Lions ont la main, les Renards tacklent.

En vidéo, l'écran ne défile pas et les panneaux de saisie sont cachés : la réponse tapée s'affiche dans une bulle (« 🦁 Les Lions : « Gervinho ! » »), pour que la vidéo reste lisible.

Chaque étape (`steps`) peut avoir :
- `info` : un encadré d'explication au milieu de l'écran (règle du jeu, Tackle). `""` pour l'enlever.
- `caption` : le sous-titre, qui reste affiché jusqu'au suivant. `<b>` pour l'or, `<i>` pour le rouge, emojis acceptés. `""` pour effacer.
- `sound` : `kickoff`, `wrong`, `right`, `tackle`, `tap` ou `end` (fichiers de `sfx/`).
- `flash` : couleur d'un flash plein écran (`flashMax` pour son intensité).
- `waitFor` : attendre qu'un bouton du jeu soit visible avant l'étape, par exemple `#btn-answer` pour attendre l'indice suivant.

Et une action, `do` :
- `hold` : attendre `s` secondes ;
- `answer` : l'équipe qui a la main répond `text` (bulle `bubble`, durée `think` en secondes) ;
- `pass` : l'équipe qui a la main passe l'indice ;
- `skipTo` : coupe au montage, `ms` millisecondes passent sans être filmées (par exemple jusqu'au sifflet du Tackle) ;
- `tackle` : l'équipe `team` tackle et répond `text` (bulle `bubble`) ;
- `end` : écran de fin (`q`, `tag`, `cta`) pendant `s` secondes.

Les mauvaises réponses doivent rester crédibles : un joueur qui est vraiment passé par le club de l'indice. C'est ce qui fait réagir en commentaire.
