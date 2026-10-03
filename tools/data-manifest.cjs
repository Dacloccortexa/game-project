// Empreinte de chaque fichier de questions (src/data/manifest.json).
// L'appli iPhone télécharge d'abord ce petit fichier, puis seulement les fichiers qui ont changé
// (au lieu de tout retélécharger à chaque lancement). Lancé par tools/bump-version.sh.
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.join(__dirname, "..");
const dir = path.join(root, "src/data");
const files = {};
(function walk(d) {
  fs.readdirSync(d).sort().forEach(function (f) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) return walk(p);
    if (!f.endsWith(".json") || f === "manifest.json") return;
    files[path.relative(root, p).split(path.sep).join("/")] = crypto.createHash("sha1").update(fs.readFileSync(p)).digest("hex").slice(0, 12);
  });
})(dir);
const out = JSON.stringify({ files: files }, null, 1) + "\n";
const target = path.join(dir, "manifest.json");
if (process.argv.includes("--check")) {
  const cur = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
  if (cur !== out) { console.error("src/data/manifest.json n'est pas à jour : lancer node tools/data-manifest.cjs"); process.exit(1); }
} else {
  fs.writeFileSync(target, out);
  console.log("manifest : " + Object.keys(files).length + " fichiers");
}
