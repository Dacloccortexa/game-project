# TODO.md

## À prototyper

- ✅ Un parcours sur un seul téléphone : créer 1 à 4 équipes, choisir 5/10/20 manches, sélectionner les mini-jeux, jouer, puis voir le classement. Implémenté dans `index.html`.
- ✅ Transfert : révélation chronologique, tentative ou passe, pénalité de −1, points dégressifs, carte à club unique, porteur de téléphone désigné, confirmation de la réponse saisie. Implémenté dans `index.html`.
- ✅ Lot de 112 cartes dans `src/data/transfert-cards.json`, dont **100 vérifiées** (chargées en jeu) et **12 encore à vérifier** (exclues du jeu tant qu'elles ne le sont pas).
- ⏳ Une vraie partie test à consigner ensuite dans `PLAYTESTS.md`.
- ⏳ Avant chaque vraie soirée test, revalider manuellement les cartes jouables dont un club porte « –présent ». Corriger et sourcer tout départ confirmé ; si la situation reste incertaine, remettre la carte « à vérifier » pour l'exclure du jeu.
- ✅ Plus ou Moins : sept catégories intégrées et jouables, **50 entrées joueur + valeur chacune** (350 entrées au total) : buts en Premier League, Ligue des champions, Coupe du monde, Liga, Serie A et Ligue 1, ainsi que sélections nationales. Les six nouveaux lots indiquent la source et la date de vérification pour chaque entrée.
- ⏳ Plus ou Moins : revalider périodiquement les chiffres des joueurs encore actifs et relire les lots avant une soirée test ; les classements ont des dates d'arrêté différentes, indiquées dans chaque fichier.
- ⏳ À partir de cette base, composer et tester des chaînes de six joueurs : cinq comparaisons au maximum, aucune égalité entre voisins, écarts intéressants et directions PLUS/MOINS variées.
- ✅ Vrai ou Faux (remplace Le Faux) : jeu de données de 2 000 affirmations intégré (`src/data/vraifaux-statements.json`, toutes vérifiées) et mini-jeu implémenté dans `index.html` (5 affirmations, cagnotte 1→5, ENCAISSER/CONTINUER, Tackle déclenché par la réponse de l'équipe active). Voir DECISIONS.md du 2026-09-27.
- ⏳ Relecture éditoriale du jeu de données Vrai ou Faux avant une vraie soirée test (recommandée par sa propre note de contrôle, pas encore faite — seul un contrôle automatique de cohérence a été effectué).
- ⏳ Qui suis-je ? : préparer des cartes sourcées avec **un joueur et cinq indices courts dans l'ordre fixe club → titre gagné → poste → coéquipier → nationalité** ; vérifier pour chaque carte la progression réelle de la difficulté et les variantes de réponse acceptées.
- ⏳ Qui suis-je ? : implémenter une carte par équipe active, réponse ou passe à chaque indice, puis le buzzer de Transfert (12 secondes, sifflet, première équipe adverse à répondre, +5/−5 et fin de carte). Jeu non encore intégré.

## Arbitrages de game design à faire avant le déroulé complet

- Définir la procédure de correction et de signalement lorsqu'une réponse valable est refusée malgré les variantes vérifiées.
- Fixer les critères de sélection et de difficulté des cartes Transfert, y compris le traitement des carrières de plus de cinq passages.
- Définir les règles des mini-jeux qui suivront Plus ou Moins, chacun avec ses réponses valables, son déroulé et son score, avant leur intégration.
- Qui suis-je ? : éprouver en playtest le délai de 12 secondes repris de Transfert et la difficulté réelle des cinq indices.
- ✅ Tackle sur Transfert : tranché (délai + sifflet, la carte s'arrête toujours après une tentative de Tackle). Voir DECISIONS.md du 2026-09-26.
- ✅ Tackle sur le futur Vrai ou Faux : tranché (déclenché par la réponse de l'équipe active, avant révélation ; le tour actif continue normalement si le Tackle échoue). Voir DECISIONS.md du 2026-09-27.
- Tackle : décider si l'équipe qui tient le téléphone (et voit donc déjà les indices révélés sur Transfert) a le droit de tackler, vu l'avantage d'information que ça lui donnerait.
- ⏳ Tackle sur Plus ou Moins : implémenter la réponse verrouillée suivie d'une fenêtre « Tackle ou révélation », avant d'afficher la valeur. Le premier adversaire à tackler reçoit +5 si la réponse active est fausse, sinon −5 ; le score général peut passer sous zéro. Voir GAME_DESIGN.md et la décision du 2026-09-27.

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
