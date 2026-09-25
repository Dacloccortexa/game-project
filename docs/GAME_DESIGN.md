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

## Contenus et difficulté

Les cartes sont préparées et leurs faits vérifiés par un agent avant d'être intégrées. La vérification des faits se fait en amont, pas par une génération ou un jugement d'IA pendant la partie. La difficulté réelle des cartes sera ajustée à partir des parties jouées et documentées dans `PLAYTESTS.md`.

## Économie, progression, direction artistique

À définir. Aucun de ces éléments n'est requis pour le premier prototype.

## Périmètre du premier prototype

Le premier prototype comprend la configuration des équipes et de la partie, le score et le classement, ainsi que **Transfert uniquement**. Les autres mini-jeux seront définis, testés et intégrés un par un. Le jeu à plusieurs téléphones n'entre pas dans ce premier périmètre.
