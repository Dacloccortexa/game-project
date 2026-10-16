# TODO — travail ouvert

Ce fichier ne liste que les tâches restantes. Les règles en vigueur sont dans [GAME_DESIGN.md](GAME_DESIGN.md), les choix déjà tranchés dans [DECISIONS.md](DECISIONS.md) et les observations de partie dans [PLAYTESTS.md](PLAYTESTS.md).

## Prochain test sur iPhone

- Vérifier le parcours complet sur un vrai iPhone : créer une partie, jouer les cinq défis, répondre, Tackler, consulter le classement et signaler une erreur. Le projet iOS est prêt, mais [APP_IOS.md](APP_IOS.md) indique qu'il n'a pas encore été testé sur appareil.
- Consigner la version jouée, les cartes problématiques et les résultats dans [PLAYTESTS.md](PLAYTESTS.md). Observer notamment les tentatives de blocage du Tackle, les litiges et les cagnottes encaissées par expiration du temps.
- Mesurer à quel indice les équipes trouvent **Qui suis-je ?** et **Le Match**, et relever toute réponse concurrente valable ou erreur de contenu.

## Questions et équilibrage

- **Transfert :** vérifier les 12 cartes encore exclues du tirage ; avant chaque soirée test, revoir les cartes jouables dont un club est indiqué « –présent » et corriger tout départ confirmé. Fixer les critères de difficulté des extraits de carrière, notamment pour les joueurs passés par plus de cinq clubs.
- **Plus ou Moins :** actualiser les statistiques des joueurs encore actifs. Améliorer puis tester la construction des chaînes de six joueurs : valeurs assez proches, aucune égalité entre voisins et alternance intéressante de PLUS et MOINS.
- **Vrai ou Faux :** poursuivre la relecture éditoriale des anciennes affirmations et tester la difficulté du lot jouable. Ne remettre les affirmations de poste dans le tirage que si chaque réponse peut être vérifiée sans ambiguïté.
- **Qui suis-je ? :** chercher les réponses concurrentes plausibles hors des 200 fiches et réécrire ou exclure les cartes qui restent ambiguës après cinq indices. Ajuster l'ordre des indices selon les parties test.
- **Le Match :** tester la compétition affichée dès le départ et le cinquième indice sur les 203 cartes. Remplacer progressivement les 136 indices donnant une équipe par un buteur ou un entraîneur, après vérification de sa présence sur le match.

## Expérience et sortie

- Écouter [l'essai de sifflet de départ](../assets/ui/kickoff-whistle-real-candidate.wav) et décider s'il remplace le signal actuel.
- Définir comment traiter une réponse valable refusée malgré les variantes acceptées : correction de la carte, réponse au signalement et éventuelle compensation en partie.
- Revalider les problèmes relevés dans la [revue de code du 6 octobre](REVUE_CODE_2026-10-06.md), puis corriger ceux qui existent encore avant la sortie.
- Terminer les points ouverts de la [liste de sortie iPhone](APP_IOS.md), notamment le compte Apple Developer, les achats en bac à sable et les déclarations de confidentialité. Android viendra dans une phase ultérieure.
