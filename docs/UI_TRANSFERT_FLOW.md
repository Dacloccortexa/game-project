# Transfert — maquettes de l'écran de jeu

Référence visuelle pour l'intégration du défi Transfert dans l'ambiance stade de TACKLE. Les règles complètes et à jour figurent dans [`GAME_DESIGN.md`](GAME_DESIGN.md). Ces vues sont des maquettes, pas des écrans déjà intégrés à l'application.

## États à intégrer

| État | Maquette |
| --- | --- |
| Premier indice | [01-transfert-indice-1.png](ui/01-transfert-indice-1.png) |
| Deuxième indice | [02-transfert-indice-2.png](ui/02-transfert-indice-2.png) |
| Troisième indice | [03-transfert-indice-3.png](ui/03-transfert-indice-3.png) |
| Tackle : identifier l'équipe | [04-transfert-tackle-choix-equipe.png](ui/04-transfert-tackle-choix-equipe.png) |
| Tackle : saisir sa réponse | [05-transfert-tackle-reponse.png](ui/05-transfert-tackle-reponse.png) |
| Réponse active : saisir | [06-transfert-reponse-saisie.png](ui/06-transfert-reponse-saisie.png) |
| Réponse active : faire confirmer | [07-transfert-reponse-confirmation.png](ui/07-transfert-reponse-confirmation.png) |
| Bonne réponse : aperçu animé | [08-transfert-bonne-reponse.gif](ui/08-transfert-bonne-reponse.gif) |
| Mauvaise réponse : aperçu animé | [09-transfert-mauvaise-reponse.gif](ui/09-transfert-mauvaise-reponse.gif) |

## Comportement

- **Aucune mention du porteur du téléphone**. N'importe qui peut le manipuler, y compris l'équipe active ou un maître du jeu. L'écran indique seulement l'équipe active et, lors d'un Tackle, l'équipe adverse désignée.
- Les indices déjà révélés restent tous visibles, dans l'ordre de la carrière. Chaque ligne conserve la même hauteur ; seul le dernier indice a un encadré doré. Il faut maintenir cette lisibilité jusqu'au cinquième indice sans déplacer les lignes précédentes.
- L'équipe active peut répondre ou passer. Passer affiche directement l'indice suivant, sans pénalité, avec un palier de points plus faible. Nous conservons ce comportement pour le prochain test réel.
- À chaque nouvel indice, le Tackle est grisé pendant 30 secondes, puis actif 15 secondes après le sifflet. Après un Tackle annoncé, on choisit **la première équipe à l'avoir annoncé**, puis elle seule saisit une réponse. Le chrono est suspendu pendant le choix et la saisie.
- Quand l'équipe active répond, sa réponse saisie lui est montrée avant validation. Bonne réponse : gain du palier, révélation du joueur et fin de carte. Mauvaise réponse : **−1 point**, le joueur reste secret et l'indice suivant apparaît.
- En Tackle, réussite ou échec vaut respectivement **+ ou − le palier courant** et termine la carte. À l'indice 3 de l'exemple, l'enjeu est donc ±3 points.
- Les animations sont des aperçus de mouvement : dans le produit, jouer une fois le flash, afficher le delta, mettre à jour le score, puis passer à l'état suivant. Une mauvaise réponse ne révèle jamais le joueur avant la fin de la carte.

Les noms de clubs et les équipes affichés sont des exemples de composition. Utiliser les données vérifiées du jeu et les emblèmes fictifs TACKLE ; aucun blason de club dans les illustrations.
