# Qui suis-je ? — difficulté des indices (analyse du 3 octobre 2026)

Analyse demandée par David après les journaux de parties du 29 septembre au 3 octobre. Les chiffres ci-dessous décrivent les cartes **avant** le recalibrage du 3 octobre.

## Recalibrage du 3 octobre 2026

David a choisi de recalibrer les fiches tout en conservant l'ordre fixe : **club → trophée → poste → coéquipier → nationalité**, un seul fait par indice et 5/4/3/2/1 points.

- Le premier club a été remplacé dans **84 fiches sur 100** par un autre club de la carrière Transfert déjà sourcée du même joueur. Les quatre autres indices et les réponses n'ont pas changé. Les fichiers français et portugais ont été mis à jour ensemble.
- Avant, le premier indice affichait « Real Madrid » sur 27 fiches, « Barcelona » ou « FC Barcelone » sur 22 et « Chelsea » sur 15. Après recalibrage, aucun premier club n'apparaît sur plus de 8 fiches en français. Cette diversité est un contrôle éditorial, **pas une preuve de difficulté réelle** : un club moins partagé peut aussi être inconnu des joueurs.
- **À retester en partie :** relever l'indice de chaque bonne réponse. L'objectif est de voir davantage de réponses aux indices 2–3 sans rendre le premier indice évident.

## Ce que montrent les parties (21 parties, deux journaux)

À quel indice les joueurs trouvent (cartes allées jusqu'au bout) :

| Défi | Cartes | Trouvées | Indice où la réponse est trouvée |
| --- | --- | --- | --- |
| Transfert | 27 | 14 (52 %) | 1er : 3 · 2e : 4 · 3e : 4 · 4e : 1 · 5e : 2 |
| Qui suis-je ? | 20 | 15 (75 %) | 2e : 1 · 3e : 3 · 4e : 1 · **5e : 10** |
| Le Match | 18 | 3 (17 %) | 5e : 3 (presque toutes sur l'ancienne version à événements) |

- **Transfert** est bien réglé : on trouve surtout aux indices 1 à 3 ; les ratés sont des joueurs moins connus (Karembeu, Verón, Morientes, Bosingwa, Deco) ou des cartes entièrement passées.
- **Qui suis-je ?** se trouve **trop tard** : deux réponses sur trois au 5e indice (1 point). Conséquences vues dans les journaux : soit on passe les indices 1 à 4 sans les lire, soit on devine au hasard (−1 par erreur, cartes trouvées qui finissent à −3).
- **Le Match** : trop tôt pour juger la nouvelle version (une seule carte jouée).

## Pourquoi : l'ordre des indices va du plus vague au plus parlant

Ordre actuel (5 → 1 point) : club → trophée → poste → coéquipier → nationalité. Nombre moyen de cartes (sur 100) qui ont **exactement le même indice** :

| Indice | Exemple | Cartes avec le même indice | Indice unique pour |
| --- | --- | --- | --- |
| 1 · Club (5 pts) | « J'ai joué à Real Madrid. » | 14,9 (Real Madrid : 27 ; Barcelone : 22 ; Chelsea : 15) | 5 cartes |
| 2 · Trophée (4 pts) | « J'ai gagné la Liga. » | 12,6 | 2 cartes |
| 3 · Poste (3 pts) | « Je suis attaquant. » | 9,5 | 10 cartes |
| 4 · Coéquipier (2 pts) | « J'ai joué avec Karim Benzema. » | 2,6 | **21 cartes** |
| 5 · Nationalité (1 pt) | « Je suis portugais. » | 13,2 (français 21, espagnols 20, anglais 14) | 11 cartes |

L'indice à 5 points cite le club **le plus célèbre** du joueur, partagé par des dizaines de joueurs : impossible de trouver avec. L'indice le plus discriminant (coéquipier) n'arrive qu'en 4e. La nationalité, ajoutée à tout le reste, fait trouver au 5e.

## Proposition antérieure, non retenue

Ordre du plus dur (mais trouvable par un connaisseur) au plus facile :

1. **Club rare de sa carrière** (5 pts) : club formateur, prêt ou petit club (« J'ai joué à Monaco »), choisi comme le club le **moins partagé** parmi les cartes. Pris dans la carrière déjà vérifiée et sourcée de la carte Transfert liée (`transfert_card_id`) : aucune donnée inventée.
2. **Trophée** (4 pts).
3. **Nationalité + poste** (3 pts) : « Je suis un défenseur espagnol ».
4. **Coéquipier** (2 pts).
5. **Grand club** (1 pt) : « J'ai joué au Real Madrid » — presque donné avec le reste.

Cette proposition changeait l'ordre et combinait deux informations au troisième indice. Elle n'a pas été appliquée : le recalibrage ci-dessus respecte la structure validée par David.

## Petite incohérence à corriger au passage

Le même club est écrit « Barcelona » (18 cartes) ou « FC Barcelone » (4 cartes) dans l'indice club. À harmoniser (« FC Barcelone », comme dans Transfert et Le Match).
