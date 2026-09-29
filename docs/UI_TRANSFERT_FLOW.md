# Transfert — maquettes de l'écran de jeu

Référence visuelle pour l'intégration du défi Transfert dans l'ambiance stade de TACKLE. Les règles complètes et à jour figurent dans [`GAME_DESIGN.md`](GAME_DESIGN.md). Statut : **intégré dans `index.html`** (2026-09-29), à vérifier sur un vrai téléphone. L'en-tête (Quitter, logo, manche, scores de toutes les équipes, titre du défi), la bande « Priorité aux … » et le bouton Tackle sont communs aux cinq défis ; les quatre autres défis gardent leur carte actuelle en attendant leurs maquettes. « Quitter » demande confirmation puis revient à « Créer une partie » ; le menu ≡ des maquettes n'est pas affiché tant qu'il n'a pas de contenu défini.

## Identité de Transfert : le mercato — nouvelle référence à intégrer

La première proposition de carte géographique et de parcours doré (planches 18 à 20) est **remplacée** par les planches ci-dessous. Transfert doit avoir une identité aussi immédiate que le duel bleu/corail de Plus ou Moins : **bandeau de mercato orange, grands chevrons, maillot du joueur mystère et fiches de clubs reliées par des flèches**. Le cadre commun de TACKLE (stade, logo, manche, scores de toutes les équipes, chrono et bouton Tackle) ne change pas.

| État | Nouvelle planche de référence |
| --- | --- |
| Indice 3 : joueur encore mystérieux | [21-transfert-mercato-question.jpg](ui/21-transfert-mercato-question.jpg) |
| Bonne réponse : joueur révélé | [22-transfert-mercato-bonne-reponse.jpg](ui/22-transfert-mercato-bonne-reponse.jpg) |
| Mauvaise réponse : joueur toujours caché | [23-transfert-mercato-mauvaise-reponse.jpg](ui/23-transfert-mercato-mauvaise-reponse.jpg) |

- Les clubs déjà révélés restent visibles et le plus récent est mis en avant. Aucun blason de club. La silhouette et les maillots sont **génériques** ; ne pas produire un portrait réel de joueur pour chaque carte. La bonne réponse affiche le **nom vérifié en texte**, sur la même silhouette.
- Ne pas afficher d'emplacements vides pour d'éventuels clubs futurs. Une carte à un seul club doit rester naturelle. La composition s'adapte de 1 à 5 clubs sans révéler à l'avance combien d'indices restent.
- Les valeurs de l'exemple sont fictives pour les scores mais cohérentes avec l'exemple de carte : à l'indice 3, une bonne réponse révèle Zlatan Ibrahimović et ajoute 3 points (12 → 15) ; une mauvaise réponse retire 1 point (12 → 11), **ne dévoile pas le joueur**, puis lance l'indice suivant à 2 points.
- Utiliser le vert punchy et la coche pour la réussite, le rouge et la croix pour l'erreur, comme dans [UI_REVEALS.md](UI_REVEALS.md) et Plus ou Moins. Le retour ne doit pas effacer l'univers mercato ; il apparaît dessus et ne joue qu'une fois.
- Les planches sont des références de composition. Dans l'application, construire les textes, fiches et commandes en éléments adaptatifs, avec contraste et zones tactiles suffisants ; ne pas afficher l'image entière comme écran.

Les anciennes maquettes ci-dessous restent utiles pour la **saisie**, la **confirmation** et le **choix de l'équipe tackleur**. Les nouvelles planches ci-dessus font foi pour le style de la carte et des révélations. La logique des points reste celle de [GAME_DESIGN.md](GAME_DESIGN.md).

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
