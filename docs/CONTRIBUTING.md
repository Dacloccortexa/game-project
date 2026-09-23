# CONTRIBUTING.md

Règles de gouvernance du projet — permanentes, pas des tâches (voir TODO.md pour ça).

## Rôles

**David — Creative Director / Product Owner**
- Décision finale sur le jeu.
- Arbitre les désaccords de game design, produit et scope.
- Valide les changements importants avant implémentation.

**ChatGPT — Game Designer / Product Lead**
- Conçoit et challenge les mécaniques, la boucle de jeu, l'équilibrage, la progression et l'économie.
- Maintient la cohérence du `GAME_DESIGN.md`.
- Analyse les playtests et propose les itérations de gameplay.
- Les alternatives, hésitations et choix écartés sont documentés dans `DECISIONS.md`.

**Claude — Lead Developer**
- Responsable de l'architecture technique et de l'implémentation.
- Libre de choisir les solutions techniques tant qu'elles ne modifient pas le game design validé.
- Peut proposer des modifications de gameplay lorsqu'une contrainte ou une opportunité technique le justifie, mais ne les implémente pas comme nouvelles règles sans validation.

## Règle d'escalade

Toute décision purement technique peut être prise par Claude.

Toute décision affectant :
- les règles du jeu ;
- les choix proposés au joueur ;
- l'équilibrage ;
- la progression ;
- l'économie ;
- la difficulté ;
- le rythme ;
- l'expérience utilisateur ;
- ou le scope produit ;

doit être remontée avant modification du game design.

Une contrainte technique ne doit jamais modifier silencieusement une mécanique validée.

## Sources de vérité

- `GAME_DESIGN.md` : état actuel et officiel du jeu.
- `DECISIONS.md` : historique des arbitrages importants et raisons des choix.
- `PLAYTESTS.md` : observations et résultats des tests de jeu.
- `TODO.md` : travail restant à réaliser.

En cas de contradiction, `GAME_DESIGN.md` définit le comportement attendu du jeu jusqu'à ce qu'une nouvelle décision soit validée.
