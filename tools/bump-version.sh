#!/bin/sh
# Donne un nouveau numéro de version au jeu (index.html + version.json).
# À lancer avant chaque envoi sur main : les téléphones qui ont gardé l'ancienne
# page verront « Nouvelle version disponible » sur l'écran « Créer une partie ».
set -e
cd "$(dirname "$0")/.."
V=$(TZ=Indian/Mauritius date +%Y.%m.%d-%H%M)
sed -i.bak "s/var APP_VERSION = \"[^\"]*\";/var APP_VERSION = \"$V\";/" index.html && rm -f index.html.bak
printf '{ "version": "%s" }\n' "$V" > version.json
node tools/data-manifest.cjs >/dev/null
echo "Version $V"
