# Vrai ou Faux — identité « verdict d'arbitre »

Statut : **intégré dans `index.html`** (2026-09-29), à vérifier sur un vrai téléphone. Carte : fond de stade, cadre VAR, badge « VAR », titre, « Affirmation n / 5 », affirmation, cagnotte potentielle (0 à 5 pts). Les boutons VRAI (vert, à gauche) et FAUX (corail, à droite) restent sous le chrono, comme les commandes des autres défis ; ils disparaissent pendant la course au Tackle. Fonds servis en WebP : `assets/ui/web/vf-stadium-panel.webp`.

La [planche de question](ui/24-vrai-ou-faux-var-question.jpg) est la référence visuelle validée. Le [pack graphique séparé](../assets/ui/vrai-ou-faux/README.md) et son [aperçu assemblé](../assets/ui/vrai-ou-faux/preview.html) permettent d'intégrer le décor sans figer les affirmations ni les scores dans une image.

## Carte centrale

L'univers est celui d'une décision d'arbitre : cadre de contrôle vidéo sombre, lumière or de stade, affirmation comme pièce centrale, puis deux grandes réponses VRAI et FAUX. Le badge « VAR » est un signe d'ambiance. Il n'y a ni vidéo à examiner, ni joueur reconnaissable, ni blason de club.

Le haut de la page, les scores de toutes les équipes, l'équipe active, le chrono, le bouton Tackle, les panneaux de saisie et les verdicts gardent les composants communs déjà intégrés. Seule la carte propre au défi change. Les boutons VRAI et FAUX affichent chacun un mot et une icône ; leurs couleurs ne révèlent pas la vérité de l'affirmation.

## Contenu et comportement

- Afficher **une affirmation à la fois** avec son rang parmi les cinq et la cagnotte **potentielle** déjà accumulée. L'exemple de la planche montre la deuxième affirmation et une cagnotte de 1 point ; ses noms et scores sont uniquement illustratifs.
- Une réponse correcte augmente la cagnotte et conduit au choix **ENCAISSER / CONTINUER**. Une erreur fait perdre la cagnotte de la carte ; à la cinquième bonne réponse, les 5 points sont encaissés automatiquement.
- Pendant les 30 secondes de priorité, la réponse de l'équipe active est révélée immédiatement après son appui. Si ce délai expire, la fenêtre Tackle de 15 secondes et son enjeu fixe de ±3 points suivent [`GAME_DESIGN.md`](GAME_DESIGN.md). En l'absence de réponse après 45 secondes, la carte se termine et la cagnotte acquise est encaissée.
- Le résultat utilise le **bandeau de verdict commun** décrit dans [`UI_REVEALS.md`](UI_REVEALS.md), sans créer un nouveau système de révélation réservé à Vrai ou Faux.

Les chaînes de l'aperçu ne sont pas des données à intégrer. Utiliser les affirmations sourcées de `src/data/vraifaux-statements.json` et conserver une taille lisible pour les phrases longues.
