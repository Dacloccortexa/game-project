# Qui suis-je ? : pack « tableau tactique »

La [planche validée](../../../docs/ui/25-qui-suis-je-indice-3.jpg) montre l'intention. [`preview.html`](preview.html) assemble les éléments ci-dessous et permet de voir les cinq paliers. La maquette n'est pas une fiche de jeu à ajouter au contenu.

| Fichier | Usage |
| --- | --- |
| `tactics-board.jpg` | Tableau tactique vide, sans joueur, indice ni texte. |
| `title-ribbon.svg` | Bandeau papier vierge pour le titre en texte. |
| `mystery-plate.svg` | Plaque sombre et éclairée pour le `?` ou le nom révélé, sans portrait. |
| `clue-past.svg` | Papier crème pour un indice déjà révélé. |
| `clue-current.svg` | Papier doré et logement de points pour l'indice courant. |
| `clue-locked.svg` | Fiche sombre verrouillée pour un indice futur. |
| `qui-suis-je.css` et `preview.html` | Exemple de composition responsive de la carte centrale. |

## Intégration

- Garder le cadre commun TACKLE : en-tête, scores, équipe active, chrono, Tackle, saisie, bandeau de verdict et classement. Le pack habille **la carte propre à Qui suis-je ?**. Les boutons RÉPONDRE et PASSER de l'aperçu montrent la composition ; conserver les commandes communes de l'application, avec un état neutre pour PASSER.
- Rendre les **cinq emplacements** à hauteur stable. Les indices déjà révélés restent visibles ; seul l'indice courant prend le papier doré et affiche son palier (5, 4, 3, 2, 1). Les indices futurs restent cachés. Les libellés d'exemple ne doivent pas être intégrés comme questions.
- Utiliser la donnée vérifiée de chaque fiche, dans l'ordre fixe **club, titre gagné, poste, coéquipier, nationalité**. Un indice contient une seule information courte. Ne montrer aucun indice futur sous le verrou.
- Le grand `?` est un caractère HTML sur la plaque. Après une bonne réponse, afficher le nom réel **en texte** ; aucun portrait ni silhouette d'un joueur identifiable. Une mauvaise réponse enlève 1 point et passe à l'indice suivant ; PASSER n'a pas de pénalité. Le Tackle suit le palier courant, selon [`GAME_DESIGN.md`](../../../docs/GAME_DESIGN.md).
- Les fichiers graphiques n'incorporent ni texte de question ni score. Veiller au contraste et au retour à la ligne des noms longs ; les couleurs ne sont pas le seul indicateur d'état.

Depuis `index.html`, les chemins commencent par `assets/ui/qui-suis-je/`. Le CSS d'exemple utilise des chemins relatifs. Ne pas afficher la planche entière comme écran.
