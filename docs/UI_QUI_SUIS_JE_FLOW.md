# Qui suis-je ? — identité « tableau tactique »

La [planche d'indice 3](ui/25-qui-suis-je-indice-3.jpg) est la référence visuelle validée. Le [pack d'éléments séparés](../assets/ui/qui-suis-je/README.md) contient le tableau, les fiches et le bandeau ; son [aperçu assemblé](../assets/ui/qui-suis-je/preview.html) montre les cinq paliers.

Le centre du défi évoque le tableau tactique et la fiche d'un recruteur : un joueur mystère représenté par **`?`**, puis cinq fiches. Les fiches passées restent visibles, la fiche courante est dorée avec sa valeur, les suivantes sont verrouillées sans révéler leur contenu. Aucun portrait, blason ou numéro de joueur n'est nécessaire.

Les indices gardent toujours le même ordre : **club (5 pts), compétition gagnée (4), poste (3), coéquipier (2), nationalité (1)**. Une fiche contient une seule information courte. L'exemple de la planche ne doit pas être repris comme contenu du jeu ; utiliser les fiches vérifiées de [`QUI_SUIS_JE_100_FICHES.md`](QUI_SUIS_JE_100_FICHES.md) et les données du jeu.

L'en-tête, les scores de toutes les équipes, le chrono, le bouton Tackle, la saisie et le verdict restent **communs aux cinq défis**. La carte change seulement l'identité du centre. RÉPONDRE et PASSER gardent leur comportement : bonne réponse = palier et fin de carte ; mauvaise réponse = −1 point et indice suivant ; PASSER = indice suivant sans pénalité. Après le dernier indice, révéler le joueur. Le Tackle reste disponible selon la fenêtre commune 30 + 15 secondes et vaut ± le palier courant pour une équipe adverse. Les règles complètes figurent dans [`GAME_DESIGN.md`](GAME_DESIGN.md).

La plaque du joueur mystère peut accueillir le nom en texte au moment de la révélation, sans portrait. Les animations et couleurs du verdict suivent [`UI_REVEALS.md`](UI_REVEALS.md), sans créer une révélation séparée pour ce défi.
