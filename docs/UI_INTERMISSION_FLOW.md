# Entre deux manches — classement TACKLE

Maquette de l'écran affiché **après que toutes les équipes ont joué leur carte de la manche** et avant de lancer la suivante. Il ne s'affiche pas après chaque carte individuelle.

| Vue | Référence |
| --- | --- |
| Trois équipes | [11-classement-intermanche.png](ui/11-classement-intermanche.png) |
| Animation du classement | [12-classement-intermanche-anime.gif](ui/12-classement-intermanche-anime.gif) |
| Quatre équipes | [13-classement-intermanche-4-equipes.png](ui/13-classement-intermanche-4-equipes.png) |

## Fonctionnement

- Montrer **toutes les équipes classées par score**, avec logo, nom et points. Les scores négatifs restent visibles. La première place reçoit l'encadré doré. En cas d'égalité, ne pas faire croire qu'une équipe a gagné le départage si la règle ne le prévoit pas.
- Faire apparaître le classement une seule fois, de la dernière place à la première, puis mettre la tête du classement en valeur par une brève lumière dorée. Le GIF est un aperçu qui boucle ; **dans l'application, l'animation joue une seule fois** et doit pouvoir être passée par un appui.
- Sous le classement, annoncer le numéro de la prochaine manche et **l'équipe qui y jouera en premier**, d'après l'ordre de jeu réel. Le fait qu'elle joue en premier n'impose aucun porteur de téléphone.
- Le bouton **« C'est parti ! »** lance la manche suivante. Ne pas avancer automatiquement pendant que les équipes regardent les scores. Il devient utilisable au plus tard à la fin de la courte animation.
- Prévoir 1 à 4 équipes. À quatre, les lignes sont plus compactes pour garder le classement entier et le bouton visibles ; sur un écran très court, la page peut défiler.
- Après la **dernière** manche, aller au classement final : il n'y a alors ni « prochaine équipe » ni bouton de lancement de manche.

La maquette montre trois équipes, puis une variante à quatre. Les scores et le nom de la prochaine équipe sont des données d'exemple. Le défi de la manche suivante continue d'être choisi selon les règles de la partie.
