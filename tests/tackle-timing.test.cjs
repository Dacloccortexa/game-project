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
script = script.replace(/\}\)\(\);\s*$/, 'globalThis.testApi = {state, startTackleWindow, pomGuess, vfAnswer, clearTackleTimer, currentTackleStake};})();');
const context = {
  document: { getElementById: element, createElement: tag => element(`created-${tag}-${Math.random()}`), querySelector: element },
  fetch: () => Promise.resolve({ json: () => Promise.resolve({ cards: [], players: [], statements: [] }) }),
  Date: { now: () => now },
  setInterval: (fn, ms) => addTimer(fn, ms, true), clearInterval: id => timers.delete(id),
  setTimeout: (fn, ms) => addTimer(fn, ms, false), clearTimeout: id => timers.delete(id),
  console, Math, Promise,
};
vm.createContext(context);
vm.runInContext(script, context);
const { state, startTackleWindow, pomGuess, vfAnswer, currentTackleStake } = context.testApi;

function reset(game) {
  timers.clear();
  state.cardEnded = false;
  state.currentRoundMinigame = game;
  state.currentTeamIndex = 0;
  state.teams = [{name:'A', score:0},{name:'B', score:0}];
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
state.currentLmCard = {competition:'Coupe du monde', teams:['A','B'], events:['But','Mi-temps']};
state.lmRevealedCount = 1;
startTackleWindow();
assert.equal(currentTackleStake(), 5);
advance(30000);
advance(15000);
assert.equal(state.lmRevealedCount, 2);
assert.equal(currentTackleStake(), 4);
assert.equal(element('btn-tackle').disabled, true);

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
assert.equal(element('tackle-team-buttons').children.length, 1);
element('tackle-team-buttons').children[0].click();
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
element('tackle-team-buttons').children[0].click();
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

reset('plusoumoins');
state.pomIndex = 0;
state.pomPotential = 0;
startTackleWindow();
pomGuess('plus');
assert.equal(element('btn-tackle').disabled, true);
advance(30000);
assert.equal(element('btn-tackle').disabled, false);
advance(15000);
assert.equal(state.pomPotential, 1);
assert.equal(state.cardEnded, false);

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

reset('vraifaux');
state.vfIndex = 0;
state.vfPotential = 2;
startTackleWindow();
vfAnswer(false);
assert.equal(element('btn-tackle').disabled, true);
advance(30000);
assert.equal(element('btn-tackle').disabled, false);
element('btn-tackle').click();
element('tackle-team-buttons').children.at(-1).click();
element('tackle-binary-choice-2').click();
assert.equal(state.teams[1].score, 3);
assert.equal(state.teams[0].score, 0);
assert.equal(state.cardEnded, true);

reset('vraifaux');
state.vfIndex = 0;
state.vfPotential = 2;
startTackleWindow();
vfAnswer(false);
advance(30000);
advance(15000);
assert.equal(state.vfPotential, 3);
assert.equal(state.cardEnded, false);

console.log('Tackle timing and scoring scenarios passed');
