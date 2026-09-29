# Plus ou Moins — première comparaison et bonne réponse

Références visuelles pour le défi Plus ou Moins, dans l'ambiance stade de TACKLE. Les règles et les autres états restent définis par [GAME_DESIGN.md](GAME_DESIGN.md).

| État | Planche |
| --- | --- |
| Comparaison avant la réponse | [16-plus-ou-moins-comparaison.jpg](ui/16-plus-ou-moins-comparaison.jpg) |
| Bonne réponse, avant le choix | [17-plus-ou-moins-bonne-reponse.jpg](ui/17-plus-ou-moins-bonne-reponse.jpg) |

## Identité du défi

Garder le cadre commun de Transfert : stade de nuit, logo doré, manche, scores de **toutes** les équipes avec leurs emblèmes, équipe active, chrono et bouton Tackle. Le centre doit cependant se reconnaître immédiatement comme **Plus ou Moins** : duel de deux joueurs, statistique de référence bien visible, valeur adverse cachée, bleu/cyan face au corail, barres statistiques et deux grandes réponses PLUS/MOINS. La couleur n'est pas le seul repère : titre, nombres, flèches et composition en duel portent aussi l'identité. Ne pas afficher de blasons de clubs.

Les silhouettes servent à exprimer le duel ; elles ne représentent pas nécessairement les joueurs nommés. Les noms, valeurs et scores des planches sont des exemples de composition. En jeu, utiliser la catégorie et les données vérifiées de la carte. La planche de bonne réponse omet les petits emblèmes dans le bandeau de score ; **l'application doit les conserver** comme sur Transfert et sur la planche de comparaison.

## Déroulé des deux états

- La catégorie (par exemple « Buts en Premier League ») et le numéro de comparaison (1 à 5) sont lisibles avant de répondre. La valeur du joueur de référence est affichée ; celle du suivant reste cachée.
- L'équipe active choisit PLUS ou MOINS. Le bouton Tackle commun est grisé pendant les 30 secondes de priorité, puis utilisable pendant les 15 secondes suivantes si l'équipe active n'a pas répondu. Avec une seule équipe, il reste grisé. Le chrono repart à chaque nouvelle comparaison.
- Dès que l'équipe active répond, verrouiller son choix, arrêter le chrono, fermer le Tackle et révéler la valeur immédiatement.
- Après une bonne réponse, montrer brièvement le retour vert **punchy « BONNE RÉPONSE »** de la planche, puis laisser visibles la valeur révélée et la **cagnotte potentielle**. Le score total en haut ne change pas encore. Afficher ENCAISSER et CONTINUER ; ces actions ne sont pas tacklables.
- ENCAISSER ajoute la cagnotte au score et termine la carte. CONTINUER fait du joueur révélé la nouvelle référence et affiche la comparaison suivante. Après la cinquième réussite, encaisser automatiquement 5 points.
- Une mauvaise réponse termine la carte avec 0 point gagné sur cette carte et efface la cagnotte potentielle. Les règles du Tackle et de l'expiration à 45 secondes suivent [GAME_DESIGN.md](GAME_DESIGN.md), y compris le forfait de ±3 points pour le tackleur.

L'illustration est une référence de mise en page, pas une image à afficher telle quelle dans l'application. Adapter la composition aux petits téléphones et aux noms longs. Le traitement sonore du sifflet est décrit dans [UI_TACKLE_OPEN_ANIMATION.md](UI_TACKLE_OPEN_ANIMATION.md).
