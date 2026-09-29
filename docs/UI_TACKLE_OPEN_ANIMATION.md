# Ouverture de la fenêtre Tackle — animation et sifflet

Référence pour le moment où le Tackle devient disponible, sur chaque défi.

| Élément | Fichier |
| --- | --- |
| Aperçu animé sans son | [14-ouverture-tackle.gif](ui/14-ouverture-tackle.gif) |
| État après l'animation | [15-tackle-ouvert.png](ui/15-tackle-ouvert.png) |
| Aperçu à lancer avec le son | [apercu-ouverture-tackle.html](ui/apercu-ouverture-tackle.html) |
| Logo rouge transparent | [tackle-logo-red.png](../assets/ui/tackle-logo-red.png) |
| Sifflet de départ du chrono, actuel | [kickoff-whistle.wav](../assets/ui/kickoff-whistle.wav) |
| Essai réel pour le départ, à revoir | [kickoff-whistle-real-candidate.wav](../assets/ui/kickoff-whistle-real-candidate.wav) |
| Sifflet d'ouverture du Tackle | [tackle-whistle.wav](../assets/ui/tackle-whistle.wav) |

## Déclenchement

- Au **départ de chaque nouveau chrono de 30 secondes**, jouer le signal bref de coup d'envoi actuel. Cela inclut le nouvel indice, événement, comparaison ou affirmation, y compris après une passe.
- Au bout des **30 secondes** de priorité de l'équipe active, si la question est encore en cours, jouer le sifflet de Tackle, plus long et plus marqué, et lancer le visuel **au même instant**. Les deux sons doivent être facilement reconnaissables sans regarder l'écran.
- Le mot **TACKLE** rouge surgit en grand, grossit puis revient brièvement avant de disparaître. Le bouton Tackle et le compte à rebours deviennent rouges ; les **15 secondes** commencent au sifflet, sans attendre la fin de l'animation.
- Le grand visuel est décoratif et **ne bloque pas les appuis**. La première équipe qui annonce un Tackle peut être sélectionnée immédiatement. L'équipe active peut encore répondre pendant la fenêtre ouverte.
- L'animation ne joue **qu'une fois** à l'ouverture de chaque fenêtre. Le GIF boucle seulement pour l'aperçu ; l'application doit terminer sur l'état fixe du bouton rouge actif.
- Ne pas jouer le sifflet si l'indice ou la carte est déjà terminé avant 30 secondes. Sur Plus ou Moins et Vrai ou Faux, une réponse active déjà verrouillée attend malgré tout la fenêtre commune : le sifflet reste pertinent à 30 secondes si cette comparaison ou affirmation est encore en attente.
- Les deux sons doivent être prêts après une interaction de démarrage de partie sur mobile. Prévoir un fonctionnement lisible quand le téléphone est muet et réduire le mouvement si l'appareil le demande.

Le sifflet de Tackle est désormais un extrait d'un véritable sifflet métallique [enregistré par strongbot sous CC0](https://freesound.org/people/strongbot/sounds/568995/). L'essai réel pour le départ du chrono vient de [Rosa-Orenes256, également sous CC0](https://freesound.org/people/Rosa-Orenes256/sounds/538422/) ; il reste à améliorer avant de remplacer le signal de départ actuel. L'illustration montre Transfert au troisième indice ; les mêmes signaux s'appliquent aux autres défis sans changer leurs règles de score.
