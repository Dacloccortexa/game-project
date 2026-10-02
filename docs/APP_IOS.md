# Appli iPhone (App Store)

Statut : **projet iOS prêt dans le dépôt** (2026-10-02), à compiler sur le Mac de David avec Xcode. Pas encore testé sur un vrai iPhone.

## Principe

- **Un seul jeu.** `index.html` sert à la fois au site (GitHub Pages) et à l'appli. On continue de tout modifier au même endroit.
- L'appli est le jeu **embarqué** dans une appli native via [Capacitor](https://capacitorjs.com) (dossier `ios/`). Elle fonctionne sans connexion.
- **Questions à jour sans nouvelle version** : au lancement, l'appli télécharge les fichiers de `src/data/` depuis le site (`https://dacloccortexa.github.io/game-project/`). Sans réseau (ou si le site ne répond pas en 5 s), elle utilise la copie embarquée. Ajouter, corriger ou retirer des cartes = modifier `src/data/` sur `main`, c'est tout.
- **Tout le reste** (règles, écrans, nouveaux défis) nécessite une nouvelle version de l'appli (TestFlight : ~1 h ; App Store : relecture Apple, en général 1 à 2 jours).
- Le bandeau « Nouvelle version disponible » du site est désactivé dans l'appli (elle se met à jour par l'App Store).

## Ce que l'appli ajoute par rapport au site

| Fonction | Site | Appli |
| --- | --- | --- |
| Vibrations (coup d'envoi, ouverture du Tackle) | Android seulement | iPhone : impacts haptiques (2 au coup d'envoi, 3 au Tackle) |
| Écran qui reste allumé pendant la partie | Non | Oui |
| Envoi du journal de partie | Menu de partage du navigateur | Menu de partage natif iOS |
| Icône, écran de démarrage, plein écran, portrait verrouillé | Icône d'écran d'accueil | Oui |

Ces fonctions natives comptent aussi pour la relecture Apple (règle 4.2 « fonctionnalités minimales » : une appli qui n'est qu'un site emballé peut être refusée).

## Réglages du projet

- Identifiant de l'appli (Bundle ID) : **`com.lafamivy.tackle`** (dans `capacitor.config.json` et le projet Xcode). À changer seulement s'il est déjà pris dans App Store Connect.
- Nom sous l'icône : **TACKLE**. iPhone uniquement, portrait uniquement, iOS 15 minimum.
- Icône et écran de démarrage générés depuis `app-resources/` (logo or sur fond noir) : `npm run icons`.
- `ITSAppUsesNonExemptEncryption = NO` (pas de chiffrement propre : évite la question d'export à chaque envoi).
- Politique de confidentialité : [`privacy.html`](../privacy.html), en ligne à `https://dacloccortexa.github.io/game-project/privacy.html` (adresse de contact à compléter).

## Sur le Mac : première installation (une fois)

1. Installer **Xcode** (App Store, gratuit), l'ouvrir une fois pour accepter la licence et installer les composants iOS.
2. Installer **Node.js** (version LTS, [nodejs.org](https://nodejs.org)).
3. Dans le Terminal :
   ```sh
   git clone https://github.com/Dacloccortexa/game-project.git
   cd game-project
   npm install
   npm run ios
   ```
   `npm run ios` prépare le jeu (`www/`), le copie dans le projet iOS et ouvre Xcode.
4. Dans Xcode : cliquer sur **App** (à gauche) → onglet **Signing & Capabilities** → **Team** : choisir le compte développeur (ajouter le compte Apple dans Xcode → Réglages → Comptes si besoin).
5. Brancher l'iPhone, l'autoriser, activer le **Mode développeur** sur l'iPhone (Réglages → Confidentialité et sécurité → Mode développeur), le choisir en haut de Xcode et appuyer sur **▶**.

## Envoyer une version sur TestFlight

1. [App Store Connect](https://appstoreconnect.apple.com) → **Apps** → **+** → Nouvelle app : plateforme iOS, nom (TACKLE ou variante si pris), langue française, Bundle ID `com.lafamivy.tackle`, SKU `tackle`.
2. Dans Xcode : en haut, choisir **Any iOS Device (arm64)** → menu **Product → Archive** → **Distribute App** → **App Store Connect** → **Upload**.
3. Après le traitement (10 à 30 min), onglet **TestFlight** : ajouter des testeurs internes (jusqu'à 100, membres du compte) ou externes (jusqu'à 10 000 par e-mail ou lien public ; la première version passe une courte relecture Apple). Les testeurs installent l'appli **TestFlight** puis TACKLE.

## Sortir une nouvelle version de l'appli

1. `git pull` puis `npm run ios:sync` (reconstruit `www/` et le copie dans le projet iOS).
2. Dans Xcode, augmenter **Build** (et **Version** pour une version publique), puis **Archive → Upload** comme ci-dessus.

## Avant la sortie publique sur l'App Store (liste à cocher)

- [ ] Compte Apple Developer actif (99 USD/an ; au nom de Lafamivy si on publie en tant qu'entreprise : numéro D-U-N-S nécessaire).
- [ ] Adresse de contact dans `privacy.html` + URL de support.
- [ ] Captures d'écran iPhone 6,9″ (1320 × 2868), au moins 3.
- [ ] Description, sous-titre, mots-clés, catégorie **Jeux → Quiz** (et Jeux de société), classification par âge.
- [ ] « Confidentialité de l'app » : **Aucune donnée collectée**.
- [ ] Prix : gratuit, payant, ou gratuit + achat « jeu complet » (voir les codes Apple pour offrir l'accès ; à décider).
- [ ] Vérifier les droits : noms réels de joueurs/clubs en texte (OK pour un quiz factuel), aucune photo, aucun logo de club ni de compétition.
