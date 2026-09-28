# Préparer une partie — trois écrans TACKLE

Statut : **maquettes validées pour intégration**. Ce document décrit le parcours voulu pour l'interface mobile. Le site actuel peut encore afficher l'ancien formulaire ; les règles des cinq défis restent décrites dans [GAME_DESIGN.md](GAME_DESIGN.md).

## Planches

| Écran | Référence visuelle |
| --- | --- |
| 1. Créer une partie | [Planche, téléphone de gauche](ui/01-configuration-et-defis.png) |
| Sous-page. Choisir les défis | [Même planche, téléphone de droite](ui/01-configuration-et-defis.png) |
| 2. Personnaliser les équipes | [Planche, deux positions de défilement](ui/02-personnaliser-equipes.png) |

Les deux téléphones de chaque planche montrent des écrans différents ou deux positions de défilement ; il ne faut pas afficher deux téléphones dans l'application. Les images fixent la direction graphique. Le fonctionnement ci-dessous fait foi si un détail décoratif de l'image prête à confusion.

## Parcours

`Créer une partie → (Choisir les défis → Valider) → Continuer → Personnaliser les équipes → Coup d'envoi → Partie`

### 1. Créer une partie

- Choisir **1, 2, 3 ou 4 équipes** ; **3** par défaut.
- Choisir **5, 10, 15 ou 20 manches** ; **10** par défaut. Une manche reste un tour complet où chaque équipe joue une carte du même défi.
- La ligne **Défis** indique le nombre sélectionné, par exemple **5 sélectionnés**, et ouvre la sous-page dédiée. Ne pas mettre la liste des cinq défis ni les noms d'équipes sur cet écran.
- **Continuer** mène à la personnalisation des équipes. Les réglages sont conservés si l'on revient en arrière.

### Sous-page. Choisir les défis

- Les cinq défis sont **Transfert**, **Plus ou Moins**, **Vrai ou Faux**, **Qui suis-je ?** et **Le Match**. Tous sont sélectionnés par défaut.
- Toute la carte d'un défi est touchable. **Sélectionné : encadré doré. Non sélectionné : encadré discret.** Ne pas ajouter de case à cocher ni de coche ronde à droite.
- Chaque carte a une petite ambiance propre, visible avant de jouer : parcours et flèche pour Transfert ; statistiques comparées pour Plus ou Moins ; contraste vrai/faux ; silhouette sous un projecteur pour Qui suis-je ? ; chronologie et horloge pour Le Match. Les cinq noms doivent rester lisibles. L'encadré doré garde le même sens sur les cinq cartes.
- Pour Transfert, utiliser uniquement des motifs abstraits. **Aucun logo, blason ou emblème de club**, réel ou fictif, sur cette carte.
- Le nombre de défis sélectionnés se met à jour sur l'écran précédent. Il faut en conserver **au moins un** ; empêcher la validation d'une sélection vide et expliquer pourquoi.
- **Valider** conserve la sélection et revient à « Créer une partie ». La flèche de retour revient aussi à cet écran avec la sélection conservée.

### 2. Personnaliser les équipes

- Une seule page qui défile, avec une fiche par équipe. Le nombre de fiches suit le nombre choisi à l'écran 1.
- Chaque fiche contient un nom modifiable, prérempli **Équipe 1**, **Équipe 2**, etc. ; un logo à choisir parmi **quatre propositions** (lion, renard, taureau, aigle) ; et une couleur.
- La planche montre six couleurs : or, corail, bleu, violet, menthe et ivoire. Préattribuer des couleurs distinctes et un logo à chaque équipe, pour pouvoir lancer sans saisie obligatoire. Les choix sont modifiables.
- Les logos d'équipes sont des créations propres à TACKLE : **ne pas utiliser de logos de clubs**.
- **Coup d'envoi** lance la partie avec les équipes configurées. Les noms, logos et couleurs doivent rester cohérents dans le score et le classement.
- Si l'on revient à l'écran 1 et change le nombre d'équipes, conserver les réglages des équipes qui restent ; initialiser les nouvelles fiches avec leurs valeurs par défaut.

## Direction visuelle et intégration

Ambiance nocturne de stade, projecteurs, vert profond, touches ivoire et or, pelouse en bas d'écran, logo TACKLE doré. Garder des textes contrastés et des zones tactiles larges sur téléphone. L'apparence des défis doit se retrouver ensuite sur leurs écrans de jeu, tout en conservant une structure commune.

Ces maquettes préparent l'interface ; elles ne changent ni le contenu des cartes, ni les scores, ni les règles de Tackle. Avant d'intégrer, vérifier sur un vrai téléphone les formats courts et longs, l'ouverture/retour de la sous-page, les valeurs par défaut et le lancement avec 1 à 4 équipes.
