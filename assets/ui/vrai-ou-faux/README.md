# Vrai ou Faux : pack « verdict d'arbitre »

La [planche validée](../../../docs/ui/24-vrai-ou-faux-var-question.jpg) montre la direction graphique. [`preview.html`](preview.html) assemble les éléments séparés ci-dessous pour **la carte centrale uniquement**. Les règles et les points sont dans [`GAME_DESIGN.md`](../../../docs/GAME_DESIGN.md).

| Fichier | Usage |
| --- | --- |
| `var-stadium-panel.jpg` | Fond sombre de stade et de pelouse, sans texte ni joueur. |
| `var-frame.svg` | Cadre de l'écran de décision, transparent. |
| `choice-true.svg` | Fond de réponse vert avec coche, sans mot incrusté. |
| `choice-false.svg` | Fond de réponse rouge corail avec croix, sans mot incrusté. |
| `bank-coin.svg` | Icône neutre de cagnotte. |
| `vrai-ou-faux.css` et `preview.html` | Exemple de composition adaptable ; aucun fait de l'aperçu ne doit être ajouté comme donnée du jeu. |

## Intégration

- Conserver le cadre commun TACKLE déjà en place : en-tête, scores de toutes les équipes, équipe active, chrono, bouton Tackle, panneaux de verdict et animations. Seule la **carte de Vrai ou Faux** prend ce décor.
- Écrire en HTML les textes `VAR`, `VRAI OU FAUX`, le numéro d'affirmation, l'affirmation réelle, la cagnotte et les boutons `VRAI` / `FAUX`. Les images n'incluent aucun de ces textes.
- Afficher une affirmation à la fois. Le choix est verrouillé dès l'appui ; la réponse se révèle immédiatement selon les règles communes. Après une bonne réponse, proposer ENCAISSER / CONTINUER avec le composant existant. Les fonds vert et corail servent aux **choix**, jamais à désigner la bonne réponse avant le clic.
- Ne pas ajouter d'élément VAR qui laisserait croire que l'utilisateur doit voir une vidéo : le mot indique seulement l'ambiance « décision d'arbitre ».
- Adapter la hauteur de l'affirmation aux phrases longues, préserver deux zones tactiles lisibles et garder la cagnotte potentielle distincte du score déjà acquis.

Les chemins depuis `index.html` commencent par `assets/ui/vrai-ou-faux/`. Le CSS de démonstration référence ses images par chemins relatifs. La planche entière est une référence visuelle, pas un fond à afficher tel quel.
