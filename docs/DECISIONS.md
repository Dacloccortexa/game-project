# DECISIONS.md

Journal des arbitrages, dans l'ordre chronologique inverse. Chaque entrée indique ce qui a été décidé et pourquoi.

## [2026-09-25] Tirer les cartes au hasard avec répétition possible
- Décision : chaque carte est tirée au hasard lorsqu'une équipe joue. Le même joueur et même la même carte peuvent revenir pendant une partie ; le nombre de passages de jeu n'impose pas autant de cartes uniques.
- Raison : une partie longue doit pouvoir fonctionner avec un stock de cartes plus petit, même si la variété du contenu reste importante pour le plaisir de jeu.
- Impact technique : ne pas bloquer une partie parce que le stock comporte moins de cartes que de passages prévus.

## [2026-09-25] Une manche est un tour complet
- Décision : à chaque manche, chaque équipe joue une carte tirée au hasard du mini-jeu sélectionné pour cette manche. Le nombre de manches choisi correspond donc au nombre de cartes jouées par équipe.
- Raison : garantir le même nombre d'occasions de jouer à chaque équipe, y compris lorsque 5 ou 10 manches ne se divisent pas par 3 ou 4 équipes.
- Impact technique : une partie de 20 manches à 4 équipes comprend 80 tirages, avec répétition possible ; la variété du contenu doit être évaluée lors des tests.

## [2026-09-25] Construire le prototype jeu par jeu
- Décision : commencer par un prototype jouable de Transfert, puis intégrer les autres mini-jeux un par un.
- Raison : tester une mécanique réelle avant d'étendre la plateforme.
- Impact technique : prévoir un socle de configuration de partie, de score et de classement auquel d'autres jeux pourront s'ajouter.

## [2026-09-25] Configurer la partie avant de jouer
- Décision : jouer d'abord sur un seul téléphone, avec 1 à 4 équipes, 5, 10 ou 20 manches, et une sélection de mini-jeux. Tous les jeux disponibles sont cochés par défaut ; au moins un doit rester sélectionné.
- Raison : permettre aussi bien une partie centrée sur un jeu qu'un mélange de jeux, tout en gardant l'usage actuel simple.
- Impact technique : la configuration et la composition des manches doivent fonctionner quand un seul mini-jeu est disponible. Le jeu à plusieurs téléphones reste une possibilité future, sans règle ni implémentation décidée à ce stade.

## [2026-09-25] Règles de Transfert et risque d'une tentative
- Décision : révéler jusqu'à cinq passages de clubs avec leurs années, dans l'ordre chronologique. Une équipe peut répondre une fois ou passer à chaque indice. Une bonne réponse vaut 5, 4, 3, 2 ou 1 point selon l'indice ; une mauvaise réponse retire 1 point et fait passer au suivant ; passer ne coûte rien. Pour un joueur à club unique, l'unique indice « club + années » vaut 5 points.
- Raison : récompenser une réponse précoce tout en pénalisant les tentatives hasardeuses, sans exclure les joueurs ayant connu un seul club.
- Impact technique : le score général peut diminuer et le résultat net d'une carte peut être négatif. Les prêts, retours et extraits de carrière doivent être présentés sans ambiguïté.

## [2026-09-25] Vérifier les contenus avant leur mise en jeu
- Décision : préparer plusieurs cartes, puis faire vérifier leurs faits par un agent avant intégration. La validation factuelle ne dépend pas d'une IA pendant la partie.
- Raison : une carrière ou une date erronée ferait perdre confiance dans le jeu.
- Impact technique : les cartes doivent pouvoir conserver leurs sources et leur statut de vérification.
