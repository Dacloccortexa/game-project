// Pub TikTok « fail » : vraie partie TACKLE filmée image par image (30 i/s, 1080×1920),
// sous-titres et effets ajoutés par-dessus. Voir tools/tiktok/README.md.
// Usage (serveur local lancé à la racine : python3 -m http.server 8766) :
//   node tools/tiktok/director.cjs tools/tiktok/scripts/drogba.json /tmp/out-drogba
//   python3 tools/tiktok/render.py /tmp/out-drogba tackle-tiktok-drogba
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const T = __dirname, ROOT = require('path').resolve(__dirname, '../..');
const TWEMOJI = require('path').dirname(require.resolve('@twemoji/svg/package.json'));
const FPS = 30, DT = 1000 / FPS;
const script = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const OUT = process.argv[3]; fs.mkdirSync(OUT + '/frames', { recursive: true });
for (const f of fs.readdirSync(OUT + '/frames')) fs.unlinkSync(OUT + '/frames/' + f);
const STILLS = process.env.STILLS === '1';
// Emojis en images Twemoji (le Chromium sans écran n'affiche pas les emojis couleur).
function emo(html) {
  return html.replace(/\p{Extended_Pictographic}(?:\ufe0f|\u200d\p{Extended_Pictographic}|\u200d[\u2640\u2642]\ufe0f?)*/gu, m => {
    let cps = [...m].map(c => c.codePointAt(0).toString(16));
    let f = cps.join('-');
    if (!fs.existsSync(`${TWEMOJI}/${f}.svg`)) f = cps.filter(c => c !== 'fe0f').join('-');
    if (!fs.existsSync(`${TWEMOJI}/${f}.svg`)) { console.log('emoji manquant', m, f); return ''; }
    return `<img class="emo" src="/__tw/${f}.svg">`;
  });
}

const OVERLAY_CSS = `
#ad { position: fixed; inset: 0; z-index: 99999; pointer-events: none; font-family: "Oswald", sans-serif; }
#ad .cap { position: absolute; left: 50%; top: 92px; transform: translateX(-50%); width: 340px; text-align: center;
  font-weight: 700; font-size: 25px; line-height: 1.12; color: #fff; text-transform: uppercase; letter-spacing: .01em;
  padding: 10px 14px 12px; border-radius: 14px; background: rgba(0,0,0,.82); box-shadow: 0 6px 24px rgba(0,0,0,.5);
  font-family: "Oswald", sans-serif; }
#ad .cap b { color: #f5c542; }
#ad .cap i { font-style: normal; color: #ff6b5a; }
#ad .emo { height: 1.05em; width: auto; vertical-align: -0.17em; margin: 0 .05em; }
#ad .tap { position: absolute; width: 46px; height: 46px; margin: -23px 0 0 -23px; border-radius: 50%;
  background: rgba(255,255,255,.55); border: 3px solid #fff; box-shadow: 0 0 18px rgba(255,255,255,.7); }
#ad .flash { position: absolute; inset: 0; }
#ad .end { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%, rgba(20,40,25,.94), rgba(3,8,5,.98));
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; text-align: center; color: #fff; }
#ad .end .q { font-weight: 700; font-size: 34px; line-height: 1.1; text-transform: uppercase; padding: 0 22px; font-family: "Oswald", sans-serif; }
#ad .end .q b { color: #f5c542; }
#ad .end img { width: 250px; }
#ad .end .tag { font-size: 19px; letter-spacing: .06em; text-transform: uppercase; color: #e9e2cf; }
#ad .end .cta { margin-top: 8px; font-weight: 700; font-size: 21px; color: #111; background: linear-gradient(#ffd96a, #e2a92b);
  padding: 10px 16px; border-radius: 12px; max-width: 290px; line-height: 1.2; }
`;

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 360, height: 640 }, deviceScaleFactor: 3 });
  const cards = JSON.parse(fs.readFileSync(ROOT + '/src/data/transfert-cards.json', 'utf8'));
  const card = cards.cards.find(c => c.id === script.card);
  await ctx.route('**/src/data/transfert-cards.json', r => r.fulfill({ contentType: 'application/json', body: JSON.stringify({ ...cards, cards: [card] }) }));
  await ctx.route('**/__tw/**', r => r.fulfill({ contentType: 'image/svg+xml', body: fs.readFileSync(TWEMOJI + '/' + path.basename(new URL(r.request().url()).pathname)) }));
  const p = await ctx.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
  const T0 = new Date('2026-10-06T18:00:00+04:00').getTime();
  await p.clock.install({ time: T0 }); await p.clock.pauseAt(T0 + 500); // horloge figée : seul runFor la fait avancer
  await p.goto((process.env.TACKLE_URL || 'http://localhost:8766') + '/index.html'); await p.clock.runFor(2500);
  await p.click('#btn-home-play'); await p.click('#team-count-group [data-value="2"]'); await p.click('#rounds-group [data-value="5"]');
  await p.click('#btn-open-challenges');
  for (const g of ['plusoumoins', 'vraifaux', 'quisuisje', 'lematch']) {
    const el = await p.$(`#challenge-list [data-game="${g}"]`);
    if ((await el.getAttribute('aria-pressed')) === 'true' || (await el.getAttribute('aria-checked')) === 'true') await el.click();
  }
  await p.click('#btn-validate-challenges'); await p.click('#btn-continue');
  await p.addStyleTag({ content: OVERLAY_CSS });
  await p.evaluate(() => { const d = document.createElement('div'); d.id = 'ad'; document.body.appendChild(d); });
  for (let i = 0; i < 4; i++) { if (await p.isVisible('#screen-play')) break; await p.click('#btn-start'); await p.clock.runFor(300); }

  // --- horloge vidéo ---
  let t = 0, frame = 0;
  const events = []; // sons à poser au montage
  let caption = null, tap = null, flash = null, end = null;
  async function drawOverlay() {
    await p.evaluate(({ caption, tap, flash, end, t }) => {
      const ad = document.getElementById('ad'); let h = '';
      if (caption) {
        const k = Math.min(1, (t - caption.at) / 160); const s = 0.6 + 0.4 * (1 - Math.pow(1 - k, 3)) + (k >= 1 ? 0 : 0.08 * Math.sin(k * Math.PI));
        h += `<div class="cap" style="transform:translateX(-50%) scale(${s.toFixed(3)});opacity:${Math.min(1, k * 2)}">${caption.html}</div>`;
      }
      if (tap && t - tap.at < 380) {
        const k = (t - tap.at) / 380;
        h += `<div class="tap" style="left:${tap.x}px;top:${tap.y}px;transform:scale(${(0.7 + k * 0.6).toFixed(2)});opacity:${(1 - k).toFixed(2)}"></div>`;
      }
      if (flash && t - flash.at < flash.dur) {
        const k = (t - flash.at) / flash.dur;
        h += `<div class="flash" style="background:${flash.color};opacity:${(flash.max * (1 - k)).toFixed(2)}"></div>`;
      }
      if (end) {
        const k = Math.min(1, (t - end.at) / 300);
        h += `<div class="end" style="opacity:${k}"><div class="q">${end.q}</div><img src="assets/ui/web/tackle-logo-brush.webp" style="transform:scale(${(0.85 + 0.15 * k).toFixed(2)})"><div class="tag">${end.tag}</div><div class="cta">${end.cta}</div></div>`;
      }
      ad.innerHTML = h;
    }, { caption, tap, flash, end, t });
  }
  async function step(n = 1) {
    for (let i = 0; i < n; i++) {
      await p.clock.runFor(DT);
      await p.evaluate(dt => document.getAnimations().forEach(a => { try { if (a.playState !== 'finished') { a.pause(); a.currentTime = (a.currentTime || 0) + dt; } } catch (e) {} }), DT);
      await drawOverlay();
      if (!STILLS || frame % 15 === 0) await p.screenshot({ path: `${OUT}/frames/${String(frame).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 90 });
      frame++; t += DT;
    }
  }
  const sec = s => Math.round(s * FPS);
  async function tapEl(sel) {
    const box = await p.locator(sel).first().boundingBox();
    if (!box) throw new Error('Élément introuvable à t=' + (t | 0) + ' ms : ' + sel);
    tap = { x: box.x + box.width / 2, y: box.y + box.height / 2, at: t };
    events.push({ t, sound: 'tap' });
    await step(4); await p.click(sel); await step(2);
  }
  async function typeIn(sel, text) {
    await p.click(sel);
    for (const ch of text) { await p.type(sel, ch); await step(2); }
  }
  async function visibleOf(sels) { for (const s of sels) if (await p.isVisible(s)) return s; return null; }

  for (const a of script.steps) {
    const waitSel = a.waitFor || (a.do === 'answer' ? '#btn-answer' : a.do === 'pass' ? '#btn-pass' : null);
    if (waitSel) for (let k = 0; k < 150 && !(await p.isVisible(waitSel)); k++) await step(1);
    if (a.caption !== undefined) caption = a.caption ? { html: emo(a.caption), at: t } : null;
    if (a.sound) events.push({ t, sound: a.sound });
    if (a.flash) flash = { color: a.flash, max: a.flashMax || 0.5, dur: 450, at: t };
    switch (a.do) {
      case 'hold': await step(sec(a.s)); break;
      case 'answer': {
        for (let k = 0; k < 150 && !(await p.isVisible('#btn-answer')); k++) await step(1);
        await tapEl('#btn-answer'); await step(sec(0.25));
        await typeIn('#answer-input', a.text); await step(sec(0.2));
        await tapEl('#btn-submit-answer'); await step(sec(0.35));
        await tapEl('#btn-confirm-answer');
        break;
      }
      case 'pass': {
        for (let k = 0; k < 150 && !(await p.isVisible('#btn-pass')); k++) await step(1);
        await tapEl('#btn-pass'); break;
      }
      case 'skipTo': { // coupe : le temps passe sans être filmé
        await p.clock.runFor(a.ms);
        await p.evaluate(ms => document.getAnimations().forEach(x => { try { x.pause(); x.currentTime = (x.currentTime || 0) + ms; } catch (e) {} }), a.ms);
        break;
      }
      case 'tackle': {
        await tapEl('#btn-tackle'); await step(sec(0.35));
        const idx = await p.evaluate(name => [...document.querySelectorAll('#tackle-team-buttons button')].findIndex(b => b.textContent.includes(name)), a.team);
        await tapEl(`#tackle-team-buttons button >> nth=${idx}`); await step(sec(0.3));
        const input = await visibleOf(['#tackle-answer-input']);
        await typeIn(input, a.text); await step(sec(0.2));
        await tapEl('#btn-tackle-submit'); await step(sec(0.2));
        const conf = await visibleOf(['#btn-tackle-confirm', '#btn-confirm-tackle']);
        if (conf) await tapEl(conf);
        break;
      }
      case 'end': end = { q: emo(a.q), tag: a.tag, cta: a.cta, at: t }; caption = null; await step(sec(a.s)); break;
      case 'debug': console.log('debug', t | 0, await p.evaluate(() => [...document.querySelectorAll('button')].filter(e => e.offsetParent).map(e => e.id || e.textContent.trim()).join(' | '))); break;
    }
  }
  fs.writeFileSync(OUT + '/events.json', JSON.stringify({ fps: FPS, frames: frame, events }, null, 1));
  console.log('frames', frame, 'duration', (frame / FPS).toFixed(1) + 's');
  await b.close();
})();
