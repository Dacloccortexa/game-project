# TODO.md

## À prototyper

- ✅ Un parcours sur un seul téléphone : créer 1 à 4 équipes, choisir 5/10/20 manches, sélectionner les mini-jeux, jouer, puis voir le classement. Implémenté dans `index.html`.
- ✅ Transfert : révélation chronologique, tentative ou passe, pénalité de −1, points dégressifs, carte à club unique, porteur de téléphone désigné, confirmation de la réponse saisie. Implémenté dans `index.html`.
- ✅ Lot de 112 cartes dans `src/data/transfert-cards.json`, dont **100 vérifiées** (chargées en jeu) et **12 encore à vérifier** (exclues du jeu tant qu'elles ne le sont pas).
- ⏳ Une vraie partie test à consigner ensuite dans `PLAYTESTS.md`.
- ⏳ Avant chaque vraie soirée test, revalider manuellement les cartes jouables dont un club porte « –présent ». Corriger et sourcer tout départ confirmé ; si la situation reste incertaine, remettre la carte « à vérifier » pour l'exclure du jeu.
- ⏳ Plus ou Moins : définir pour chacune des quatre catégories le périmètre exact du chiffre, une source de référence et une date d'arrêté ; préparer **50 entrées joueur + valeur + source + date de vérification par catégorie** (200 entrées statistiques au total).
- ⏳ À partir de cette base, composer et tester des chaînes de six joueurs : cinq comparaisons au maximum, aucune égalité entre voisins, écarts intéressants et directions PLUS/MOINS variées. Intégrer le mini-jeu après Transfert.

## Arbitrages de game design à faire avant le déroulé complet

- Définir la procédure de correction et de signalement lorsqu'une réponse valable est refusée malgré les variantes vérifiées.
- Fixer les critères de sélection et de difficulté des cartes Transfert, y compris le traitement des carrières de plus de cinq passages.
- Définir les règles des mini-jeux qui suivront Plus ou Moins, chacun avec ses réponses valables, son déroulé et son score, avant leur intégration.
- Tackle : préciser ce qu'il advient de la carte interrompue (l'équipe active reprend où elle en était, ou la carte s'arrête définitivement).
- Tackle : décider si l'équipe qui tient le téléphone (et voit donc déjà les indices révélés sur Transfert) a le droit de tackler, vu l'avantage d'information que ça lui donnerait.
- Tackle : définir précisément son fonctionnement sur Plus ou Moins, où il n'y a pas de « réponse finale » unique à proposer en cours de chaîne.

## Zones où Claude peut décider librement

- Architecture, langage, framework, stockage et organisation du code nécessaires au prototype.
- Détails purement techniques qui respectent les règles validées dans `GAME_DESIGN.md`.

## Zones nécessitant validation de David avant modification

- Règles, points, pénalités, difficulté, participation des équipes, nombre de manches et sélection des jeux.
- Toute modification du périmètre ou de l'expérience de jeu.

## Questions techniques en attente

- Proposer un format de carte qui conserve clubs, années, prêts/retours, réponse attendue, variantes acceptées, sources et statut de vérification.
- Proposer un tirage aléatoire des cartes pour chaque équipe, avec répétition possible, et un moyen d'évaluer les répétitions pendant les tests.
- Clarifier dans l'interface, une fois plusieurs mini-jeux en place, quand le Tackle est disponible ou non selon le mini-jeu en cours de manche (actuellement silencieux : le bouton n'apparaît juste pas sur les jeux qui ne le supportent pas encore). À traiter une fois qu'on a plusieurs mini-jeux, pas urgent avec seulement deux.
