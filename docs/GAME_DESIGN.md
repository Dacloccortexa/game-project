# GAME_DESIGN.md

État actuel et officiel des règles validées. Les questions ouvertes figurent dans `TODO.md` ; les raisons des choix figurent dans `DECISIONS.md`.

## Concept

Une plateforme de mini-jeux autour du football, à jouer entre amis. Les mini-jeux peuvent demander des réponses uniques, plusieurs réponses valables, de la rapidité ou de l'interaction sociale. Chacun définit ses propres règles de réponse, de difficulté et de score.

## Plateforme et configuration d'une partie

La première version se joue sur **un seul téléphone**. Une version où chaque joueur dispose d'un téléphone reste envisageable plus tard ; elle ne fait pas partie du prototype actuel.

Avant de commencer, les joueurs choisissent :
1. **1 à 4 équipes** ;
2. **5, 10, 15 ou 20 manches** ;
3. les mini-jeux à inclure (présentés comme « défis » dans l'interface).

Tous les mini-jeux disponibles sont sélectionnés par défaut. Les joueurs peuvent en retirer, mais doivent en garder au moins un. Si un seul jeu est sélectionné, la partie utilise uniquement ce jeu. Chaque carte est tirée au hasard lorsqu'une équipe doit jouer ; un même joueur, voire une même carte, peut revenir dans la même partie.

Une **manche est un tour complet** : un mini-jeu est tiré au hasard parmi ceux inclus dans la partie, **jamais le même que celui de la manche précédente** (sauf si un seul est sélectionné), puis **chaque équipe joue une carte de ce mini-jeu, tirée séparément au hasard**. Ainsi, avec 3 équipes et 5 manches, chacune joue 5 cartes. L'ordre des équipes peut tourner entre les manches. Les équipes cumulent leurs points ; le classement final s'affiche après le nombre de manches choisi.

## Premier mini-jeu : Transfert

### But et contenu d'une carte

Une équipe cherche le nom d'un footballeur à partir des clubs de sa carrière. Une carte vise **un seul joueur**. Chaque indice affiche un club et les années du passage, dans l'ordre chronologique. Un prêt et un retour dans un club sont indiqués explicitement.

Une carte comporte au maximum cinq passages. Si la carrière en compte davantage, les passages retenus conservent leur ordre réel et la carte précise qu'il s'agit d'extraits de carrière. Les clubs et les dates sont vérifiés avant la mise en jeu.

Un joueur ayant connu un seul club peut aussi faire l'objet d'une carte : le club et ses années constituent alors l'unique indice.

### Déroulé sur un téléphone

Une équipe cherche la réponse. **Aucune rotation du téléphone n'est imposée** : l'équipe active, une autre personne ou un maître du jeu peut le tenir. La personne qui manipule le téléphone révèle les indices et saisit la réponse annoncée par l'équipe active ; cette équipe relit et confirme le nom avant l'envoi. Le détenteur du téléphone n'a aucun droit particulier sur la réponse ; en revanche, c'est lui qui arbitre la course au Tackle (voir « Qui a tacklé en premier ? »). La réponse attendue reste cachée jusqu'à la vérification de la tentative ou la fin de la carte.

À chaque indice, l'équipe qui cherche choisit **une réponse** ou passe :
- Bonne réponse : les points affichés sont ajoutés au score de l'équipe et la carte se termine.
- Mauvaise réponse : **1 point est immédiatement retiré du score général** de l'équipe, puis l'indice suivant apparaît. Une seule tentative est autorisée par indice.
- Passe : l'indice suivant apparaît sans pénalité.

Après le dernier indice, une mauvaise réponse ou une passe termine la carte et révèle le joueur. Les pénalités se cumulent ; le résultat net d'une carte peut être négatif.

### Réponses acceptées

Chaque carte possède un nom attendu et une liste de variantes vérifiées pour ce joueur. La comparaison ignore les majuscules et les accents et **tolère les fautes de frappe** : une réponse tapée est acceptée si elle est assez proche (au sens du nombre de lettres à ajouter/retirer/changer) d'une réponse valide, avec une tolérance qui grandit avec la longueur du mot (1 lettre pour un mot court, jusqu'à 3 pour un mot long). Une variante volontairement différente (un autre nom, un surnom non prévu) doit toujours être ajoutée explicitement à la carte. Avant de soumettre la réponse, l'équipe qui cherche voit et confirme le texte saisi sur le téléphone. S'applique à Transfert, à Qui suis-je et au Tackle sur ces deux jeux.

### Points

Les indices successifs valent **5, 4, 3, 2, puis 1 point**. Une carte plus courte s'arrête après son dernier indice.

Pour une carte à club unique, l'unique indice vaut **5 points** : bonne réponse +5, mauvaise réponse −1, passe 0.

## Deuxième mini-jeu prévu : Plus ou Moins

Une carte utilise **une seule statistique** et une chaîne de **six joueurs** : elle propose exactement **cinq comparaisons PLUS ou MOINS au maximum**. La valeur du premier joueur est affichée. Pour chacun des cinq suivants, l'équipe prédit si sa valeur est strictement supérieure ou inférieure à celle du joueur qui sert alors de référence. Après la validation de PLUS ou MOINS, la réponse reste verrouillée pendant l'étape de Tackle ; la vraie valeur n'est révélée qu'ensuite. En cas de réussite, ce joueur devient la nouvelle référence. Deux joueurs consécutifs d'une chaîne n'ont jamais la même valeur.

Une mauvaise réponse termine la carte avec **0 point**. Après chaque bonne réponse, l'équipe possède autant de points potentiels que de comparaisons réussies (de 1 à 5) et choisit **ENCAISSER** ou **CONTINUER**. Encaisser ajoute ces points au score et termine la carte ; continuer met tous les points potentiels en jeu. Une erreur ultérieure fait perdre tous les points potentiels de cette carte. Après la cinquième bonne réponse, les **5 points sont encaissés automatiquement**.

Le contenu actuel couvre sept catégories : **buts en Premier League**, **buts en Ligue des champions**, **buts en Coupe du monde**, **sélections en équipe nationale**, **buts en Liga**, **buts en Serie A** et **buts en Ligue 1**. Chacune contient **50 entrées joueur + valeur**, soit 350 entrées statistiques ; un même joueur peut figurer dans plusieurs catégories. Chaque nouveau lot conserve la source, le périmètre du chiffre et sa date d'arrêté. Les joueurs encore actifs doivent être réactualisés avant une vraie partie test.

Les chaînes sont construites à partir de cette base avec des valeurs voisines sans être égales, quelques surprises et un ordre qui évite les comparaisons évidentes ou une suite prévisible de PLUS ou de MOINS. Leur difficulté sera ajustée en partie test. Plus ou Moins est intégré dans le cadre commun de configuration des équipes, des manches et du score.

## Mécanique transversale : le Tackle

Le jeu s'appelle **TACKLE**. Pendant chaque indice, événement, comparaison ou affirmation, un **bouton Tackle unique** apparaît au sifflet. Les **30 premières secondes** sont réservées à l'équipe active (bande « Priorité aux … » avec le temps restant ; le bouton est caché). Un double sifflet bref, rappelant un coup d'envoi, accompagne le départ de chaque chrono de 30 secondes. Un sifflet unique plus marqué ouvre ensuite les **5 secondes** de Tackle (15 s jusqu'au 2026-10-03) : **c'est une course pour toutes les équipes, y compris l'équipe active**. Pendant ces 5 secondes, « Répondre » et « Passer » disparaissent ; il ne reste que le bouton Tackle. La première équipe à crier « Tackle » obtient l'unique tentative : la personne qui manipule le téléphone appuie sur le bouton, puis choisit cette équipe à l'écran. **Si c'est l'équipe active qui gagne la course**, elle répond normalement, avec ses points et pénalités habituels (points de l'indice ou de l'événement, cagnotte de Plus ou Moins / Vrai ou Faux), et non l'enjeu du Tackle. **Si c'est une équipe adverse**, elle joue l'enjeu du Tackle. Si personne ne tacle pendant les 5 secondes, l'indice ou l'événement suivant arrive tout seul (fin de carte avec cagnotte encaissée sur Plus ou Moins et Vrai ou Faux). Le chrono est suspendu pendant ce choix et la saisie de sa réponse. Le compte à rebours repart à chaque nouvel indice de Transfert et Qui suis-je, à chaque événement de Le Match et à chaque nouvelle comparaison ou affirmation de Plus ou Moins et Vrai ou Faux. Le premier appui sur « Répondre » ou « Tackle » verrouille la tentative pendant sa saisie sur le téléphone. Avec une seule équipe, il n'y a pas de bouton Tackle.

**Tackle après une passe (2026-10-03) :** sur Transfert, Qui suis-je et Le Match, quand l'équipe active appuie sur « Passer », le bouton Tackle surgit aussitôt pendant **5 secondes**, réservé aux **adversaires** (l'équipe qui a passé n'apparaît pas dans « Qui a tacklé ? »), avec l'enjeu de l'indice passé. Personne ne tacle : l'indice suivant arrive. Une équipe adverse ne peut toujours tacler qu'une fois par carte ; si aucun adversaire ne le peut (partie à une équipe, ou tous ont déjà raté), l'indice suivant arrive tout de suite. But : qu'on ne puisse plus passer en une seconde pour priver les adversaires de leur Tackle (journal du 1er–2 octobre).

**Chrono de réponse :** une équipe qui a la main pour répondre (« Répondre », Tackle, course gagnée) a **15 secondes** pour valider sa réponse. Passé ce délai, la réponse compte comme fausse, avec les pénalités habituelles.

**Qui a tacklé en premier ?** Le Tackle s'annonce à voix haute, donc plusieurs équipes peuvent réclamer la priorité. **La personne qui tient le téléphone arbitre** : elle choisit à l'écran l'équipe qui a crié « Tackle » la première (l'équipe active apparaît en tête de liste avec la mention « À la main »), et sa décision ne se discute pas. Si elle ne peut vraiment pas trancher, le bouton **« Litige : tirage au sort »** (toujours proposé, puisque au moins 2 équipes sont dans la course) coche d'office toutes les équipes ; l'arbitre décoche celles qui ne réclament pas (il en faut au moins 2), puis **« Tirer au sort »** lance une courte roulette et l'équipe tirée joue le Tackle normalement. Le chrono reste arrêté pendant le litige et le tirage. Le tirage est noté dans le journal de partie.

**Transfert, Qui suis-je et Le Match :** le tackleur donne sa propre réponse. L'enjeu suit le **palier de l'indice en cours** (5, 4, 3, 2 puis 1 point, comme le mini-jeu lui-même) : s'il a raison, il gagne ce nombre de points et la carte s'arrête. **S'il se trompe, il les perd et la carte continue** : la main revient à l'équipe active, qui passe à l'indice suivant avec un nouveau chrono (30 s de priorité puis 5 s de course). **Une équipe adverse ne peut tacler qu'une fois par carte** : après un Tackle raté, elle n'apparaît plus dans « Qui a tacklé ? » jusqu'à la carte suivante ; les autres équipes adverses peuvent encore tacler. Si le Tackle raté tombe sur le dernier indice, la réponse est révélée et la carte se termine. Si personne ne répond au bout de 35 secondes, le jeu passe automatiquement à l'indice suivant ; après le dernier, il révèle la réponse et termine la carte. Une réponse de l'équipe active conserve les points et pénalités propres au mini-jeu.

**Plus ou Moins et Vrai ou Faux :** même mécanique que sur les autres défis. Le bouton Tackle commun suit le rythme de 30 + 5 secondes à chaque comparaison ou affirmation. **Pendant les 30 premières secondes, dès que l'équipe active répond (PLUS/MOINS ou VRAI/FAUX), le chrono s'arrête et sa réponse est révélée immédiatement** : plus de Tackle sur cette comparaison ou affirmation. Après le sifflet, c'est la course commune : l'équipe active n'a plus ses boutons et doit gagner le Tackle pour répondre (avec sa cagnotte habituelle). Le premier adversaire qui gagne la course donne **sa propre réponse** : **+3** s'il trouve et l'équipe active perd sa cagnotte, **−3** sinon et l'équipe active encaisse sa cagnotte ; la carte s'arrête dans les deux cas. Si personne ne répond ni ne tackle au bout des 35 secondes, la cagnotte déjà accumulée est encaissée et la carte s'arrête. L'enjeu du Tackle sur ces deux jeux est un **forfait fixe de 3 points** (et non le palier de la cagnotte). Le Tackle ne s'applique jamais à ENCAISSER ou CONTINUER ; les scores généraux peuvent être négatifs.

## Troisième mini-jeu : Vrai ou Faux

Remplace l'ancien concept « Le Faux ». Une carte présente jusqu'à **5 affirmations football**, une par une. L'équipe active répond **VRAI** ou **FAUX** à chaque affirmation, avec la même mécanique de cagnotte que Plus ou Moins : chaque bonne réponse fait progresser le gain potentiel (1, 2, 3, 4, puis 5 points) et l'équipe choisit ensuite **ENCAISSER** ou **CONTINUER** ; une mauvaise réponse avant encaissement fait perdre toute la cagnotte de la carte ; la cinquième bonne réponse encaisse automatiquement 5 points.

**Tackle sur ce jeu :** applique la fenêtre commune de 30 + 5 secondes décrite ci-dessus, sans fenêtre séparée. Les cinq affirmations gardent leur cagnotte de 1 à 5 points.

Le contenu provient d'un jeu de 2 000 affirmations (1 000 vraies, 1 000 fausses) préparé par David, dérivées de données déjà vérifiées (années de naissance, tailles, pied fort, poste, ordre des clubs, ville de naissance, débuts professionnels) avec sources par affirmation. Chaque fait dispose d'une version vraie et d'une version fausse regroupées par un identifiant commun, pour ne jamais réunir deux énoncés sur le même fait dans une même carte. Implémenté dans `index.html` (`src/data/vraifaux-statements.json`).

## Quatrième mini-jeu prévu : Qui suis-je ?

Une carte porte sur **un seul joueur mystère** et appartient à **une seule équipe active**. Comme dans les autres mini-jeux, chaque équipe joue sa propre carte pendant la manche. Les autres équipes ne répondent qu'en tentant le **Tackle**, selon le même déclenchement que sur Transfert.

Les cinq indices sont révélés un par un et valent **5, 4, 3, 2 puis 1 point**. Chaque indice apporte **une seule information courte** : un club où le joueur a joué, un titre qu'il a gagné, son poste, un coéquipier ou sa nationalité. **L'ordre de ces cinq catégories est choisi pour chaque carte** selon ce que les joueurs peuvent déduire des indices déjà révélés : les premiers doivent permettre une tentative difficile mais plausible, et les derniers doivent aider à départager les réponses encore possibles. Aucun ordre de catégories n'est imposé à toutes les cartes.

À chaque indice, l'équipe active peut donner **une seule réponse** ou **passer**. Passer révèle l'indice suivant sans pénalité. Une bonne réponse rapporte les points de l'indice et termine la carte. Une mauvaise réponse retire **1 point** du score général et révèle l'indice suivant — la carte continue, comme sur Transfert. La réponse de l'équipe active est vérifiée immédiatement. Après une mauvaise réponse ou une passe au dernier indice, la carte se termine et révèle le joueur ; les pénalités se cumulent, le résultat net d'une carte peut être négatif.

**Tackle sur ce jeu :** le bouton commun se réinitialise à chaque indice. Après 30 secondes, le premier adversaire peut proposer le joueur pendant 5 secondes (et 5 s après chaque passe). Un Tackle réussi termine la carte ; un Tackle raté coûte le palier à l'équipe qui tacle, puis l'équipe active reprend la main à l'indice suivant (une seule tentative par équipe adverse et par carte). Sans réponse, l'indice suivant arrive automatiquement.

Les cinq indices d'une carte sont préparés, sourcés et relus **dans l'ordre propre à cette carte** avant mise en jeu. La relecture cherche des joueurs concurrents plausibles, y compris hors du lot de 100 cartes ; si plusieurs réponses restent valables après le cinquième indice, un fait doit être remplacé ou la carte retirée. L'ordre seul ne garantit pas une difficulté équilibrée : la répartition des bonnes réponses par palier doit être retestée en partie.

## Cinquième mini-jeu : Le Match

Une carte vise un match de football. Une seule équipe active cherche à nommer **les deux équipes du match**, acceptées dans n'importe quel ordre. Elle reçoit **cinq indices dans cet ordre fixe** :

1. **La compétition** — 5 points (par exemple « Coupe du monde »), sans édition ni année.
2. **L'année du match** — 4 points.
3. **Le score final** — 3 points, sans nom d'équipe.
4. **La ville où le match s'est joué** — 2 points.
5. **Le stade de la compétition** — 1 point (finale ou demi-finale dans le lot actuel ; il s'agit de la phase, pas du nom du stade où se joue le match).

L'équipe active peut répondre ou passer après chaque indice. Les autres équipes ne participent que par le Tackle. Le délai commun de 30 secondes de priorité puis 5 secondes de course repart (passer ouvre aussi 5 s de Tackle aux adversaires) à chaque nouvel indice.

**Tackle sur Le Match :** la première équipe adverse qui annonce un Tackle après le sifflet donne les deux équipes du match, pour l'enjeu de l'indice en cours (5, 4, 3, 2 puis 1 point) : elle le gagne si elle trouve, le perd sinon. Un Tackle réussi termine la carte ; un Tackle raté coûte le palier à l'équipe qui tacle, puis l'équipe active reprend la main à l'indice suivant (une seule tentative par équipe adverse et par carte). Si personne ne répond au bout de 35 secondes, l'indice suivant apparaît.

Une mauvaise réponse de l'équipe active retire **1 point** de son score général puis révèle l'indice suivant ; une passe révèle l'indice suivant sans pénalité. Après une mauvaise réponse ou une passe au cinquième indice, la carte se termine et les deux équipes du match sont révélées. Les pénalités de mauvaises réponses se cumulent.

**Statut au 2 octobre 2026 :** cette nouvelle suite d'indices est intégrée à `index.html` après un essai avec les neveux de David, qui ont trouvé les événements chronologiques trop difficiles. Les 103 fiches de `src/data/lematch-cards.json` possèdent désormais une ville sourcée ; les anciens événements restent dans le fichier comme archive, sans être affichés en partie. Le Match reste sélectionné par défaut. La difficulté de cette version doit être retestée en partie.

## Contenus et difficulté

Les cartes sont préparées et leurs faits vérifiés par un agent avant d'être intégrées. La vérification des faits se fait en amont, pas par une génération ou un jugement d'IA pendant la partie. La difficulté réelle des cartes sera ajustée à partir des parties jouées et documentées dans `PLAYTESTS.md`.

## Économie, progression, direction artistique

À définir. Aucun de ces éléments n'est requis pour le premier prototype.

## Périmètre du premier prototype

Le premier prototype comprend la configuration des équipes et de la partie, le score et le classement, ainsi que **Transfert, Plus ou Moins, Vrai ou Faux, Qui suis-je et Le Match**, avec le Tackle transversal. Le jeu à plusieurs téléphones n'entre pas dans ce premier périmètre.
