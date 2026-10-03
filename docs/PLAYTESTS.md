# PLAYTESTS.md

## Journal des parties du 29 septembre au 3 octobre 2026 (11 parties, envoyé par David le 3 octobre au soir)

- **Contexte :** surtout des parties à 1 équipe (tests de David), plus 2 parties à 2 équipes « Arthur » contre « Antoine ».
- **Comportement inverse du journal précédent :** ici les joueurs ne passent presque plus, ils **proposent un nom à chaque indice** (souvent au hasard : Messi, Ronaldo, Mbappé…). Avec −1 par erreur, des cartes **trouvées** finissent en négatif : Pepe Reina −5 (pas trouvé), José Bosingwa −4, Samir Nasri −3 et Mohamed Salah −3 (trouvés au 5e indice après 4 erreurs), Luís Figo −1. Passer est toujours plus rentable que deviner, mais les joueurs ne le savent pas ou ne le font pas.
- **Durée :** à 2 équipes, une carte Transfert / Qui suis-je ? dure 60 à 80 s (Pepe Reina : 125 s). Partie Arthur–Antoine abandonnée après 1,5 manche en 8 min : une partie de 5 manches à 2 équipes prendrait ~25 min à ce rythme.
- **Chrono de réponse (15 s) :** fonctionne (« temps de réponse écoulé » noté 2 fois, compté comme erreur).
- **Le Match (nouveaux indices) :** une seule carte jouée (Barcelone–Sampdoria 1992), tous les indices passés en 0–1 s sans réponse. Pas encore de signal.
- **Vrai ou Faux :** Antoine fait 5/5 (+5) ; Arthur perd sa cagnotte de 4 au 5e (« Owen plus jeune que Fowler »). La tension de la cagnotte fonctionne quand on va loin.
- **Données vérifiées :** les ~30 affirmations et comparaisons jouées sont justes.
- **À quel indice on trouve (les deux journaux, 21 parties) :** Transfert 14/27 trouvées, surtout aux indices 1–3 ; Qui suis-je ? 15/20, dont **10 au 5e indice** ; Le Match 3/18, toutes au 5e. Détail et proposition pour Qui suis-je ? dans [QUI_SUIS_JE_DIFFICULTE.md](QUI_SUIS_JE_DIFFICULTE.md).
- **Question ouverte pour David :** faut-il limiter la perte sur une carte (ex. une carte ne peut pas faire descendre sous 0, ou une erreur ne coûte que si on se trompe 2 fois) ? À trancher avec plus de parties.

## Retour du 2 octobre 2026 — partie avec les neveux de David

- **Observation rapportée :** Le Match est trop difficile.
- **Contexte manquant :** nombre d'équipes, âge des joueurs, cartes sorties et taux de bonnes réponses non relevés.
- **Suite décidée :** remplacer les cinq événements chronologiques par cinq indices dans un ordre fixe : compétition, année, score final, ville, phase de la compétition (5 à 1 point). Décision détaillée dans `DECISIONS.md`.
- **Intégration du 2 octobre :** la suite d'indices a remplacé les événements dans l'app ; les 103 villes sont sourcées dans les fiches.
- **À retester :** combien de cartes sont trouvées, et à quel indice.


## [2026-10-03] Version portugaise relue par des lecteurs portugais
- Retour rapporté par David : le portugais est validé ; ils ont même dit que c'est une des meilleures traductions de jeux qu'ils aient vues.
- Conséquence : la sortie peut viser la France **et** le Portugal en même temps.

## [2026-10-03] Partie de David avec Achille
- Ressenti : « super marrant », envie de refaire une partie à chaque fois.
- Problème : des questions reviennent vite ; le même match de Le Match est sorti deux fois d'affilée. Corrigé le jour même (tirage sans répétition, voir `DECISIONS.md`).

## Journal des parties du 1er et 2 octobre 2026 (12 parties, envoyé par David)

- **Contexte :** 12 parties (6 à 1 équipe, 6 à 2 équipes), 5 à 20 manches. 4 terminées, 4 abandonnées, 4 jamais fermées (« en cours »). Durée des parties terminées : 2 à 8 min.
- **« Passer » en rafale :** sur Transfert, Qui suis-je ? et Le Match, les joueurs passent les indices 1 à 4 en 1 ou 2 s chacun (123 passes sur 167 en ≤ 2 s), puis répondent au dernier indice. Qui suis-je ? : 8 cartes trouvées sur 12, **toutes au 5e indice (1 point)**. Transfert : 5 trouvées sur 17 (seuls Messi, Busquets et Salah trouvés tôt), 6 cartes passées jusqu'au bout sans réponse. Les premiers indices ne sont presque pas lus.
- **Conséquence sur le Tackle :** le Tackle n'ouvre qu'après 30 s sur un indice ; en passant en 1 s, l'équipe active ne laisse jamais la course s'ouvrir. **Seulement 2 Tackles en 6 parties à 2 équipes** (dont 1 litige), tous deux au dernier indice.
- **Le Match trop difficile (confirmé) :** 3 trouvées sur 16 cartes terminées, toutes au 5e événement, toutes des matchs récents ou très connus (finale 2022, finale 2018, Angleterre–Portugal 1966). Aucune finale de 1958 à 1996 trouvée. 9 mauvaises réponses finales. Va dans le sens de la nouvelle règle d'indices décidée par David.
- **Bug corrigé :** « Chealsea / Bayern » refusé pour Bayern Munich – Chelsea (2012). La faute « Chealsea » passait, mais « Bayern » n'était pas un nom accepté pour « Bayern Munich ». Ajout des noms courts pour 15 clubs (Bayern, Inter, Juve, PSG, Man United, Man City, Real, Dortmund, Atlético, PSV…), aussi en portugais.
- **Vrai ou Faux :** 1re affirmation juste 15 fois sur 28 (pile ou face). 18 cartes sur 28 à 0 point. Personne n'a dépassé une cagnotte de 3 ; les joueurs encaissent dès 2. Les affirmations à valeur exacte (« mesure 183 cm », « né en 1983 », « période professionnelle commence en 1992 ») se jouent au hasard ; les comparaisons (plus âgé, plus grand) et les clubs se raisonnent mieux.
- **Plus ou Moins :** 7 cagnottes encaissées sur 12, toujours tôt (1 à 3). Fonctionne.
- **Données vérifiées :** les ~45 affirmations et comparaisons jouées sont justes (aucune erreur de données relevée).
- **Tolérance aux fautes :** fonctionne (« Lewandoski », « Marez », « Mbappe », « Kaka », « Ribery » acceptés).
- **Pistes proposées (non décidées) :** voir la réponse de Claude du 2 octobre au soir : empêcher de passer avant quelques secondes (ou supprimer « Passer » pour laisser le chrono faire défiler les indices), retirer les affirmations à valeur exacte de Vrai ou Faux, et pour Le Match la nouvelle règle d'indices.

Ce qui s'est réellement passé quand on a joué. Pas des intentions, pas des impressions théoriques — des observations de sessions de jeu réelles.

## Format d'une entrée
```
## [YYYY-MM-DD] Session #N — [ce qui était testé]
- Setup : quelle version / quelle mécanique testée
- Ce qui s'est passé : observation factuelle du déroulé
- Ressenti : fun / frustrant / plat / confus...
- Conclusion : garder / ajuster / abandonner
```

## Points à observer pendant les prochains tests (décidé le 2026-10-01)

Règles laissées telles quelles pour voir comment les joueurs s'en servent, avant de les ajuster :

- **Blocage pendant la course au Tackle** (Transfert, Qui suis-je ?, Le Match) : l'équipe qui a la main peut gagner la course juste pour empêcher un adversaire de tacler, répondre au hasard et ne perdre que 1 point. Correctif envisagé si ça arrive souvent : rouvrir le Tackle aux adversaires seulement pour les secondes restantes.
- **Essais répétés de l'équipe qui a la main** : elle peut regagner la course à chaque indice (−1 point par erreur). À surveiller avec le blocage ci-dessus.
- **Litiges** : fréquence du bouton « Litige : tirage au sort » (le tirage est noté dans le journal de partie).
- **Vrai ou Faux / Plus ou Moins** : sans réponse ni Tackle au bout de 45 s, la cagnotte est encaissée (pas perdue). Vérifier que personne ne l'utilise pour « attendre » au lieu de jouer.

---

## [2026-09-26] Session #1 — premier vrai test, une soirée complète avec le fils de David et ses potes
- Setup : version en ligne (Transfert + Plus ou Moins + Vrai ou Faux à ce stade), jouée toute une soirée par le fils de David et ses amis.
- Ce qui s'est passé : ils ont enchaîné les parties toute la soirée, en relançant sans cesse ("ça relance sans cesse des parties").
- Ressenti : ils ont adoré.
- Conclusion : garder — c'est le signal recherché depuis le début du projet (voir le brief initial : "on donne le téléphone à 5–6 potes... est-ce qu'ils veulent immédiatement faire une revanche ? Si oui, on industrialise."). Premier vrai indicateur positif ; détails plus précis (mini-jeux exacts joués, points bloquants éventuels) à recueillir auprès du fils pour affiner.
