# TODO.md

## À prototyper

- ✅ Un parcours sur un seul téléphone : créer 1 à 4 équipes, choisir 5/10/20 manches, sélectionner les mini-jeux, jouer, puis voir le classement. Implémenté dans `index.html`.
- ✅ Parcours de préparation de [UI_SETUP_FLOW.md](UI_SETUP_FLOW.md) intégré dans `index.html` : « Créer une partie » (1–4 équipes, 5/10/15/20 manches), sous-page « Choisir les défis » (encadré doré, au moins un défi), « Personnaliser les équipes » (nom, logo, couleur préattribués), puis « Coup d'envoi ». Logos et couleurs repris dans le score et le classement ; « Revanche » revient à « Créer une partie » avec les réglages conservés. Vérifié en navigateur à 390 × 844 et 320 × 568.
- ⏳ Vérifier le parcours complet sur un vrai iPhone avant la prochaine soirée test : création de partie, défis, réponses, Tackle, classement et signalement lorsqu'il sera intégré. Android est reporté à une phase ultérieure.
- ✅ Écran de jeu Transfert intégré d'après [UI_TRANSFERT_FLOW.md](UI_TRANSFERT_FLOW.md) : scores de toutes les équipes en haut, carrière révélée à hauteur fixe, Répondre / Passer l'indice, saisie puis confirmation, « Qui a tacklé ? », écrans bonne/mauvaise réponse animés une fois. Plus aucune mention du porteur du téléphone. Cadre commun (en-tête, chrono, Tackle, Quitter) appliqué aux cinq défis.
- ✅ Nouvelle identité Transfert intégrée avec le pack « mercato » (`assets/ui/mercato/`) : bandeau TRANSFERT orange, joueur mystère anonyme, fiches de clubs révélés (la dernière en orange) reliées par le parcours. En-tête, scores, chrono, Tackle et bandeau de verdict restent les éléments communs.
- ✅ Classement entre deux manches intégré d'après [UI_INTERMISSION_FLOW.md](UI_INTERMISSION_FLOW.md) : scores cumulés classés, apparition de la dernière à la première place puis lumière dorée (une fois, passable d'un appui), prochaine manche et première équipe, bouton « C'est parti ! ». Après la dernière manche, classement final direct.
- ✅ Ouverture du Tackle intégrée d'après [UI_TACKLE_OPEN_ANIMATION.md](UI_TACKLE_OPEN_ANIMATION.md) : double sifflet bref à chaque départ de chrono, sifflet long et grand TACKLE rouge à 30 secondes (une fois, sans bloquer les appuis), bouton et chrono rouges pendant les 15 secondes.
- ⏳ Écouter l'essai réel de sifflet de départ (`kickoff-whistle-real-candidate.wav`) et décider s'il remplace le signal actuel.
- ✅ Écran de jeu Plus ou Moins intégré d'après [UI_PLUS_MOINS_FLOW.md](UI_PLUS_MOINS_FLOW.md) : duel bleu/corail, valeur cachée puis révélée, grands boutons PLUS/MOINS, « Bonne réponse » bref puis cagnotte avec ENCAISSER / CONTINUER.
- ⏳ Maquettes des écrans de jeu de Vrai ou Faux, Qui suis-je ? et Le Match, puis intégration.
- ✅ Transfert : révélation chronologique, tentative ou passe, pénalité de −1, points dégressifs, carte à club unique, porteur de téléphone désigné, confirmation de la réponse saisie. Implémenté dans `index.html`.
- ✅ Lot de 112 cartes dans `src/data/transfert-cards.json`, dont **100 vérifiées** (chargées en jeu) et **12 encore à vérifier** (exclues du jeu tant qu'elles ne le sont pas).
- ⏳ Une vraie partie test à consigner ensuite dans `PLAYTESTS.md`.
- ✅ Journal de partie pour les tests : chaque carte (défi, carte, passes, réponses saisies, Tackles, temps, points) est notée sur le téléphone (20 dernières parties, y compris abandonnées). Les testeurs l'envoient de temps en temps avec « Envoyer le journal des parties » en bas de « Créer une partie », via le menu de partage du téléphone ou une copie ; rien n'est demandé en fin de partie. Rien n'est envoyé sans cet appui.
- ⏳ Avant chaque vraie soirée test, revalider manuellement les cartes jouables dont un club porte « –présent ». Corriger et sourcer tout départ confirmé ; si la situation reste incertaine, remettre la carte « à vérifier » pour l'exclure du jeu.
- ✅ Plus ou Moins : sept catégories intégrées et jouables, **50 entrées joueur + valeur chacune** (350 entrées au total) : buts en Premier League, Ligue des champions, Coupe du monde, Liga, Serie A et Ligue 1, ainsi que sélections nationales. Les six nouveaux lots indiquent la source et la date de vérification pour chaque entrée.
- ⏳ Plus ou Moins : revalider périodiquement les chiffres des joueurs encore actifs et relire les lots avant une soirée test ; les classements ont des dates d'arrêté différentes, indiquées dans chaque fichier.
- ⏳ À partir de cette base, composer et tester des chaînes de six joueurs : cinq comparaisons au maximum, aucune égalité entre voisins, écarts intéressants et directions PLUS/MOINS variées.
- ✅ Vrai ou Faux (remplace Le Faux) : jeu de données de 2 000 affirmations intégré (`src/data/vraifaux-statements.json`, toutes au statut « vérifié » dans le fichier mais audit éditorial à poursuivre) et mini-jeu implémenté dans `index.html` (5 affirmations, cagnotte 1→5, ENCAISSER/CONTINUER, Tackle commun 30 + 5 secondes, fermé dès la réponse de l'équipe active (DECISIONS.md du 2026-09-29)). Voir DECISIONS.md du 2026-09-28.
- ✅ Vrai ou Faux : audit de cohérence des 2 000 affirmations et des deux langues effectué ; aucune contradiction interne détectée. Les journaux et la répartition du contenu sont analysés dans [VRAI_FAUX_AUDIT_2026-10-06.md](VRAI_FAUX_AUDIT_2026-10-06.md).
- ✅ Vrai ou Faux : David a validé le retrait du tirage des 470 affirmations à valeur exacte et la limite de deux comparaisons d'âge ou de taille par série de cinq. Données conservées dans les fichiers ; le lot a ensuite été ramené à 1 410 affirmations jouables après le retrait des postes.
- ✅ Vrai ou Faux : après accord de David, les 120 affirmations de poste sont exclues du tirage ; les 75 fausses villes ont été réécrites en français et en portugais avec des leurres géographiquement plausibles. Le lot jouable compte 1 410 affirmations équilibrées.
- ⏳ Vrai ou Faux : contrôler les fiches Wikipédia source par source et mesurer la difficulté des nouveaux énoncés lors d'un playtest sur iPhone. Réécrire les postes avec des rôles précis uniquement si leur vérité peut être tranchée sans ambiguïté.
- ✅ Qui suis-je ? : mini-jeu implémenté dans `index.html` avec le bouton Tackle commun (30 secondes réservées puis 15 ouvertes à chaque indice, première équipe adverse à répondre, enjeu = palier de l'indice en cours (5/4/3/2/1), fin de carte).
- ✅ Qui suis-je ? : **100 fiches sourcées** intégrées (`src/data/quisuisje-cards.json`, chargées via `loadQsjCards()`), remplaçant les 4 fiches de test. Case cochée par défaut comme les autres mini-jeux. Vérifié : chargement, réponse fausse (−1, carte continue), rendu de 15 cartes tirées au hasard.
- ⏳ Qui suis-je ? : faire une relecture éditoriale et un playtest de la difficulté réelle des indices avant une vraie soirée test (statut du lot : « fiches sourcées, difficulté à éprouver en partie »).
- ✅ Qui suis-je ? : le premier club a été recalibré sur 84 des 100 fiches le 3 octobre, puis l'ordre fixe des catégories a été abandonné le 6 octobre. **89 fiches ont été réordonnées** individuellement en français et en portugais ; cinq faits courts et 5/4/3/2/1 points sont conservés. Voir [QUI_SUIS_JE_DIFFICULTE.md](QUI_SUIS_JE_DIFFICULTE.md).
- ✅ Qui suis-je ? : 14 fiches corrigées après recherche de réponses concurrentes plausibles (notamment Xavi/Busquets, Puyol/Piqué et Messi/Di María), en français et en portugais. Voir [QUI_SUIS_JE_DIFFICULTE.md](QUI_SUIS_JE_DIFFICULTE.md).
- ✅ Qui suis-je ? : première passe de recherche de réponses concurrentes sur les 100 fiches ; trois collisions supplémentaires corrigées (João Moutinho/Bernardo Silva, Nani/Cristiano Ronaldo, Rivaldo/Ronaldinho). L'ancienne liste de fiches a été resynchronisée avec le lot jouable et « Barcelona » harmonisé en « FC Barcelone ». Voir [QUI_SUIS_JE_DIFFICULTE.md](QUI_SUIS_JE_DIFFICULTE.md).
- ⏳ Qui suis-je ? : poursuivre la recherche de concurrents plausibles hors du lot ; toute fiche encore ambiguë après cinq indices doit être réécrite avec des faits sourcés ou retirée du tirage. Retester la distribution des bonnes réponses par indice en partie.
- ✅ Le Match : premier mini-jeu implémenté avec cinq événements chronologiques (ancienne version, remplacée le 2 octobre). **103 fiches sourcées** remplacent les 3 cartes de test dans `src/data/lematch-cards.json` : 53 finales/demi-finales officielles de Coupe du monde (1954–2026) et 50 finales européennes (1977–2026). La liste de relecture initiale figure dans `docs/LE_MATCH_CARDS_REVIEW.md`. Les 103 fiches sont marquées « lues » et Le Match est coché par défaut comme les autres mini-jeux.
- ✅ Le Match : cinq indices score final → ville → phase de la compétition → année → compétition aux paliers 5/4/3/2/1 (ordre modifié le 6 octobre). Ville et lien source ajoutés aux 103 fiches initiales ; données, écran et contrôles adaptés. Les anciens événements restent archivés dans les fiches et ne sont plus affichés.
- ✅ Le Match : 100 cartes marquantes supplémentaires (37 Coupes du monde, 13 Euros, 25 Ligues des champions, 25 championnats) ; 203 cartes au total, dont les 103 historiques d'origine.
- ⏳ Le Match : retester en partie la difficulté du nouvel ordre des indices sur les 203 fiches, puis corriger les erreurs signalées. La Coupe du monde 1950 n'avait pas de finale/demi-finale officielle ; 1974 et 1978 n'avaient pas de demi-finale officielle.
- ✅ Tackle commun : minuteur réinitialisé à chaque indice, événement, comparaison et affirmation ; délai 30 + 15 secondes, première réponse adverse retenue, encaissement automatique des cagnottes binaires à l'expiration. Vérifié par `tests/tackle-timing.test.cjs`.
- ✅ Consistance Tackle : `GAME_DESIGN.md` et `tests/tackle-timing.test.cjs` étaient restés sur +5/−5 partout alors que le code appliquait déjà un palier (5/4/3/2/1, vol de réponse) ou un forfait de 3 points (Plus ou Moins/Vrai ou Faux). Doc et test corrigés pour suivre le code réellement en ligne — voir DECISIONS.md du 2026-09-28. Forfait de 3 points confirmé par David le 2026-09-28.
- ✅ Bouton « Signaler une erreur sur cette question » en fin de carte, tous défis (mail prérempli vers contact@lafamivy.com : défi, carte, réponse attendue, réponses tapées, version), et « Nous contacter » dans Réglages. Les signalements arrivent dans la boîte de David. Voir DECISIONS.md du 2026-10-06.

## Arbitrages de game design à faire avant le déroulé complet

- Définir la procédure de correction et de signalement lorsqu'une réponse valable est refusée malgré les variantes vérifiées.
- Fixer les critères de sélection et de difficulté des cartes Transfert, y compris le traitement des carrières de plus de cinq passages.
- Définir les règles des mini-jeux qui suivront Plus ou Moins, chacun avec ses réponses valables, son déroulé et son score, avant leur intégration.
- Qui suis-je ? : éprouver en playtest le nouveau délai de 30 + 15 secondes à chaque indice et la difficulté réelle des cinq indices.
- ✅ Tackle sur Transfert : 30 secondes réservées à l'équipe active puis 15 secondes de Tackle après le sifflet, à chaque indice ; la carte s'arrête après une tentative de Tackle. Voir DECISIONS.md du 2026-09-28.
- ✅ Tackle sur Vrai ou Faux : bouton commun 30 + 15 secondes, fermé dès que l'équipe active a répondu (DECISIONS.md du 2026-09-29). Voir DECISIONS.md du 2026-09-28.
- ✅ Vrai ou Faux : suit désormais le bouton Tackle commun (30 + 15 secondes), sans fenêtre séparée à part — voir la décision « Tackle commun uniquement » du 2026-09-28.
- Tackle : décider si l'équipe qui tient le téléphone (et voit donc déjà les indices révélés sur Transfert) a le droit de tackler, vu l'avantage d'information que ça lui donnerait.
- ✅ Tackle sur Plus ou Moins : bouton commun 30 + 15 secondes, fermé dès que l'équipe active a répondu (DECISIONS.md du 2026-09-29) ; forfait ±3 et cagnotte selon GAME_DESIGN.md. Voir DECISIONS.md du 2026-09-28.
- ✅ Le Match : mauvaise réponse active = −1 puis indice suivant ; passe = indice suivant sans pénalité ; après le cinquième indice sans bonne réponse, fin de carte et révélation du match. Décidé comme sur Qui suis-je.

## Zones où Claude peut décider librement

- Architecture, langage, framework, stockage et organisation du code nécessaires au prototype.
- Détails purement techniques qui respectent les règles validées dans `GAME_DESIGN.md`.

## Zones nécessitant validation de David avant modification

- Règles, points, pénalités, difficulté, participation des équipes, nombre de manches et sélection des jeux.
- Toute modification du périmètre ou de l'expérience de jeu.

## Questions techniques en attente

- Proposer un format de carte qui conserve clubs, années, prêts/retours, réponse attendue, variantes acceptées, sources et statut de vérification.
- Proposer un tirage aléatoire des cartes pour chaque équipe, avec répétition possible, et un moyen d'évaluer les répétitions pendant les tests.
- ✅ Bouton Tackle toujours visible pendant une question : grisé pendant les 30 premières secondes, actif pendant les 15 secondes ouvertes qui suivent. Implémenté dans `index.html`.
