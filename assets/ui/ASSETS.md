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

## Intégration

- Les images de défis sont des SVG transparents de format `420 × 120`. Les placer dans la partie droite des cartes, en préservant le nom du défi à gauche. Ce sont des illustrations, pas des éléments interactifs.
- Les animaux sont des PNG carrés transparents. Utiliser `object-fit: contain` et afficher un état sélectionné indépendant de l'image pour chaque choix.
- Le logo est un PNG transparent large. Préserver son ratio et fournir le nom « TACKLE » comme texte alternatif.
- Le fond doit garder une zone sombre derrière les textes. Ajouter si besoin un voile vert foncé pour assurer la lisibilité sur toutes les tailles de téléphone.
- Un défi sélectionné garde l'**encadré doré** de la planche ; la couleur ou l'illustration du défi ne doit pas devenir l'unique indicateur de sélection.
- Les chemins sont relatifs au site publié : `assets/ui/nom-du-fichier`. Ils peuvent être utilisés directement depuis `index.html` et GitHub Pages.

Ces assets donnent une direction graphique exploitable. Les écrans réels doivent rester adaptatifs et accessibles ; une planche n'est pas une capture à afficher telle quelle.
