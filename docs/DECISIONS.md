# DECISIONS.md

Journal des arbitrages, dans l'ordre chronologique inverse. Chaque entrée indique ce qui a été décidé et pourquoi.

## [2026-09-26] Tackle sur Transfert : délai avant sifflet, arrêt systématique de la carte
- Décision : sur Transfert, l'équipe active joue seule pendant 12 secondes ; passé ce délai, un coup de sifflet sonore ouvre la fenêtre de Tackle pour les autres équipes. Toute tentative de Tackle (réussie ou non) arrête définitivement la carte en cours.
- Raison : David a confirmé le principe du délai + sifflet et que la carte s'arrête dans tous les cas après un Tackle.
- Non tranché : la durée de 12 secondes est une valeur de départ choisie par Claude, à ajuster en playtest. Le droit de Tackle est ouvert à toute équipe sauf l'équipe active (y compris celle qui tient le téléphone) — l'équité de ce point reste une question ouverte (voir TODO.md).
- Impact technique : minuteur par carte, signal sonore (bip généré, pas de fichier audio), bouton Tackle persistant, sélection d'équipe puis réponse unique.

## [2026-09-26] Le projet prend le nom TACKLE ; le Tackle devient une mécanique transversale
- Décision : le projet s'appelle désormais **TACKLE**. Le Tackle devient une règle commune à la plateforme : pendant le tour d'une équipe, une équipe adverse peut interrompre en criant « TACKLE ! » et proposer une réponse (bonne réponse +5, mauvaise −5, une seule proposition).
- Raison : supprimer les temps morts et garder toutes les équipes engagées en permanence, pas seulement l'équipe active.
- Principe de design : chaque mini-jeu doit définir précisément comment le Tackle s'y applique — ce n'est pas un comportement générique automatique.
- Ouvert (voir TODO.md) : effet du Tackle sur le déroulement de la carte interrompue, équité vis-à-vis de l'équipe qui tient le téléphone, définition du Tackle pour Plus ou Moins.
- Impact technique : nécessite une interface d'interruption disponible à tout moment pendant un tour, en plus du flux normal de jeu. Pas encore implémenté.

## [2026-09-26] Plus ou Moins : cinq comparaisons et 50 joueurs par catégorie
- Décision : une carte repose sur une statistique unique et six joueurs, soit jusqu'à cinq choix PLUS ou MOINS. Chaque bonne réponse augmente de 1 le gain potentiel ; l'équipe peut encaisser ou continuer, et une erreur avant l'encaissement ramène le gain de la carte à 0. Les cinq réussites rapportent automatiquement 5 points. Les égalités entre voisins sont exclues.
- Décision de contenu : préparer 50 entrées statistiques vérifiées dans chacune des quatre catégories initiales (Premier League, Ligue des champions, Coupe du monde, sélections nationales), avec source et date de vérification.
- Raison : créer un jeu de connaissance, d'intuition et de prise de risque, avec assez de données pour composer des chaînes variées sans comparaisons trop évidentes.
- Impact : définir précisément le périmètre de chaque statistique avant de collecter les 200 entrées ; construire les chaînes à partir de valeurs proches et tester leur difficulté. Intégration après Transfert.

## [2026-09-26] Revalider manuellement les cartes « –présent » avant les soirées test
- Décision : avant chaque vraie soirée test, revoir les cartes jouables contenant « –présent ». En cas de départ confirmé, corriger les années et les clubs, ajouter la source et actualiser `verified_date`. Si la situation reste incertaine, passer la carte en « à vérifier » pour l'exclure du jeu. Ne pas appliquer de date de péremption automatique.
- Raison : l'âge d'une vérification ne permet pas de savoir si un transfert a eu lieu ; une expiration automatique pourrait retirer des cartes toujours correctes. `verified_date` sert à prioriser la relecture.
- Impact technique : aucun contrôle automatique supplémentaire n'est nécessaire pour le prototype ; le statut de vérification existant exclut déjà les cartes incertaines.

## [2026-09-26] Une source Wikipédia citée vaut vérification pour le lot #2
- Décision : les 88 cartes du 2e lot fourni par ChatGPT (sourcées individuellement avec un lien Wikipédia) sont marquées « vérifié » et jouables, sans recherche indépendante par Claude carte par carte.
- Raison : David juge la citation Wikipédia suffisante à ce stade du prototype.
- Nuance à garder en tête : une source citée par une IA n'est pas la preuve qu'elle a été relue (le cas Salah — carte fausse malgré une apparence correcte — reste possible même avec une source). Si une carte de ce lot s'avère fausse en test, c'est un signal pour resserrer la règle, pas un hasard isolé.
- Impact technique : aucun — bascule de statut uniquement.

## [2026-09-25] Un club peut apparaître deux fois sur une même carte
- Décision : si un joueur revient dans un club déjà cité plus tôt dans sa carrière (ex. Griezmann, Neymar, Sergio Ramos, Pogba), les deux passages sont affichés normalement dans les indices chronologiques, sans traitement spécial.
- Raison : c'est un fait réel de carrière, pas une ambiguïté à corriger.
- Impact technique : aucun — le format de carte gère déjà ce cas nativement.

## [2026-09-25] Faire tourner le téléphone et vérifier les réponses saisies
- Décision : avec plusieurs équipes, celle qui suit l'équipe active dans l'ordre tient le téléphone. Avec une seule équipe, elle le tient elle-même. L'équipe active confirme le texte saisi avant validation.
- Raison : attribuer sans ambiguïté le rôle de meneur et éviter qu'une erreur de saisie soit comptée comme une mauvaise réponse.
- Impact technique : le porteur change à chaque carte suivant l'ordre des équipes ; l'interface affiche l'équipe active et l'équipe qui tient l'appareil.

## [2026-09-25] Accepter uniquement des variantes de nom vérifiées
- Décision : comparer les réponses sans tenir compte des majuscules ni des accents et accepter les variantes approuvées pour la carte. Ne pas corriger automatiquement les fautes.
- Raison : reconnaître les écritures légitimes sans risquer de valider le nom d'un autre joueur.
- Impact technique : chaque carte stocke sa réponse canonique et ses variantes validées ; la saisie est confirmée avant contrôle.

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
