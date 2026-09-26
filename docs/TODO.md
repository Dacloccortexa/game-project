# TODO.md

## À prototyper

- ✅ Un parcours sur un seul téléphone : créer 1 à 4 équipes, choisir 5/10/20 manches, sélectionner les mini-jeux, jouer, puis voir le classement. Implémenté dans `index.html`.
- ✅ Transfert : révélation chronologique, tentative ou passe, pénalité de −1, points dégressifs, carte à club unique, porteur de téléphone désigné, confirmation de la réponse saisie. Implémenté dans `index.html`.
- ✅ Premier lot de 25 cartes dans `src/data/transfert-cards.json`, dont **9 vérifiées** (chargées en jeu) et **16 encore à vérifier** (statut marqué par carte, exclues du jeu tant qu'elles ne le sont pas). Variété encore faible pour une vraie soirée — continuer la vérification pour élargir le pool jouable.
- ⏳ Une vraie partie test à consigner ensuite dans `PLAYTESTS.md`.

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
- Choisir comment gérer la péremption des cartes marquées « –présent » (un transfert réel peut rendre une carte fausse du jour au lendemain — vu avec Salah, parti de Liverpool à l'été 2026). Deux options à trancher : revalidation manuelle avant chaque vraie soirée test, ou date de péremption automatique par carte (le champ `verified_date` existe déjà dans le format).
