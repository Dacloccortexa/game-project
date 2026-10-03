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
| Limite gratuite et abonnement | Illimité | 2 parties/jour de 5 manches, sinon abonnement |

Ces fonctions natives comptent aussi pour la relecture Apple (règle 4.2 « fonctionnalités minimales » : une appli qui n'est qu'un site emballé peut être refusée).

## Réglages du projet

- Identifiant de l'appli (Bundle ID) : **`com.lafamivy.tackle`** (dans `capacitor.config.json` et le projet Xcode). À changer seulement s'il est déjà pris dans App Store Connect.
- Nom sous l'icône : **TACKLE**. iPhone uniquement, portrait uniquement, iOS 15 minimum.
- Icône (logo or sur fond noir) et écran de lancement générés depuis `app-resources/` : `npm run icons`. L'écran de lancement est **l'accueil sans ses boutons** (stade + logo au même endroit), effacé en fondu dès que l'accueil est prêt (aucune attente artificielle). Si l'accueil change : `node tools/make-splash.cjs` puis `npm run icons`.
- `ITSAppUsesNonExemptEncryption = NO` (pas de chiffrement propre : évite la question d'export à chaque envoi).
- Politique de confidentialité : [`privacy.html`](../privacy.html), en ligne à `https://dacloccortexa.github.io/game-project/privacy.html` (adresse de contact à compléter).

## Langues

Français et portugais (Portugal). L'appli prend la langue du téléphone ; on la change dans **Réglages** (roue dentée de l'accueil). Questions portugaises : `src/data/pt/`, régénérées avec `python3 tools/translate_pt.py` après chaque ajout de cartes françaises (le script refuse de laisser du français). Voir `docs/DECISIONS.md` (2026-10-02).

## Abonnement

Règle (décision de David, 2026-10-02) : **gratuit = 2 parties par jour de 5 manches maximum**, avec les cinq défis. **Illimité (5 à 20 manches)** avec l'une des deux offres :

| Offre | Prix | Type App Store | Identifiant produit |
| --- | --- | --- | --- |
| **Pack soirée** (pt : Pack Noitada) | **1,99 €** | Achat intégré **consommable**, 24 h à partir de l'achat | `tackle_pack_soiree` |
| **Abonnement annuel** | **29,99 € / an** | Abonnement à renouvellement automatique | `tackle_annual` |

Le site web reste illimité (testeurs). Les prix se règlent dans App Store Connect (aucun prix dans le code ; l'appli affiche ceux de l'App Store).

Fonctionnement dans l'appli :
- Compteur local « parties gratuites aujourd'hui » sous les défis (remis à zéro à minuit, heure du téléphone). Une partie compte au coup d'envoi. Pack soirée en cours : « Pack soirée : illimité jusqu'à 17 h 30 » à la place.
- Pack soirée : la fin (achat + 24 h) est calculée depuis l'historique d'achats RevenueCat (retrouvé après réinstallation avec le même compte Apple, et par « Rétablir les achats ») et gardée aussi sur le téléphone pour le hors-connexion. Une partie commencée n'est jamais coupée quand le pack expire.
- 10, 15 et 20 manches portent un cadenas ; les toucher ouvre la page d'abonnement. Après 2 parties, « Coup d'envoi » ouvre aussi la page d'abonnement.
- Page d'abonnement (provisoire, la maquette arrive) : avantages, formules lues dans l'App Store (nom, prix, essai gratuit éventuel), « Restaurer mes achats », « J'ai un code » (fenêtre Apple des codes d'offre), mentions de renouvellement automatique, liens Conditions d'utilisation (contrat Apple standard) et Confidentialité — obligatoires pour la relecture Apple.
- Gestion technique : **RevenueCat** (achat, renouvellement, restauration, codes, tableau de bord). Droit d'accès attendu : **`premium`**. Tant que la clé `REVENUECAT_IOS_KEY` (dans `index.html`) est vide, la page affiche « Abonnement bientôt disponible » et la limite gratuite s'applique.

À faire une fois le compte développeur actif :
1. App Store Connect → **Accords, taxes et banque** : signer le contrat « Applications payantes », renseigner banque et impôts.
2. App Store Connect → l'app → **Abonnements** : créer un groupe « TACKLE illimité » et l'abonnement annuel `tackle_annual` à 29,99 € (essai gratuit éventuel), nom et description en français et en portugais. Puis **Achats intégrés** → **Consommable** `tackle_pack_soiree` à 1,99 € (« Pack soirée — 24 h illimitées »).
3. App Store Connect → **Utilisateurs et accès → Intégrations → Achats intégrés** : générer une clé (.p8).
4. [RevenueCat](https://app.revenuecat.com) : créer le projet, ajouter l'app iOS (Bundle ID `com.lafamivy.tackle`), y déposer la clé .p8, importer les produits, créer le droit **`premium`** rattaché aux formules, et l'offre **default** avec deux packages : **Annual** (`tackle_annual`) et un package **Custom** contenant `tackle_pack_soiree` (le pack soirée n'est **pas** rattaché au droit `premium` : l'appli le reconnaît à son identifiant).
5. Copier la **clé publique iOS** (`appl_…`) dans `REVENUECAT_IOS_KEY` (Claude s'en charge), puis nouvelle version de l'appli.
6. Dans Xcode → **Signing & Capabilities** → **+ Capability** → **In-App Purchase**.
7. Tester avec un compte **Sandbox** (App Store Connect → Utilisateurs et accès → Sandbox) sur l'iPhone, puis via TestFlight (achats gratuits pour les testeurs).

Offrir l'abonnement à certaines personnes : **codes d'offre** Apple (App Store Connect → abonnement → Codes d'offre), saisis dans l'appli via « J'ai un code ».

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

- [x] D-U-N-S de **LA FAMIVY LTD** : **369782130** (confirmé par Apple le 2026-10-03). Ce nom légal sera le nom du vendeur sur l'App Store.
- [x] Domaine **lafamivy.com** (Cloudflare) et adresse **contact@lafamivy.com** (Cloudflare Email Routing → boîte de David), 2026-10-03.
- [ ] Site de la société en ligne sur lafamivy.com (dépôt `Dacloccortexa/lafamivy-site`, GitHub Pages) : activer Pages dans le dépôt + DNS Cloudflare.
- [ ] Compte Apple Developer actif (99 USD/an), inscription en tant qu'organisation avec le D-U-N-S ci-dessus : https://developer.apple.com/enroll/
- [x] Adresse de contact dans `privacy.html` (contact@lafamivy.com). URL de support pour la fiche App Store : https://lafamivy.com
- [ ] Captures d'écran iPhone 6,9″ (1320 × 2868), au moins 3.
- [ ] Description, sous-titre, mots-clés, catégorie **Jeux → Quiz** (et Jeux de société), classification par âge.
- [ ] « Confidentialité de l'app » : déclarer **Achats → Historique d'achats** (finalités : Fonctionnalité de l'app + Analyse ; **non lié** à l'identité ; **pas de suivi**). Rien d'autre (identifiants RevenueCat anonymes). Source : [guide RevenueCat](https://www.revenuecat.com/docs/platform-resources/apple-platform-resources/apple-app-privacy). `privacy.html` le mentionne.
- [ ] Abonnement configuré (voir « Abonnement ») et prix choisis.
- [ ] Vérifier les droits : noms réels de joueurs/clubs en texte (OK pour un quiz factuel), aucune photo, aucun logo de club ni de compétition.
