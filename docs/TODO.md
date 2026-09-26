# TODO.md

## À prototyper

- ✅ Un parcours sur un seul téléphone : créer 1 à 4 équipes, choisir 5/10/20 manches, sélectionner les mini-jeux, jouer, puis voir le classement. Implémenté dans `index.html`.
- ✅ Transfert : révélation chronologique, tentative ou passe, pénalité de −1, points dégressifs, carte à club unique, porteur de téléphone désigné, confirmation de la réponse saisie. Implémenté dans `index.html`.
- ✅ Lot de 112 cartes dans `src/data/transfert-cards.json`, dont **100 vérifiées** (chargées en jeu) et **12 encore à vérifier** (exclues du jeu tant qu'elles ne le sont pas).
- ⏳ Une vraie partie test à consigner ensuite dans `PLAYTESTS.md`.
- ⏳ Avant chaque vraie soirée test, revalider manuellement les cartes jouables dont un club porte « –présent ». Corriger et sourcer tout départ confirmé ; si la situation reste incertaine, remettre la carte « à vérifier » pour l'exclure du jeu.

## Arbitrages de game design à faire avant le déroulé complet

- Définir la procédure de correction et de signalement lorsqu'une réponse valable est refusée malgré les variantes vérifiées.
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
- Proposer un tirage aléatoire des cartes pour chaque équipe, avec répétition possible, et un moyen d'évaluer les répétitions pendant les tests.
