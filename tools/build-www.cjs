// Prépare le dossier www/ embarqué dans l'appli iPhone (Capacitor).
// Copie uniquement ce que le jeu utilise, puis vérifie que chaque fichier référencé existe.
// Lancer : npm run build (fait automatiquement par npm run ios).
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const out = path.join(root, 'www');

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function copy(rel, filter) {
  const src = path.join(root, rel);
  if (!fs.existsSync(src)) throw new Error('Introuvable : ' + rel);
  const dst = path.join(out, rel);
  fs.cpSync(src, dst, { recursive: true, filter: s => !filter || fs.statSync(s).isDirectory() || filter(s) });
}

['index.html', 'version.json', 'manifest.webmanifest'].forEach(f => copy(f));
copy('src/data');
copy('assets/fonts');
copy('assets/icons');
copy('assets/ui/web');
// Packs graphiques : seulement les SVG (les fonds sont servis en WebP depuis assets/ui/web).
['mercato', 'vrai-ou-faux', 'qui-suis-je', 'le-match'].forEach(d => copy('assets/ui/' + d, s => s.endsWith('.svg')));
// Pictos des défis et sifflets.
fs.readdirSync(path.join(root, 'assets/ui'))
  .filter(f => (f.endsWith('.svg') || f.endsWith('.wav')) && !f.includes('candidate'))
  .forEach(f => copy('assets/ui/' + f));

// Écrans de démarrage du site sur l'écran d'accueil iPhone : inutiles dans l'appli (elle a son propre écran de lancement).
{
  const f = path.join(out, 'index.html');
  fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/<!-- startup-images:start -->[\s\S]*?<!-- startup-images:end -->\n?/, ''));
}

// Vérification : tout chemin « assets/… » ou « src/… » cité dans index.html doit exister.
const html = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
const refs = new Set((html.match(/(?:assets|src)\/[A-Za-z0-9_./-]+\.(?:webp|png|jpg|svg|wav|woff2|json)/g) || []));
const missing = [...refs].filter(r => !fs.existsSync(path.join(out, r)));
// Logos d'équipes teintés : construits dans le code (« team-<animal>-<couleur>.webp »).
const teamLogos = fs.readdirSync(path.join(out, 'assets/ui/web')).filter(f => f.startsWith('team-')).length;
if (missing.length) { console.error('Fichiers manquants dans www/ :\n  ' + missing.join('\n  ')); process.exit(1); }
if (teamLogos < 16) { console.error('Logos d\'équipes manquants (' + teamLogos + ')'); process.exit(1); }

let size = 0;
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); const st = fs.statSync(p); st.isDirectory() ? walk(p) : (size += st.size); } })(out);
console.log('www/ prêt : ' + refs.size + ' fichiers référencés vérifiés, ' + (size / 1e6).toFixed(1) + ' Mo.');
