#!/usr/bin/env node
// Choisit la prochaine carte vérifiée (Transfert ou Qui suis-je) non encore
// utilisée pour une vidéo TikTok « organique », et met à jour l'état.
//
// Usage :
//   node tools/tiktok/next-card.cjs                → affiche la prochaine carte (sans la marquer utilisée)
//   node tools/tiktok/next-card.cjs --mark t043     → marque t043 comme utilisée (après publication)
//   node tools/tiktok/next-card.cjs --list          → liste les cartes déjà utilisées

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const STATE_FILE = path.join(__dirname, 'published-state.json');

const GAMES = [
  { key: 'transfert', file: 'transfert-cards.json' },
  { key: 'quisuisje', file: 'quisuisje-cards.json' },
];

function loadState() {
  if (!fs.existsSync(STATE_FILE)) return { used: [] };
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
}

// Une carte est éligible selon la même règle que le jeu réel (index.html) :
// - Transfert : seules les cartes marquées « vérifié » carte par carte sont chargées.
// - Qui suis-je ? : le lot n'a jamais eu de statut par carte ; il a reçu un feu vert
//   éditorial global (docs/DECISIONS.md, lot de 100 fiches) et le jeu charge les 200
//   fiches sans filtrer sur verification_status. On applique donc la même règle ici,
//   sinon aucune carte Qui suis-je ne serait jamais sélectionnable.
function allEligibleCards() {
  const out = [];
  for (const g of GAMES) {
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data', g.file), 'utf8'));
    for (const c of data.cards) {
      if (g.key === 'transfert' && c.verification_status !== 'vérifié') continue;
      out.push({ game: g.key, ...c });
    }
  }
  return out;
}

function gameOfId(id) { return id.slice(0, 2) === 'qs' ? 'quisuisje' : 'transfert'; }

const args = process.argv.slice(2);
const state = loadState();

if (args[0] === '--list') {
  console.log(state.used.length ? state.used.join('\n') : '(aucune carte utilisée pour l’instant)');
  process.exit(0);
}

if (args[0] === '--mark') {
  const id = args[1];
  if (!id) { console.error('Usage : --mark <id>'); process.exit(1); }
  if (!state.used.includes(id)) {
    state.used.push(id);
    saveState(state);
  }
  console.log(`Marquée utilisée : ${id}`);
  process.exit(0);
}

const cards = allEligibleCards().filter(c => !state.used.includes(c.id));

if (cards.length === 0) {
  console.log('Plus aucune carte éligible non utilisée. Il faut vérifier/ajouter des cartes, ou puiser dans scripts/pub.');
  process.exit(0);
}

// Alterne entre les deux défis filmables (Transfert / Qui suis-je ?) plutôt que d'épuiser
// l'un avant de toucher à l'autre : on prend en priorité une carte du défi différent de
// la dernière vidéo publiée, et on ne retombe sur le même défi que si l'autre n'a plus rien.
const lastGame = state.used.length ? gameOfId(state.used[state.used.length - 1]) : null;
const preferredGame = lastGame === 'transfert' ? 'quisuisje' : 'transfert';
const preferred = cards.filter(c => c.game === preferredGame);
const next = (preferred.length ? preferred : cards)[0];
console.log(JSON.stringify(next, null, 2));
console.log(`\n${cards.length} carte(s) éligible(s) encore disponible(s) sur ${allEligibleCards().length} éligibles au total.`);
