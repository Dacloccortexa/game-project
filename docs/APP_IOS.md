# Appli iPhone (App Store)

Statut : **projet iOS prêt dans le dépôt** (2026-10-02), à compiler sur le Mac de David avec Xcode. Pas encore testé sur un vrai iPhone.

## Principe

- **Un seul jeu.** `index.html` sert à la fois au site (GitHub Pages) et à l'appli. On continue de tout modifier au même endroit.
- L'appli est le jeu **embarqué** dans une appli native via [Capacitor](https://capacitorjs.com) (dossier `ios/`). Elle fonctionne sans connexion.
- **Questions à jour sans nouvelle version** : au lancement, l'appli télécharge les fichiers de `src/data/` depuis le site (`https://dacloccortexa.github.io/game-project/`). Sans réseau (ou si le site ne répond pas en 5 s), elle utilise la copie embarquée. Seuls les fichiers modifiés sont téléchargés (empreintes dans `src/data/manifest.json`), puis gardés sur le téléphone. Ajouter, corriger ou retirer des cartes = modifier `src/data/` sur `main`, puis lancer `tools/bump-version.sh` (il met le manifeste à jour) avant d'envoyer.
- **Tout le reste** (règles, écrans, nouveaux défis) nécessite une nouvelle version de l'appli (TestFlight : ~1 h ; App Store : relecture Apple, en général 1 à 2 jours).
- Le bandeau « Nouvelle version disponible » du site est désactivé dans l'appli (elle se met à jour par l'App Store).

## Ce que l'appli ajoute par rapport au site

| Fonction | Site | Appli |
| --- | --- | --- |
| Vibrations (coup d'envoi, ouverture du Tackle) | Android seulement | iPhone : impacts haptiques (2 au coup d'envoi, 3 au Tackle) |
| Écran qui reste allumé pendant la partie | Non | Oui |
| Partage de l'image de résultat (fin de partie) | Partage du navigateur ou image à enregistrer | Menu de partage natif iOS avec l'image |
| Icône, écran de démarrage, plein écran, portrait verrouillé | Icône d'écran d'accueil | Oui |
| Limite gratuite et abonnement | Illimité | 2 parties/jour de 5 manches, sinon abonnement |

Ces fonctions natives comptent aussi pour la relecture Apple (règle 4.2 « fonctionnalités minimales » : une appli qui n'est qu'un site emballé peut être refusée).

## Réglages du projet

- Identifiant de l'appli (Bundle ID) : **`com.lafamivy.tackle`** (dans `capacitor.config.json` et le projet Xcode). À changer seulement s'il est déjà pris dans App Store Connect.
- Nom sous l'icône : **TACKLE**. iPhone uniquement, portrait uniquement, iOS 15 minimum.
- Icône (logo or sur fond noir) et écran de lancement générés depuis `app-resources/` : `npm run icons`. L'écran de lancement est **l'accueil sans ses boutons** (stade + logo au même endroit), effacé en fondu dès que l'accueil est prêt (aucune attente artificielle). Si l'accueil change : `node tools/make-splash.cjs` puis `npm run icons`.
- `ITSAppUsesNonExemptEncryption = NO` (pas de chiffrement propre : évite la question d'export à chaque envoi).
- Politique de confidentialité : [`privacy.html`](../privacy.html), en ligne à `https://dacloccortexa.github.io/game-project/privacy.html` (adresse de contact à compléter).

## Mesure d'usage anonyme (TelemetryDeck)

Décision de David (2026-10-12) : savoir combien de parties sont jouées et à quel indice les cartes sont trouvées, **sans suivi** (pas de fenêtre « Autoriser le suivi », pas de consentement à demander selon l'éditeur). Code dans `index.html` (`tdSignal`). **Actif depuis le 2026-10-12** (App ID TelemetryDeck renseigné dans `TD_APP_ID`).

À faire par David : créer un compte gratuit sur [telemetrydeck.com](https://telemetrydeck.com) (100 000 événements/mois gratuits, environ 5 000 parties), créer l'app « TACKLE » et donner son **App ID** (pas secret) à Claude, qui le colle dans `TD_APP_ID`.

Événements envoyés : `App.launched` (premier lancement ou non), `Game.started` (équipes, manches, défis, accès illimité ou non), `Game.completed` / `Game.abandoned` (durée en minutes dans la valeur numérique), `Card.ended` (défi, carte, issue `trouve` / `tackle_reussi` / `pas_trouve` / `encaisse` / `perdu`, indice atteint en valeur numérique, mauvaises réponses, Tackles, passes), `Question.answered` (Plus ou Moins et Vrai ou Faux : une par comparaison ou affirmation tranchée — référence de l'affirmation ou paire de joueurs, catégorie, `juste` / `faux`, par l'équipe qui a la main ou par un Tackle adverse ; sert à noter la difficulté de chaque question), `Paywall.shown` (raison), `Card.reported`. Aucun nom ni texte tapé. Le site web envoie en **mode test** : le tableau de bord normal ne montre que l'appli ; activer « Test Mode » pour voir les testeurs du site. Les installations se lisent dans App Store Connect, les ventes dans RevenueCat.

## Signaler un problème (EmailJS)

Décision de David (2026-10-20) : « Signaler un problème » (carte, Réglages, menu Quitter) ouvre un **formulaire dans l'app** (texte + bouton Envoyer, sans jamais quitter TACKLE), envoyé via [EmailJS](https://www.emailjs.com) (gratuit, 200 emails/mois, pas de serveur à gérer) vers `contact@lafamivy.com`. Ouvert à tous les joueurs (gratuits compris), avec une limite anti-spam de **5 envois par jour et par appareil** (`REPORT_MAX_PER_DAY` dans `index.html`). Tant que les identifiants EmailJS sont vides, l'app se rabat automatiquement sur l'ouverture de l'app Mail (ancien comportement) — rien n'est perdu en attendant.

À faire par David :
1. Créer un compte gratuit sur [emailjs.com](https://www.emailjs.com).
2. **Email Services** → **Add New Service** → connecter Gmail (ou le service derrière `contact@lafamivy.com`). Noter le **Service ID**.
3. **Email Templates** → créer un template avec les variables `{{subject}}`, `{{message}}` et `{{to_email}}`. Noter le **Template ID**.
4. **Account → General** → noter la **Public Key**.
5. Dans les réglages du service (ou du compte) : vérifier/configurer les **origines autorisées** (Allowed origins) pour accepter les requêtes venant de l'app (`capacitor://localhost`) et du site (`https://dacloccortexa.github.io`) — sinon EmailJS refusera les envois.
6. Donner Service ID, Template ID et Public Key à Claude, qui les colle dans `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` et `EMAILJS_PUBLIC_KEY` (`index.html`).

## Langues

Français et portugais (Portugal). L'appli prend la langue du téléphone ; on la change dans **Réglages** (roue dentée de l'accueil). Questions portugaises : `src/data/pt/`, régénérées avec `python3 tools/translate_pt.py` après chaque ajout de cartes françaises (le script refuse de laisser du français). Voir `docs/DECISIONS.md` (2026-10-02).

## Abonnement

Règle (décision de David, 2026-10-02) : **gratuit = 2 parties par jour de 5 manches maximum**, avec les cinq défis. **Illimité (5 à 20 manches)** avec l'une des deux offres :

| Offre | Prix | Type App Store | Identifiant produit |
| --- | --- | --- | --- |
| **Pack soirée** (pt : Pack Noitada) | **1,99 €** | Achat intégré **consommable**, 12 h à partir de l'achat | `tackle_pack_soiree` |
| **Abonnement annuel** | **29,99 € / an** | Abonnement à renouvellement automatique | `tackle_annual` |

Le site web reste illimité (testeurs). Les prix se règlent dans App Store Connect (aucun prix dans le code ; l'appli affiche ceux de l'App Store).

Fonctionnement dans l'appli :
- Compteur local « parties gratuites aujourd'hui » sous les défis (remis à zéro à minuit, heure du téléphone). Une partie compte au coup d'envoi. Pack soirée en cours : « Pack soirée : illimité jusqu'à 17 h 30 » à la place.
- Pack soirée : la fin (achat + 12 h) est calculée depuis l'historique d'achats RevenueCat (retrouvé après réinstallation avec le même compte Apple, et par « Rétablir les achats ») et gardée aussi sur le téléphone pour le hors-connexion. Une partie commencée n'est jamais coupée quand le pack expire.
- 10, 15 et 20 manches portent un cadenas ; les toucher ouvre la page d'abonnement. Après 2 parties, « Coup d'envoi » ouvre aussi la page d'abonnement.
- Page d'abonnement (provisoire, la maquette arrive) : avantages, formules lues dans l'App Store (nom, prix, essai gratuit éventuel), « Restaurer mes achats », « J'ai un code » (fenêtre Apple des codes d'offre), mentions de renouvellement automatique, liens Conditions d'utilisation (contrat Apple standard) et Confidentialité — obligatoires pour la relecture Apple.
- Gestion technique : **RevenueCat** (achat, renouvellement, restauration, codes, tableau de bord). Droit d'accès attendu : **`premium`**. Tant que la clé `REVENUECAT_IOS_KEY` (dans `index.html`) est vide, la page affiche « Abonnement bientôt disponible » et la limite gratuite s'applique.

À faire une fois le compte développeur actif :
1. App Store Connect → **Accords, taxes et banque** : signer le contrat « Applications payantes », renseigner banque et impôts.
2. App Store Connect → l'app → **Abonnements** : créer un groupe « TACKLE illimité » et l'abonnement annuel `tackle_annual` à 29,99 € (essai gratuit éventuel), nom et description en français et en portugais. Puis **Achats intégrés** → **Consommable** `tackle_pack_soiree` à 1,99 € (« Pack soirée — 12 h illimitées »).
3. App Store Connect → **Utilisateurs et accès → Intégrations → Achats intégrés** : générer une clé (.p8).
4. [RevenueCat](https://app.revenuecat.com) : créer le projet, ajouter l'app iOS (Bundle ID `com.lafamivy.tackle`), y déposer la clé .p8, importer les produits, créer le droit **`premium`** rattaché aux formules, et l'offre **default** avec deux packages : **Annual** (`tackle_annual`) et un package **Custom** contenant `tackle_pack_soiree` (le pack soirée n'est **pas** rattaché au droit `premium` : l'appli le reconnaît à son identifiant).
5. Copier la **clé publique iOS** (`appl_…`) dans `REVENUECAT_IOS_KEY` (Claude s'en charge), puis nouvelle version de l'appli.
6. Dans Xcode → **Signing & Capabilities** → **+ Capability** → **In-App Purchase**.
7. Tester avec un compte **Sandbox** (App Store Connect → Utilisateurs et accès → Sandbox) sur l'iPhone, puis via TestFlight (achats gratuits pour les testeurs).

✅ Fait (2026-10-20) : RevenueCat configuré (projet, app, produits, droit `premium`, offre `default`), clé `REVENUECAT_IOS_KEY` intégrée, et achat testé avec succès en Sandbox sur l'iPhone de David (abonnement annuel + Pack soirée).

⚠️ Xcode Cloud (2026-10-20) : blocage sur l'étape « Connect Source Code Repository ». Le projet dépend de paquets Swift tiers hébergés sur GitHub (`ionic-team/ion-ios-filesystem`, `RevenueCat/purchases-hybrid-common`, etc.) ; Xcode Cloud exige une connexion explicite à **chaque** dépôt de dépendance, y compris publics, pour activer « Next ». David n'étant pas propriétaire de ces organisations GitHub, impossible d'accorder cet accès (seul le propriétaire d'une org peut installer l'app GitHub d'Apple, les membres peuvent seulement « demander »). Contournement en attendant : **archive manuelle depuis Xcode** (Product → Archive → Distribute App → App Store Connect), qui ne passe pas par GitHub. Premier build 1.0 envoyé avec succès par ce biais le 2026-10-20. Piste à creuser plus tard si on veut automatiser : forker ces dépendances sous le compte GitHub de La Famivy/David pour pouvoir les connecter.

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

Décision de David (2026-10-16) : compiler et envoyer via **Xcode Cloud** plutôt qu'Archive/Upload manuel depuis Xcode. Les machines d'Apple compilent avec leur Xcode à jour — ça évite de dépendre pour toujours de la version de Xcode installée sur le Mac de David, qu'Apple relève chaque année (voir plus haut : build obligatoire avec Xcode 26+ depuis le 28 avril 2026).

1. [App Store Connect](https://appstoreconnect.apple.com) → **Apps** → **+** → Nouvelle app : plateforme iOS, nom (TACKLE ou variante si pris), langue française, Bundle ID `com.lafamivy.tackle`, SKU `tackle`.
2. Dans Xcode (une seule fois, sur le Mac M2) : ouvrir le projet, menu **Product → Xcode Cloud → Create Workflow**. Autoriser Xcode Cloud à accéder au dépôt GitHub `Dacloccortexa/game-project`.
3. Configurer le workflow : déclencheur sur push vers `main` (ou manuel), action **Archive**, puis distribution **TestFlight (internal testing)**.
4. Après la compilation dans le cloud d'Apple (visible dans l'onglet **Xcode Cloud** d'App Store Connect), onglet **TestFlight** : ajouter des testeurs internes (jusqu'à 100, membres du compte) ou externes (jusqu'à 10 000 par e-mail ou lien public ; la première version passe une courte relecture Apple). Les testeurs installent l'appli **TestFlight** puis TACKLE.
5. Gratuit jusqu'à 25 heures de compilation par mois (largement suffisant ici).

## Sortir une nouvelle version de l'appli

1. `git pull` puis `npm run ios:sync` (reconstruit `www/` et le copie dans le projet iOS), commit et push sur `main`.
2. Dans Xcode, augmenter **Build** (et **Version** pour une version publique) dans les réglages du projet, commit et push.
3. Xcode Cloud détecte le push et compile automatiquement (ou lancer manuellement depuis l'onglet Xcode Cloud d'App Store Connect).

## Avant la sortie publique sur l'App Store (liste à cocher)

- [x] D-U-N-S de **LA FAMIVY LTD** : **369782130** (confirmé par Apple le 2026-10-03). Ce nom légal sera le nom du vendeur sur l'App Store.
- [x] Domaine **lafamivy.com** (Cloudflare) et adresse **contact@lafamivy.com** (Cloudflare Email Routing → boîte de David), 2026-10-03.
- [x] Site de la société en ligne sur lafamivy.com (dépôt `Dacloccortexa/lafamivy-site`, GitHub Pages, DNS Cloudflare), 2026-10-03. HTTPS activé (Enforce HTTPS) le 2026-10-06.
- [x] Compte Apple Developer actif (99 USD/an) : inscription envoyée le 2026-10-06 (organisation, Enrollment ID `QQ4BBY7SPW`), approuvée, membership payé (commande D005360879) et confirmé par le mail de bienvenue d'Apple le 2026-10-15.
- [x] Adresse de contact dans `privacy.html` (contact@lafamivy.com). URL de support pour la fiche App Store : **https://lafamivy.com/support/** (page FR/EN créée le 2026-10-09 après le mail d'Apple, dossier 102990583615)
- [x] Captures d'écran iPhone 6,9″ (1320 × 2868) : 5 en français, 5 en portugais dans `store/screenshots/` (2026-10-12).
- [x] Description, sous-titre, mots-clés, catégorie, classification par âge, confidentialité : textes prêts dans [APP_STORE_FICHE.md](APP_STORE_FICHE.md) (à copier dans App Store Connect).
- [x] « Confidentialité de l'app » publiée (2026-10-21) : URL politique = `https://lafamivy.com/privacy.html`. Trois types déclarés, tous **non liés** à l'identité et **sans suivi** : **Identifiant de l'utilisateur** (finalité : Fonctionnalité de l'app — identifiant anonyme RevenueCat), **Achats/Historique d'achats** (finalité : Fonctionnalité de l'app — déblocage abonnement/Pack Soirée), **Interaction avec le produit** (finalité : Analyses — mesure anonyme TelemetryDeck). Rien d'autre.
- [x] Accords, taxes et banque : contrat « Applications payantes » et « Applications gratuites » actifs pour tous pays/régions (16 oct. 2026 - 15/16 oct. 2027). Formulaires fiscaux US (Certificate of Foreign Status + Substitute Form W-8BEN-E) soumis et actifs le 2026-10-16. Compte bancaire BCP Bank Mauritius actif (devise bancaire EUR, redevances en USD).
- [x] Abonnement configuré : groupe « TACKLE illimité », abonnement `tackle_annual` (29,99 €/an) et achat intégré consommable `tackle_pack_soiree` (1,99 €, 12 h) créés dans App Store Connect (fiches en brouillon, captures de vérification temporaires — à remplacer par de vraies captures avant soumission). RevenueCat configuré (clé .p8, produits importés, droit `premium` rattaché aux deux formules, offre `default` avec les packages Annual et Pack Soirée) ; clé publique iOS collée dans `REVENUECAT_IOS_KEY`, 2026-10-19.
- [ ] Vérifier les droits : noms réels de joueurs/clubs en texte (OK pour un quiz factuel), aucune photo, aucun logo de club ni de compétition.
