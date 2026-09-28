# DECISIONS.md

## [2026-09-28] Logo et couleur uniques par équipe
- Décision : lorsqu'une équipe a pris un logo ou une couleur, les autres équipes ne peuvent plus le choisir (demandé par David).
- Raison : chaque équipe doit rester identifiable d'un coup d'œil dans le score et le classement.
- Impact technique : sur « Personnaliser les équipes », les choix déjà pris sont grisés, barrés et désactivés ; une équipe ajoutée reçoit un logo et une couleur libres. Avec 4 équipes, les 4 logos sont tous pris : pour changer d'animal, une équipe doit d'abord en libérer un.

## [2026-09-28] Suppression de la fenêtre de contestation de 5 secondes : Tackle commun uniquement

- David signale que « les 5 secondes de contestation disparaissent » et précise, en clarifiant : il veut supprimer la fenêtre spéciale qui s'ouvrait immédiatement quand l'équipe active verrouillait sa réponse sur Plus ou Moins/Vrai ou Faux, et faire que ces deux jeux suivent exactement le même rythme que Transfert/Qui suis-je/Le Match : 30 secondes grisées puis 15 secondes ouvertes après le sifflet, **même si l'équipe active a déjà répondu**. Confirmé par David.
- Comportement retenu : répondre tôt ne change plus rien au minuteur. Le bouton Tackle commun continue de courir depuis le début de la comparaison/affirmation, sans se rouvrir ni se raccourcir. Si un adversaire tackle pendant les 15 secondes ouvertes, il donne toujours sa propre réponse binaire (PLUS/MOINS ou VRAI/FAUX), que l'équipe active ait déjà verrouillé la sienne ou non — enjeu inchangé (forfait de 3 points). Si personne ne tackle au bout des 45 secondes et que l'équipe active avait déjà répondu, sa réponse se révèle alors normalement (juste ou fausse, cagnotte affectée en conséquence) ; si elle n'avait pas répondu du tout, la cagnotte déjà accumulée est encaissée comme avant.
- Impact technique dans `index.html` : `pomGuess()`/`vfAnswer()` ne déclenchent plus de fenêtre séparée (`startContestWindow` retiré) ; ils se contentent de verrouiller la réponse et d'afficher un libellé d'attente, sans toucher au minuteur du bouton Tackle commun déjà lancé par `beginPomTurn()`/`beginVfTurn()`. `tickTackleWindow()` vérifie, à l'expiration des 45 secondes, si l'équipe active avait déjà répondu ; si oui, elle révèle via `resolvePomGuess()`/`resolveVfStatement()` (déjà utilisées par ailleurs), sinon elle encaisse la cagnotte existante comme avant. Le code mort issu de l'ancienne interface par mini-jeu (boutons TACKLE/Révéler dédiés à Plus ou Moins et Vrai ou Faux, jamais affichés depuis l'introduction du bouton commun) a été retiré au passage.
- Vérifié par `tests/tackle-timing.test.cjs` (réécrit pour ce nouveau comportement) et par des scripts Playwright automatisés : le bouton reste grisé pendant les 30 secondes même après une réponse verrouillée, s'ouvre normalement à 30 secondes, un Tackle en milieu de fenêtre ouverte fonctionne correctement, et une réponse verrouillée jamais contestée se révèle normalement après 45 secondes.

## [2026-09-28] Consistance : enjeu du Tackle par palier (vol de réponse) ou forfait ±3 (contestation)

- Constat en lisant le code après le commit « Adapter les points du Tackle au palier ou au forfait ±3 » : l'enjeu du Tackle n'est plus un +5/−5 flat partout. Sur Transfert, Qui suis-je et Le Match (vol de réponse), l'enjeu suit désormais le palier de l'indice ou de l'événement en cours (5, 4, 3, 2 puis 1 point). Sur Plus ou Moins et Vrai ou Faux (contestation ou réponse à l'aveugle après 30 secondes), l'enjeu est un forfait fixe de **3 points**, pas 5.
- Ce changement était déjà en place dans `index.html` (`currentTackleStake()`, `isBinaryGame()`) mais n'avait pas été répercuté dans `GAME_DESIGN.md` (qui indiquait encore +5/−5 partout) ni dans `tests/tackle-timing.test.cjs` (qui attendait encore 5/−5 sur Plus ou Moins et Vrai ou Faux et faisait échouer le test).
- Correction apportée par Claude, en cohérence avec le rôle de vérification technique : `GAME_DESIGN.md` documente maintenant le palier (vol de réponse) et le forfait de 3 points (contestation/aveugle) séparément ; `tests/tackle-timing.test.cjs` est mis à jour pour refléter le forfait de 3 points et passe à nouveau (`node tests/tackle-timing.test.cjs`). Aucune règle n'a été changée par Claude : la documentation et le test suivent simplement le comportement déjà en ligne.
- David confirme le 2026-09-28 que le forfait fixe de 3 points sur Plus ou Moins/Vrai ou Faux (au lieu de 5) est bien la règle voulue. Point clos.

## [2026-09-28] Bouton Tackle commun et fenêtre de 30 + 15 secondes

- David décide qu'un même bouton Tackle reste visible pendant toutes les questions : grisé pendant 30 secondes de priorité à l'équipe active, puis actif pendant 15 secondes après le sifflet. La première équipe adverse qui appuie est la seule à tenter une réponse. L'équipe active peut encore répondre pendant cette fenêtre.
- Le délai repart à chaque indice de Transfert et Qui suis-je, à chaque événement de Le Match, et à chaque comparaison ou affirmation de Plus ou Moins et Vrai ou Faux. Sans réponse après 45 secondes, Transfert/Qui suis-je/Le Match passent à l'indice ou à l'événement suivant puis révèlent après le dernier.
- Sur Plus ou Moins et Vrai ou Faux, une réponse active donnée avant l'expiration déclenche tout de suite la contestation habituelle de 5 secondes, sans attendre les 30 secondes. Sans réponse active à 30 secondes, le premier tackleur peut donner sa propre réponse binaire pendant 15 secondes : +5 si elle est juste et la cagnotte active est perdue ; −5 si elle est fausse et la cagnotte active est encaissée. La carte se termine. Sans réponse à 45 secondes, la carte se termine et la cagnotte active est encaissée.
- Cette décision remplace les délais de 12 secondes et l'absence de limite après le sifflet des décisions précédentes. Le Tackle à +5/−5 et les pénalités des réponses actives restent ceux des mini-jeux.

Journal des arbitrages, dans l'ordre chronologique inverse. Chaque entrée indique ce qui a été décidé et pourquoi.

## [2026-09-27] Le Match implémenté avec 3 cartes de test
- Mini-jeu implémenté dans `index.html` conformément aux règles validées : compétition affichée seule au départ (sans édition), cinq événements révélés dans l'ordre chronologique du match pour 5/4/3/2/1 points, réponse de l'équipe active donnant les deux équipes du match (acceptées dans n'importe quel ordre, via le même moteur de correspondance approximative que Transfert et Qui suis-je), mauvaise réponse = −1 point puis événement suivant, passe = événement suivant sans pénalité, fin de carte avec révélation des deux équipes après le cinquième événement sans bonne réponse.
- Le Tackle reprend le vol de réponse de Transfert/Qui suis-je (12 secondes, sifflet, réponse unique de l'adversaire, +5/−5, fin de carte dans tous les cas), mais réenclenché à chaque nouvel événement puisque la fenêtre doit s'ouvrir événement par événement. La réponse du Tackle porte ici sur les deux équipes du match : le champ de saisie générique du Tackle affiche désormais un second champ quand le mini-jeu en cours est Le Match.
- **Contenu :** en l'absence de cartes réelles sourcées, et en suivant le même principe que les 4 fiches de test initiales de Qui suis-je, Claude a rédigé **3 cartes de test** clairement identifiées comme telles (`src/data/lematch-cards.json`, champ `status`), à partir de faits de matchs très largement documentés et vérifiables (finale de Coupe du monde 1998 France–Brésil, finale de Ligue des champions 2005 Liverpool–AC Milan, finale de Coupe du monde 2022 Argentine–France) — aucun fait obscur ni approximatif, dans le respect de la règle « pas de contenu généré ou jugé par une IA en partie réelle ». La case correspondante dans la configuration n'est pas cochée par défaut, pour éviter qu'elle s'active par erreur dans une vraie soirée. Ces cartes sont destinées à être remplacées par du contenu réel sourcé par David/ChatGPT, comme précédemment pour Qui suis-je.
- Vérifié par des scripts Playwright automatisés : chargement des cartes, bonne réponse (ordre inversé + faute de frappe tolérée), mauvaise réponse (−1, carte continue), passe, Tackle après 12 secondes avec réponse à deux équipes (réussi et raté).

## [2026-09-27] Tackle sur Plus ou Moins implémenté, fenêtre de 5 secondes sur Vrai ou Faux corrigée
- Implémenté dans `index.html` conformément à la décision « Le Match et les deux formes de Tackle » : sur Plus ou Moins, `pomGuess()` verrouille désormais la direction choisie (PLUS/MOINS) sans révéler immédiatement le résultat ; une fenêtre de 5 secondes s'ouvre (`startContestWindow`, sans délai préalable ni sifflet), pendant laquelle une équipe adverse peut annoncer TACKLE. Si personne ne tackle, la fenêtre s'écoule et `resolvePomGuess(null)` révèle normalement.
- Un Tackle réussi (l'équipe active s'était trompée) : le tackleur reçoit +5, la carte de l'équipe active s'arrête avec 0 point. Un Tackle raté (l'équipe active avait raison) : le tackleur reçoit −5 (le score général peut passer sous zéro) et le tour de l'équipe active continue normalement (chaîne suivante ou ENCAISSER/CONTINUER selon le cas), exactement comme sur Vrai ou Faux.
- Nouvelle UI ajoutée : `#pom-pending-zone` (bouton TACKLE + bouton Révéler), `#pom-tackle-team-picker`. Avec une seule équipe, la fenêtre est court-circuitée et la réponse se révèle directement (pas de Tackle possible en solo).
- Un helper partagé `startContestWindow(onTimeout)` / `clearContestTimer()` (délai `CONTEST_DELAY_SECONDS = 5`) a été ajouté à côté du helper existant `startTackleWindow()` (12 secondes, vol de réponse) : il est distinct et sert maintenant Plus ou Moins **et** Vrai ou Faux.
- Corrigé au passage : Vrai ou Faux affichait la fenêtre de contestation sans minuteur réel (bouton « Révéler » manuel uniquement, pas de limite de temps). `vfAnswer()` appelle maintenant `startContestWindow()` pour révéler automatiquement au bout de 5 secondes si personne ne tackle, conformément à la règle déjà validée.
- Vérifié par des scripts Playwright automatisés : révélation automatique après 5 s sans Tackle (Plus ou Moins et Vrai ou Faux), Tackle réussi (adversaire +5, carte active à 0), Tackle raté (adversaire −5, score négatif possible, tour actif qui continue et affiche normalement la décision ENCAISSER/CONTINUER).

## [2026-09-27] Le Match reprend les réponses et passes de Qui suis-je
- David confirme : après chaque événement, l'équipe active peut répondre une seule fois ou passer. Bonne réponse : elle gagne les points de l'événement et la carte s'arrête. Mauvaise réponse : −1 point au score général, puis événement suivant. Passe : événement suivant sans pénalité.
- Après une mauvaise réponse ou une passe au cinquième événement, la carte s'arrête et révèle les deux équipes. Les pénalités de mauvaises réponses se cumulent.
- Cette précision règle les trois questions laissées ouvertes dans la décision précédente ; elle ne change pas le Tackle de Le Match.

## [2026-09-27] Le Match et les deux formes de Tackle
- David valide **Le Match** : la compétition est affichée au départ, sans édition ; cinq événements vérifiés sont révélés dans l'ordre chronologique du match, pour 5, 4, 3, 2 puis 1 point. Une équipe active doit retrouver les deux équipes du match, acceptées dans n'importe quel ordre. La chronologie prime sur une difficulté artificiellement croissante.
- Sur Le Match, le Tackle reprend le **vol de réponse** de Transfert/Qui suis-je : 12 secondes de jeu exclusif pour l'équipe active **à chaque événement**, puis sifflet. La première équipe adverse à annoncer Tackle propose elle-même les deux équipes : +5 si elle trouve, −5 sinon. Sa tentative termine la carte dans les deux cas. Il n'y a pas de contestation binaire après une réponse de l'équipe active.
- Sur **Plus ou Moins** et **Vrai ou Faux**, le Tackle reste une **contestation** après la réponse verrouillée de l'équipe active, avant révélation. Les adversaires disposent de **5 secondes** ; la première annonce compte. Ils ne donnent pas d'autre réponse : +5 si l'équipe active se trompe, −5 si elle a raison. Un seul Tackle est possible par comparaison ou affirmation. Le Tackle ne porte ni sur ENCAISSER ni sur CONTINUER. Un Tackle raté ne change pas la suite normale de la carte active.
- Avec une seule équipe, il n'y a pas de Tackle. Le délai de 5 secondes et celui de 12 secondes pourront être éprouvés en playtest.
- L'implémentation du Tackle sur Plus ou Moins et la conformité de la fenêtre de 5 secondes sur Vrai ou Faux restent à vérifier dans le code. Les réponses erronées, passes et fins de carte de Le Match sont précisées dans la décision ci-dessus.

## [2026-09-27] Qui suis-je ? : les 4 fiches de test sont remplacées par les 100 vraies cartes
- David a fourni 100 cartes sourcées (`src/data/quisuisje-cards.json`, revue lisible dans `docs/QUI_SUIS_JE_100_FICHES.md`) et a demandé de retirer les fiches de test.
- Implémentation : `QSJ_TEST_CARDS` (embarqué dans le code) est remplacé par `loadQsjCards()`, qui charge le fichier comme les autres contenus (`cache: "no-store"`, un seul `fetch`), avec un flag `QSJ_READY` bloquant le lancement de partie tant que le chargement n'est pas terminé, à l'identique de Transfert/Plus ou Moins/Vrai ou Faux. La case « Qui suis-je ? » est maintenant cochée par défaut comme les autres mini-jeux, puisque le contenu n'est plus du placeholder.
- Le lot n'a pas de statut de vérification par carte ; son statut global (« fiches sourcées, difficulté à éprouver en partie ») sert de feu vert pour le charger tel quel, en attendant la relecture éditoriale et le playtest de difficulté encore ouverts dans TODO.md.
- Vérifié après intégration : chargement sans erreur de setup, une mauvaise réponse retire bien 1 point et la carte continue, et 15 cartes tirées au hasard s'affichent correctement.

## [2026-09-27] On prend large sur les fautes de frappe (Transfert, Qui suis-je, Tackle)
- Contexte : « Ronaldino » (sans le h) tapé sur Qui suis-je a été refusé, alors que « Ronaldinho » était la bonne réponse — la comparaison n'ignorait que les majuscules/accents, pas les fautes de frappe. David a demandé qu'on prenne large.
- Décision : une réponse tapée est acceptée si elle est assez proche d'une réponse valide au sens de la distance de Levenshtein (nombre de lettres à ajouter/retirer/changer), avec une tolérance croissante selon la longueur : 1 lettre pour un mot de 7 caractères ou moins, 2 jusqu'à 14, 3 au-delà. En dessous de 4 caractères, aucune tolérance (trop risqué). S'applique partout où une réponse est comparée à `answer`/`variants` : Transfert, Qui suis-je et le Tackle sur ces deux jeux.
- Risque assumé : sur des noms courts, une tolérance de 1 lettre peut accepter à tort un nom différent qui s'écrit presque pareil (ex. « Messi » et « Kessi » ne sont qu'à une lettre d'écart). C'est le compromis explicitement voulu par David en échange de ne plus pénaliser les fautes de frappe courantes ; à resserrer si ça pose problème en playtest.
- Impact technique : ajout de `levenshtein()` et `matchesAnyAnswer()` dans `index.html`, utilisés à la place des comparaisons exactes dans `checkAnswer()` (Transfert), `checkQsjAnswer()` (Qui suis-je) et la validation du Tackle.

## [2026-09-27] Correctif : mauvaise réponse sur Qui suis-je = −1 point, la carte continue
- Correction de David : une mauvaise réponse de l'équipe active ne termine pas la carte. Elle retire 1 point du score général et révèle l'indice suivant, exactement comme sur Transfert. La carte ne se termine que sur une bonne réponse, ou après une mauvaise réponse/une passe au dernier indice.
- Cette règle remplace celle notée juste avant (« mauvaise réponse termine la carte sans point de réponse ni autre pénalité »), qui était une mauvaise lecture de la mécanique voulue.
- Impact technique : `checkQsjAnswer()` applique désormais `awardPoints(-1)` puis appelle `advanceQsjClue(true)` au lieu de terminer la carte, en miroir exact du comportement de Transfert.

## [2026-09-27] Qui suis-je ? implémenté avec 4 fiches de test écrites par Claude
- Décision de David : construire le mini-jeu tout de suite en utilisant des fiches de test que Claude écrit lui-même (4 joueurs différents), plutôt que d'attendre le vrai contenu sourcé.
- Contenu : 4 cartes embarquées directement dans `index.html` (`QSJ_TEST_CARDS`), sur des joueurs réels et très documentés (Zidane, Ronaldinho, Henry, Iniesta) pour limiter le risque d'erreur factuelle même en test, mais **non vérifiées** au sens du pipeline habituel (pas de sources ni de statut « vérifié » par carte). Clairement commentées dans le code comme données de test à ne jamais confondre avec du contenu réel, conformément à la décision du 2026-09-27 « Claude n'enrichit pas le contenu ».
- Implémentation : reprend telle quelle la fenêtre de Tackle déjà construite pour Transfert (même minuteur, même sifflet, même UI de sélection d'équipe et de réponse) puisque le mécanisme est identique. Testé automatiquement : bonne réponse, mauvaise réponse, passe jusqu'au dernier indice, et Tackle raté après le sifflet — les quatre cas se comportent comme prévu.
- Case décochée par défaut dans l'écran de configuration (contrairement aux autres mini-jeux, cochés par défaut), pour éviter qu'une vraie soirée test tombe sans le vouloir sur seulement 4 cartes fictives à faible variété.
- Non tranché : les vraies cartes sourcées de Qui suis-je restent à écrire par David/ChatGPT ; une fois reçues, elles remplaceront `QSJ_TEST_CARDS` selon le même pipeline que les autres mini-jeux.

## [2026-09-27] Qui suis-je ? : cinq indices fixes, une équipe active et le buzzer de Transfert
- Décision de David : une carte vise un seul joueur mystère et est jouée par **une seule équipe active**. Chaque équipe joue sa propre carte dans la manche.
- Les cinq indices sont révélés un par un dans l'ordre **un club (5 points), un titre gagné (4), le poste (3), un coéquipier (2), la nationalité (1)**. Chaque indice contient une seule information courte.
- L'équipe active répond ou passe à chaque indice. Bonne réponse : points de l'indice et fin de carte. Mauvaise réponse : fin de carte sans point de réponse. Une passe révèle l'indice suivant.
- Le **buzzer de Tackle fonctionne comme sur Transfert** : 12 secondes de jeu exclusif pour l'équipe active, puis coup de sifflet ; la première équipe adverse qui appuie propose sa propre réponse. Bonne réponse : +5 pour elle ; mauvaise réponse : −5. Toute tentative de Tackle termine la carte. Il ne s'agit pas d'une contestation après la réponse de l'équipe active.
- Cette formulation corrige les lectures précédentes où toutes les équipes auraient buzzé simultanément ou où le Tackle aurait attendu la réponse de l'équipe active.

## [2026-09-27] Étendre Plus ou Moins aux trois grands championnats voisins
- Décision de David : ajouter les buts en Liga, Serie A et Ligue 1 à Plus ou Moins, avec 50 joueurs par catégorie comme pour les quatre lots existants.
- Raison : augmenter la variété des comparaisons sans changer la mécanique de jeu.
- Contenu : trois fichiers sourcés et datés, chargés avec les autres catégories ; le jeu dispose ainsi de sept catégories et 350 entrées statistiques.

## [2026-09-27] Tackle binaire : −5 points possibles et révélation différée sur Plus ou Moins
- Décision de David : sur Vrai ou Faux et Plus ou Moins, l'équipe active verrouille d'abord sa réponse. Une autre équipe peut alors tackler immédiatement, avant la révélation, sans attendre le délai ou le sifflet propre à Transfert. Un seul Tackle est retenu par affirmation ; il conteste la réponse active sans fournir d'autre réponse.
- Score : si la réponse active est fausse, le tackleur reçoit **+5** ; si elle est juste, il reçoit **−5**. Le score général peut devenir **négatif**, y compris lorsque le tackleur part de zéro. La cagnotte de l'équipe active suit sa règle normale.
- État de l'implémentation : Vrai ou Faux applique déjà −5 sans plancher à zéro. Plus ou Moins doit encore intercaler une étape « réponse verrouillée → Tackle ou révélation » avant d'afficher la valeur. Cette décision précise et remplace les mentions antérieures selon lesquelles le Tackle sur Plus ou Moins restait à définir.
- Le mode de partie s'appelle **Tackle** ; sa configuration reste celle déjà en place.

## [2026-09-27] Claude n'enrichit pas le contenu : les données arrivent déjà prêtes
- Décision : David précise que Claude ne doit pas produire ou compléter lui-même le contenu football (statistiques, affirmations, fiches joueurs) — ce travail est fait en amont par David/ChatGPT, et les fichiers de données arrivent déjà constitués. Le rôle de Claude sur le contenu se limite à l'intégration technique (conversion, schéma, chargement en jeu) et à un contrôle de cohérence avant mise en jeu, pas à la génération ou à l'enrichissement des faits eux-mêmes.
- Raison : garder une séparation nette avec la règle déjà en place (aucune génération ou jugement d'IA sur les faits footballistiques) et éviter toute ambiguïté sur qui produit le contenu.
- Impact : sans changement sur le pipeline technique déjà en place (vérification automatique de cohérence + chargement des seules entrées « vérifié ») ; à appliquer aux prochains lots de données reçus.

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
