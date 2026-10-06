# TACKLE — marque et marketing

Document de travail au 6 octobre 2026. Les règles sont dans [GAME_DESIGN.md](GAME_DESIGN.md), les choix actés dans [DECISIONS.md](DECISIONS.md) et les observations de parties dans [PLAYTESTS.md](PLAYTESTS.md). Les phrases ci-dessous sont des **propositions à tester**, sauf quand elles sont signalées comme déjà présentes dans le jeu. David et son équipe peuvent ajouter leurs retours dans « Pistes de l'équipe ».

## Positionnement proposé

**TACKLE transforme les débats foot entre amis en partie par équipes, sur un seul téléphone.** Chacun peut marquer pendant son tour ; les adversaires peuvent tenter de reprendre la main quand le Tackle s'ouvre. La promesse est une soirée qu'on a envie de prolonger par une revanche, avec du suspense et des occasions de se chambrer.

Ce positionnement repose sur trois éléments concrets :

1. **Le groupe** : de 1 à 4 équipes, réunies autour d'un téléphone. Le mode solo existe ; les messages de campagne qui parlent de rivalité s'adressent surtout aux parties à plusieurs équipes.
2. **Des défis foot variés** : Transfert, Plus ou Moins, Vrai ou Faux, Qui suis-je ? et Le Match. La connaissance compte, mais l'intuition et la prise de risque comptent aussi.
3. **Le Tackle** : un moment de course pour répondre et retourner le score. Il n'est pas disponible à tout instant ; la phrase « tout le monde joue tout le temps » serait trompeuse.

### Territoires de marque envisagés

| Territoire | Phrase possible | Ce qu'il met en avant | Limite |
| --- | --- | --- | --- |
| Rivalité entre amis **(piste recommandée)** | **Le foot se joue entre vous.** | L'expérience collective et la confrontation amicale ; fonctionne au-delà d'un défi précis. | Ne décrit pas à lui seul le format du jeu : l'accompagner d'une phrase explicative. |
| Débat foot | Vos débats foot valent enfin des points. | La conversation entre amis qui devient une partie. | Moins pertinent pour une démonstration du mode solo. |
| Suspense | Chaque réponse peut retourner le score. | Les renversements possibles avec le Tackle. | Promet beaucoup si le Tackle se déclenche peu dans les parties réelles. |

**Proposition de travail :** utiliser « Le foot se joue entre vous. » comme phrase de marque sur les supports de campagne, avec le descriptif « Le jeu de défis foot entre amis, sur un téléphone ». Garder « Le quiz foot entre potes » dans l'app tant qu'une variante n'a pas été testée : cette phrase est courte et explicite, même si « quiz » raconte moins bien la diversité des mécaniques.

## Confrontation avec le jeu actuel

| Idée marketing | Ce qui existe déjà | Conséquence pour le message |
| --- | --- | --- |
| « Le foot se joue entre vous » | Le jeu prévoit 1 à 4 équipes sur un téléphone et cinq défis ([GAME_DESIGN.md](GAME_DESIGN.md)). | Cohérent pour la communication à plusieurs ; préciser « entre amis » ou « par équipes » près de la phrase. Ne pas faire croire que le jeu exige plusieurs téléphones. |
| Tackle comme signature | Une phase de priorité précède une fenêtre de Tackle de 5 secondes ; passer peut aussi l'ouvrir ([GAME_DESIGN.md](GAME_DESIGN.md), [DECISIONS.md](DECISIONS.md)). | Montrer le **moment où le Tackle devient possible**, puis sa conséquence. « Crie Tackle. Vole la réponse. » est une accroche de campagne, pas une description complète des règles. |
| « Le quiz foot entre potes » | C'est le sous-titre de l'accueil et de l'image de résultat partagée (`index.html`). Il existe aussi en portugais. | Il explique vite le produit, mais ne distingue pas le Tackle. Si la baseline change, vérifier ensemble accueil, image partagée, texte de partage et traduction ; ne pas modifier un seul emplacement. |
| Les amis veulent rejouer | Une soirée de test a enchaîné les parties ; une autre partie a suscité une envie de revanche ([PLAYTESTS.md](PLAYTESTS.md)). | Bon signal qualitatif, encore limité. Éviter « tout le monde devient accro » ou une statistique de rétention inventée. |
| Le Tackle garde les adversaires attentifs | Le premier journal à deux équipes ne relevait que 2 Tackles en 6 parties ; depuis, le délai a été raccourci et « Passer » ouvre le Tackle ([PLAYTESTS.md](PLAYTESTS.md), [DECISIONS.md](DECISIONS.md)). | Promettre la **possibilité** de tacler. Mesurer à nouveau sa fréquence avant d'en faire une promesse absolue comme « personne ne reste sur le banc ». |
| Le partage fait découvrir le jeu | L'écran de fin propose une image de résultat et un QR code vers `lafamivy.com/tackle` ([DECISIONS.md](DECISIONS.md)). | La campagne peut inviter à partager le score et à lancer une revanche. Vérifier que la page d'arrivée mène bien à la version jouable au moment de diffuser. |
| Entrer gratuitement dans le jeu | Sur iPhone : 2 parties gratuites par jour, de 5 manches ; pack soirée 1,99 € et abonnement annuel 29,99 €. Le site web reste illimité pour les testeurs ([DECISIONS.md](DECISIONS.md)). | Dire « Joue gratuitement » sans laisser entendre que l'application iPhone est illimitée sans achat. Présenter le pack comme un prolongement de soirée, pas comme la condition pour essayer. |
| iPhone et deux langues | L'application iPhone est en préparation ; la version navigateur est jouable. Le français et le portugais du Portugal sont intégrés ([APP_IOS.md](APP_IOS.md), [DECISIONS.md](DECISIONS.md)). | Avant la sortie, renvoyer vers la page du jeu. Réserver « Disponible sur l'App Store » et « Télécharger » à la mise en ligne effective. Adapter les accroches au portugais avec des joueurs locaux, sans traduction littérale automatique. |

### Points de friction à surveiller avant de promettre une expérience fluide

Les journaux signalent des cartes parfois trop difficiles, des parties longues à plusieurs équipes et une première ouverture du Tackle mal comprise ([PLAYTESTS.md](PLAYTESTS.md), [REVUE_JEU_2026-10-03.md](REVUE_JEU_2026-10-03.md)). La communication doit montrer une situation réellement jouable et une action de Tackle compréhensible. Les prochains tests iPhone diront si ces points sont suffisamment réglés.

## Architecture des phrases

| Rôle | Proposition | Usage |
| --- | --- | --- |
| Nom | **TACKLE** | Logo et nom de l'app ; déjà en place. |
| Baseline de marque | **Le foot se joue entre vous.** | Campagnes, page de présentation, fin de vidéo ; à tester. |
| Descriptif immédiat | **Le jeu de défis foot entre amis, sur un téléphone.** | Sous la baseline ou dans une fiche produit, pour expliquer sans ambiguïté. |
| Accroche de campagne | **Vos débats foot valent enfin des points.** | Visuels et vidéos de soirées entre amis. |
| Signature d'action | **Réponds. Tacle. Renverse le score.** | Bande-annonce, démonstration du gameplay, fin de vidéo. |

Ces phrases ont des rôles différents. La baseline n'a pas besoin de répéter « Tackle », déjà écrit dans le logo. Le descriptif apporte la clarté que la baseline seule n'a pas. La signature d'action doit être illustrée par une séquence de jeu, pas posée sur un écran statique.

### Textes prêts à tester

- **Accueil, version candidate :** « Le foot se joue entre vous. » Puis, près du bouton Jouer ou dans la première page de règles : « Formez vos équipes. Choisissez vos défis foot. Quand le Tackle s'ouvre, tentez de reprendre la main. »
- **Présentation courte :** « TACKLE, c'est une partie de défis foot entre amis sur un seul téléphone. Transferts, statistiques, vrai ou faux, joueurs mystères et matchs marquants : chaque défi donne une occasion de marquer. Au sifflet, les adversaires peuvent tenter le Tackle. »
- **Image ou message de partage :** conserver le score réel et le nom des équipes ; tester sous le résultat « Le foot se joue entre vous. » avec le lien ou QR code existant. Le score reste la raison de partager.
- **Teaser vidéo :** « Il est sûr de sa réponse. Vous êtes sûrs de la vôtre. Attendez le sifflet… TACKLE. » La vidéo doit montrer le sifflet et la fenêtre de réponse, pour que le message corresponde au jeu.

**Voix :** compétitive dans l'action, complice dans la communication. S'adresser au groupe par « vous », puis à la personne qui doit agir par « tu ». Chambrer une réponse sans exclure les joueurs occasionnels. Éviter « le meilleur quiz », « personne n'attend jamais » et les promesses chiffrées sans mesure.

### Test de la baseline

Montrer à quelques personnes qui ne connaissent pas le jeu, sur iPhone, l'accueil actuel puis une maquette avec « Le foot se joue entre vous. » Demander : « Quel type de jeu attends-tu ? », « Combien de téléphones faut-il ? », « Que signifie Tackle pour toi ? ». Après une courte partie, demander quelle phrase décrit le mieux ce qu'ils ont vécu. Relever aussi combien de Tackles sont tentés, combien de cartes sont jouées et si le groupe relance une partie. Choisir la baseline à partir de ces observations, puis harmoniser les supports français et portugais.

## Pistes de l'équipe

_(À compléter : phrases, idées de vidéos, réactions des testeurs…)_

-

## Autres phrases déjà proposées (aucune n'est encore choisie)

- **Texte actuel de l'accueil** : « Le quiz foot entre potes » (pt : « O quiz de futebol entre amigos »). Clair et court ; il contient « quiz foot », des mots qui peuvent aussi servir dans les métadonnées de la fiche App Store. Sa limite : il ne raconte ni les équipes ni le Tackle.
- **Phrases d'accroche proposées par Claude** (pubs, captures d'écran, fin des vidéos) :
  - « Crie Tackle. Vole la réponse. » (sa préférée)
  - « Le quiz foot où on vole les réponses »
  - « Le quiz foot qui se joue en criant »
  - « Sois le premier à crier Tackle ! »
- **Piste écartée pour la promesse principale** : « Le jeu de foot où personne ne reste sur le banc. » Elle suggère que chaque adversaire intervient à chaque carte ; les journaux de parties ne le montrent pas encore.
- **Piste de David** : « Vole la réponse aux footix. »
  - Bien pour TikTok et les pubs : ça chambre et ça fait commenter.
  - Plutôt à éviter sur la fiche App Store, qui doit rester accueillante pour les joueurs occasionnels.
  - Pas de traduction en portugais : trouver un équivalent local avec les testeurs portugais.
  - « Footix » était la mascotte de la Coupe du monde 1998 : l'utiliser comme mot d'argot, pas comme nom de produit ni avec un coq.

## Vidéos TikTok

- Format « fail » : une équipe se plante sur un joueur évident avec des réponses crédibles, l'autre la vole avec un Tackle. Fin : « Toi, tu l'avais à quel indice ? 👇 ». Trois vidéos faites le 2026-10-06 (Drogba, Ribéry, Mbappé). Outil et scénarios : [`tools/tiktok/`](../tools/tiktok/README.md).
- Les vidéos montrent le vrai jeu, sans vrai joueur ni logo de club généré par IA.
- Ajouter un son tendance dans TikTok. Mettre la réponse en commentaire épinglé.
- Une vidéo TikTok normale n'a pas de lien cliquable : le lien passe par le profil ou un commentaire. Seules les pubs payantes (TikTok Ads, campagne « installations d'appli ») ont un bouton « Télécharger » vers l'App Store, donc après la sortie de l'appli.
- Fin des vidéos : « Joue gratuitement · lafamivy.com/tackle » aujourd'hui. Au lancement, la remplacer par « Gratuit sur l'App Store » (ou rien, quand la pub a son bouton).
- À faire : versions Vrai ou Faux et Le Match, versions portugaises, une série d'une vidéo par jour, et filmer de vraies soirées (le cri « TACKLE ! »).

## Mesure des pubs (plus tard)

Pour savoir quelles pubs rapportent des achats, on pourra brancher la mesure de TikTok (leur kit ou AppsFlyer/Adjust). Ça changera la déclaration de confidentialité App Store (aujourd'hui « pas de suivi ») et peut-être l'affichage de la fenêtre Apple « Autoriser le suivi ». À décider avec David avant de l'ajouter.
