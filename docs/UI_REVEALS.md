# Révélations et retours de réponse — TACKLE

Cette note aligne la mise en scène des réponses entre les défis, tout en respectant leurs règles différentes. Les règles de score font toujours foi dans [GAME_DESIGN.md](GAME_DESIGN.md).

## Langage visuel commun

- Une **bonne réponse** déclenche une coche et un bandeau vert lumineux « BONNE RÉPONSE » ; une **mauvaise réponse** déclenche une croix et un bandeau rouge lumineux « MAUVAISE RÉPONSE ». Le retour est bref, joué une seule fois, et son texte reste lisible si les animations sont réduites.
- Garder le fond, le titre, la structure de score et l'identité propre au défi pendant ce retour. La réussite de Plus ou Moins peut être aussi punchy que la nouvelle réussite de Transfert ; il ne faut pas la remplacer par un panneau vert discret.
- Afficher explicitement les points gagnés, perdus ou seulement **potentiels**. Le score total en haut change uniquement quand les règles attribuent réellement les points.
- Les couleurs ne sont jamais le seul signal : icône, mot et delta de points sont visibles.

## Ce qui est révélé

| Défi et issue | Révélation | Score / suite |
| --- | --- | --- |
| Transfert : réponse correcte | Révéler le nom du joueur et garder les clubs déjà montrés. | Ajouter le palier de l'indice au score ; carte terminée. |
| Transfert : réponse incorrecte | **Ne pas révéler le joueur.** Garder les indices déjà vus. | Retirer 1 point, puis passer à l'indice suivant ; révéler le joueur seulement après le dernier indice sans réussite. |
| Plus ou Moins : réponse correcte | Révéler la valeur du joueur comparé ; il devient la nouvelle référence si l'équipe continue. | Ajouter 1 à la cagnotte potentielle, sans encore changer le score général ; proposer ENCAISSER ou CONTINUER. |
| Plus ou Moins : réponse incorrecte | Révéler la valeur réelle du joueur comparé. | Perdre la cagnotte potentielle ; 0 point sur la carte, carte terminée. |
| Plus ou Moins : cinquième réussite | Révéler la valeur réelle. | Encaisser automatiquement 5 points. |

Pendant ENCAISSER / CONTINUER, ni chrono ni Tackle. Un Tackle annoncé avant la réponse suit la règle propre au défi dans GAME_DESIGN.md ; il n'invente pas une nouvelle phase de révélation. Les noms, valeurs et scores des planches sont des exemples : utiliser les données vérifiées du jeu.

Références : [Transfert, nouvelle identité](UI_TRANSFERT_FLOW.md#nouvelle-identité-visuelle-de-transfert--à-intégrer) et [Plus ou Moins](UI_PLUS_MOINS_FLOW.md).
