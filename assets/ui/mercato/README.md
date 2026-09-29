# Transfert : pack graphique « mercato »

Ces éléments séparés servent à intégrer l'identité visuelle de **Transfert**. Les [planches de référence](../../../docs/UI_TRANSFERT_FLOW.md) montrent la composition et les états attendus ; [`preview.html`](preview.html) montre comment assembler les pièces. L'aperçu est un exemple visuel, pas une carte à ajouter au jeu.

| Fichier | Rôle |
| --- | --- |
| `mercato-background.jpg` | Fond de stade sombre aux lumières orange, sans texte. |
| `mystery-player.webp` | Silhouette transparente d'un joueur **entièrement anonyme** : aucun visage, numéro, blason ou signe distinctif. |
| `transfer-banner.svg` | Bandeau oblique à chevrons ; écrire « TRANSFERT » par-dessus en vrai texte. |
| `club-ticket.svg` | Fiche neutre pour un club déjà révélé. |
| `club-ticket-active.svg` | Variante orange pour le dernier club révélé. |
| `route-connector.svg` | Liaison entre deux fiches ; l'afficher seulement entre les clubs visibles. |
| `reveal-good.svg` et `reveal-bad.svg` | Supports graphiques pour les révélations verte et rouge, sans texte figé. |
| `mercato.css` | Exemple de mise en page adaptative avec ces éléments. |
| `preview.html` | Démonstration autonome des trois états : question, réussite, erreur. |

## Intégration

- Garder l'en-tête, les scores de toutes les équipes, le chrono, les commandes et le Tackle déjà présents dans l'application. Le pack habille **la carte centrale de Transfert**.
- Construire les noms de clubs, années, numéro d'indice, palier, réponse et delta de score avec les données et éléments HTML de l'application. Ces textes ne sont pas inclus dans les images.
- Afficher uniquement les clubs déjà révélés, de **1 à 5** ; le plus récent utilise `club-ticket-active.svg`. Ne pas réserver de cases vides pour les indices futurs.
- Conserver `mystery-player.webp` sur tous les états. En cas de réussite, afficher le nom vérifié **en texte**, sans portrait de joueur réel. En cas d'erreur, garder l'identité cachée et poursuivre selon les règles du jeu.
- Garder les panneaux de verdict et leurs animations déjà communs aux défis. `reveal-good.svg` et `reveal-bad.svg` illustrent la direction graphique dans l'aperçu ; leur usage dans la carte ne doit pas remplacer les panneaux communs. Les points viennent de la logique du jeu, jamais de l'aperçu.
- Conserver des libellés accessibles, un contraste lisible et le mouvement réduit lorsque le téléphone le demande.

Dans `index.html`, les chemins commencent par `assets/ui/mercato/`. Le CSS utilise des chemins relatifs aux images de ce dossier. Ne pas utiliser la planche entière comme fond d'écran : cela figerait le texte, les scores et le nombre de clubs.
