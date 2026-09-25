# TODO.md

## À corriger dans la V1 avant un playtest réel

- Remplacer ou retirer les cartes factices qui utilisent de vrais joueurs avec des carrières erronées : `t2` (Thierry Henry), `t4` (Kylian Mbappé), `t5` (Ludovic Giuly) et `t6` (Rafael Leão). La carte `t3` omet le retour de Cristiano Ronaldo à Manchester United sans indiquer qu'elle montre des extraits. Références : [UEFA — Henry](https://www.uefa.com/news-media/news/0254-0d7ccf47eebd-332ce22005f2-1000--henry-sets-sail-for-new-york/), [Real Madrid — Mbappé](https://www.realmadrid.com/en-US/football/squad/kylian-mbappe), [FC Barcelone — Giuly](https://www.fcbarcelona.com/en/football/barca-legends/jugadores/1061570/giuly), [AC Milan — Leão](https://www.acmilan.com/it/news/articoli/statistiche/2019-08-02/rafael-leao-il-nostro-focus), [Manchester United — Ronaldo](https://www.manutd.com/en/news/detail/man-utd-official-statement-on-cristiano-ronaldo-22-november-2022?os=io___).
- Après la carte d'une équipe, le bouton affiche toujours « Manche suivante », même lorsqu'une autre équipe doit encore jouer dans la même manche. Afficher « Équipe suivante » tant que le tour complet n'est pas fini.

## À prototyper

- ✅ Un parcours sur un seul téléphone : créer 1 à 4 équipes, choisir 5/10/20 manches, sélectionner les mini-jeux, jouer, puis voir le classement. Implémenté dans `index.html`.
- ✅ Transfert : révélation chronologique, tentative ou passe, pénalité de −1, points dégressifs, carte à club unique, porteur de téléphone désigné, confirmation de la réponse saisie. Implémenté dans `index.html`.
- ⏳ Le prototype tourne actuellement avec **6 cartes factices** codées en dur (variété insuffisante pour une vraie soirée). Il faut le premier lot de cartes Transfert vérifiées avant de tester avec du monde.
- ⏳ Une vraie partie test à consigner ensuite dans `PLAYTESTS.md`.

## Arbitrages de game design à faire avant le déroulé complet

- Définir la procédure de correction et de signalement lorsqu'une réponse valable est refusée malgré les variantes vérifiées.
- Fixer les critères de sélection et de difficulté des cartes Transfert, y compris le traitement des carrières de plus de cinq passages.
- Définir les règles des autres mini-jeux, chacun avec ses réponses valables, son déroulé et son score, avant leur intégration.

## Zones où Claude peut décider librement

- Architecture, langage, framework, stockage et organisation du code nécessaires au prototype.
- Détails purement techniques qui respectent les règles validées dans `GAME_DESIGN.md`.

## Zones nécessitant validation de David avant modification

- Règles, points, pénalités, difficulté, participation des équipes, nombre de manches et sélection des jeux.
- Toute modification du périmètre ou de l'expérience de jeu.

## Questions techniques en attente

- Proposer un format de carte qui conserve clubs, années, prêts/retours, réponse attendue, variantes acceptées, sources et statut de vérification.
- Proposer un tirage aléatoire des cartes pour chaque équipe, avec répétition possible, et un moyen d'évaluer les répétitions pendant les tests.
