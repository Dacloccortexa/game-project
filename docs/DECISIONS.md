# DECISIONS.md

## [2026-10-03] Nouvel écran de fin de partie, avec image de résultat à partager
- Demande de David, pour faire connaître le jeu (chaque partie montre TACKLE à 4–8 personnes ; partage = premier levier de la projection « ambitieuse »).
- Écran de fin refait dans le style du classement entre deux manches : logo, « 10 manches · 24 min », encadré du vainqueur (logo, nom, score ; « Égalité » si ex æquo ; « Ton score » à une équipe), classement complet, puis **Partager le résultat**, **Revanche**, **Retour à l'accueil**.
- **Partager le résultat** fabrique une image 1080 × 1350 (format portrait des réseaux) : stade, logo TACKLE, vainqueur et score, autres équipes, « Le quiz foot entre potes · lafamivy.com ». Appli : menu de partage iOS avec l'image et un texte (« Les Lions gagnent sur TACKLE avec 23 points ! … »). Navigateur : partage natif si possible, sinon l'image s'affiche pour l'enregistrer d'un appui long.
- Lien du partage : lafamivy.com pour l'instant (`SHARE_URL` dans `index.html`) ; **à remplacer par le lien App Store à la sortie**.
- Appli iOS : plugin `@capacitor/filesystem` ajouté (l'image est écrite dans le cache avant le partage). Français et portugais.

## [2026-10-03] Course au Tackle à 5 s, et Tackle ouvert après chaque « Passer »
- Idée d'un ami de David, validée par David. Deux changements :
  1. **Course après le sifflet : 5 s au lieu de 15.** Crier « Tackle ! » est instantané et le chrono s'arrête dès qu'une équipe est choisie. Une étape d'indice passe de 45 s à 35 s au maximum (cartes de 60 à 80 s à 2 équipes dans le journal).
  2. **« Passer » ouvre 5 s de Tackle aux adversaires** (Transfert, Qui suis-je ?, Le Match), avec l'enjeu de l'indice passé. L'équipe qui a passé n'est pas dans « Qui a tacklé ? ». Personne : indice suivant. Tackle raté : −enjeu, une seule fois par carte et par équipe, puis indice suivant pour l'équipe active. Aucun adversaire possible (partie à 1, tous ont déjà raté) : indice suivant tout de suite.
- But du 2 : on ne peut plus passer en 1 s pour priver les adversaires de Tackle (journal du 1er–2 octobre : 2 Tackles seulement en 6 parties à 2 équipes). Passer devient un choix risqué.
- Bouton Tackle **conservé** (décision de David : c'est le nom et la signature du jeu, et il mène à l'écran « Qui a tacklé ? » avec le litige). Il reste caché pendant la priorité et surgit au sifflet ou après une passe.
- Règles (4 écrans) mises à jour en français et en portugais. Testé (`tests/tackle-timing.test.cjs`).

## [2026-10-03] Bouton Tackle caché pendant les 30 s de priorité
- Retour d'un ami de David (capture iPhone, Qui suis-je ?) : le bouton Tackle grisé, fixé en bas de l'écran, cachait « Passer » et « Répondre » ; il a fallu faire défiler plusieurs fois, au point de croire à un bug.
- Le bouton n'apparaît plus qu'au coup de sifflet (course de 15 s), quand « Répondre » et « Passer » ont déjà disparu. Pendant la priorité, la bande « Priorité aux … 00:30 » donne le temps restant. Partie à une équipe : pas de bouton du tout (le Tackle n'existe pas à un).
- Règles du Tackle inchangées. Idées de David à trancher : course réduite à 5 s, et Tackle ouvert aussi quand l'équipe active passe (voir réponse de Claude du 3 octobre au soir).

## [2026-10-03] Plus de questions qui reviennent trop vite
- Retour de David (partie avec Achille) : des questions reviennent rapidement, et le même match de Le Match est sorti deux fois d'affilée. Cause : chaque carte était tirée au hasard dans tout le lot, sans mémoire.
- Maintenant chaque défi pioche dans un **paquet** : une carte ne revient qu'une fois toutes les autres jouées, **d'une partie à l'autre** (mémorisé sur le téléphone, clé `tackle-seen-v1`). Quand le paquet est épuisé, il est remélangé en gardant de côté les dernières cartes vues (le tiers du lot, 15 au plus) : rien ne ressort juste après.
- Paquets : Transfert, Qui suis-je ?, Le Match (par carte) ; Vrai ou Faux (par fait : deux formulations du même fait comptent comme une seule) ; Plus ou Moins (par catégorie, et dans chaque catégorie par joueur).
- Transfert et Qui suis-je ? évitent aussi un joueur sorti dans l'autre défi parmi les 20 derniers (ex. Paul Scholes en Transfert puis en Qui suis-je ?).
- Même mémoire en français et en portugais. Testé (`tests/tackle-timing.test.cjs`).

## [2026-10-02] Prix : pack soirée 1,99 € et abonnement annuel 29,99 €
- Décision de David : deux offres. **Pack soirée à 1,99 €** (achat unique, 24 h illimitées à partir de l'achat, 5 à 20 manches, sans abonnement) et **abonnement annuel à 29,99 €**. Pas de mensuel. Le gratuit reste à 2 parties par jour de 5 manches.
- Pourquoi un pack : un jeu de soirée se joue de façon irrégulière ; 1,99 € pour tout le groupe sur un seul téléphone est un achat d'impulsion. L'annuel vise ceux qui jouent au moins deux fois par mois (29,99 € = 15 soirées).
- App Store : pack = achat intégré consommable `tackle_pack_soiree` ; annuel = abonnement `tackle_annual` (droit RevenueCat `premium`). Portugais : « Pack Noitada ».
- Boutique : pack soirée en premier (« 24 h illimitées, sans abonnement »), puis l'annuel (« Soit 2,49 € par mois », calculé depuis le prix App Store, essai gratuit affiché s'il existe). Mention légale complétée pour le pack. Pack actif : « Pack soirée actif jusqu'à … » dans la boutique et sous les défis.
- Une partie commencée n'est jamais coupée à l'expiration du pack. Fin du pack recalculée depuis l'historique RevenueCat (réinstallation, « Rétablir les achats ») et gardée sur le téléphone hors connexion.
- Ce qui reste à David (net après TVA 20 % et commission Apple 15 % du programme petites entreprises) : ≈ 1,40 € par pack, ≈ 21,20 € par abonnement annuel.

## [2026-10-02] Écran de démarrage aussi pour le jeu ajouté à l'écran d'accueil (iPhone)
- Question de David : « ça se voit pas en mobile app ? ». Le jeu ajouté à l'écran d'accueil depuis Safari affichait un écran vide au lancement : iOS n'utilise que des balises `apple-touch-startup-image`, une image par taille d'écran.
- Ajout de 13 images (`assets/startup/`, iPhone SE 1re génération → 16 Pro Max / Air), même principe que l'appli : l'accueil sans ses boutons, sous la barre d'état noire. Chaque iPhone ne télécharge que la sienne (~0,2 Mo). Fabriquées par `tools/make-startup-images.cjs` (à relancer si l'accueil change), qui met aussi à jour les balises dans `index.html`.
- Retirées de l'appli iOS au build (`tools/build-www.cjs`) : elle a son propre écran de lancement.
- Android (Chrome) : écran de démarrage automatique (icône sur fond noir, d'après `manifest.webmanifest`), non personnalisable davantage.
- Pour le voir : supprimer l'icône de l'écran d'accueil et la rajouter (iOS garde l'ancien écran en mémoire).

## [2026-10-02] Écran de lancement de l'appli = l'accueil sans les boutons
- Question de David : faire une splash ? Choix : pas d'écran de marque avec attente (déconseillé par Apple), mais l'écran de lancement obligatoire d'iOS reprend **exactement le fond stade et le logo de l'accueil**. Quand le jeu est prêt, il s'efface en fondu (250 ms) et les boutons apparaissent : l'appli semble s'ouvrir directement.
- Avant : logo or sur fond noir, affiché 0,6 s fixe. Maintenant : masqué par le jeu dès que l'accueil est dessiné (`SplashScreen.hide`, `launchAutoHide: false`), avec un filet de sécurité à 4 s si le jeu plante au démarrage.
- Image fabriquée par `tools/make-splash.cjs` (capture de l'accueil) ; `npm run icons` la convertit en un seul JPEG (≈0,5 Mo au lieu de 36 Mo de PNG, `tools/splash_jpeg.py`). Le site n'a pas d'écran de lancement.

## [2026-10-02] Règles : 4 écrans à faire glisser
- Demande de David : des règles plus didactiques, sur 4 écrans qu'on fait glisser.
- 1. **Le principe** (équipes + téléphone arbitre) · 2. **Le Tackle** (frise 30 s priorité → sifflet → 15 s course, litige, 15 s pour valider) · 3. **Plus tu trouves tôt, plus tu marques** (paliers 5→1, Transfert / Qui suis-je ? / Le Match) · 4. **La cagnotte** (+1, encaisser ou continuer, Plus ou Moins / Vrai ou Faux).
- Chaque écran : un visuel simple en CSS, un titre, 3 ou 4 phrases courtes. Points de position cliquables, bouton « Suivant » qui devient « Jouer » sur le dernier écran (→ Créer une partie). Français et portugais.
- Provisoire en attendant la maquette Règles.

## [2026-10-02] Accueil, Réglages et page Règles
- Demande de David : une page d'accueil avec 3 boutons (**Jouer**, **Boutique**, **Règles**) et une roue dentée **Réglages** (effets sonores, langue, rétablir les achats).
- L'appli s'ouvre désormais sur l'accueil (logo, « Le quiz foot entre potes »). Jouer → Créer une partie (bouton retour vers l'accueil). Boutique → page d'abonnement. Règles → résumé des règles (principe, Tackle, chrono de 15 s, points 5→1, cagnotte), en français et en portugais.
- Réglages : interrupteur **Effets sonores** (mémorisé, coupe tous les sons ; les vibrations restent), choix **Langue** (Français / Português, recharge l'appli), **Rétablir les achats** (RevenueCat), numéro de version.
- Le lien de langue sous les défis est supprimé (la langue est dans Réglages). « Envoyer le journal des parties (N) » passe aussi dans Réglages (visible seulement s'il y a des parties enregistrées). Le bandeau « Nouvelle version disponible » s'affiche sur l'accueil.
- Quitter une partie ramène à l'accueil ; « Rejouer » ramène toujours à Créer une partie.
- Mise en forme provisoire avec les éléments graphiques existants : à refaire quand les maquettes (Règles, Boutique, Réglages, À propos) arrivent.

## [2026-10-02] Jeu en portugais (Portugal), en plus du français
- Demande de David : l'appli en portugais. Choix : **portugais du Portugal (pt-PT)**, **français + portugais** dans la même appli, **écrans + questions**.
- Langue : celle du téléphone (portugais si le téléphone est en portugais, sinon français), changeable par le lien « Jogar em português » / « Jouer en français » sur Créer une partie (à déplacer dans Réglages avec la maquette). Le choix est mémorisé. Le site suit la même règle.
- Écrans : textes fixes traduits au chargement (`PT_STATIC`), textes calculés via `L("français", "português")`. Grammaire des noms d'équipes : « aos Leões / às Raposas », « dos / das », « pelos / pelas », « Os Leões confirmam? ». Noms par défaut : Os Leões, As Raposas, Os Touros, As Águias. Vocabulaire : partida, ronda, pista, pote, arrecadar, equipa, golo, guarda-redes… Les défis : Transferência, Mais ou Menos, Verdadeiro ou Falso, Quem sou eu?, O Jogo. « Tackle » reste « Tackle ».
- Questions : fichiers `src/data/pt/` générés par `tools/translate_pt.py` à partir des fichiers français et des tables `tools/i18n/pt_names.json` (clubs avec genre, pays, nationalités, compétitions, trophées, postes, villes…). Le script échoue s'il manque une traduction : une nouvelle carte française ne peut pas rester en français par oubli. **Après tout ajout de cartes en français : lancer `python3 tools/translate_pt.py`.** Le test vérifie que les fichiers pt ont les mêmes cartes que le français.
- Le Match en portugais : réponses acceptées en portugais et en français (« Alemanha » ou « Allemagne »). Libellés courts de la frise fournis par les données (`short`). Vrai ou Faux : phrase de correction prête dans les données (`correction`).
- Le journal de partie envoyé à David reste en français.
- Relecture indépendante (agent séparé, regard pt-PT football) : corrections appliquées (« Toca », « Saltar pista », « próximo acontecimento », « Meia-final », « aos 90+3 minutos », « 0 pontos » au pluriel, noms de clubs unifiés, noms de joueurs en casse normale…).
- iOS : `CFBundleLocalizations` = fr, pt-PT (l'App Store affichera le portugais). Fiche App Store en portugais à rédiger le moment venu.
- Reste à faire : faire relire par un lecteur portugais réel avant la sortie au Portugal ; anomalie de données FR signalée (Le Match `lm-ucl-1989-final`, carton jaune attribué à « c »).

## [2026-10-02] Appli iPhone : abonnement, 2 parties gratuites par jour de 5 manches
- Décision de David : modèle **abonnement**. Sans abonnement : **2 parties par jour, de 5 manches**. Prix : définis plus tard par David (rien dans le code, lus dans l'App Store).
- Précisions retenues : les cinq défis restent jouables en gratuit ; compteur remis à zéro à minuit (heure du téléphone) ; une partie compte au coup d'envoi ; 10/15/20 manches verrouillées (cadenas → page d'abonnement) ; 3e partie du jour → page d'abonnement. **Le site web reste illimité** pour les testeurs.
- Technique (choix laissé à Claude) : **RevenueCat** (plugin Capacitor), droit `premium`, offre `default`. Clé publique à renseigner (`REVENUECAT_IOS_KEY`) quand le compte développeur et les produits existent.
- Page d'abonnement **provisoire** (fonctionnelle) en attendant la maquette : avantages, formules et prix de l'App Store, essai gratuit éventuel, restaurer, « J'ai un code » (codes d'offre Apple), mentions obligatoires et liens CGU/confidentialité.
- Pages à venir avec les maquettes : Règles / comment jouer, Boutique (abonnement), Réglages, À propos / contact.
- Vérifié en navigateur en simulant l'appli : verrous, compteur 2 → 1 → abonnement à la 3e partie, achat simulé qui déverrouille tout ; site web inchangé.

## [2026-10-02] Appli iPhone : le même jeu emballé avec Capacitor, questions mises à jour à distance
- Demande de David : faire l'appli pour l'App Store, en pouvant continuer à modifier le jeu, et ajouter/retirer des questions quand on veut.
- Décision : un seul code (`index.html`) pour le site et l'appli ; projet iOS Capacitor 8 dans `ios/` (Swift Package Manager, pas de CocoaPods), construit depuis `www/` (`npm run build`, qui copie seulement les fichiers utilisés et vérifie qu'aucun ne manque).
- Dans l'appli : vibrations haptiques, écran toujours allumé, partage natif du journal, barre d'état claire, icône et écran de démarrage (logo or sur noir), iPhone uniquement en portrait. Bandeau « Mettre à jour » du site désactivé (mises à jour par l'App Store).
- Questions : l'appli lit `src/data/` sur le site au lancement (5 s max), sinon la copie embarquée. Ajouter/retirer des cartes ne demande donc pas de nouvelle version. Règles, écrans et nouveaux défis : nouvelle version (TestFlight puis App Store).
- Bundle ID provisoire `com.lafamivy.tackle`. Politique de confidentialité `privacy.html` (aucune donnée collectée ; contact à compléter).
- Vérifié en navigateur en simulant l'appli : questions lues sur le site, repli hors ligne, vibrations appelées, aucune erreur. Reste à compiler et tester sur iPhone (Mac + Xcode) : voir `docs/APP_IOS.md`.
## [2026-10-02] Le Match : cinq indices factuels dans un ordre fixe
- Retour d'un essai avec les neveux de David : identifier un match à partir de cinq événements chronologiques était trop difficile.
- Décision de David : remplacer les événements par **compétition (5 pts), année (4 pts), score final (3 pts), ville du match (2 pts), stade de la compétition (1 pt)**. « Ville » a été précisé par David ; « stade de la compétition » désigne la phase, par exemple finale ou demi-finale, et non le nom de l'enceinte.
- L'équipe doit toujours trouver les deux équipes ; les règles de réponse, de passe, de pénalité et de Tackle restent celles du Match. Le chrono 30 + 15 secondes repart à chaque indice.
- La compétition devient le premier indice à 5 points au lieu d'être affichée hors score avant cinq événements. L'année, auparavant cachée, devient le deuxième indice.
- Mise en œuvre le 2 octobre : ville et lien source ajoutés aux 103 fiches ; écran et progression adaptés. Les anciens événements restent dans les données pour archivage, mais ne sont plus joués.


## [2026-10-01] Jamais deux manches de suite avec le même défi
- Demande de David : le jeu suivant peut être n'importe lequel, mais pas le même que celui d'avant.
- Décision : chaque manche tire un défi au hasard parmi ceux sélectionnés, **en excluant celui de la manche précédente** (toutes les équipes jouent toujours le même défi dans une manche). Avec un seul défi sélectionné, il est forcément répété. La première manche d'une partie (y compris une revanche) peut être n'importe quel défi.
- Tests : tirage sur 500 manches sans répétition consécutive, les 4 autres défis possibles après un défi donné ; partie de 10 manches vérifiée en navigateur.

## [2026-10-01] Plus ou Moins : catégorie (championnat, coupe…) bien visible
- Remarque de David en test : on ne voit pas assez sur quel championnat ou quelle coupe porte la comparaison.
- Décision : la catégorie sous le titre devient une pastille encadrée dorée, en majuscules, plus grande (15 à 20 px selon l'écran au lieu de 16 px en blanc simple), toujours sur une ligne (« SÉLECTIONS EN ÉQUIPE NATIONALE » compris, vérifié à 390 et 320 px). Les unités sous les valeurs (« BUTS », « SÉLECTIONS ») restent inchangées.

## [2026-10-01] Chrono de réponse : 15 secondes pour valider (20 s au départ, réduit à 15 s à la demande de David)
- Problème relevé par David en test : des joueurs appuient sur « Répondre » pour gagner du temps de réflexion (le chrono principal s'arrête pendant la saisie).
- Décision : dès qu'une équipe a la main pour répondre, elle a **15 s** pour valider, avec une barre et un compte à rebours (rouge sous 5 s) en haut du panneau :
  - « Répondre » sur Transfert, Qui suis-je ?, Le Match (saisie + confirmation comprises ; « Modifier » ne remet pas le chrono à zéro) ;
  - réponse au Tackle d'une équipe adverse (saisie, ou VRAI/FAUX, PLUS/MOINS) ;
  - équipe qui a la main ayant gagné la course au Tackle (y compris PLUS/MOINS, VRAI/FAUX).
- À 0 : c'est une **mauvaise réponse** avec les règles habituelles (−1 et indice suivant pour l'équipe qui a la main ; Tackle raté pour un adversaire ; cagnotte perdue sur Plus ou Moins / Vrai ou Faux). Le journal de partie note « temps de réponse écoulé ».
- Pendant les 30 s de priorité, PLUS/MOINS et VRAI/FAUX restent sans chrono séparé (le choix est immédiat).
- Durée réglable en un endroit (`ANSWER_SECONDS` dans `index.html`). Tests ajoutés (réponse, Tackle texte, Tackle Vrai ou Faux).
- Le texte du panneau de Tackle sur Transfert / Qui suis-je ? / Le Match est corrigé : « Une seule tentative par carte · raté : la main revient à l'équipe qui jouait » (il disait encore que la carte se terminait).

## [2026-10-01] Correctif : champ de réponse toujours vide à chaque nouvelle réponse
- Bug relevé par David : après une mauvaise réponse, la carte continue ; au « Répondre » suivant, le nom tapé avant était encore dans le champ.
- Reproduit en navigateur sur Qui suis-je ? et Le Match (les deux champs d'équipes). Sur Transfert le champ était déjà vidé dans le cas testé, mais le correctif s'applique aussi par sécurité.
- Correctif : chaque appui sur « Répondre » (Transfert, Qui suis-je ?, Le Match, y compris quand l'équipe qui a la main gagne la course au Tackle) ouvre un champ vide. Le champ du Tackle était déjà vidé à chaque Tackle.

## [2026-10-01] Tackle raté : la carte continue pour l'équipe qui a la main (Transfert, Qui suis-je ?, Le Match)
- Proposition de David : l'équipe prioritaire doit pouvoir encore gagner des points quand un adversaire rate son Tackle ; les équipes qui n'ont pas encore tacklé peuvent encore jouer.
- Options discutées : (A) l'équipe prioritaire encaisse le palier en cours et la carte s'arrête ; (B) la carte continue pour elle. **Choix de David : B.**
- Décision :
  - Tackle adverse **réussi** : + le palier, carte terminée (inchangé).
  - Tackle adverse **raté** : − le palier pour l'équipe qui tacle, puis bandeau « Tackle raté » (« La main revient aux … · indice suivant · n pts ») et la carte continue à l'indice ou à l'événement suivant, avec un nouveau chrono (30 s de priorité, puis 15 s de course).
  - **Une seule tentative par équipe adverse et par carte** : une équipe qui a raté n'apparaît plus dans « Qui a tacklé ? » jusqu'à la carte suivante. L'équipe qui a la main reste toujours dans la liste (règle de la course). Le litige reste proposé tant qu'au moins 2 équipes sont dans la liste.
  - Tackle raté sur le **dernier** indice ou événement : réponse révélée, carte terminée.
- Plus ou Moins et Vrai ou Faux : **inchangés** (le Tackle vaut ±3 et termine la carte ; s'il est raté, l'équipe prioritaire encaisse sa cagnotte).
- Tests : `tests/tackle-timing.test.cjs` couvre le Tackle raté qui continue, l'exclusion de l'équipe qui a raté et le dernier indice. Vérifié en navigateur sur Transfert, Qui suis-je ? et Le Match avec 3 équipes.

## [2026-09-29] Bouton « Litige : tirage au sort » encadré
- Demande de David : le litige doit être un bouton encadré aussi gros que les boutons d'équipe, à la même place (sous les indications, au-dessus de « Annuler, personne n'a tacklé »).
- Décision : bouton pleine largeur, 62 px de haut comme les équipes, cadre doré, texte doré. En mode litige, le même bouton affiche « Retour : l'arbitre choisit ». Aucun autre changement du panneau.

## [2026-09-29] Le Match (« tableau d'affichage ») : identité intégrée — les cinq défis ont leur carte
- Pack fourni : `assets/ui/le-match/` (planche 26). Seule la carte centrale change ; tous les éléments communs restent tels quels (les écarts de la planche — scores « Équipe Alpha », points de manche, chrono rond — sont ignorés, comme pour les autres défis).
- Carte : tableau de stade, plaque « Le Match », compétition seule (sans année), « ? vs ? » en texte, frise verticale de cinq événements à hauteur fixe (44 px) : minute à gauche (`90+2′` lisible), événements passés visibles, courant éclairé avec son palier (5 → 1 pt), suivants « Événement à venir » avec cadenas.
- Libellés : les phrases des données sont raccourcies **à l'affichage seulement** (la minute est déjà dans sa colonne) : « But par X à la 61e minute. Le score passe à 3-2. » → « But par X · 3-2 » ; mi-temps, fin du match, prolongation, tirs au but → « Mi-temps · 0-1 », etc. Les données ne changent pas.
- Icônes selon le fait : ballon du pack pour les buts et penalties, petit carton jaune ou rouge pour les cartons, aucune icône pour les autres événements (conforme au README du pack).
- Fin de carte : les deux équipes remplacent « ? vs ? », en texte, sans blason ni drapeau ; « ? vs ? » revient à la carte suivante.
- Le titre commun au-dessus de la carte est désormais masqué pour les cinq défis, puisque chacun porte son titre dans sa carte.
- Mise en page : tient au-dessus du bouton Tackle sur 390 × 844 (boutons jusqu'à 724 px, Tackle à 767 px).
- Ajustement demandé par David (23 h 47) : « ? vs ? » réduit en deux fois (points d'interrogation 56 → 42 → 30 px, « vs » 22 → 19 → 16 px) ; la carte gagne 26 px de hauteur. La compétition tient maintenant sur une ligne (« Coupe des clubs champions » passait sur deux).

## [2026-09-29] Vrai ou Faux (« VAR ») et Qui suis-je ? (« tableau tactique ») : identités intégrées
- Packs fournis : `assets/ui/vrai-ou-faux/` (planche 24) et `assets/ui/qui-suis-je/` (planche 25). Seule la carte centrale de chaque défi change ; en-tête, bandeau des scores, chrono « Priorité », bouton Tackle, panneaux Tackle, bandeau de verdict et classements restent les éléments communs.
- Vrai ou Faux : cadre VAR sur fond de stade, badge « VAR » (ambiance seulement, pas de vidéo), titre « Vrai ou Faux » dans la carte (le titre commun au-dessus est masqué, comme Transfert et Plus ou Moins), « Affirmation n / 5 », affirmation en grand, **cagnotte potentielle** dans la carte (distincte des scores). Boutons VRAI (vert, coche) à gauche et FAUX (corail, croix) à droite, sous le chrono : ordre inversé par rapport à avant (FAUX était à gauche) pour suivre la planche. Les couleurs désignent le choix, jamais la bonne réponse.
- Qui suis-je ? : tableau tactique, bandeau papier « Qui suis-je ? », plaque « ? », cinq fiches à **hauteur fixe** (42 px) pour que la liste ne bouge pas : passées en papier crème, courante dorée avec son palier (5 → 1 pt), futures verrouillées « Indice à venir » sans rien révéler. Les fiches reprennent les phrases vérifiées des données (« J'ai joué à Real Madrid »), sans le point final. En fin de carte, le **nom réel s'affiche en texte** sur la plaque (aucun portrait) ; il redevient « ? » à la carte suivante. RÉPONDRE / PASSER : commandes communes inchangées.
- Mise en page : les deux cartes tiennent au-dessus du bouton Tackle sur 390 × 844 (Vrai ou Faux : boutons jusqu'à 672 px ; Qui suis-je ? : jusqu'à 722 px, Tackle à 767 px). Sur 320 × 568, la page défile comme les autres défis.
- Images : fonds convertis en WebP (`web/vf-stadium-panel.webp` 49 Ko, `web/qsj-tactics-board.webp` 71 Ko) ; les SVG du pack sont utilisés tels quels.
- Le Match garde pour l'instant son ancienne carte, en attendant son pack.

## [2026-09-29] Plus ou Moins : silhouettes anonymes du duel intégrées
- Les silhouettes fournies (`assets/ui/pom-player-blue.png`, `pom-player-coral.png`) remplacent l'absence de joueur : bleue en haut à gauche, corail en bas à droite, comme sur la planche 16, avec un fondu en bas pour se fondre dans la carte.
- Les noms et valeurs passent du côté opposé à leur silhouette : joueur de référence à droite dans la zone bleue, joueur suivant à gauche dans la zone corail (devant les barres).
- Ajustement demandé par David (21 h 56) : « VS » remonté (au-dessus du trait lumineux), silhouette bleue décalée vers la gauche et corail vers la droite (débord de 14 % hors de la carte au lieu de 7 %).
- Nouvel ajustement (23 h 12) : « VS » redescendu d'un cran, sur le trait lumineux.
- Correction (23 h 19) : les demandes de 23 h 12 et 23 h 18 visaient les **noms**, pas les silhouettes. Silhouettes remises à 14 % de débord ; nom bleu (référence) décalé vers la gauche et nom rouge (suivant) vers la droite, c'est-à-dire vers le centre de la carte (marge de 15 % au lieu de 2 %).
- Retrait (23 h 16) : les petits graphiques en barres décoratifs (bleu en haut à droite, corail en bas à gauche) sont supprimés, ils n'apportaient rien. Il reste les silhouettes, les noms, les valeurs, le « VS » et le trait lumineux.
- Aucune règle ni élément commun modifié. Vérifié à 390 × 844 et 320 × 568, avant réponse et avec le verdict « Bonne réponse ».

## [2026-09-29] Après le sifflet, course au Tackle pour toutes les équipes
- Proposition de David : après les 30 secondes, il n'y a plus que le Tackle, et l'équipe prioritaire fait partie du choix des équipes qui ont tacklé.
- Décision :
  - Pendant les 30 s réservées : rien ne change (« Répondre », « Passer », PLUS/MOINS, VRAI/FAUX pour l'équipe qui a la main).
  - Après le sifflet (15 s) : les boutons de l'équipe qui a la main disparaissent, **y compris « Passer »** (sinon elle pourrait couper la course) ; il ne reste que le bouton Tackle, pour tout le monde.
  - « Qui a tacklé ? » liste **toutes** les équipes, celle qui a la main en tête avec la mention « À la main ».
  - Si l'équipe qui a la main gagne la course : elle répond **normalement**, avec ses points et pénalités habituels (la saisie s'ouvre directement sur Transfert, Qui suis-je ? et Le Match ; PLUS/MOINS ou VRAI/FAUX réapparaissent sur les deux autres). Pas d'enjeu de Tackle pour elle.
  - Si une équipe adverse gagne : enjeu du Tackle, comme avant.
  - Personne ne tacle en 15 s : indice/événement suivant automatiquement (ou cagnotte encaissée et fin de carte sur Plus ou Moins / Vrai ou Faux), comme avant.
  - « Passer » est gardé pendant les 30 s pour le rythme : sans lui, une carte de 5 indices où personne ne trouve durerait près de 4 minutes.
- Arbitre : l'équipe qui a la main n'étant plus neutre, **c'est la personne qui tient le téléphone qui arbitre**. Le bouton « Litige : tirage au sort » est maintenant toujours proposé (au moins 2 équipes sont dans la course, même à 2 équipes). Remplace l'arbitrage par l'équipe active de la décision « Litige au Tackle » ci-dessous.
- Partie à 1 équipe : inchangée (pas de course, « Répondre » reste disponible).
- Tests : `tests/tackle-timing.test.cjs` couvre la course (boutons masqués, équipe qui a la main en tête, réponse normale si elle gagne). Vérifié en navigateur sur les cinq défis, plus annulation du Tackle et passage automatique à l'indice suivant.

## [2026-09-29] Tackle : « Qui a tacklé ? » et la réponse s'ouvrent par-dessus l'écran
- Demande de David : quand on tackle, « Qui a tacklé ? » ne doit pas apparaître en bas de la page mais par-dessus.
- Décision : le panneau « Qui a tacklé ? » s'ouvre au centre de l'écran, par-dessus le jeu, avec un voile sombre. Le panneau de réponse au Tackle (équipe, saisie ou VRAI/FAUX, PLUS/MOINS) s'ouvre aussi par-dessus, **en haut** de l'écran pour rester visible au-dessus du clavier du téléphone ; son voile est plus léger pour que la carte du défi reste lisible dessous.
- Le voile bloque le reste de l'écran (y compris « Quitter ») tant que le Tackle n'est pas terminé ou annulé. Aucun changement de règle ni de score. Si le panneau dépasse la hauteur de l'écran, il défile à l'intérieur.
- Vérifié en navigateur sur Transfert, Vrai ou Faux et Le Match, à 390 × 844 et 320 × 568, avec 4 équipes.

## [2026-09-29] Chrono « Priorité » et boutons remontés sous la carte
- Demande de David : mettre la bande « Priorité aux … » et tout ce qui suit plus haut.
- Constat : entre la carte du défi et le chrono, le jeu gardait de la place vide même sans verdict (emplacement du verdict de 18 px, marge de 16 px sous les cartes claires, zone vide de Qui suis-je ?). Écart mesuré : 28 px sur Transfert et Plus ou Moins, 44 px sur Vrai ou Faux, Qui suis-je ? et Le Match.
- Décision : l'emplacement du verdict ne prend de la place que lorsqu'un verdict est affiché ; plus de marge sous la carte ; la zone vide de Qui suis-je ? est masquée. Écart carte → chrono : 10 px sur les cinq défis (le même espacement qu'entre les autres blocs).
- Gain : 18 px (Transfert, Plus ou Moins) à 34 px (Vrai ou Faux, Qui suis-je ?, Le Match). Le bouton Tackle reste en bas de l'écran. Les verdicts (pilule qui chevauche le bas de la carte) s'affichent comme avant ; vérifié sur Transfert et Plus ou Moins, à 390 × 844 et 320 × 568.

## [2026-09-29] Bandeau des scores : le logo suffit, plus de nom d'équipe
- Demande de David : enlever le nom des équipes dans le bandeau des scores pendant la partie, le logo suffit.
- Décision : chaque case affiche seulement **le logo, calé à gauche, et le score, calé à droite** (demande de David, 21 h 08 ; d'abord centrés). Le logo passe de 20 à 26 px et reste affiché sur tous les écrans et à 4 équipes (plus besoin de le masquer faute de place). Hauteur inchangée : 34 px.
- Conséquence : plus aucun nom coupé avec « … », même à 4 équipes sur un 320 px. Le nom complet reste dans l'étiquette lue par les lecteurs d'écran (et en infobulle).
- Le classement entre deux manches et le classement final gardent les noms.
- Remplace la partie « logo · nom · score » de la décision « Bandeau des scores réduit de moitié » ci-dessous.

## [2026-09-29] Litige au Tackle : l'équipe active arbitre, sinon tirage au sort
- Problème soulevé par David : le Tackle se joue à voix haute, donc des disputes « c'est moi qui l'ai dit en premier » sont inévitables.
- Option écartée : un buzzer par équipe sur l'écran (le premier doigt gagne). Trop compliqué avec un seul téléphone qui passe de main en main.
- Décision : l'équipe qui a la main arbitre et choisit l'équipe qui a tacklé en premier (écran « Qui a tacklé ? », sous-titre mis à jour). En cas de doute, bouton « Litige : tirage au sort » : toutes les équipes adverses sont cochées, l'arbitre décoche celles qui ne réclament pas, puis « Tirer au sort » lance une roulette d'environ 2 s et l'équipe tirée répond au Tackle.
- Détails : bouton de litige affiché seulement s'il y a au moins 2 équipes adverses (3 équipes ou plus) ; « Retour : l'arbitre choisit » annule le litige ; « Annuler, personne n'a tacklé » annule aussi un tirage en cours ; le chrono reste arrêté ; le tirage est écrit dans le journal de partie.
- Règle complète : GAME_DESIGN.md, « Qui a tacklé en premier ? ». Vérifié en navigateur avec 2, 3 et 4 équipes.

## [2026-09-29] Bandeau des scores réduit de moitié
- Demande de David : le bandeau qui affiche les scores en permanence pendant une partie prenait trop de place. On commence par le diviser par deux en hauteur ; « pts » n'apporte rien.
- Décision : chaque équipe tient sur **une seule ligne fine** : logo · nom · score. Hauteur du bandeau : 34 px au lieu de 73 px (3 équipes, iPhone 390 × 844) ; 34 px au lieu de 96 px à 4 équipes.
- Retiré : le mot « pts » après le score et la mention « Au tour de » au-dessus du nom. L'équipe qui joue reste signalée par l'**encadré doré**, et son score passe en doré (un score négatif reste rouge). La bande « Priorité aux … » sous la carte nomme toujours l'équipe qui a la main. Les lecteurs d'écran annoncent toujours « au tour de cette équipe ».
- 4 équipes : désormais **sur une seule ligne** aussi (avant : deux lignes). Sous 400 px de large, les logos sont masqués à 4 équipes pour laisser la place aux noms ; sous 360 px, les logos sont masqués quel que soit le nombre d'équipes (comme avant).
- Limite connue : sur un très petit téléphone (320 px) à 4 équipes, les noms longs (« Renards », « Taureaux ») sont coupés avec « … ».
- Hors périmètre : le classement entre deux manches et le classement final gardent leurs points.
- Vérifié en navigateur à 390 × 844 et 320 × 568, avec 2, 3 et 4 équipes.

## [2026-09-29] Proposer la mise à jour aux joueurs qui ont gardé le jeu en signet
- Décision : le jeu connaît son numéro de version (`APP_VERSION` dans `index.html`) et le compare à `version.json` sur le serveur au lancement et à chaque retour dans l'appli. Si le serveur a plus récent, un bandeau « Nouvelle version de TACKLE disponible · Mettre à jour » s'affiche en haut de « Créer une partie », jamais pendant une partie.
- Raison : les testeurs lancent le jeu depuis l'écran d'accueil du téléphone, qui peut garder une ancienne page.
- Impact technique : lancer `tools/bump-version.sh` avant chaque envoi sur main (le test vérifie que les deux numéros correspondent). « Mettre à jour » recharge la page avec `?v=<version>` pour contourner le cache.

## [2026-09-29] Les éléments communs ne changent pas avec les nouvelles planches
- Décision : à l'intégration d'une nouvelle maquette, garder tels qu'ils sont déjà intégrés les éléments communs à tous les écrans, même si la planche les dessine autrement (demandé par David). Seul le cœur propre au défi suit la planche.
- Éléments communs concernés : bouton Quitter, logo et numéro de manche, bandeau des scores de toutes les équipes (emblèmes, encadré doré de l'équipe qui joue — voir la décision « Bandeau des scores réduit de moitié »), bande « Priorité aux … » avec le chrono, bouton Tackle (grisé, rouge clignotant, animation d'ouverture), panneaux de saisie/confirmation et « Qui a tacklé ? », bandeaux de verdict, classement entre deux manches, classement final.
- Les retours « Bonne réponse / Mauvaise réponse » (et Tackle réussi/raté, temps écoulé, fin des indices) sont **un seul élément commun** : même pilule néon posée sur le bas de la carte, même ligne de détail en dessous (points, réponse révélée ou non), pour les cinq défis.
- Exception : un élément commun ne change que si David le demande explicitement ou si une décision de ce fichier le modifie. **Quand il change, il change pour tous les défis** : c'est le même élément dans le code (`showVerdict()` dans `index.html`).

## [2026-09-29] Plus de Tackle après la réponse de l'équipe active (Plus ou Moins, Vrai ou Faux)
- Décision : sur Plus ou Moins et Vrai ou Faux, dès que l'équipe active répond, sa réponse est révélée immédiatement et le Tackle se ferme, comme sur Transfert, Qui suis-je et Le Match (demandé par David : « la mécanique est pareille partout »).
- Remplace : la règle du 2026-09-28 où une réponse active verrouillée attendait la fin des 45 secondes et pouvait encore être tacklée.
- Impact technique : `pomGuess()` et `vfAnswer()` arrêtent le chrono et révèlent tout de suite ; la zone « réponse verrouillée » n'est plus utilisée. Sans réponse ni Tackle au bout des 45 secondes, la cagnotte est encaissée (inchangé). Le test `tests/tackle-timing.test.cjs` suit la nouvelle règle.

## [2026-09-29] Bouton Tackle clignotant et vibrations
- Décision : pendant les 15 secondes ouvertes, le bouton Tackle clignote ; le téléphone vibre brièvement (deux fois) au départ de chaque chrono et plus longuement à l'ouverture du Tackle (demandé par David).
- Raison : rendre les deux moments perceptibles sans regarder l'écran, en complément des deux sifflets.
- Impact technique : vibrations via l'API web de vibration, disponible sur Android mais pas sur iPhone (Safari) ; le son et l'animation restent les repères communs. Aucun changement de règle ni de chrono.

## [2026-09-29] Deux sifflets distincts pour le chrono et le Tackle

- David demande un signal au départ du chrono et un autre lorsque les adversaires peuvent tackler : un double sifflet bref, type coup d'envoi, marque chaque nouveau décompte de 30 secondes ; un sifflet unique plus appuyé, type faute, marque l'ouverture des 15 secondes de Tackle.
- Les fichiers sont `assets/ui/kickoff-whistle.wav` et `assets/ui/tackle-whistle.wav`. L'animation rouge du Tackle et ce second son partent ensemble ; le bouton devient utilisable immédiatement, sans attendre la fin de l'effet.
- Le chrono et les règles de score ne changent pas. Les sons sont des repères de jeu ; l'interface doit rester compréhensible si le téléphone est muet.

## [2026-09-29] Personnaliser les équipes une par une
- Décision : « Personnaliser les équipes » présente une seule fiche à la fois — Équipe 1, puis « Équipe suivante », etc. — et le dernier bouton devient « Coup d'envoi » (demandé par David).
- Raison : plus clair qu'une longue page avec toutes les fiches.
- Impact technique : repères d'avancement en haut de page ; la flèche de retour revient à l'équipe précédente puis à « Créer une partie ». Les règles de logo, couleur et nom par défaut ne changent pas.

## [2026-09-28] Le téléphone peut être tenu librement pendant la partie

- David supprime la rotation obligatoire du porteur de téléphone. La réponse attendue étant cachée jusqu'à sa vérification, l'équipe active, une autre personne ou un maître du jeu peut manipuler l'appareil selon ce qui est naturel pour le groupe.
- Les écrans de jeu affichent l'équipe active et, lors d'un Tackle, l'équipe qui tente sa réponse ; ils n'affichent pas « téléphone tenu par… ». La personne qui saisit une réponse de l'équipe active lui montre le texte avant validation.
- Après le premier Tackle annoncé, la personne qui tient le téléphone choisit l'équipe qui l'a annoncé en premier, puis saisit sa réponse. Le porteur du téléphone n'obtient aucun droit de Tackle supplémentaire. Une seule équipe adverse répond par fenêtre.
- La passe conserve le comportement actuel : elle mène directement à l'indice suivant et fait perdre un palier potentiel. La fréquence réelle des Tackle sera observée en partie test avant de changer ce point.
- Les maquettes de Transfert ont été corrigées ; l'interface jouable doit suivre cette règle lors de son intégration.

## [2026-09-28] Noms d'équipe par défaut tirés des animaux
- Décision : les équipes s'appellent par défaut Les Lions, Les Renards, Les Taureaux et Les Aigles, selon leur animal ; le bouton crayon efface le nom pour en saisir un nouveau (demandé par David).
- Raison : des noms incarnés dès l'ouverture, cohérents avec les emblèmes.
- Impact technique : tant qu'une équipe garde un nom par défaut, il suit l'animal choisi ; un nom saisi n'est jamais écrasé. Un nom laissé vide prend celui de l'animal au coup d'envoi.

## [2026-09-28] Logo et couleur uniques par équipe
- Décision : lorsqu'une équipe a pris un logo ou une couleur, les autres équipes ne peuvent plus le choisir (demandé par David).
- Raison : chaque équipe doit rester identifiable d'un coup d'œil dans le score et le classement.
- Précision de David (même jour) : les premières équipes doivent pouvoir choisir n'importe quel logo ; les valeurs par défaut des équipes suivantes ne doivent pas les bloquer.
- Impact technique : une équipe n'est bloquée (choix grisé et désactivé) que par les équipes qui la précèdent. Si elle choisit un logo ou une couleur tenu par une équipe suivante, les deux échangent ; un nom par défaut suit l'animal reçu. Une équipe ajoutée reçoit un logo et une couleur libres.

## [2026-09-28] Suppression de la fenêtre de contestation de 5 secondes : Tackle commun uniquement

- David signale que « les 5 secondes de contestation disparaissent » et précise, en clarifiant : il veut supprimer la fenêtre spéciale qui s'ouvrait immédiatement quand l'équipe active verrouillait sa réponse sur Plus ou Moins/Vrai ou Faux, et faire que ces deux jeux suivent exactement le même rythme que Transfert/Qui suis-je/Le Match : 30 secondes grisées puis 15 secondes ouvertes après le sifflet, **même si l'équipe active a déjà répondu**. Confirmé par David.
- Comportement retenu : répondre tôt ne change plus rien au minuteur. Le bouton Tackle commun continue de courir depuis le début de la comparaison/affirmation, sans se rouvrir ni se raccourcir. Si un adversaire tackle pendant les 15 secondes ouvertes, il donne toujours sa propre réponse binaire (PLUS/MOINS ou VRAI/FAUX), que l'équipe active ait déjà verrouillé la sienne ou non — enjeu inchangé (forfait de 3 points). Si personne ne tackle au bout des 45 secondes et que l'équipe active avait déjà répondu, sa réponse se révèle alors normalement (juste ou fausse, cagnotte affectée en conséquence) ; si elle n'avait pas répondu du tout, la cagnotte déjà accumulée est encaissée comme avant.
- Impact technique dans `index.html` : `pomGuess()`/`vfAnswer()` ne déclenchent plus de fenêtre séparée (`startContestWindow` retiré) ; ils se contentent de verrouiller la réponse et d'afficher un libellé d'attente, sans toucher au minuteur du bouton Tackle commun déjà lancé par `beginPomTurn()`/`beginVfTurn()`. `tickTackleWindow()` vérifie, à l'expiration des 45 secondes, si l'équipe active avait déjà répondu ; si oui, elle révèle via `resolvePomGuess()`/`resolveVfStatement()` (déjà utilisées par ailleurs), sinon elle encaisse la cagnotte existante comme avant. Le code mort issu de l'ancienne interface par mini-jeu (boutons TACKLE/Révéler dédiés à Plus ou Moins et Vrai ou Faux, jamais affichés depuis l'introduction du bouton commun) a été retiré au passage.
- Vérifié par `tests/tackle-timing.test.cjs` (réécrit pour ce nouveau comportement) et par des scripts Playwright automatisés : le bouton reste grisé pendant les 30 secondes même après une réponse verrouillée, s'ouvre normalement à 30 secondes, un Tackle en milieu de fenêtre ouverte fonctionne correctement, et une réponse verrouillée jamais contestée se révèle normalement après 45 secondes.

## [2026-09-28] Consistance : enjeu du Tackle par palier (vol de réponse) ou forfait ±3 (contestation)

- Constat en lisant le code après le commit « Adapter les points du Tackle au palier ou au forfait ±3 » : l'enjeu du Tackle n'est plus un +5/−5 flat partout. Sur Transfert, Qui suis-je et Le Match (vol de réponse), l'enjeu suit désormais le palier de l'indice ou de l'événement en cours (5, 4, 3, 2 puis 1 point). Sur Plus ou Moins et Vrai ou Faux (contestation ou réponse à l'aveugle après 30 secondes), l'enjeu est un forfait fixe de **3 points**, pas 5.
- Ce changement était déjà en place dans `index.html` (`currentTackleStake()`, `isBinaryGame()`) mais n'avait pas été répercuté dans `GAME_DESIGN.md` (qui indiquait encore +5/−5 partout) ni dans `tests/tackle-timing.test.cjs` (qui attendait encore 5/−5 sur Plus ou Moins et Vrai ou Faux et faisait échouer le test).
- Correction apportée par Claude, en cohérence avec le rôle de vérification technique : `GAME_DESIGN.md` documente maintenant le palier (vol de réponse) et le forfait de 3 points (contestation/aveugle) séparément ; `tests/tackle-timing.test.cjs` est mis à jour pour refléter le forfait de 3 points et passe à nouveau (`node tests/tackle-timing.test.cjs`). Aucune règle n'a été changée par Claude : la documentation et le test suivent simplement le comportement déjà en ligne.
- David confirme le 2026-09-28 que le forfait fixe de 3 points sur Plus ou Moins/Vrai ou Faux (au lieu de 5) est bien la règle voulue. Point clos.

## [2026-09-28] Bouton Tackle commun et fenêtre de 30 + 15 secondes

- David décide qu'un même bouton Tackle reste visible pendant toutes les questions : grisé pendant 30 secondes de priorité à l'équipe active, puis actif pendant 15 secondes après le sifflet. La première équipe adverse qui appuie est la seule à tenter une réponse. L'équipe active peut encore répondre pendant cette fenêtre.
- Le délai repart à chaque indice de Transfert et Qui suis-je, à chaque événement de Le Match, et à chaque comparaison ou affirmation de Plus ou Moins et Vrai ou Faux. Sans réponse après 45 secondes, Transfert/Qui suis-je/Le Match passent à l'indice ou à l'événement suivant puis révèlent après le dernier.
- Sur Plus ou Moins et Vrai ou Faux, une réponse active donnée avant l'expiration déclenche tout de suite la contestation habituelle de 5 secondes, sans attendre les 30 secondes. Sans réponse active à 30 secondes, le premier tackleur peut donner sa propre réponse binaire pendant 15 secondes : +5 si elle est juste et la cagnotte active est perdue ; −5 si elle est fausse et la cagnotte active est encaissée. La carte se termine. Sans réponse à 45 secondes, la carte se termine et la cagnotte active est encaissée.
- Cette décision remplace les délais de 12 secondes et l'absence de limite après le sifflet des décisions précédentes. Le Tackle à +5/−5 et les pénalités des réponses actives restent ceux des mini-jeux.

Journal des arbitrages, dans l'ordre chronologique inverse. Chaque entrée indique ce qui a été décidé et pourquoi.

## [2026-09-27] Le Match implémenté avec 3 cartes de test
- Mini-jeu implémenté dans `index.html` conformément aux règles validées : compétition affichée seule au départ (sans édition), cinq événements révélés dans l'ordre chronologique du match pour 5/4/3/2/1 points, réponse de l'équipe active donnant les deux équipes du match (acceptées dans n'importe quel ordre, via le même moteur de correspondance approximative que Transfert et Qui suis-je), mauvaise réponse = −1 point puis événement suivant, passe = événement suivant sans pénalité, fin de carte avec révélation des deux équipes après le cinquième événement sans bonne réponse.
- Le Tackle reprend le vol de réponse de Transfert/Qui suis-je (12 secondes, sifflet, réponse unique de l'adversaire, +5/−5, fin de carte dans tous les cas), mais réenclenché à chaque nouvel événement puisque la fenêtre doit s'ouvrir événement par événement. La réponse du Tackle porte ici sur les deux équipes du match : le champ de saisie générique du Tackle affiche désormais un second champ quand le mini-jeu en cours est Le Match.
- **Contenu :** en l'absence de cartes réelles sourcées, et en suivant le même principe que les 4 fiches de test initiales de Qui suis-je, Claude a rédigé **3 cartes de test** clairement identifiées comme telles (`src/data/lematch-cards.json`, champ `status`), à partir de faits de matchs très largement documentés et vérifiables (finale de Coupe du monde 1998 France–Brésil, finale de Ligue des champions 2005 Liverpool–AC Milan, finale de Coupe du monde 2022 Argentine–France) — aucun fait obscur ni approximatif, dans le respect de la règle « pas de contenu généré ou jugé par une IA en partie réelle ». La case correspondante dans la configuration n'est pas cochée par défaut, pour éviter qu'elle s'active par erreur dans une vraie soirée. Ces cartes sont destinées à être remplacées par du contenu réel sourcé par David/ChatGPT, comme précédemment pour Qui suis-je.
- Vérifié par des scripts Playwright automatisés : chargement des cartes, bonne réponse (ordre inversé + faute de frappe tolérée), mauvaise réponse (−1, carte continue), passe, Tackle après 12 secondes avec réponse à deux équipes (réussi et raté).

## [2026-09-27] Tackle sur Plus ou Moins implémenté, fenêtre de 5 secondes sur Vrai ou Faux corrigée
- Implémenté dans `index.html` conformément à la décision « Le Match et les deux formes de Tackle » : sur Plus ou Moins, `pomGuess()` verrouille désormais la direction choisie (PLUS/MOINS) sans révéler immédiatement le résultat ; une fenêtre de 5 secondes s'ouvre (`startContestWindow`, sans délai préalable ni sifflet), pendant laquelle une équipe adverse peut annoncer TACKLE. Si personne ne tackle, la fenêtre s'écoule et `resolvePomGuess(null)` révèle normalement.
- Un Tackle réussi (l'équipe active s'était trompée) : le tackleur reçoit +5, la carte de l'équipe active s'arrête avec 0 point. Un Tackle raté (l'équipe active avait raison) : le tackleur reçoit −5 (le score général peut passer sous zéro) et le tour de l'équipe active continue normalement (chaîne suivante ou ENCAISSER/CONTINUER selon le cas), exactement comme sur Vrai ou Faux.
- Nouvelle UI ajoutée : `#pom-pending-zone` (bouton TACKLE + bouton Révéler), `#pom-tackle-team-picker`. Avec une seule équipe, la fenêtre est court-circuitée et la réponse se révèle directement (pas de Tackle possible en solo).
- Un helper partagé `startContestWindow(onTimeout)` / `clearContestTimer()` (délai `CONTEST_DELAY_SECONDS = 5`) a été ajouté à côté du helper existant `startTackleWindow()` (12 secondes, vol de réponse) : il est distinct et sert maintenant Plus ou Moins **et** Vrai ou Faux.
- Corrigé au passage : Vrai ou Faux affichait la fenêtre de contestation sans minuteur réel (bouton « Révéler » manuel uniquement, pas de limite de temps). `vfAnswer()` appelle maintenant `startContestWindow()` pour révéler automatiquement au bout de 5 secondes si personne ne tackle, conformément à la règle déjà validée.
- Vérifié par des scripts Playwright automatisés : révélation automatique après 5 s sans Tackle (Plus ou Moins et Vrai ou Faux), Tackle réussi (adversaire +5, carte active à 0), Tackle raté (adversaire −5, score négatif possible, tour actif qui continue et affiche normalement la décision ENCAISSER/CONTINUER).

## [2026-09-27] Le Match reprend les réponses et passes de Qui suis-je
- David confirme : après chaque événement, l'équipe active peut répondre une seule fois ou passer. Bonne réponse : elle gagne les points de l'événement et la carte s'arrête. Mauvaise réponse : −1 point au score général, puis événement suivant. Passe : événement suivant sans pénalité.
- Après une mauvaise réponse ou une passe au cinquième événement, la carte s'arrête et révèle les deux équipes. Les pénalités de mauvaises réponses se cumulent.
- Cette précision règle les trois questions laissées ouvertes dans la décision précédente ; elle ne change pas le Tackle de Le Match.

## [2026-09-27] Le Match et les deux formes de Tackle
- David valide **Le Match** : la compétition est affichée au départ, sans édition ; cinq événements vérifiés sont révélés dans l'ordre chronologique du match, pour 5, 4, 3, 2 puis 1 point. Une équipe active doit retrouver les deux équipes du match, acceptées dans n'importe quel ordre. La chronologie prime sur une difficulté artificiellement croissante.
- Sur Le Match, le Tackle reprend le **vol de réponse** de Transfert/Qui suis-je : 12 secondes de jeu exclusif pour l'équipe active **à chaque événement**, puis sifflet. La première équipe adverse à annoncer Tackle propose elle-même les deux équipes : +5 si elle trouve, −5 sinon. Sa tentative termine la carte dans les deux cas. Il n'y a pas de contestation binaire après une réponse de l'équipe active.
- Sur **Plus ou Moins** et **Vrai ou Faux**, le Tackle reste une **contestation** après la réponse verrouillée de l'équipe active, avant révélation. Les adversaires disposent de **5 secondes** ; la première annonce compte. Ils ne donnent pas d'autre réponse : +5 si l'équipe active se trompe, −5 si elle a raison. Un seul Tackle est possible par comparaison ou affirmation. Le Tackle ne porte ni sur ENCAISSER ni sur CONTINUER. Un Tackle raté ne change pas la suite normale de la carte active.
- Avec une seule équipe, il n'y a pas de Tackle. Le délai de 5 secondes et celui de 12 secondes pourront être éprouvés en playtest.
- L'implémentation du Tackle sur Plus ou Moins et la conformité de la fenêtre de 5 secondes sur Vrai ou Faux restent à vérifier dans le code. Les réponses erronées, passes et fins de carte de Le Match sont précisées dans la décision ci-dessus.

## [2026-09-27] Qui suis-je ? : les 4 fiches de test sont remplacées par les 100 vraies cartes
- David a fourni 100 cartes sourcées (`src/data/quisuisje-cards.json`, revue lisible dans `docs/QUI_SUIS_JE_100_FICHES.md`) et a demandé de retirer les fiches de test.
- Implémentation : `QSJ_TEST_CARDS` (embarqué dans le code) est remplacé par `loadQsjCards()`, qui charge le fichier comme les autres contenus (`cache: "no-store"`, un seul `fetch`), avec un flag `QSJ_READY` bloquant le lancement de partie tant que le chargement n'est pas terminé, à l'identique de Transfert/Plus ou Moins/Vrai ou Faux. La case « Qui suis-je ? » est maintenant cochée par défaut comme les autres mini-jeux, puisque le contenu n'est plus du placeholder.
- Le lot n'a pas de statut de vérification par carte ; son statut global (« fiches sourcées, difficulté à éprouver en partie ») sert de feu vert pour le charger tel quel, en attendant la relecture éditoriale et le playtest de difficulté encore ouverts dans TODO.md.
- Vérifié après intégration : chargement sans erreur de setup, une mauvaise réponse retire bien 1 point et la carte continue, et 15 cartes tirées au hasard s'affichent correctement.

## [2026-09-27] On prend large sur les fautes de frappe (Transfert, Qui suis-je, Tackle)
- Contexte : « Ronaldino » (sans le h) tapé sur Qui suis-je a été refusé, alors que « Ronaldinho » était la bonne réponse — la comparaison n'ignorait que les majuscules/accents, pas les fautes de frappe. David a demandé qu'on prenne large.
- Décision : une réponse tapée est acceptée si elle est assez proche d'une réponse valide au sens de la distance de Levenshtein (nombre de lettres à ajouter/retirer/changer), avec une tolérance croissante selon la longueur : 1 lettre pour un mot de 7 caractères ou moins, 2 jusqu'à 14, 3 au-delà. En dessous de 4 caractères, aucune tolérance (trop risqué). S'applique partout où une réponse est comparée à `answer`/`variants` : Transfert, Qui suis-je et le Tackle sur ces deux jeux.
- Risque assumé : sur des noms courts, une tolérance de 1 lettre peut accepter à tort un nom différent qui s'écrit presque pareil (ex. « Messi » et « Kessi » ne sont qu'à une lettre d'écart). C'est le compromis explicitement voulu par David en échange de ne plus pénaliser les fautes de frappe courantes ; à resserrer si ça pose problème en playtest.
- Impact technique : ajout de `levenshtein()` et `matchesAnyAnswer()` dans `index.html`, utilisés à la place des comparaisons exactes dans `checkAnswer()` (Transfert), `checkQsjAnswer()` (Qui suis-je) et la validation du Tackle.

## [2026-09-27] Correctif : mauvaise réponse sur Qui suis-je = −1 point, la carte continue
- Correction de David : une mauvaise réponse de l'équipe active ne termine pas la carte. Elle retire 1 point du score général et révèle l'indice suivant, exactement comme sur Transfert. La carte ne se termine que sur une bonne réponse, ou après une mauvaise réponse/une passe au dernier indice.
- Cette règle remplace celle notée juste avant (« mauvaise réponse termine la carte sans point de réponse ni autre pénalité »), qui était une mauvaise lecture de la mécanique voulue.
- Impact technique : `checkQsjAnswer()` applique désormais `awardPoints(-1)` puis appelle `advanceQsjClue(true)` au lieu de terminer la carte, en miroir exact du comportement de Transfert.

## [2026-09-27] Qui suis-je ? implémenté avec 4 fiches de test écrites par Claude
- Décision de David : construire le mini-jeu tout de suite en utilisant des fiches de test que Claude écrit lui-même (4 joueurs différents), plutôt que d'attendre le vrai contenu sourcé.
- Contenu : 4 cartes embarquées directement dans `index.html` (`QSJ_TEST_CARDS`), sur des joueurs réels et très documentés (Zidane, Ronaldinho, Henry, Iniesta) pour limiter le risque d'erreur factuelle même en test, mais **non vérifiées** au sens du pipeline habituel (pas de sources ni de statut « vérifié » par carte). Clairement commentées dans le code comme données de test à ne jamais confondre avec du contenu réel, conformément à la décision du 2026-09-27 « Claude n'enrichit pas le contenu ».
- Implémentation : reprend telle quelle la fenêtre de Tackle déjà construite pour Transfert (même minuteur, même sifflet, même UI de sélection d'équipe et de réponse) puisque le mécanisme est identique. Testé automatiquement : bonne réponse, mauvaise réponse, passe jusqu'au dernier indice, et Tackle raté après le sifflet — les quatre cas se comportent comme prévu.
- Case décochée par défaut dans l'écran de configuration (contrairement aux autres mini-jeux, cochés par défaut), pour éviter qu'une vraie soirée test tombe sans le vouloir sur seulement 4 cartes fictives à faible variété.
- Non tranché : les vraies cartes sourcées de Qui suis-je restent à écrire par David/ChatGPT ; une fois reçues, elles remplaceront `QSJ_TEST_CARDS` selon le même pipeline que les autres mini-jeux.

## [2026-09-27] Qui suis-je ? : cinq indices fixes, une équipe active et le buzzer de Transfert
- Décision de David : une carte vise un seul joueur mystère et est jouée par **une seule équipe active**. Chaque équipe joue sa propre carte dans la manche.
- Les cinq indices sont révélés un par un dans l'ordre **un club (5 points), un titre gagné (4), le poste (3), un coéquipier (2), la nationalité (1)**. Chaque indice contient une seule information courte.
- L'équipe active répond ou passe à chaque indice. Bonne réponse : points de l'indice et fin de carte. Mauvaise réponse : fin de carte sans point de réponse. Une passe révèle l'indice suivant.
- Le **buzzer de Tackle fonctionne comme sur Transfert** : 12 secondes de jeu exclusif pour l'équipe active, puis coup de sifflet ; la première équipe adverse qui appuie propose sa propre réponse. Bonne réponse : +5 pour elle ; mauvaise réponse : −5. Toute tentative de Tackle termine la carte. Il ne s'agit pas d'une contestation après la réponse de l'équipe active.
- Cette formulation corrige les lectures précédentes où toutes les équipes auraient buzzé simultanément ou où le Tackle aurait attendu la réponse de l'équipe active.

## [2026-09-27] Étendre Plus ou Moins aux trois grands championnats voisins
- Décision de David : ajouter les buts en Liga, Serie A et Ligue 1 à Plus ou Moins, avec 50 joueurs par catégorie comme pour les quatre lots existants.
- Raison : augmenter la variété des comparaisons sans changer la mécanique de jeu.
- Contenu : trois fichiers sourcés et datés, chargés avec les autres catégories ; le jeu dispose ainsi de sept catégories et 350 entrées statistiques.

## [2026-09-27] Tackle binaire : −5 points possibles et révélation différée sur Plus ou Moins
- Décision de David : sur Vrai ou Faux et Plus ou Moins, l'équipe active verrouille d'abord sa réponse. Une autre équipe peut alors tackler immédiatement, avant la révélation, sans attendre le délai ou le sifflet propre à Transfert. Un seul Tackle est retenu par affirmation ; il conteste la réponse active sans fournir d'autre réponse.
- Score : si la réponse active est fausse, le tackleur reçoit **+5** ; si elle est juste, il reçoit **−5**. Le score général peut devenir **négatif**, y compris lorsque le tackleur part de zéro. La cagnotte de l'équipe active suit sa règle normale.
- État de l'implémentation : Vrai ou Faux applique déjà −5 sans plancher à zéro. Plus ou Moins doit encore intercaler une étape « réponse verrouillée → Tackle ou révélation » avant d'afficher la valeur. Cette décision précise et remplace les mentions antérieures selon lesquelles le Tackle sur Plus ou Moins restait à définir.
- Le mode de partie s'appelle **Tackle** ; sa configuration reste celle déjà en place.

## [2026-09-27] Claude n'enrichit pas le contenu : les données arrivent déjà prêtes
- Décision : David précise que Claude ne doit pas produire ou compléter lui-même le contenu football (statistiques, affirmations, fiches joueurs) — ce travail est fait en amont par David/ChatGPT, et les fichiers de données arrivent déjà constitués. Le rôle de Claude sur le contenu se limite à l'intégration technique (conversion, schéma, chargement en jeu) et à un contrôle de cohérence avant mise en jeu, pas à la génération ou à l'enrichissement des faits eux-mêmes.
- Raison : garder une séparation nette avec la règle déjà en place (aucune génération ou jugement d'IA sur les faits footballistiques) et éviter toute ambiguïté sur qui produit le contenu.
- Impact : sans changement sur le pipeline technique déjà en place (vérification automatique de cohérence + chargement des seules entrées « vérifié ») ; à appliquer aux prochains lots de données reçus.

## [2026-09-27] Correctif : l'écran se bloquait sur une affirmation fausse en Vrai ou Faux
- Bug signalé par David : après avoir répondu VRAI ou FAUX, l'écran restait parfois bloqué sans bouton ni suite possible.
- Cause : lors de la conversion du jeu de données fourni par David vers `src/data/vraifaux-statements.json`, les champs `valeur_source` et `valeur_affirmee` (nécessaires à `formatVfCorrection` pour donner la vraie information quand l'affirmation est fausse, voir décision précédente) avaient été omis par erreur. Dès qu'une affirmation fausse était révélée, le code plantait silencieusement au milieu de la révélation, après avoir masqué les boutons de réponse mais avant d'afficher la suite — d'où l'écran vide.
- Correctif : régénération de `vraifaux-statements.json` avec ces deux champs restaurés (vérifié sans erreur sur les 1000 affirmations fausses). Le code de révélation est aussi rendu défensif : un échec de `formatVfCorrection` est maintenant intercepté et n'empêche plus la suite du tour.
- Impact : purement technique, aucune règle de jeu modifiée. Reproduit et vérifié résolu via un test automatisé (16/16 tours sans blocage, y compris sur des affirmations fausses).

## [2026-09-27] Intégration du jeu de données Vrai ou Faux (2 000 affirmations) et implémentation du mini-jeu
- Décision : le jeu de 2 000 affirmations fourni par David (1 000 vraies, 1 000 fausses, dérivées de données déjà vérifiées : années de naissance, tailles, pied fort, poste, ordre des clubs, ville de naissance, débuts professionnels) est intégré tel quel dans `src/data/vraifaux-statements.json`, marqué « vérifié » pour les 2 000 entrées.
- Vérification effectuée avant intégration : un contrôle automatique de cohérence interne a comparé, pour chacune des 2 000 affirmations, la valeur affirmée à la valeur source fournie (égalité, comparaison d'âge, de taille, ou ordre chronologique de deux passages en club) — **0 incohérence détectée**. Un échantillage manuel sur quelques affirmations connues (année de naissance de Steven Gerrard, ordre de carrière de David Silva, etc.) confirme leur exactitude. Aucune vérification indépendante affirmation par affirmation n'a été faite au-delà de ce contrôle et de cet échantillage, conformément au principe de curation pragmatique déjà appliqué au lot Transfert sourcé par Wikipédia.
- Raison : le jeu de données est dérivé algorithmiquement de champs déjà sourcés (pas de génération libre de faits par une IA), avec une source Wikipédia par affirmation et une règle de vérification explicite par catégorie — le risque est donc structurellement plus faible que la génération libre initialement redoutée.
- Implémentation technique : nouvel écran de jeu Vrai ou Faux dans `index.html` (`beginVfTurn`, `renderVfStatement`, `resolveVfStatement`), cagnotte 1→5 avec ENCAISSER/CONTINUER identique à Plus ou Moins, et fenêtre de Tackle déclenchée par la réponse de l'équipe active (pas par un minuteur, contrairement à Transfert) : bouton TACKLE + choix d'équipe, résolution immédiate. Le tirage d'une carte choisit 5 affirmations sans jamais réunir deux énoncés sur le même fait (`groupe_exclusif`), avec répétition possible d'une carte à l'autre comme pour les autres mini-jeux. En solo (1 équipe), la réponse est révélée immédiatement sans étape d'attente puisque personne ne peut tackler.
- Non tranché : relecture éditoriale complète du jeu de données (recommandée par sa propre note de contrôle, non faite) ; si une affirmation s'avère fausse en test, resserrer la règle de vérification pour les prochains lots.

## [2026-09-27] Refonte du Faux en Vrai ou Faux à cagnotte, avec Tackle sur la réponse en attente
- Décision : « Le Faux » est remplacé par un nouveau mini-jeu, **Vrai ou Faux**, qui reprend la mécanique de cagnotte de Plus ou Moins : 5 affirmations football présentées une par une, l'équipe active répond VRAI ou FAUX à chacune. Une bonne réponse fait progresser la cagnotte potentielle (1, 2, 3, 4, puis 5 points) avec un choix ENCAISSER/CONTINUER après chaque succès ; une mauvaise réponse en cours de série fait perdre toute la cagnotte de la carte.
- Mécanique Tackle appliquée à ce jeu : une fois que l'équipe active a donné sa réponse à une affirmation, mais **avant que le jeu ne révèle si elle a raison**, n'importe quelle autre équipe peut tenter un Tackle en pariant que l'équipe active se trompe. Une seule tentative de Tackle par affirmation (première équipe à tackler). Tackle correct : le tackleur gagne +5 et l'équipe active perd immédiatement toute sa cagnotte en cours. Tackle incorrect : le tackleur perd 5 points et le tour de l'équipe active continue normalement (son choix ENCAISSER/CONTINUER n'est pas affecté par un Tackle raté). Exemple donné par David : affirmation « Zlatan a joué au Bayern Munich » (faux) — l'équipe active répond, une autre équipe tackle avant la révélation.
- Confirmations de David (2026-09-27) sur mes 4 points de vigilance :
  1. Le Tackle sur ce jeu n'est possible qu'une fois que l'équipe active a donné sa réponse, jamais avant.
  2. Le contenu (affirmations vraies/fausses) provient d'un jeu de données que David prépare lui-même (« 1000 vraies / 1000 fausses »), ce qui évite le risque initial de générer des affirmations fausses par IA à partir de données de carrière tronquées — aucun format de données n'a encore été transmis ni convenu.
  3. Le principe « toute réponse en attente peut être tacklée avant révélation » s'applique aussi, à terme, à Plus ou Moins (exemple donné par David : affirmation « Mbappé a marqué plus de 30 buts en Ligue 1 » comme illustration du même mécanisme). La restructuration exacte du déroulé de Plus ou Moins (qui révèle aujourd'hui PLUS/MOINS instantanément, sans pause) reste à définir — voir TODO.md.
  4. Le mode « Partie rapide » est renommé **Tackle** et reste structurellement identique (tirage aléatoire de manches parmi les mini-jeux sélectionnés) ; David acte que la généralisation du Tackle peut prendre le pas sur le principe originel de diversité systématique des mécaniques manche par manche, au moins dans ce mode. D'autres mini-jeux (Undercover, etc.) pourront être ajoutés plus tard sans remettre en cause ce choix.
- Raison : réutiliser une mécanique de cagnotte déjà validée et testée (Plus ou Moins) plutôt que d'inventer un nouveau système de score, tout en donnant au Tackle une deuxième application concrète qui en fait une identité transversale du jeu plutôt qu'un gadget propre à Transfert.
- Non tranché : format exact du jeu de données 1000 vrai/1000 faux ; restructuration de Plus ou Moins pour supporter une fenêtre de Tackle avant révélation ; nom/contenu définitif des 5 affirmations par carte (nombre, thèmes, niveaux de difficulté).
- Impact technique : aucun code encore écrit pour ce mini-jeu. Il faudra un nouvel écran/état de jeu (`stage-vraifaux` ou équivalent), une fenêtre de Tackle déclenchée par la réponse de l'équipe active plutôt que par un minuteur (contrairement à Transfert), et l'intégration du futur jeu de données selon le même schéma `verification_status`/`sources`/`verified_date` que les autres mini-jeux.

## [2026-09-26] Tackle sur Transfert : délai avant sifflet, arrêt systématique de la carte
- Décision : sur Transfert, l'équipe active joue seule pendant 12 secondes ; passé ce délai, un coup de sifflet sonore ouvre la fenêtre de Tackle pour les autres équipes. Toute tentative de Tackle (réussie ou non) arrête définitivement la carte en cours.
- Raison : David a confirmé le principe du délai + sifflet et que la carte s'arrête dans tous les cas après un Tackle.
- Non tranché : la durée de 12 secondes est une valeur de départ choisie par Claude, à ajuster en playtest. Le droit de Tackle est ouvert à toute équipe sauf l'équipe active (y compris celle qui tient le téléphone) — l'équité de ce point reste une question ouverte (voir TODO.md).
- Impact technique : minuteur par carte, signal sonore (bip généré, pas de fichier audio), bouton Tackle persistant, sélection d'équipe puis réponse unique.

## [2026-09-26] Le projet prend le nom TACKLE ; le Tackle devient une mécanique transversale
- Décision : le projet s'appelle désormais **TACKLE**. Le Tackle devient une règle commune à la plateforme : pendant le tour d'une équipe, une équipe adverse peut interrompre en criant « TACKLE ! » et proposer une réponse (bonne réponse +5, mauvaise −5, une seule proposition).
- Raison : supprimer les temps morts et garder toutes les équipes engagées en permanence, pas seulement l'équipe active.
- Principe de design : chaque mini-jeu doit définir précisément comment le Tackle s'y applique — ce n'est pas un comportement générique automatique.
- Ouvert (voir TODO.md) : effet du Tackle sur le déroulement de la carte interrompue, équité vis-à-vis de l'équipe qui tient le téléphone, définition du Tackle pour Plus ou Moins.
- Impact technique : nécessite une interface d'interruption disponible à tout moment pendant un tour, en plus du flux normal de jeu. Pas encore implémenté.

## [2026-09-26] Plus ou Moins : cinq comparaisons et 50 joueurs par catégorie
- Décision : une carte repose sur une statistique unique et six joueurs, soit jusqu'à cinq choix PLUS ou MOINS. Chaque bonne réponse augmente de 1 le gain potentiel ; l'équipe peut encaisser ou continuer, et une erreur avant l'encaissement ramène le gain de la carte à 0. Les cinq réussites rapportent automatiquement 5 points. Les égalités entre voisins sont exclues.
- Décision de contenu : préparer 50 entrées statistiques vérifiées dans chacune des quatre catégories initiales (Premier League, Ligue des champions, Coupe du monde, sélections nationales), avec source et date de vérification.
- Raison : créer un jeu de connaissance, d'intuition et de prise de risque, avec assez de données pour composer des chaînes variées sans comparaisons trop évidentes.
- Impact : définir précisément le périmètre de chaque statistique avant de collecter les 200 entrées ; construire les chaînes à partir de valeurs proches et tester leur difficulté. Intégration après Transfert.

## [2026-09-26] Revalider manuellement les cartes « –présent » avant les soirées test
- Décision : avant chaque vraie soirée test, revoir les cartes jouables contenant « –présent ». En cas de départ confirmé, corriger les années et les clubs, ajouter la source et actualiser `verified_date`. Si la situation reste incertaine, passer la carte en « à vérifier » pour l'exclure du jeu. Ne pas appliquer de date de péremption automatique.
- Raison : l'âge d'une vérification ne permet pas de savoir si un transfert a eu lieu ; une expiration automatique pourrait retirer des cartes toujours correctes. `verified_date` sert à prioriser la relecture.
- Impact technique : aucun contrôle automatique supplémentaire n'est nécessaire pour le prototype ; le statut de vérification existant exclut déjà les cartes incertaines.

## [2026-09-26] Une source Wikipédia citée vaut vérification pour le lot #2
- Décision : les 88 cartes du 2e lot fourni par ChatGPT (sourcées individuellement avec un lien Wikipédia) sont marquées « vérifié » et jouables, sans recherche indépendante par Claude carte par carte.
- Raison : David juge la citation Wikipédia suffisante à ce stade du prototype.
- Nuance à garder en tête : une source citée par une IA n'est pas la preuve qu'elle a été relue (le cas Salah — carte fausse malgré une apparence correcte — reste possible même avec une source). Si une carte de ce lot s'avère fausse en test, c'est un signal pour resserrer la règle, pas un hasard isolé.
- Impact technique : aucun — bascule de statut uniquement.

## [2026-09-25] Un club peut apparaître deux fois sur une même carte
- Décision : si un joueur revient dans un club déjà cité plus tôt dans sa carrière (ex. Griezmann, Neymar, Sergio Ramos, Pogba), les deux passages sont affichés normalement dans les indices chronologiques, sans traitement spécial.
- Raison : c'est un fait réel de carrière, pas une ambiguïté à corriger.
- Impact technique : aucun — le format de carte gère déjà ce cas nativement.

## [2026-09-25] Faire tourner le téléphone et vérifier les réponses saisies
- Décision : avec plusieurs équipes, celle qui suit l'équipe active dans l'ordre tient le téléphone. Avec une seule équipe, elle le tient elle-même. L'équipe active confirme le texte saisi avant validation.
- Raison : attribuer sans ambiguïté le rôle de meneur et éviter qu'une erreur de saisie soit comptée comme une mauvaise réponse.
- Impact technique : le porteur change à chaque carte suivant l'ordre des équipes ; l'interface affiche l'équipe active et l'équipe qui tient l'appareil.

## [2026-09-25] Accepter uniquement des variantes de nom vérifiées
- Décision : comparer les réponses sans tenir compte des majuscules ni des accents et accepter les variantes approuvées pour la carte. Ne pas corriger automatiquement les fautes.
- Raison : reconnaître les écritures légitimes sans risquer de valider le nom d'un autre joueur.
- Impact technique : chaque carte stocke sa réponse canonique et ses variantes validées ; la saisie est confirmée avant contrôle.

## [2026-09-25] Tirer les cartes au hasard avec répétition possible
- Décision : chaque carte est tirée au hasard lorsqu'une équipe joue. Le même joueur et même la même carte peuvent revenir pendant une partie ; le nombre de passages de jeu n'impose pas autant de cartes uniques.
- Raison : une partie longue doit pouvoir fonctionner avec un stock de cartes plus petit, même si la variété du contenu reste importante pour le plaisir de jeu.
- Impact technique : ne pas bloquer une partie parce que le stock comporte moins de cartes que de passages prévus.

## [2026-09-25] Une manche est un tour complet
- Décision : à chaque manche, chaque équipe joue une carte tirée au hasard du mini-jeu sélectionné pour cette manche. Le nombre de manches choisi correspond donc au nombre de cartes jouées par équipe.
- Raison : garantir le même nombre d'occasions de jouer à chaque équipe, y compris lorsque 5 ou 10 manches ne se divisent pas par 3 ou 4 équipes.
- Impact technique : une partie de 20 manches à 4 équipes comprend 80 tirages, avec répétition possible ; la variété du contenu doit être évaluée lors des tests.

## [2026-09-25] Construire le prototype jeu par jeu
- Décision : commencer par un prototype jouable de Transfert, puis intégrer les autres mini-jeux un par un.
- Raison : tester une mécanique réelle avant d'étendre la plateforme.
- Impact technique : prévoir un socle de configuration de partie, de score et de classement auquel d'autres jeux pourront s'ajouter.

## [2026-09-25] Configurer la partie avant de jouer
- Décision : jouer d'abord sur un seul téléphone, avec 1 à 4 équipes, 5, 10 ou 20 manches, et une sélection de mini-jeux. Tous les jeux disponibles sont cochés par défaut ; au moins un doit rester sélectionné.
- Raison : permettre aussi bien une partie centrée sur un jeu qu'un mélange de jeux, tout en gardant l'usage actuel simple.
- Impact technique : la configuration et la composition des manches doivent fonctionner quand un seul mini-jeu est disponible. Le jeu à plusieurs téléphones reste une possibilité future, sans règle ni implémentation décidée à ce stade.

## [2026-09-25] Règles de Transfert et risque d'une tentative
- Décision : révéler jusqu'à cinq passages de clubs avec leurs années, dans l'ordre chronologique. Une équipe peut répondre une fois ou passer à chaque indice. Une bonne réponse vaut 5, 4, 3, 2 ou 1 point selon l'indice ; une mauvaise réponse retire 1 point et fait passer au suivant ; passer ne coûte rien. Pour un joueur à club unique, l'unique indice « club + années » vaut 5 points.
- Raison : récompenser une réponse précoce tout en pénalisant les tentatives hasardeuses, sans exclure les joueurs ayant connu un seul club.
- Impact technique : le score général peut diminuer et le résultat net d'une carte peut être négatif. Les prêts, retours et extraits de carrière doivent être présentés sans ambiguïté.

## [2026-09-25] Vérifier les contenus avant leur mise en jeu
- Décision : préparer plusieurs cartes, puis faire vérifier leurs faits par un agent avant intégration. La validation factuelle ne dépend pas d'une IA pendant la partie.
- Raison : une carrière ou une date erronée ferait perdre confiance dans le jeu.
- Impact technique : les cartes doivent pouvoir conserver leurs sources et leur statut de vérification.
