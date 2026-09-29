# Transfert — maquettes de l'écran de jeu

Référence visuelle pour l'intégration du défi Transfert dans l'ambiance stade de TACKLE. Les règles complètes et à jour figurent dans [`GAME_DESIGN.md`](GAME_DESIGN.md). Statut : **intégré dans `index.html`** (2026-09-29), à vérifier sur un vrai téléphone. L'en-tête (Quitter, logo, manche, scores de toutes les équipes, titre du défi), la bande « Priorité aux … » et le bouton Tackle sont communs aux cinq défis ; les quatre autres défis gardent leur carte actuelle en attendant leurs maquettes. « Quitter » demande confirmation puis revient à « Créer une partie » ; le menu ≡ des maquettes n'est pas affiché tant qu'il n'a pas de contenu défini.

## Nouvelle identité visuelle de Transfert — à intégrer

Ces trois planches complètent le parcours déjà intégré. Elles remplacent **la direction visuelle** de l'ancienne carte à clubs et des anciens retours bonne/mauvaise réponse ; les maquettes de saisie, confirmation et Tackle ci-dessous restent des références fonctionnelles. Les règles et les scores ne changent pas.

| État | Nouvelle planche |
| --- | --- |
| Indice 3 : parcours de clubs | [18-transfert-parcours.jpg](ui/18-transfert-parcours.jpg) |
| Bonne réponse : joueur révélé | [19-transfert-bonne-reponse.jpg](ui/19-transfert-bonne-reponse.jpg) |
| Mauvaise réponse : joueur caché | [20-transfert-mauvaise-reponse.jpg](ui/20-transfert-mauvaise-reponse.jpg) |

L'identité Transfert repose sur **un itinéraire doré entre les clubs et leurs années**, dans une carte vert profond. Les arrêts précédents restent visibles et le nouvel arrêt s'allume. La carte géographique de la planche est décorative : ne pas prétendre localiser précisément les clubs ou tracer leurs déplacements réels. Si elle ne reste pas fiable et lisible sur petit écran, préférer un tracé abstrait entre arrêts. Aucun blason de club.

Le bandeau des équipes, le logo, le chrono et le bouton Tackle conservent leur emplacement commun aux cinq défis. Les trois planches montrent le même indice et les mêmes scores avant résultat. La réussite vaut **+3** et affiche le joueur ; l'erreur vaut **−1**, ne révèle pas le joueur et enchaîne vers l'indice suivant. Les retours utilisent le même langage énergique que Plus ou Moins : grand signal vert et coche pour une réussite, grand signal rouge et croix pour une erreur. Voir [UI_REVEALS.md](UI_REVEALS.md) pour la logique commune des révélations.

## États à intégrer

| État | Maquette |
| --- | --- |
| Premier indice | [01-transfert-indice-1.png](ui/01-transfert-indice-1.png) |
| Deuxième indice | [02-transfert-indice-2.png](ui/02-transfert-indice-2.png) |
| Troisième indice | [03-transfert-indice-3.png](ui/03-transfert-indice-3.png) |
| Quatre équipes : tous les scores visibles | [10-transfert-4-equipes.png](ui/10-transfert-4-equipes.png) |
| Tackle : identifier l'équipe | [04-transfert-tackle-choix-equipe.png](ui/04-transfert-tackle-choix-equipe.png) |
| Tackle : saisir sa réponse | [05-transfert-tackle-reponse.png](ui/05-transfert-tackle-reponse.png) |
| Réponse active : saisir | [06-transfert-reponse-saisie.png](ui/06-transfert-reponse-saisie.png) |
| Réponse active : faire confirmer | [07-transfert-reponse-confirmation.png](ui/07-transfert-reponse-confirmation.png) |
| Bonne réponse : aperçu animé | [08-transfert-bonne-reponse.gif](ui/08-transfert-bonne-reponse.gif) |
| Mauvaise réponse : aperçu animé | [09-transfert-mauvaise-reponse.gif](ui/09-transfert-mauvaise-reponse.gif) |

## Comportement

- Le haut de l'écran montre **les scores de toutes les équipes**, pas seulement de l'équipe active. Son encadré est doré. Avec trois équipes, les scores tiennent sur une ligne ; avec quatre, ils sont disposés sur deux lignes. Les scores négatifs restent visibles. Les noms longs doivent être abrégés sans cacher les points. Les scores se mettent à jour dès le résultat, y compris après un Tackle.
- **Aucune mention du porteur du téléphone**. N'importe qui peut le manipuler, y compris l'équipe active ou un maître du jeu. L'écran indique seulement l'équipe active et, lors d'un Tackle, l'équipe adverse désignée.
- Les indices déjà révélés restent tous visibles, dans l'ordre de la carrière. Chaque ligne conserve la même hauteur ; seul le dernier indice a un encadré doré. Il faut maintenir cette lisibilité jusqu'au cinquième indice sans déplacer les lignes précédentes.
- L'équipe active peut répondre ou passer. Passer affiche directement l'indice suivant, sans pénalité, avec un palier de points plus faible. Nous conservons ce comportement pour le prochain test réel.
- À chaque nouvel indice, le Tackle est grisé pendant 30 secondes, puis actif 15 secondes après le sifflet. Après un Tackle annoncé, on choisit **la première équipe à l'avoir annoncé**, puis elle seule saisit une réponse. Le chrono est suspendu pendant le choix et la saisie.
- Quand l'équipe active répond, sa réponse saisie lui est montrée avant validation. Bonne réponse : gain du palier, révélation du joueur et fin de carte. Mauvaise réponse : **−1 point**, le joueur reste secret et l'indice suivant apparaît.
- En Tackle, réussite ou échec vaut respectivement **+ ou − le palier courant** et termine la carte. À l'indice 3 de l'exemple, l'enjeu est donc ±3 points.
- Les animations sont des aperçus de mouvement : dans le produit, jouer une fois le flash, afficher le delta, mettre à jour le score, puis passer à l'état suivant. Une mauvaise réponse ne révèle jamais le joueur avant la fin de la carte.

Les noms de clubs et les équipes affichés sont des exemples de composition. Utiliser les données vérifiées du jeu et les emblèmes fictifs TACKLE ; aucun blason de club dans les illustrations.
