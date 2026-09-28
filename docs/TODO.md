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
- ✅ Qui suis-je ? : mini-jeu implémenté dans `index.html` avec le buzzer de Transfert (12 secondes, sifflet, première équipe adverse à répondre, +5/−5, fin de carte).
- ✅ Qui suis-je ? : **100 fiches sourcées** intégrées (`src/data/quisuisje-cards.json`, chargées via `loadQsjCards()`), remplaçant les 4 fiches de test. Case cochée par défaut comme les autres mini-jeux. Vérifié : chargement, réponse fausse (−1, carte continue), rendu de 15 cartes tirées au hasard.
- ⏳ Qui suis-je ? : faire une relecture éditoriale et un playtest de la difficulté réelle des indices avant une vraie soirée test (statut du lot : « fiches sourcées, difficulté à éprouver en partie »).
- ✅ Le Match : mini-jeu implémenté dans `index.html` (compétition affichée sans édition, cinq événements chronologiques à 5/4/3/2/1 points, réponse des deux équipes acceptée dans n'importe quel ordre, mauvaise réponse −1 + continue, passe sans pénalité, Tackle par vol de réponse relancé à chaque événement). **103 fiches sourcées** remplacent les 3 cartes de test dans `src/data/lematch-cards.json` : 53 finales/demi-finales officielles de Coupe du monde (1954–2026) et 50 finales européennes (1977–2026). La liste de relecture et les sources figurent dans `docs/LE_MATCH_CARDS_REVIEW.md`. Les 103 fiches sont marquées « lues » et Le Match est coché par défaut comme les autres mini-jeux.
- ⏳ Le Match : tester en partie la difficulté des 103 fiches et corriger les erreurs signalées. Les cinq événements sont des extraits chronologiques ; certains scores sautent parce qu'un but intermédiaire n'a pas été retenu. La Coupe du monde 1950 n'avait pas de finale/demi-finale officielle ; 1974 et 1978 n'avaient pas de demi-finale officielle.
- ⏳ Ajouter un bouton « Signaler cette question » sur les cartes de tous les mini-jeux. Le signalement doit identifier le jeu, la carte et l'indice, l'événement ou l'affirmation en cause, permettre un court commentaire et ne pas modifier les points ni interrompre la partie. Prévoir ensuite une liste de signalements à examiner, corriger et marquer comme résolus.

## Arbitrages de game design à faire avant le déroulé complet

- Définir la procédure de correction et de signalement lorsqu'une réponse valable est refusée malgré les variantes vérifiées.
- Fixer les critères de sélection et de difficulté des cartes Transfert, y compris le traitement des carrières de plus de cinq passages.
- Définir les règles des mini-jeux qui suivront Plus ou Moins, chacun avec ses réponses valables, son déroulé et son score, avant leur intégration.
- Qui suis-je ? : éprouver en playtest le délai de 12 secondes repris de Transfert et la difficulté réelle des cinq indices.
- ✅ Tackle sur Transfert : tranché (délai + sifflet, la carte s'arrête toujours après une tentative de Tackle). Voir DECISIONS.md du 2026-09-26.
- ✅ Tackle sur Vrai ou Faux : règle tranchée (contestation dans les 5 secondes après réponse verrouillée, avant révélation ; le tour actif continue normalement si le Tackle échoue). Voir DECISIONS.md du 2026-09-27.
- ✅ Vrai ou Faux : l'interface respecte désormais la fenêtre de 5 secondes (révélation automatique si personne ne tackle avant). Implémenté dans `index.html` (`startContestWindow`).
- Tackle : décider si l'équipe qui tient le téléphone (et voit donc déjà les indices révélés sur Transfert) a le droit de tackler, vu l'avantage d'information que ça lui donnerait.
- ✅ Tackle sur Plus ou Moins : implémenté (réponse verrouillée, fenêtre de 5 secondes « Tackle ou révélation », +5/−5, score pouvant passer sous zéro, tour actif inchangé si le Tackle échoue). Voir GAME_DESIGN.md et la décision du 2026-09-27.
- ✅ Le Match : mauvaise réponse active = −1 puis événement suivant ; passe = événement suivant sans pénalité ; après le cinquième événement sans bonne réponse, fin de carte et révélation du match. Décidé comme sur Qui suis-je.

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
