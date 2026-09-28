# GAME_DESIGN.md

État actuel et officiel des règles validées. Les questions ouvertes figurent dans `TODO.md` ; les raisons des choix figurent dans `DECISIONS.md`.

## Concept

Une plateforme de mini-jeux autour du football, à jouer entre amis. Les mini-jeux peuvent demander des réponses uniques, plusieurs réponses valables, de la rapidité ou de l'interaction sociale. Chacun définit ses propres règles de réponse, de difficulté et de score.

## Plateforme et configuration d'une partie

La première version se joue sur **un seul téléphone**. Une version où chaque joueur dispose d'un téléphone reste envisageable plus tard ; elle ne fait pas partie du prototype actuel.

Avant de commencer, les joueurs choisissent :
1. **1 à 4 équipes** ;
2. **5, 10 ou 20 manches** ;
3. les mini-jeux à inclure.

Tous les mini-jeux disponibles sont sélectionnés par défaut. Les joueurs peuvent en retirer, mais doivent en garder au moins un. Si un seul jeu est sélectionné, la partie utilise uniquement ce jeu. Chaque carte est tirée au hasard lorsqu'une équipe doit jouer ; un même joueur, voire une même carte, peut revenir dans la même partie.

Une **manche est un tour complet** : un mini-jeu est choisi parmi ceux inclus dans la partie, puis **chaque équipe joue une carte de ce mini-jeu, tirée séparément au hasard**. Ainsi, avec 3 équipes et 5 manches, chacune joue 5 cartes. L'ordre des équipes peut tourner entre les manches. Les équipes cumulent leurs points ; le classement final s'affiche après le nombre de manches choisi.

## Premier mini-jeu : Transfert

### But et contenu d'une carte

Une équipe cherche le nom d'un footballeur à partir des clubs de sa carrière. Une carte vise **un seul joueur**. Chaque indice affiche un club et les années du passage, dans l'ordre chronologique. Un prêt et un retour dans un club sont indiqués explicitement.

Une carte comporte au maximum cinq passages. Si la carrière en compte davantage, les passages retenus conservent leur ordre réel et la carte précise qu'il s'agit d'extraits de carrière. Les clubs et les dates sont vérifiés avant la mise en jeu.

Un joueur ayant connu un seul club peut aussi faire l'objet d'une carte : le club et ses années constituent alors l'unique indice.

### Déroulé sur un téléphone

Une équipe cherche la réponse. Avec 2 à 4 équipes, **l'équipe suivante dans l'ordre des équipes tient le téléphone** et révèle les indices : A joue / B tient, puis B joue / C tient, puis C joue / A tient (avec trois équipes). Ainsi, l'équipe qui cherche ne tient pas l'appareil pendant sa carte. Avec une seule équipe, les joueurs utilisent le téléphone eux-mêmes. La réponse n'est montrée à personne avant la vérification de la tentative ou la fin de la carte.

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

Le jeu s'appelle **TACKLE**. Pendant chaque indice, événement, comparaison ou affirmation, un **bouton Tackle unique reste visible**. Il est grisé pendant les **30 premières secondes**, réservées à l'équipe active. Un coup de sifflet ouvre ensuite **15 secondes** pendant lesquelles l'équipe active peut encore répondre et la première équipe adverse à appuyer sur Tackle obtient l'unique tentative adverse. Le compte à rebours repart à chaque nouvel indice de Transfert et Qui suis-je, à chaque événement de Le Match et à chaque nouvelle comparaison ou affirmation de Plus ou Moins et Vrai ou Faux. Le premier appui sur « Répondre » ou « Tackle » verrouille la tentative pendant sa saisie sur le téléphone. Avec une seule équipe, le bouton reste grisé et aucune équipe ne peut tackler.

**Transfert, Qui suis-je et Le Match :** le tackleur donne sa propre réponse. L'enjeu suit le **palier de l'indice ou de l'événement en cours** (5, 4, 3, 2 puis 1 point, comme le mini-jeu lui-même) : s'il a raison, il gagne ce nombre de points ; s'il se trompe, il les perd. Dans les deux cas, la carte s'arrête. Si personne ne répond au bout de 45 secondes, le jeu passe automatiquement à l'indice ou à l'événement suivant ; après le dernier, il révèle la réponse et termine la carte. Une réponse de l'équipe active conserve les points et pénalités propres au mini-jeu.

**Plus ou Moins et Vrai ou Faux :** l'enjeu du Tackle sur ces deux jeux est un **forfait fixe de 3 points** (et non le palier de la cagnotte), que ce soit en contestation ou en réponse à l'aveugle. Si l'équipe active verrouille sa réponse avant la fin du délai, le bouton Tackle s'ouvre immédiatement pour une **contestation de 5 secondes** avant révélation. Le premier adversaire qui l'utilise affirme que la réponse active est fausse, sans donner sa propre option : **+3** si elle est fausse, **−3** si elle est juste. Le résultat de la réponse active suit ensuite la règle normale de la cagnotte. Si l'équipe active n'a pas répondu après 30 secondes, la fenêtre de 15 secondes permet au premier adversaire de donner **sa propre réponse** (PLUS/MOINS ou VRAI/FAUX) : bonne réponse, il gagne **+3** et l'équipe active perd sa cagnotte ; mauvaise réponse, il perd **−3** et l'équipe active encaisse sa cagnotte. La carte s'arrête dans les deux cas. Si personne ne répond au bout de 45 secondes, la carte s'arrête et l'équipe active encaisse sa cagnotte en cours. Le Tackle ne s'applique jamais à ENCAISSER ou CONTINUER ; les scores généraux peuvent être négatifs.

## Troisième mini-jeu : Vrai ou Faux

Remplace l'ancien concept « Le Faux ». Une carte présente jusqu'à **5 affirmations football**, une par une. L'équipe active répond **VRAI** ou **FAUX** à chaque affirmation, avec la même mécanique de cagnotte que Plus ou Moins : chaque bonne réponse fait progresser le gain potentiel (1, 2, 3, 4, puis 5 points) et l'équipe choisit ensuite **ENCAISSER** ou **CONTINUER** ; une mauvaise réponse avant encaissement fait perdre toute la cagnotte de la carte ; la cinquième bonne réponse encaisse automatiquement 5 points.

**Tackle sur ce jeu :** appliquer la fenêtre commune de 30 + 15 secondes et, après une réponse active, la contestation de 5 secondes décrites ci-dessus. Les cinq affirmations gardent leur cagnotte de 1 à 5 points.

Le contenu provient d'un jeu de 2 000 affirmations (1 000 vraies, 1 000 fausses) préparé par David, dérivées de données déjà vérifiées (années de naissance, tailles, pied fort, poste, ordre des clubs, ville de naissance, débuts professionnels) avec sources par affirmation. Chaque fait dispose d'une version vraie et d'une version fausse regroupées par un identifiant commun, pour ne jamais réunir deux énoncés sur le même fait dans une même carte. Implémenté dans `index.html` (`src/data/vraifaux-statements.json`).

## Quatrième mini-jeu prévu : Qui suis-je ?

Une carte porte sur **un seul joueur mystère** et appartient à **une seule équipe active**. Comme dans les autres mini-jeux, chaque équipe joue sa propre carte pendant la manche. Les autres équipes ne répondent qu'en tentant le **Tackle**, selon le même déclenchement que sur Transfert.

Les cinq indices sont révélés un par un, toujours dans cet ordre fixe. Chaque indice apporte **une seule information courte** :

1. **Un club où le joueur a joué** — bonne réponse : **5 points**.
2. **Une coupe ou un championnat qu'il a gagné** — **4 points**.
3. **Son poste** — **3 points**.
4. **Un coéquipier avec qui il a joué** — **2 points**.
5. **Sa nationalité** — **1 point**.

À chaque indice, l'équipe active peut donner **une seule réponse** ou **passer**. Passer révèle l'indice suivant sans pénalité. Une bonne réponse rapporte les points de l'indice et termine la carte. Une mauvaise réponse retire **1 point** du score général et révèle l'indice suivant — la carte continue, comme sur Transfert. La réponse de l'équipe active est vérifiée immédiatement. Après une mauvaise réponse ou une passe au dernier indice, la carte se termine et révèle le joueur ; les pénalités se cumulent, le résultat net d'une carte peut être négatif.

**Tackle sur ce jeu :** le bouton commun se réinitialise à chaque indice. Après 30 secondes, le premier adversaire peut proposer le joueur pendant 15 secondes. Une tentative de Tackle, réussie ou ratée, termine la carte ; sans réponse, l'indice suivant arrive automatiquement.

Les cinq indices d'une carte sont préparés, sourcés et relus **dans cet ordre** avant mise en jeu. La nature fixe des indices ne garantit pas à elle seule une difficulté croissante : il faut vérifier que chaque nouvelle information rend effectivement le joueur plus identifiable dans le contexte des indices déjà révélés.

## Cinquième mini-jeu : Le Match

Une carte vise un match de football. **La compétition seule** est affichée dès le départ, sans année ni édition. Cinq événements vérifiés de ce match apparaissent ensuite **strictement dans l'ordre chronologique du match**, sans être réordonnés selon leur difficulté. Leurs valeurs sont successivement **5, 4, 3, 2 et 1 point**. Une seule équipe active joue la carte ; elle cherche à nommer **les deux équipes du match**, acceptées dans n'importe quel ordre, après chaque événement. Les autres équipes ne participent que par le Tackle.

**Tackle sur Le Match :** le délai commun de 30 + 15 secondes repart à chaque nouvel événement. La première équipe adverse qui appuie après le sifflet donne les deux équipes du match, pour l'enjeu de l'événement en cours (5, 4, 3, 2 puis 1 point) : elle le gagne si elle trouve, le perd sinon. Sa tentative termine la carte ; si personne ne répond au bout de 45 secondes, l'événement suivant apparaît.

Comme sur Qui suis-je, après chaque événement l'équipe active peut donner **une seule réponse** ou **passer**. Une mauvaise réponse retire **1 point** de son score général puis révèle l'événement suivant ; une passe révèle l'événement suivant sans pénalité. Après une mauvaise réponse ou une passe au cinquième événement, la carte se termine et les deux équipes du match sont révélées. Les pénalités de mauvaises réponses se cumulent. Les matchs sélectionnés doivent comporter cinq événements suffisamment distincts et sourcés ; leur identification réelle sera testée en partie.

**Statut :** mini-jeu implémenté dans `index.html` avec **103 fiches sourcées marquées comme lues** dans `src/data/lematch-cards.json` ; les cartes restent à éprouver en partie et les erreurs éventuelles à corriger. Le Match est sélectionné par défaut.

## Contenus et difficulté

Les cartes sont préparées et leurs faits vérifiés par un agent avant d'être intégrées. La vérification des faits se fait en amont, pas par une génération ou un jugement d'IA pendant la partie. La difficulté réelle des cartes sera ajustée à partir des parties jouées et documentées dans `PLAYTESTS.md`.

## Économie, progression, direction artistique

À définir. Aucun de ces éléments n'est requis pour le premier prototype.

## Périmètre du premier prototype

Le premier prototype comprend la configuration des équipes et de la partie, le score et le classement, ainsi que **Transfert, Plus ou Moins, Vrai ou Faux, Qui suis-je et Le Match**, avec le Tackle transversal. Le jeu à plusieurs téléphones n'entre pas dans ce premier périmètre.
