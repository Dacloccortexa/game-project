# Ouverture de la fenêtre Tackle — animation et sifflet

Référence pour le moment où le Tackle devient disponible, sur chaque défi.

| Élément | Fichier |
| --- | --- |
| Aperçu animé sans son | [14-ouverture-tackle.gif](ui/14-ouverture-tackle.gif) |
| État après l'animation | [15-tackle-ouvert.png](ui/15-tackle-ouvert.png) |
| Aperçu à lancer avec le son | [apercu-ouverture-tackle.html](ui/apercu-ouverture-tackle.html) |
| Logo rouge transparent | [tackle-logo-red.png](../assets/ui/tackle-logo-red.png) |
| Sifflet court | [tackle-whistle.wav](../assets/ui/tackle-whistle.wav) |

## Déclenchement

- Au bout des **30 secondes** de priorité de l'équipe active, si la question est encore en cours, jouer le sifflet et lancer le visuel **au même instant**. Cela vaut à chaque nouvel indice, événement, comparaison ou affirmation selon le compte à rebours commun.
- Le mot **TACKLE** rouge surgit en grand, grossit puis revient brièvement avant de disparaître. Le bouton Tackle et le compte à rebours deviennent rouges ; les **15 secondes** commencent au sifflet, sans attendre la fin de l'animation.
- Le grand visuel est décoratif et **ne bloque pas les appuis**. La première équipe qui annonce un Tackle peut être sélectionnée immédiatement. L'équipe active peut encore répondre pendant la fenêtre ouverte.
- L'animation ne joue **qu'une fois** à l'ouverture de chaque fenêtre. Le GIF boucle seulement pour l'aperçu ; l'application doit terminer sur l'état fixe du bouton rouge actif.
- Ne pas jouer le sifflet si l'indice ou la carte est déjà terminé avant 30 secondes. Sur Plus ou Moins et Vrai ou Faux, une réponse active déjà verrouillée attend malgré tout la fenêtre commune : le sifflet reste pertinent à 30 secondes si cette comparaison ou affirmation est encore en attente.
- Le son doit être prêt après une interaction de démarrage de partie sur mobile. Prévoir un fonctionnement lisible quand le téléphone est muet et réduire le mouvement si l'appareil le demande.

Le sifflet fourni est un son synthétique court. L'illustration montre Transfert au troisième indice ; le même signal d'ouverture s'applique aux autres défis sans changer leurs règles de score.
