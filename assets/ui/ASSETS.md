# Assets de l'interface TACKLE

Ces fichiers sont séparés des planches et prêts à être utilisés dans les trois écrans de préparation de partie. Les planches et les règles d'interface sont dans [`docs/UI_SETUP_FLOW.md`](../../docs/UI_SETUP_FLOW.md).

| Fichier | Usage |
| --- | --- |
| `tackle-logo-brush.png` | Logo doré sur les en-têtes. Fond transparent. |
| `team-lion.png`, `team-fox.png`, `team-bull.png`, `team-eagle.png` | Quatre emblèmes au choix lors de la personnalisation. Fonds transparents. Ce sont des mascottes fictives, pas des logos de clubs. |
| `stadium-night.png` | Fond vertical du parcours de préparation. Prévoir un affichage centré avec `background-size: cover`. |
| `turf-foreground.png` | Pelouse transparente à placer au bas de l'écran, au-dessus du fond, sous les boutons et le texte. La photo de stade contient aussi de l'herbe ; ce fichier permet de renforcer l'effet si nécessaire. |
| `challenge-transfert.svg` | Trajet entre deux points et flèche, sans blason de club. |
| `challenge-plus-ou-moins.svg` | Flèches et statistiques comparées. |
| `challenge-vrai-ou-faux.svg` | Validation verte et croix corail. |
| `challenge-qui-suis-je.svg` | Silhouette de joueur sous des projecteurs. |
| `challenge-le-match.svg` | Trophée, score et chronologie. |

## Versions web

Le site charge des copies allégées dans `assets/ui/web/` (WebP redimensionnés : environ 350 Ko au total contre 9 Mo pour les PNG). Les PNG d'origine restent la source : après une modification, régénérer la copie WebP correspondante. Les SVG de défis sont utilisés tels quels.

Les animaux existent en six versions, une par couleur d'équipe (`team-<animal>-<couleur>.webp`) : les reflets dorés prennent la couleur de l'équipe, les ombres une version foncée de cette couleur, le crème ne change pas ; la version « gold » garde le dessin d'origine. Après une modification d'un PNG d'animal, relancer `python3 tools/tint_team_logos.py`.

La police des titres de préparation, Oswald (licence SIL OFL), est hébergée dans `assets/fonts/`.

## Intégration

- Les images de défis sont des SVG transparents de format `420 × 120`. Les placer dans la partie droite des cartes, en préservant le nom du défi à gauche. Ce sont des illustrations, pas des éléments interactifs.
- Les animaux sont des PNG carrés transparents. Utiliser `object-fit: contain` et afficher un état sélectionné indépendant de l'image pour chaque choix.
- Le logo est un PNG transparent large. Préserver son ratio et fournir le nom « TACKLE » comme texte alternatif.
- Le fond doit garder une zone sombre derrière les textes. Ajouter si besoin un voile vert foncé pour assurer la lisibilité sur toutes les tailles de téléphone.
- Un défi sélectionné garde l'**encadré doré** de la planche ; la couleur ou l'illustration du défi ne doit pas devenir l'unique indicateur de sélection.
- Les chemins sont relatifs au site publié : `assets/ui/nom-du-fichier`. Ils peuvent être utilisés directement depuis `index.html` et GitHub Pages.

Ces assets donnent une direction graphique exploitable. Les écrans réels doivent rester adaptatifs et accessibles ; une planche n'est pas une capture à afficher telle quelle.

## Ouverture du Tackle

- `tackle-logo-red.png` : version rouge transparente du lettrage, pour le signal animé à 30 secondes.
- `kickoff-whistle.wav` : double sifflet bref au départ de chaque chrono de 30 secondes.
- `tackle-whistle.wav` : véritable coup de sifflet métallique, plus long et marqué, au même instant que le signal visuel d'ouverture du Tackle. Voir [`docs/UI_TACKLE_OPEN_ANIMATION.md`](../../docs/UI_TACKLE_OPEN_ANIMATION.md).

- Le site affiche `web/tackle-logo-red.webp` (720 px, environ 70 Ko) à la place du PNG d'origine.

- `kickoff-whistle-real-candidate.wav` : essai avec un véritable sifflet court pour le départ du chrono. À écouter et retravailler : le choix actuel `kickoff-whistle.wav` reste en place pour l'instant.

Les extraits réels sont issus de deux enregistrements CC0 : [strongbot, « metal whistle.wav »](https://freesound.org/people/strongbot/sounds/568995/) pour `tackle-whistle.wav`, et [Rosa-Orenes256, « Referee whistle sound.wav »](https://freesound.org/people/Rosa-Orenes256/sounds/538422/) pour l'essai de coup d'envoi. Les extraits ont été raccourcis, ramenés en mono et normalisés.

## Pack Transfert « mercato »

Le [dossier `mercato/`](mercato/README.md) contient les éléments de la carte Transfert en fichiers séparés et un [aperçu des états](mercato/preview.html). Il fournit le fond, la silhouette anonyme, les fiches, les liaisons et les révélations sans figer les noms ni les scores dans les images.

## Plus ou Moins : silhouettes du duel

- `pom-player-blue.png` : silhouette anonyme, tête et buste orientés vers la droite, liseré bleu cyan `#46C8FF`, PNG transparent 800 × 1000.
- `pom-player-coral.png` : silhouette anonyme assortie, orientée vers la gauche, liseré corail `#FF7C5E`, PNG transparent 800 × 1000.

Statut : **intégrées** (2026-09-29) dans la carte Plus ou Moins, via `web/pom-player-blue.webp` et `web/pom-player-coral.webp` (480 × 600, ~60 Ko chacune).

## Vrai ou Faux : pack « verdict d'arbitre »

Le [dossier `vrai-ou-faux/`](vrai-ou-faux/README.md) fournit le fond de stade, le cadre VAR, les deux fonds de réponse et l'icône de cagnotte séparément. La [planche](../../docs/ui/24-vrai-ou-faux-var-question.jpg) et l'[aperçu assemblé](vrai-ou-faux/preview.html) montrent leur usage dans la carte centrale.
