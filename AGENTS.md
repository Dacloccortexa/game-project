# Règles pour les agents (Codex et autres)

Décision de David (2026-10-06).

- **Ne jamais pousser sur `main`.** `main` est le jeu en ligne : le site GitHub Pages, et les fichiers de `src/data/` que l'appli iPhone télécharge toute seule. Seul Claude (lead dev) intègre sur `main`, après relecture.
- Travailler sur une branche `codex/<sujet>` et la publier (`git push -u origin codex/<sujet>`). Prévenir David quand elle est en ligne.
- Avant de publier une branche :
  - partir du `main` à jour (`git fetch origin && git rebase origin/main`) ;
  - lancer `tools/bump-version.sh` (il met aussi à jour `src/data/manifest.json` si les questions ont changé) ;
  - lancer `node tests/tackle-timing.test.cjs`, qui doit passer.
- Questions portugaises (`src/data/pt/`) : le texte des cartes Qui suis-je ? a été corrigé à la main par David. Ne pas relancer `tools/translate_pt.py` sur ce fichier sans le dire.
- Noter toute décision de jeu ou de contenu dans `docs/DECISIONS.md`, entrée la plus récente en haut.
