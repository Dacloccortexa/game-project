// Écrans de démarrage du jeu ajouté à l'écran d'accueil de l'iPhone (Safari → « Sur l'écran d'accueil »).
// iOS demande une image par taille d'écran (balises apple-touch-startup-image dans index.html).
// Chaque image = l'accueil sans ses boutons, à la taille exacte de l'écran, sous la barre d'état noire.
// À relancer si l'accueil change. Prérequis : `python3 -m http.server 8766` à la racine, Playwright, Pillow.
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path");
// [largeur, hauteur (points CSS), échelle, hauteur de la barre d'état]
const DEVICES = [
  [440, 956, 3, 62], [430, 932, 3, 59], [428, 926, 3, 47], [420, 912, 3, 62], [414, 896, 3, 44], [414, 896, 2, 48],
  [414, 736, 3, 20], [402, 874, 3, 62], [393, 852, 3, 59], [390, 844, 3, 47], [375, 812, 3, 44], [375, 667, 2, 20], [320, 568, 2, 20]
];
const OUT = path.join(__dirname, "..", "assets", "startup");
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const tags = [];
  for (const [w, h, dpr, sb] of DEVICES) {
    const p = await b.newPage({ viewport: { width: w, height: h - sb }, deviceScaleFactor: dpr });
    await p.addInitScript(() => localStorage.setItem("tackle-lang", "fr"));
    await p.goto("http://localhost:8766/index.html", { waitUntil: "networkidle" });
    await p.addStyleTag({ content: "#btn-open-settings,.home-tagline,.home-menu,.update-banner,#update-banner{visibility:hidden!important}*{animation:none!important;transition:none!important}" });
    await p.waitForTimeout(500);
    const tmp = path.join(OUT, ".tmp.png");
    await p.screenshot({ path: tmp });
    await p.close();
    const name = `startup-${w * dpr}x${h * dpr}.jpg`;
    execFileSync("python3", ["-c", `
from PIL import Image
import sys
im=Image.open(sys.argv[1]).convert('RGB'); W,H,T=int(sys.argv[3]),int(sys.argv[4]),int(sys.argv[5])
o=Image.new('RGB',(W,H),'black'); o.paste(im,(0,T)); o.save(sys.argv[2],'JPEG',quality=82,optimize=True)
`, tmp, path.join(OUT, name), String(w * dpr), String(h * dpr), String(sb * dpr)]);
    fs.unlinkSync(tmp);
    tags.push(`<link rel="apple-touch-startup-image" media="(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${dpr}) and (orientation: portrait)" href="assets/startup/${name}">`);
  }
  await b.close();
  // Remplace le bloc de balises dans index.html.
  const f = path.join(__dirname, "..", "index.html");
  let html = fs.readFileSync(f, "utf8");
  const block = "<!-- startup-images:start -->\n" + tags.join("\n") + "\n<!-- startup-images:end -->";
  if (html.includes("<!-- startup-images:start -->")) html = html.replace(/<!-- startup-images:start -->[\s\S]*?<!-- startup-images:end -->/, block);
  else html = html.replace(/(<link rel="apple-touch-icon"[^>]*>)/, "$1\n" + block);
  fs.writeFileSync(f, html);
  console.log(DEVICES.length + " images dans assets/startup/, balises mises à jour dans index.html");
})();
