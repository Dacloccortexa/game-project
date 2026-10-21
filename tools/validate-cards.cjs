#!/usr/bin/env node
// Vérifications techniques (pas de jugement de contenu) sur les fichiers de
// cartes/questions : parité FR/PT, doublons d'identifiant, forme minimale.
// Volontairement silencieux sur la qualité du contenu (rôle de ChatGPT,
// voir docs/CONTRIBUTING.md) — ne vérifie que ce qui casserait le jeu ou
// une langue publiée.
//
// Usage : node tools/validate-cards.cjs
// Sort avec un code non nul si une vérification bloquante échoue.

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// Fichiers qui existent en FR et en PT et doivent rester en parité d'identifiants.
const PAIRED_FILES = [
  'transfert-cards.json',
  'quisuisje-cards.json',
  'lematch-cards.json',
  'vraifaux-statements.json',
];

let errors = [];
let warnings = [];

function loadItems(file) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.cards)) return data.cards;
  if (Array.isArray(data.statements)) return data.statements;
  // objet simple id → item
  return Object.values(data).filter(v => v && typeof v === 'object' && v.id);
}

function idsOf(items) {
  return items.map(it => it.id).filter(Boolean);
}

for (const name of PAIRED_FILES) {
  const frPath = path.join(ROOT, 'src/data', name);
  const ptPath = path.join(ROOT, 'src/data/pt', name);

  if (!fs.existsSync(frPath)) { warnings.push(`${name} : absent en FR, ignoré`); continue; }
  if (!fs.existsSync(ptPath)) { errors.push(`${name} : absent en PT alors qu'il existe en FR`); continue; }

  let frItems, ptItems;
  try { frItems = loadItems(frPath); } catch (e) { errors.push(`${name} (FR) : JSON invalide — ${e.message}`); continue; }
  try { ptItems = loadItems(ptPath); } catch (e) { errors.push(`${name} (PT) : JSON invalide — ${e.message}`); continue; }

  const frIds = idsOf(frItems);
  const ptIds = idsOf(ptItems);

  // doublons internes
  const dupFr = frIds.filter((id, i) => frIds.indexOf(id) !== i);
  const dupPt = ptIds.filter((id, i) => ptIds.indexOf(id) !== i);
  if (dupFr.length) errors.push(`${name} (FR) : identifiant(s) en double — ${[...new Set(dupFr)].join(', ')}`);
  if (dupPt.length) errors.push(`${name} (PT) : identifiant(s) en double — ${[...new Set(dupPt)].join(', ')}`);

  // parité FR/PT
  const frSet = new Set(frIds), ptSet = new Set(ptIds);
  const missingInPt = frIds.filter(id => !ptSet.has(id));
  const missingInFr = ptIds.filter(id => !frSet.has(id));
  if (missingInPt.length) errors.push(`${name} : présent en FR mais absent en PT — ${missingInPt.join(', ')}`);
  if (missingInFr.length) errors.push(`${name} : présent en PT mais absent en FR — ${missingInFr.join(', ')}`);

  // champ qui porte le contenu principal, et donc sert à détecter les doublons —
  // diffère selon le fichier (schémas différents par nature de défi).
  const mainField = {
    'transfert-cards.json': 'answer',
    'quisuisje-cards.json': 'answer',
    'lematch-cards.json': null, // identité = combinaison d'équipes + année, pas un champ unique
    'vraifaux-statements.json': 'affirmation',
  }[name];

  if (mainField) {
    const count = {};
    for (const it of frItems) {
      if (!it[mainField]) continue;
      const key = String(it[mainField]).trim().toLowerCase();
      count[key] = (count[key] || 0) + 1;
    }
    const dup = Object.entries(count).filter(([, n]) => n > 1).map(([a]) => a);
    if (dup.length) warnings.push(`${name} (FR) : même "${mainField}" utilisé sur plusieurs entrées — ${dup.join(', ')}`);

    for (const it of frItems) {
      if (!it.id) { errors.push(`${name} (FR) : une entrée sans id`); continue; }
      if (!it[mainField]) errors.push(`${name} (FR) ${it.id} : champ "${mainField}" manquant`);
    }
  } else {
    for (const it of frItems) {
      if (!it.id) errors.push(`${name} (FR) : une entrée sans id`);
    }
  }

  // règle des 5 clubs max (Transfert uniquement)
  if (name === 'transfert-cards.json') {
    for (const it of frItems) {
      if (Array.isArray(it.career) && it.career.length > 5) {
        errors.push(`${name} (FR) ${it.id} : ${it.career.length} clubs dans "career", règle des 5 max dépassée`);
      }
    }
  }
}

console.log(`Vérification technique des cartes — ${PAIRED_FILES.length} fichiers contrôlés.\n`);

if (warnings.length) {
  console.log('Avertissements (non bloquants) :');
  for (const w of warnings) console.log('  ⚠️ ' + w);
  console.log('');
}

if (errors.length) {
  console.log('Erreurs bloquantes :');
  for (const e of errors) console.log('  ❌ ' + e);
  process.exit(1);
}

console.log('✅ Rien de bloquant.');
