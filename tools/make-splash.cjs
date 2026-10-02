// Fabrique app-resources/splash.png (2732×2732) à partir de l'accueil du jeu, sans les boutons :
// l'écran de lancement iPhone a ainsi exactement le fond et le logo de l'accueil.
// À relancer si l'accueil change. Prérequis : `python3 -m http.server 8766` à la racine,
// Playwright (npm i -D playwright) et Python avec Pillow. Ensuite : `npm run icons`.
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const path = require("path");
const S = 2732, W = 430, H = 932, TMP = path.join(__dirname, "..", "app-resources");
async function shot(b, file, hideLogo) {
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: S / H });
  await p.addInitScript(() => localStorage.setItem("tackle-lang", "fr"));
  await p.goto("http://localhost:8766/index.html", { waitUntil: "networkidle" });
  await p.addStyleTag({ content: "#btn-open-settings,.home-tagline,.home-menu,.update-banner,#update-banner{visibility:hidden!important}" +
    (hideLogo ? ".home-logo{visibility:hidden!important}" : "") + "*{animation:none!important;transition:none!important}" });
  await p.waitForTimeout(600);
  await p.screenshot({ path: file });
  await p.close();
}
(async () => {
  const b = await chromium.launch();
  const a = path.join(TMP, ".strip.png"), n = path.join(TMP, ".strip-nologo.png");
  await shot(b, a, false); await shot(b, n, true); await b.close();
  // Bande portrait au centre ; côtés (visibles seulement sur les iPhone plus larges) = fond en miroir, sans logo.
  execFileSync("python3", ["-c", `
from PIL import Image, ImageOps
import os, sys
st=Image.open(sys.argv[1]).convert('RGB'); nl=Image.open(sys.argv[2]).convert('RGB'); W=${S}; x=(W-st.width)//2
o=Image.new('RGB',(W,W)); o.paste(st,(x,0))
o.paste(ImageOps.mirror(nl.crop((0,0,x,W))),(0,0))
o.paste(ImageOps.mirror(nl.crop((nl.width-(W-x-st.width),0,nl.width,W))),(x+st.width,0))
for f in ('splash.png','splash-dark.png'): o.save(os.path.join(sys.argv[3],f), optimize=True)
os.remove(sys.argv[1]); os.remove(sys.argv[2])
`, a, n, TMP], { stdio: "inherit" });
  console.log("app-resources/splash.png prêt. Lancer : npm run icons");
})();
