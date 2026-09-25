# TODO.md

## À prototyper

- Un parcours sur un seul téléphone : créer 1 à 4 équipes, choisir 5/10/20 manches, sélectionner les mini-jeux (tous cochés par défaut, au moins un), jouer, puis voir le classement.
- Transfert seulement pour le premier prototype : révélation chronologique des clubs et années, tentative ou passe, pénalité de −1, points dégressifs, carte à club unique.
- Un lot suffisant de cartes Transfert vérifiées pour tester les durées proposées sans répéter une carte dans une partie.
- Une vraie partie test à consigner ensuite dans `PLAYTESTS.md`.

## Arbitrages de game design à faire avant le déroulé complet

- Définir précisément ce qu'est **une manche** avec plusieurs équipes : une carte par équipe ou une autre répartition assurant des occasions de jouer comparables, y compris avec 5 manches et 3 ou 4 équipes.
- Définir la rotation de l'équipe qui tient le téléphone lorsqu'il y a 3 ou 4 équipes.
- Définir les noms et écritures acceptés pour une réponse, ainsi que la procédure lorsqu'une bonne réponse semble refusée.
- Fixer les critères de sélection et de difficulté des cartes Transfert, y compris le traitement des carrières de plus de cinq passages.
- Définir les règles des autres mini-jeux, chacun avec ses réponses valables, son déroulé et son score, avant leur intégration.

## Zones où Claude peut décider librement

- Architecture, langage, framework, stockage et organisation du code nécessaires au prototype.
- Détails purement techniques qui respectent les règles validées dans `GAME_DESIGN.md`.

## Zones nécessitant validation de David avant modification

- Règles, points, pénalités, difficulté, participation des équipes, nombre de manches et sélection des jeux.
- Toute modification du périmètre ou de l'expérience de jeu.

## Questions techniques en attente

- Proposer un format de carte qui conserve clubs, années, prêts/retours, réponse attendue, variantes acceptées, sources et statut de vérification.
- Proposer la manière de gérer le contenu disponible pour les parties de 5, 10 ou 20 manches sans répétition.
