#!/usr/bin/env python3
"""Remplace les 6 PNG d'écran de lancement générés par @capacitor/assets (≈36 Mo)
par un seul JPEG universel (même image en clair et en sombre). Lancé par `npm run icons`."""
import json, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SET = os.path.join(ROOT, "ios/App/App/Assets.xcassets/Splash.imageset")
Image.open(os.path.join(ROOT, "app-resources/splash.png")).convert("RGB").save(
    os.path.join(SET, "splash.jpg"), "JPEG", quality=84, optimize=True, progressive=False)
for f in os.listdir(SET):
    if f.endswith(".png"):
        os.remove(os.path.join(SET, f))
with open(os.path.join(SET, "Contents.json"), "w") as fh:
    json.dump({"images": [{"idiom": "universal", "filename": "splash.jpg"}],
               "info": {"author": "xcode", "version": 1}}, fh, indent=2)
    fh.write("\n")
print("Splash.imageset : splash.jpg", os.path.getsize(os.path.join(SET, "splash.jpg")) // 1024, "Ko")
