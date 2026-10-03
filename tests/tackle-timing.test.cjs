const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

let now = 0;
let nextTimer = 1;
const timers = new Map();
const elements = new Map();

function element(id) {
  if (!elements.has(id)) {
    const classes = new Set();
    const node = {
      id, style: { setProperty(name, value) { this[name] = value; } }, children: [], listeners: {}, value: '', textContent: '', innerHTML: '', disabled: false,
      classList: { add: x => classes.add(x), remove: x => classes.delete(x), contains: x => classes.has(x), toggle: (x, on) => ((on === undefined ? !classes.has(x) : on) ? classes.add(x) : classes.delete(x)) },
      addEventListener(name, fn) { this.listeners[name] = fn; },
      appendChild(child) { this.children.push(child); },
      setAttribute(name, value) { this[name] = value; },
      getAttribute(name) { return this[name]; },
      querySelectorAll() { return []; },
      focus() {},
      click() { assert(this.listeners.click, `No click listener: ${id}`); this.listeners.click(); },
    };
    let html = '';
    Object.defineProperty(node, 'innerHTML', {
      get() { return html; },
      set(value) { html = value; if (value === '') this.children = []; },
    });
    elements.set(id, node);
  }
  return elements.get(id);
}

function addTimer(fn, duration, repeat) {
  const id = nextTimer++;
  timers.set(id, { fn, due: now + duration, repeat: repeat ? duration : 0 });
  return id;
}
function advance(ms) {
  now += ms;
  for (const [id, timer] of [...timers]) {
    if (timer.due > now) continue;
    if (timer.repeat) timer.due = now + timer.repeat;
    else timers.delete(id);
    timer.fn();
  }
}

let script = fs.readFileSync('index.html', 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
script = script.replace(/\}\)\(\);\s*$/, 'globalThis.testApi = {state, startTackleWindow, pomGuess, vfAnswer, clearTackleTimer, currentTackleStake, pickNextMinigame, drawFromDeck, renderLmClues};})();');
const context = {
  document: { getElementById: element, createElement: tag => element(`created-${tag}-${Math.random()}`), querySelector: element, querySelectorAll: () => [] },
  fetch: () => Promise.resolve({ json: () => Promise.resolve({ cards: [], players: [], statements: [] }) }),
  Date: { now: () => now },
  setInterval: (fn, ms) => addTimer(fn, ms, true), clearInterval: id => timers.delete(id),
  setTimeout: (fn, ms) => addTimer(fn, ms, false), clearTimeout: id => timers.delete(id),
  console, Math, Promise,
};
vm.createContext(context);
vm.runInContext(script, context);
const { state, startTackleWindow, pomGuess, vfAnswer, currentTackleStake, pickNextMinigame, drawFromDeck, renderLmClues } = context.testApi;

function reset(game) {
  timers.clear();
  state.cardEnded = false;
  state.currentRoundMinigame = game;
  state.currentTeamIndex = 0;
  state.teams = [{name:'A', score:0},{name:'B', score:0}];
  state.tackledThisCard = [];
}

reset('transfert');
state.currentCard = {answer:'Joueur', variants:[], career:[{club:'Un',years:'1'},{club:'Deux',years:'2'}]};
state.revealedCount = 1;
startTackleWindow();
assert.equal(currentTackleStake(), 5);
assert.equal(element('btn-tackle').disabled, true);
assert.equal(element('btn-tackle').classList.contains('hidden-screen'), false);
advance(30000);
assert.equal(element('btn-tackle').disabled, false);
advance(15000);
assert.equal(state.revealedCount, 2);
assert.equal(currentTackleStake(), 4);
assert.equal(element('btn-tackle').disabled, true);

// « Passer » ouvre 5 s de Tackle aux seuls adversaires, sur l'indice passé (2026-10-03).
reset('transfert');
state.currentCard = {answer:'Joueur', variants:[], career:[{club:'Un',years:'1'},{club:'Deux',years:'2'}]};
state.revealedCount = 1;
startTackleWindow();
advance(3000);
element('btn-pass').click();
assert.equal(state.passWindow, true);
assert.equal(state.revealedCount, 1);
assert.equal(element('btn-tackle').disabled, false);
advance(5000);
assert.equal(state.passWindow, false);
assert.equal(state.revealedCount, 2);
assert.equal(element('btn-tackle').disabled, true);

reset('transfert');
state.currentCard = {answer:'Joueur', variants:[], career:[{club:'Un',years:'1'},{club:'Deux',years:'2'}]};
state.revealedCount = 1;
startTackleWindow();
element('btn-pass').click();
element('btn-tackle').click();
assert.equal(element('tackle-team-buttons').children.length, 1); // l'équipe qui a passé n'est pas dans la liste
element('tackle-team-buttons').children[0].click();
element('tackle-answer-input').value = 'Joueur';
element('btn-tackle-submit').click();
assert.equal(state.teams[1].score, 5);
assert.equal(state.cardEnded, true);

// Seul : passer révèle tout de suite l'indice suivant.
reset('transfert');
state.teams = [{name:'A', score:0}];
state.currentCard = {answer:'Joueur', variants:[], career:[{club:'Un',years:'1'},{club:'Deux',years:'2'}]};
state.revealedCount = 1;
startTackleWindow();
element('btn-pass').click();
assert.equal(state.revealedCount, 2);

reset('quisuisje');
state.currentCard = {answer:'Joueur', variants:[], clues:['Club','Titre']};
state.revealedCount = 1;
startTackleWindow();
assert.equal(currentTackleStake(), 5);
advance(30000);
advance(15000);
assert.equal(state.revealedCount, 2);
assert.equal(currentTackleStake(), 4);
assert.equal(element('btn-tackle').disabled, true);

reset('lematch');
state.currentLmCard = {teams:['A','B'], clues:['Coupe du monde','Année : 2018','Score final : 4–2','Ville : Moscou','Phase : Finale']};
state.lmRevealedCount = 1;
renderLmClues();
assert.equal(element('lm-event-list').children.length, 5);
assert.equal(element('lm-event-list').children[0].children[2].children[0].textContent, 'Coupe du monde');
assert.equal(element('lm-event-list').children[1].children[2].children[0].textContent, 'Indice à venir');
startTackleWindow();
assert.equal(currentTackleStake(), 5);
advance(30000);
advance(15000);
assert.equal(state.lmRevealedCount, 2);
assert.equal(currentTackleStake(), 4);
assert.equal(element('btn-tackle').disabled, true);
assert.equal(element('lm-event-list').children[1].children[2].children[0].textContent, 'Année : 2018');

reset('transfert');
state.currentCard = {answer:'Joueur', variants:[], career:[{club:'Un',years:'1'},{club:'Deux',years:'2'}]};
state.revealedCount = 2;
startTackleWindow();
advance(30000);
element('btn-tackle').click();
element('tackle-team-buttons').children.at(-1).click();
element('tackle-answer-input').value = 'Joueur';
element('btn-tackle-submit').click();
assert.equal(state.teams[1].score, 4);
assert.equal(state.cardEnded, true);

reset('plusoumoins');
state.pomChain = {category:'Test',chain:[{name:'A',value:1},{name:'B',value:2},{name:'C',value:3}]};
state.pomIndex = 0;
state.pomPotential = 2;
startTackleWindow();
assert.equal(currentTackleStake(), 3);
advance(30000);
element('btn-tackle').click();
// Après le sifflet, toutes les équipes sont dans la course : celle qui a la main d'abord, puis l'adversaire.
assert.equal(element('tackle-team-buttons').children.length, 2);
element('tackle-team-buttons').children[1].click();
element('tackle-binary-choice-1').click();
assert.equal(state.teams[0].score, 0);
assert.equal(state.teams[1].score, 3);
assert.equal(state.cardEnded, true);

reset('plusoumoins');
state.pomIndex = 0;
state.pomPotential = 2;
startTackleWindow();
advance(30000);
element('btn-tackle').click();
element('tackle-team-buttons').children[1].click();
element('tackle-binary-choice-2').click();
assert.equal(state.teams[0].score, 2);
assert.equal(state.teams[1].score, -3);

reset('plusoumoins');
state.pomIndex = 0;
state.pomPotential = 2;
startTackleWindow();
advance(30000);
advance(15000);
assert.equal(state.teams[0].score, 2);
assert.equal(state.cardEnded, true);

// Réponse de l'équipe active : jugée tout de suite, le Tackle se ferme (plus de Tackle après une réponse).
reset('plusoumoins');
state.pomIndex = 0;
state.pomPotential = 0;
startTackleWindow();
pomGuess('plus');
assert.equal(state.pomPotential, 1);
assert.equal(state.cardEnded, false);
assert.equal(element('btn-tackle').classList.contains('hidden-screen'), true);
advance(45000);
assert.equal(state.pomPotential, 1);
assert.equal(state.teams[0].score, 0);
assert.equal(state.cardEnded, false);

// Même chose après le sifflet : l'équipe active répond pendant les 15 secondes ouvertes.
reset('plusoumoins');
state.pomIndex = 0;
state.pomPotential = 0;
startTackleWindow();
advance(31000);
pomGuess('moins');
assert.equal(state.cardEnded, true);
assert.equal(state.teams[0].score, 0);
assert.equal(element('btn-tackle').classList.contains('hidden-screen'), true);

reset('vraifaux');
state.vfChain = [{affirmation:'Un fait',est_vraie:false},{affirmation:'Autre fait',est_vraie:true}];
state.vfIndex = 0;
state.vfPotential = 3;
startTackleWindow();
advance(30000);
element('btn-tackle').click();
element('tackle-team-buttons').children.at(-1).click();
element('tackle-binary-choice-2').click();
assert.equal(state.teams[0].score, 0);
assert.equal(state.teams[1].score, 3);

// Vrai ou Faux : la réponse active est révélée tout de suite, aucun Tackle ensuite.
reset('vraifaux');
state.vfIndex = 0;
state.vfPotential = 2;
startTackleWindow();
vfAnswer(false);
assert.equal(state.vfPotential, 3);
assert.equal(state.cardEnded, false);
assert.equal(element('btn-tackle').classList.contains('hidden-screen'), true);
advance(45000);
assert.equal(state.vfPotential, 3);
assert.equal(state.teams[0].score, 0);
assert.equal(state.teams[1].score, 0);

reset('vraifaux');
state.vfIndex = 0;
state.vfPotential = 2;
startTackleWindow();
advance(31000);
vfAnswer(true);
assert.equal(state.cardEnded, true);
assert.equal(state.teams[0].score, 0);

// Course au Tackle : après le sifflet, « Répondre »/« Passer » disparaissent (classe race) ;
// si l'équipe qui a la main gagne la course, elle répond normalement avec ses points habituels.
reset('transfert');
state.currentCard = {answer:'Joueur', variants:[], career:[{club:'Un',years:'1'},{club:'Deux',years:'2'}]};
state.revealedCount = 2;
startTackleWindow();
assert.equal(element('screen-play').classList.contains('race'), false);
advance(30000);
assert.equal(element('screen-play').classList.contains('race'), true);
element('btn-tackle').click();
element('tackle-team-buttons').children[0].click();
assert.equal(element('screen-play').classList.contains('race'), false);
assert.equal(element('type-box').classList.contains('hidden-screen'), false);
assert.equal(element('tackle-answer-zone').classList.contains('hidden-screen'), true);
element('answer-input').value = 'Joueur';
element('btn-submit-answer').click();
element('btn-confirm-answer').click();
assert.equal(state.teams[0].score, 4);
assert.equal(state.teams[1].score, 0);

reset('plusoumoins');
state.pomChain = {category:'Test',chain:[{name:'A',value:1},{name:'B',value:2},{name:'C',value:3}]};
state.pomIndex = 0;
state.pomPotential = 0;
startTackleWindow();
advance(30000);
element('btn-tackle').click();
element('tackle-team-buttons').children[0].click();
pomGuess('plus');
assert.equal(state.pomPotential, 1);
assert.equal(state.teams[1].score, 0);

// Tackle adverse raté (Transfert, Qui suis-je ?, Le Match) : l'équipe qui tacle perd ses points,
// la carte continue pour l'équipe qui a la main, et cette équipe adverse ne peut plus tacler sur la carte.
reset('transfert');
state.teams = [{name:'A', score:0},{name:'B', score:0},{name:'C', score:0}];
state.currentCard = {answer:'Joueur', variants:[], career:[{club:'Un',years:'1'},{club:'Deux',years:'2'},{club:'Trois',years:'3'}]};
state.revealedCount = 1;
startTackleWindow();
advance(30000);
element('btn-tackle').click();
assert.equal(element('tackle-team-buttons').children.length, 3);
element('tackle-team-buttons').children[1].click(); // équipe B
element('tackle-answer-input').value = 'Mauvais';
element('btn-tackle-submit').click();
assert.equal(state.teams[1].score, -5);
assert.equal(state.cardEnded, false);
advance(3000); // fin de l'animation du verdict : indice suivant
assert.equal(state.revealedCount, 2);
assert.equal(element('screen-play').classList.contains('race'), false);
advance(30000);
element('btn-tackle').click();
assert.equal(element('tackle-team-buttons').children.length, 2); // A (la main) et C ; B a déjà tacklé
element('tackle-team-buttons').children[1].click(); // équipe C
element('tackle-answer-input').value = 'Joueur';
element('btn-tackle-submit').click();
assert.equal(state.teams[2].score, 4);
assert.equal(state.cardEnded, true);

// Sur le dernier indice, un Tackle raté termine la carte.
reset('transfert');
state.currentCard = {answer:'Joueur', variants:[], career:[{club:'Un',years:'1'}]};
state.revealedCount = 1;
startTackleWindow();
advance(30000);
element('btn-tackle').click();
element('tackle-team-buttons').children[1].click();
element('tackle-answer-input').value = 'Mauvais';
element('btn-tackle-submit').click();
assert.equal(state.cardEnded, true);

// Chrono de réponse : 15 s pour valider, sinon mauvaise réponse (ou Tackle raté).
reset('transfert');
state.currentCard = {answer:'Joueur', variants:[], career:[{club:'Un',years:'1'},{club:'Deux',years:'2'}]};
state.revealedCount = 1;
startTackleWindow();
element('btn-answer').click();
advance(14000);
assert.equal(state.teams[0].score, 0);
advance(1500);
assert.equal(state.teams[0].score, -1);

reset('transfert');
state.teams = [{name:'A', score:0},{name:'B', score:0},{name:'C', score:0}];
state.currentCard = {answer:'Joueur', variants:[], career:[{club:'Un',years:'1'},{club:'Deux',years:'2'}]};
state.revealedCount = 1;
startTackleWindow();
advance(30000);
element('btn-tackle').click();
element('tackle-team-buttons').children[1].click();
advance(15500);
assert.equal(state.teams[1].score, -5);
assert.equal(state.cardEnded, false);

reset('vraifaux');
state.vfIndex = 0;
state.vfPotential = 2;
startTackleWindow();
advance(30000);
element('btn-tackle').click();
element('tackle-team-buttons').children[1].click();
advance(15500);
assert.equal(state.teams[1].score, -3);
assert.equal(state.cardEnded, true);

// Manche suivante : jamais le même défi deux fois de suite (sauf s'il n'y en a qu'un).
{
  const all = ['transfert','plusoumoins','vraifaux','quisuisje','lematch'];
  let prev = null;
  for (let i = 0; i < 500; i++) { const next = pickNextMinigame(all, prev); assert.notEqual(next, prev); assert.ok(all.includes(next)); prev = next; }
  const seen = new Set(); for (let i = 0; i < 500; i++) seen.add(pickNextMinigame(all, 'transfert'));
  assert.equal(seen.size, 4);
  assert.equal(pickNextMinigame(['vraifaux'], 'vraifaux'), 'vraifaux');
  assert.notEqual(pickNextMinigame(['vraifaux','lematch'], 'vraifaux'), 'vraifaux');
}

// Tirage sans répétition : toutes les cartes sortent avant qu'une revienne, et jamais juste après.
{
  const items = Array.from({ length: 30 }, (_, i) => ({ id: 'c' + i, answer: 'Joueur ' + (i % 25) }));
  const id = c => c.id;
  const first = []; for (let i = 0; i < 30; i++) first.push(drawFromDeck('test-deck', items, id).id);
  assert.equal(new Set(first).size, 30);
  for (let round = 0; round < 20; round++) {
    const last = first.slice(-10);
    const next = drawFromDeck('test-deck', items, id).id;
    assert.ok(!last.includes(next), 'carte revenue trop vite : ' + next);
    first.push(next);
  }
  // Un joueur sorti récemment (même dans un autre défi) est évité tant qu'il reste d'autres cartes.
  const a = [{ id: 'x1', answer: 'Mohamed Salah' }, { id: 'x2', answer: 'Kaka' }];
  drawFromDeck('test-a', [{ id: 'y1', answer: 'Mohamed Salah' }], id, c => c.answer);
  assert.equal(drawFromDeck('test-b', a, id, c => c.answer).id, 'x2');
}

// Questions en portugais : mêmes cartes, mêmes ids et même ordre que le français (tools/translate_pt.py).
for (const [file, key] of [['transfert-cards.json', 'cards'], ['quisuisje-cards.json', 'cards'], ['lematch-cards.json', 'cards'], ['vraifaux-statements.json', 'statements']]) {
  const fr = JSON.parse(fs.readFileSync('src/data/' + file, 'utf8'))[key];
  const pt = JSON.parse(fs.readFileSync('src/data/pt/' + file, 'utf8'))[key];
  assert.deepEqual(pt.map(x => x.id), fr.map(x => x.id), file);
}

// Chaque match doit pouvoir révéler les cinq indices, sans deux cartes identiques au dernier indice.
{
  const cards = JSON.parse(fs.readFileSync('src/data/lematch-cards.json', 'utf8')).cards;
  const ptCards = JSON.parse(fs.readFileSync('src/data/pt/lematch-cards.json', 'utf8')).cards;
  const citiesPt = JSON.parse(fs.readFileSync('tools/i18n/pt_names.json', 'utf8')).cities;
  assert.equal(cards.length, 103);
  assert.equal(ptCards.length, cards.length);
  const signatures = new Set();
  for (const [index, card] of cards.entries()) {
    assert.ok(card.competition && Number.isInteger(card.year) && card.city && card.city_source_url, card.id);
    assert.equal(card.score.length, 2, card.id);
    assert.ok(['Final', 'Semi-final'].includes(card.round), card.id);
    const signature = JSON.stringify([card.competition, card.year, card.score, card.city, card.round]);
    assert.equal(signatures.has(signature), false, `Indices identiques : ${card.id}`);
    signatures.add(signature);
    assert.equal(ptCards[index].id, card.id);
    assert.equal(ptCards[index].city, citiesPt[card.city].pt, card.id);
    assert.equal(ptCards[index].city_source_url, card.city_source_url, card.id);
  }
}

// La version du jeu et version.json doivent correspondre (tools/bump-version.sh).
const pageVersion = fs.readFileSync('index.html', 'utf8').match(/var APP_VERSION = "([^"]+)"/)[1];
assert.equal(JSON.parse(fs.readFileSync('version.json', 'utf8')).version, pageVersion);

console.log('Tackle timing and scoring scenarios passed');
