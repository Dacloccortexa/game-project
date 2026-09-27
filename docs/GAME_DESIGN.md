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

Chaque carte possède un nom attendu et une liste de variantes vérifiées pour ce joueur. La comparaison ignore les majuscules et les accents. Elle n'applique **aucune correction automatique des fautes** : une variante supplémentaire doit être vérifiée et ajoutée à la carte. Avant de soumettre la réponse, l'équipe qui cherche voit et confirme le texte saisi sur le téléphone.

### Points

Les indices successifs valent **5, 4, 3, 2, puis 1 point**. Une carte plus courte s'arrête après son dernier indice.

Pour une carte à club unique, l'unique indice vaut **5 points** : bonne réponse +5, mauvaise réponse −1, passe 0.

## Deuxième mini-jeu prévu : Plus ou Moins

Une carte utilise **une seule statistique** et une chaîne de **six joueurs** : elle propose exactement **cinq comparaisons PLUS ou MOINS au maximum**. La valeur du premier joueur est affichée. Pour chacun des cinq suivants, l'équipe prédit si sa valeur est strictement supérieure ou inférieure à celle du joueur qui sert alors de référence. Après la validation de PLUS ou MOINS, la réponse reste verrouillée pendant l'étape de Tackle ; la vraie valeur n'est révélée qu'ensuite. En cas de réussite, ce joueur devient la nouvelle référence. Deux joueurs consécutifs d'une chaîne n'ont jamais la même valeur.

Une mauvaise réponse termine la carte avec **0 point**. Après chaque bonne réponse, l'équipe possède autant de points potentiels que de comparaisons réussies (de 1 à 5) et choisit **ENCAISSER** ou **CONTINUER**. Encaisser ajoute ces points au score et termine la carte ; continuer met tous les points potentiels en jeu. Une erreur ultérieure fait perdre tous les points potentiels de cette carte. Après la cinquième bonne réponse, les **5 points sont encaissés automatiquement**.

Le contenu actuel couvre sept catégories : **buts en Premier League**, **buts en Ligue des champions**, **buts en Coupe du monde**, **sélections en équipe nationale**, **buts en Liga**, **buts en Serie A** et **buts en Ligue 1**. Chacune contient **50 entrées joueur + valeur**, soit 350 entrées statistiques ; un même joueur peut figurer dans plusieurs catégories. Chaque nouveau lot conserve la source, le périmètre du chiffre et sa date d'arrêté. Les joueurs encore actifs doivent être réactualisés avant une vraie partie test.

Les chaînes sont construites à partir de cette base avec des valeurs voisines sans être égales, quelques surprises et un ordre qui évite les comparaisons évidentes ou une suite prévisible de PLUS ou de MOINS. Leur difficulté sera ajustée en partie test. Plus ou Moins sera intégré après Transfert, dans le cadre commun de configuration des équipes, des manches et du score.

## Mécanique transversale : le Tackle

Le jeu s'appelle **TACKLE**. Le Tackle est une règle commune à la plateforme : pendant le tour d'une équipe, une équipe adverse peut interrompre pour tenter de gagner ou perdre des points, sans attendre son propre tour. Chaque mini-jeu définit précisément comment le Tackle s'y applique ; ce n'est pas un comportement générique automatique.

**Sur Transfert (implémenté) :** l'équipe active joue seule pendant 12 secondes. Passé ce délai, un signal sonore (coup de sifflet) ouvre la fenêtre de Tackle pour les autres équipes (toutes sauf l'équipe active). La première équipe à appuyer sur Tackle propose une réponse unique : bonne réponse, elle gagne 5 points et l'équipe active perd le contrôle de la carte ; mauvaise réponse, elle perd 5 points. Dans tous les cas, une tentative de Tackle termine définitivement la carte en cours (elle ne reprend pas pour l'équipe active). La durée de 12 secondes est un point de départ, ajustable en playtest.

**Sur Vrai ou Faux (prévu, non implémenté) :** la fenêtre de Tackle s'ouvre immédiatement après la réponse verrouillée de l'équipe active, avant révélation ; il n'y a ni délai préalable ni sifflet. Voir la section dédiée ci-dessous.

**Sur Plus ou Moins (à implémenter) :** dès que l'équipe active a verrouillé PLUS ou MOINS, une autre équipe peut annoncer Tackle avant la révélation. La première équipe adverse à le faire conteste la réponse, sans donner une autre option. Si la réponse active est fausse, elle gagne +5 ; si elle est juste, elle perd −5. Il n'y a ni délai préalable ni sifflet. Le score général peut devenir négatif.

## Troisième mini-jeu : Vrai ou Faux

Remplace l'ancien concept « Le Faux ». Une carte présente jusqu'à **5 affirmations football**, une par une. L'équipe active répond **VRAI** ou **FAUX** à chaque affirmation, avec la même mécanique de cagnotte que Plus ou Moins : chaque bonne réponse fait progresser le gain potentiel (1, 2, 3, 4, puis 5 points) et l'équipe choisit ensuite **ENCAISSER** ou **CONTINUER** ; une mauvaise réponse avant encaissement fait perdre toute la cagnotte de la carte ; la cinquième bonne réponse encaisse automatiquement 5 points.

**Tackle sur ce jeu :** une fois que l'équipe active a donné sa réponse à une affirmation, mais **avant que le jeu ne révèle si elle a raison**, une autre équipe peut tenter un Tackle en pariant que l'équipe active se trompe (une seule tentative par affirmation). Tackle correct : le tackleur gagne 5 points et l'équipe active perd immédiatement toute sa cagnotte en cours pour cette carte. Tackle incorrect : le tackleur perd 5 points, même si son score général passe sous zéro, et le tour de l'équipe active continue normalement — son choix ENCAISSER/CONTINUER n'est pas affecté par un Tackle raté. Avec une seule équipe, personne ne peut tackler : la réponse est révélée immédiatement.

Le contenu provient d'un jeu de 2 000 affirmations (1 000 vraies, 1 000 fausses) préparé par David, dérivées de données déjà vérifiées (années de naissance, tailles, pied fort, poste, ordre des clubs, ville de naissance, débuts professionnels) avec sources par affirmation. Chaque fait dispose d'une version vraie et d'une version fausse regroupées par un identifiant commun, pour ne jamais réunir deux énoncés sur le même fait dans une même carte. Implémenté dans `index.html` (`src/data/vraifaux-statements.json`).

## Quatrième mini-jeu prévu : Qui suis-je ?

Une carte porte sur **un seul joueur mystère** et appartient à **une seule équipe active**. Comme dans les autres mini-jeux, chaque équipe joue sa propre carte pendant la manche. Les autres équipes ne répondent qu'en tentant le **Tackle**, selon le même déclenchement que sur Transfert.

Les cinq indices sont révélés un par un, toujours dans cet ordre fixe. Chaque indice apporte **une seule information courte** :

1. **Un club où le joueur a joué** — bonne réponse : **5 points**.
2. **Une coupe ou un championnat qu'il a gagné** — **4 points**.
3. **Son poste** — **3 points**.
4. **Un coéquipier avec qui il a joué** — **2 points**.
5. **Sa nationalité** — **1 point**.

À chaque indice, l'équipe active peut donner **une seule réponse** ou **passer**. Passer révèle l'indice suivant sans pénalité. Une bonne réponse rapporte les points de l'indice et termine la carte ; une mauvaise réponse termine la carte sans point de réponse ni autre pénalité. La réponse de l'équipe active est vérifiée immédiatement.

**Buzzer de Tackle, comme sur Transfert :** l'équipe active joue seule pendant les **12 premières secondes de la carte**. Un coup de sifflet ouvre ensuite le bouton Tackle aux équipes adverses. La première équipe adverse à appuyer donne **sa propre réponse unique** au joueur mystère. Si elle trouve, elle gagne **5 points** ; si elle se trompe, elle perd **5 points**, même si son score général devient négatif. Dans les deux cas, la carte se termine et l'équipe active ne reprend pas. Le Tackle est possible après le sifflet tant que la carte est en cours, sans attendre une réponse de l'équipe active. Avec une seule équipe, il n'y a pas de Tackle. La durée de 12 secondes est le point de départ déjà utilisé sur Transfert, ajustable en playtest.

Après une passe au cinquième indice, le joueur est révélé et la carte vaut **0 point**.

Les cinq indices d'une carte sont préparés, sourcés et relus **dans cet ordre** avant mise en jeu. La nature fixe des indices ne garantit pas à elle seule une difficulté croissante : il faut vérifier que chaque nouvelle information rend effectivement le joueur plus identifiable dans le contexte des indices déjà révélés.

## Contenus et difficulté

Les cartes sont préparées et leurs faits vérifiés par un agent avant d'être intégrées. La vérification des faits se fait en amont, pas par une génération ou un jugement d'IA pendant la partie. La difficulté réelle des cartes sera ajustée à partir des parties jouées et documentées dans `PLAYTESTS.md`.

## Économie, progression, direction artistique

À définir. Aucun de ces éléments n'est requis pour le premier prototype.

## Périmètre du premier prototype

Le premier prototype comprend la configuration des équipes et de la partie, le score et le classement, ainsi que **Transfert, Plus ou Moins et Vrai ou Faux**, avec le Tackle transversal. Les autres mini-jeux seront définis, testés et intégrés un par un. Le jeu à plusieurs téléphones n'entre pas dans ce premier périmètre.
