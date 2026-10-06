# Revue du code — 6 octobre 2026

Revue complète d'`index.html` et des outils, en trois volets indépendants (logique de jeu et Tackle ; données, appli, achats ; écrans, langues, sécurité). Chaque point a été vérifié dans le code, la plupart reproduits dans un navigateur. **Mise à jour du 6 octobre (après-midi) : corrigés** les points 1 à 15, 17, 18, 20, 21 (fenêtre Quitter : Échap et retour du focus) et 22. **Restent** : 16 (course sans adversaire possible, à trancher), 19 (heure du téléphone, faible enjeu), le reste de l'accessibilité du point 21, et la section « À savoir avant l'App Store ».

**Rien de grave côté sécurité** : aucun texte saisi (noms d'équipes, réponses) n'est interprété comme du code ; testé avec des noms piégés.

## Élevé
1. **Pack soirée qui expire en pleine partie → la partie s'arrête à 5 manches** (`refreshAccessUI` remet `roundsTotal` à 5 même en cours de partie, lu par la fin de partie). Contraire à la règle « une partie commencée n'est jamais coupée ». Corriger : copier le nombre de manches au coup d'envoi.
2. **Cache des questions téléchargées dans le stockage du navigateur de l'appli (~5 Mo) presque plein** : Vrai ou Faux seul pèse ~3 Mo une fois stocké. Après un changement de langue, des sauvegardes échouent sans bruit (journal, cartes vues, compteur de parties gratuites → limite gratuite non appliquée). Corriger : stocker sur le téléphone avec le module Fichiers (Filesystem) ou effacer le cache de l'autre langue et plafonner.

## Moyen
3. **« Annuler, personne n'a tacklé » à la toute fin de la course** : le bouton Tackle peut rester actif sur une carte terminée → double gain possible (reproduit : cagnotte comptée deux fois ; Tackle après révélation du joueur). Corriger : ne pas réafficher le Tackle si la carte est finie.
4. **La fenêtre « Quitter ? » ne met pas les chronos en pause** : en hésitant, le chrono de réponse ou le Tackle se termine derrière (−1, carte finie). Corriger : figer les chronos à l'ouverture, les reprendre sur « Continuer ».
5. **Double appui sur « Équipe suivante » = « Passer » sur la carte suivante** (le bouton Passer est pile dessous) : l'équipe perd son 1er indice et l'adversaire a un Tackle gratuit. Corriger : ignorer les appuis 0,4 s après l'arrivée d'une carte.
6. **Un fichier de questions distant défectueux bloque le défi**, même hors connexion (gardé en cache), et comme les 5 défis sont cochés par défaut, bloque le lancement ; « Réessaie dans un instant » ne réessaie jamais. Corriger : en cas d'échec, effacer le cache et reprendre la copie embarquée ; réessayer au coup d'envoi.
7. **Hors connexion après une mise à jour de l'appli, une ancienne version téléchargée passe avant la nouvelle copie embarquée.** Corriger : vider le cache de questions quand la version de l'appli change.
8. **Pack soirée vu comme encore actif après une mise en veille** (minuterie suspendue par iOS). Corriger : vérifier l'heure de fin à chaque coup d'envoi et au retour dans l'appli.
9. **Texte de partage mal accordé** : « Les Lions gagne », « Os Leões ganha », « avec 1 points ». Texte publié sur les réseaux.

## Faible
10. « 0 ponto » au lieu de « 0 pontos » en portugais (classements, écran de fin).
11. « VERDADEIRO » déborde de son bouton sur les petits écrans (320 px).
12. Nom d'équipe long sans espace : déborde de la bande du chrono et de « Qui a tacklé ? » (la page défile de côté à 320 px).
13. Trois textes restés en français en mode portugais (« Disponible dans l'appli iPhone TACKLE. » du bouton « J'ai un code », textes de remplacement de deux images).
14. « Pas de Tackle : Équipe 3 l'ont déjà tenté » : accord au pluriel forcé ; et ce message peut déborder sur la carte suivante (si on enchaîne en moins de 3 s).
15. Mauvaise équipe touchée dans « Qui a tacklé ? » : impossible de revenir en arrière (son Tackle de la carte est consommé).
16. À 2 équipes, après le Tackle raté de l'adversaire, la course de 5 s continue à chaque indice alors que personne ne peut plus tacler (Répondre/Passer cachés). À trancher.
17. Abonné : la partie démarre à 5 manches (choix remis à 5 avant que l'abonnement soit confirmé, jamais rétabli).
18. Acheter un 2e pack soirée pendant qu'un pack est actif n'ajoute pas 24 h.
19. Heure du téléphone reculée → le pack soirée dure plus longtemps (faible enjeu).
20. Manifeste des questions non vérifié au moment de construire l'appli (seulement par le test).
21. Accessibilité : la fenêtre « Quitter ? » ne retient pas le focus ni Échap ; le focus se perd entre les écrans ; le verdict n'est pas toujours annoncé par les lecteurs d'écran.
22. Docs : `GAME_DESIGN.md` (Plus ou Moins) décrit encore l'ancien verrouillage pendant le Tackle ; « Demi-finale » sans traduction portugaise dans Le Match.

## À savoir avant l'App Store
- `REVENUECAT_IOS_KEY` vide = appli limitée sans rien à acheter : risque de refus par Apple. La clé doit être renseignée avant l'envoi en relecture.
- Le site public reste illimité : contournement gratuit du paiement pour qui connaît l'adresse (choix assumé pour les tests ; à reconsidérer à la sortie).
- Le pack soirée (achat « consommable ») n'est peut-être pas retrouvable après réinstallation sur un nouvel identifiant anonyme : à vérifier en bac à sable Apple.
