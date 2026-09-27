# DECISIONS.md

Journal des arbitrages, dans l'ordre chronologique inverse. Chaque entrée indique ce qui a été décidé et pourquoi.

## [2026-09-27] Correctif : l'écran se bloquait sur une affirmation fausse en Vrai ou Faux
- Bug signalé par David : après avoir répondu VRAI ou FAUX, l'écran restait parfois bloqué sans bouton ni suite possible.
- Cause : lors de la conversion du jeu de données fourni par David vers `src/data/vraifaux-statements.json`, les champs `valeur_source` et `valeur_affirmee` (nécessaires à `formatVfCorrection` pour donner la vraie information quand l'affirmation est fausse, voir décision précédente) avaient été omis par erreur. Dès qu'une affirmation fausse était révélée, le code plantait silencieusement au milieu de la révélation, après avoir masqué les boutons de réponse mais avant d'afficher la suite — d'où l'écran vide.
- Correctif : régénération de `vraifaux-statements.json` avec ces deux champs restaurés (vérifié sans erreur sur les 1000 affirmations fausses). Le code de révélation est aussi rendu défensif : un échec de `formatVfCorrection` est maintenant intercepté et n'empêche plus la suite du tour.
- Impact : purement technique, aucune règle de jeu modifiée. Reproduit et vérifié résolu via un test automatisé (16/16 tours sans blocage, y compris sur des affirmations fausses).

## [2026-09-27] Intégration du jeu de données Vrai ou Faux (2 000 affirmations) et implémentation du mini-jeu
- Décision : le jeu de 2 000 affirmations fourni par David (1 000 vraies, 1 000 fausses, dérivées de données déjà vérifiées : années de naissance, tailles, pied fort, poste, ordre des clubs, ville de naissance, débuts professionnels) est intégré tel quel dans `src/data/vraifaux-statements.json`, marqué « vérifié » pour les 2 000 entrées.
- Vérification effectuée avant intégration : un contrôle automatique de cohérence interne a comparé, pour chacune des 2 000 affirmations, la valeur affirmée à la valeur source fournie (égalité, comparaison d'âge, de taille, ou ordre chronologique de deux passages en club) — **0 incohérence détectée**. Un échantillage manuel sur quelques affirmations connues (année de naissance de Steven Gerrard, ordre de carrière de David Silva, etc.) confirme leur exactitude. Aucune vérification indépendante affirmation par affirmation n'a été faite au-delà de ce contrôle et de cet échantillage, conformément au principe de curation pragmatique déjà appliqué au lot Transfert sourcé par Wikipédia.
- Raison : le jeu de données est dérivé algorithmiquement de champs déjà sourcés (pas de génération libre de faits par une IA), avec une source Wikipédia par affirmation et une règle de vérification explicite par catégorie — le risque est donc structurellement plus faible que la génération libre initialement redoutée.
- Implémentation technique : nouvel écran de jeu Vrai ou Faux dans `index.html` (`beginVfTurn`, `renderVfStatement`, `resolveVfStatement`), cagnotte 1→5 avec ENCAISSER/CONTINUER identique à Plus ou Moins, et fenêtre de Tackle déclenchée par la réponse de l'équipe active (pas par un minuteur, contrairement à Transfert) : bouton TACKLE + choix d'équipe, résolution immédiate. Le tirage d'une carte choisit 5 affirmations sans jamais réunir deux énoncés sur le même fait (`groupe_exclusif`), avec répétition possible d'une carte à l'autre comme pour les autres mini-jeux. En solo (1 équipe), la réponse est révélée immédiatement sans étape d'attente puisque personne ne peut tackler.
- Non tranché : relecture éditoriale complète du jeu de données (recommandée par sa propre note de contrôle, non faite) ; si une affirmation s'avère fausse en test, resserrer la règle de vérification pour les prochains lots.

## [2026-09-27] Refonte du Faux en Vrai ou Faux à cagnotte, avec Tackle sur la réponse en attente
- Décision : « Le Faux » est remplacé par un nouveau mini-jeu, **Vrai ou Faux**, qui reprend la mécanique de cagnotte de Plus ou Moins : 5 affirmations football présentées une par une, l'équipe active répond VRAI ou FAUX à chacune. Une bonne réponse fait progresser la cagnotte potentielle (1, 2, 3, 4, puis 5 points) avec un choix ENCAISSER/CONTINUER après chaque succès ; une mauvaise réponse en cours de série fait perdre toute la cagnotte de la carte.
- Mécanique Tackle appliquée à ce jeu : une fois que l'équipe active a donné sa réponse à une affirmation, mais **avant que le jeu ne révèle si elle a raison**, n'importe quelle autre équipe peut tenter un Tackle en pariant que l'équipe active se trompe. Une seule tentative de Tackle par affirmation (première équipe à tackler). Tackle correct : le tackleur gagne +5 et l'équipe active perd immédiatement toute sa cagnotte en cours. Tackle incorrect : le tackleur perd 5 points et le tour de l'équipe active continue normalement (son choix ENCAISSER/CONTINUER n'est pas affecté par un Tackle raté). Exemple donné par David : affirmation « Zlatan a joué au Bayern Munich » (faux) — l'équipe active répond, une autre équipe tackle avant la révélation.
- Confirmations de David (2026-09-27) sur mes 4 points de vigilance :
  1. Le Tackle sur ce jeu n'est possible qu'une fois que l'équipe active a donné sa réponse, jamais avant.
  2. Le contenu (affirmations vraies/fausses) provient d'un jeu de données que David prépare lui-même (« 1000 vraies / 1000 fausses »), ce qui évite le risque initial de générer des affirmations fausses par IA à partir de données de carrière tronquées — aucun format de données n'a encore été transmis ni convenu.
  3. Le principe « toute réponse en attente peut être tacklée avant révélation » s'applique aussi, à terme, à Plus ou Moins (exemple donné par David : affirmation « Mbappé a marqué plus de 30 buts en Ligue 1 » comme illustration du même mécanisme). La restructuration exacte du déroulé de Plus ou Moins (qui révèle aujourd'hui PLUS/MOINS instantanément, sans pause) reste à définir — voir TODO.md.
  4. Le mode « Partie rapide » est renommé **Tackle** et reste structurellement identique (tirage aléatoire de manches parmi les mini-jeux sélectionnés) ; David acte que la généralisation du Tackle peut prendre le pas sur le principe originel de diversité systématique des mécaniques manche par manche, au moins dans ce mode. D'autres mini-jeux (Undercover, etc.) pourront être ajoutés plus tard sans remettre en cause ce choix.
- Raison : réutiliser une mécanique de cagnotte déjà validée et testée (Plus ou Moins) plutôt que d'inventer un nouveau système de score, tout en donnant au Tackle une deuxième application concrète qui en fait une identité transversale du jeu plutôt qu'un gadget propre à Transfert.
- Non tranché : format exact du jeu de données 1000 vrai/1000 faux ; restructuration de Plus ou Moins pour supporter une fenêtre de Tackle avant révélation ; nom/contenu définitif des 5 affirmations par carte (nombre, thèmes, niveaux de difficulté).
- Impact technique : aucun code encore écrit pour ce mini-jeu. Il faudra un nouvel écran/état de jeu (`stage-vraifaux` ou équivalent), une fenêtre de Tackle déclenchée par la réponse de l'équipe active plutôt que par un minuteur (contrairement à Transfert), et l'intégration du futur jeu de données selon le même schéma `verification_status`/`sources`/`verified_date` que les autres mini-jeux.

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
