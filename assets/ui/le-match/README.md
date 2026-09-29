# Le Match : pack « tableau d'affichage »

La [planche validée](../../../docs/ui/26-le-match-evenement-3.jpg) montre l'intention. [`preview.html`](preview.html) assemble les éléments séparés et permet de voir les cinq événements. Les faits de l'aperçu ne sont pas des cartes à ajouter au jeu.

| Fichier | Usage |
| --- | --- |
| `scoreboard-background.jpg` | Tableau de stade bleu nuit, vide de tout score et événement. |
| `title-plate.svg` | Plaque métallique vierge pour le titre en texte. |
| `event-past.svg` | Rangée d'événement déjà révélé. |
| `event-current.svg` | Rangée éclairée avec logement pour le palier courant. |
| `event-locked.svg` | Rangée future cachée, avec cadenas. |
| `event-ball.svg` | Icône facultative pour un but ou un penalty ; ne pas l'utiliser pour tous les types d'événements. |
| `le-match.css` et `preview.html` | Exemple de composition responsive de la carte centrale. |

## Intégration

- Conserver l'en-tête, les scores des équipes, le chrono, le bouton Tackle, la saisie et le verdict communs aux défis. Le pack habille **la carte Le Match seulement**. Les boutons de l'aperçu illustrent l'emplacement de RÉPONDRE et PASSER ; conserver les commandes de l'application, avec PASSER neutre.
- Afficher la **compétition seule**, sans année ni édition. Ne pas afficher de logo, de drapeau, de maillot ou de score du match avant la révélation des deux équipes. `? VS ?` est du texte, pas une image.
- Rendre cinq rangées dans **l'ordre chronologique des événements vérifiés**. Les événements déjà révélés restent visibles ; l'actuel est éclairé avec sa minute et son palier (5, 4, 3, 2, 1), les suivants cachés. Les paliers décroissent même si la chronologie ne correspond pas à une difficulté croissante.
- Le type d'icône doit correspondre au fait : `event-ball.svg` est un exemple pour un but ou penalty, et une icône générique ou du texte suffit pour les autres événements. Les minutes et descriptions sont toujours produites par les données du jeu, jamais par l'image.
- Bonne réponse de l'équipe active : les deux équipes sont trouvées, palier attribué, carte terminée. Mauvaise réponse : −1 point puis événement suivant. PASSER n'a pas de pénalité. Une équipe adverse qui gagne le Tackle donne les deux équipes pour ± le palier courant ; son essai termine la carte. Les détails sont dans [`GAME_DESIGN.md`](../../../docs/GAME_DESIGN.md).
- Veiller au retour à la ligne des descriptions longues et à la lisibilité des minutes additionnelles (par exemple `90+2′`). Les rangées doivent rester tactiles/visibles selon l'état.

Les chemins depuis `index.html` commencent par `assets/ui/le-match/`. Le CSS d'exemple utilise des chemins relatifs. La planche entière est une référence, pas un fond à afficher tel quel.
