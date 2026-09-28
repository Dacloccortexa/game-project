"""Génère les emblèmes d'équipe teintés : assets/ui/web/team-<animal>-<couleur>.webp.

Les reflets dorés de chaque animal prennent la couleur de l'équipe et les ombres
vertes foncées deviennent une version sombre de cette couleur ; le crème ne change pas.
Source : les PNG d'origine de assets/ui/. Relancer après une modification :

    python3 tools/tint_team_logos.py
"""
import colorsys
import os

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "ui")
OUT = os.path.join(ROOT, "assets", "ui", "web")
SIZE = 256

ANIMALS = ["lion", "fox", "bull", "eagle"]
# Couleur des reflets par couleur d'équipe (mêmes teintes que TEAM_COLORS dans index.html).
# L'ivoire est assombri en sable pour rester visible sur le crème de l'animal.
ACCENTS = {
    "gold": None,  # couleurs d'origine
    "coral": "#EF5B5B",
    "blue": "#3E95E6",
    "violet": "#8B5CF0",
    "mint": "#5ED3A6",
    "ivory": "#C9BC98",
}


def hex_rgb(value):
    value = value.lstrip("#")
    return np.array([int(value[i:i + 2], 16) for i in (0, 2, 4)], dtype=float) / 255


def dark_version(rgb, lightness=0.17):
    h, _, s = colorsys.rgb_to_hls(*rgb)
    return np.array(colorsys.hls_to_rgb(h, lightness, min(1.0, s * 0.9)))


def tint(img, accent_hex):
    arr = np.asarray(img).astype(float) / 255
    rgb, alpha = arr[..., :3], arr[..., 3:]
    mx, mn = rgb.max(-1), rgb.min(-1)
    delta = np.maximum(mx - mn, 1e-6)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    hue = np.where(mx == r, ((g - b) / delta) % 6, np.where(mx == g, (b - r) / delta + 2, (r - g) / delta + 4)) * 60

    # Reflets dorés : teinte 15–70°, saturés, clairs.
    hue_w = np.clip(1 - np.abs(hue - 42) / 30, 0, 1)
    w_gold = np.clip((sat - 0.22) / 0.25, 0, 1) * hue_w * np.clip((mx - 0.35) / 0.2, 0, 1)
    # Ombres : très sombres (vert foncé du dessin).
    w_dark = np.clip((0.42 - mx) / 0.17, 0, 1) * (1 - w_gold)

    accent = hex_rgb(accent_hex)
    dark = dark_version(accent)
    gold_new = np.clip(accent[None, None, :] * (mx / 0.9)[..., None], 0, 1)
    dark_new = np.clip(dark[None, None, :] * (mx / 0.2)[..., None], 0, 1)

    out = rgb * (1 - w_gold - w_dark)[..., None] + gold_new * w_gold[..., None] + dark_new * w_dark[..., None]
    return Image.fromarray((np.concatenate([np.clip(out, 0, 1), alpha], -1) * 255).round().astype(np.uint8), "RGBA")


def main():
    for animal in ANIMALS:
        base = Image.open(os.path.join(SRC, "team-%s.png" % animal)).convert("RGBA").resize((SIZE, SIZE), Image.LANCZOS)
        for name, accent in ACCENTS.items():
            result = base if accent is None else tint(base, accent)
            path = os.path.join(OUT, "team-%s-%s.webp" % (animal, name))
            result.save(path, "WEBP", quality=82, method=6)
            print(os.path.relpath(path, ROOT), os.path.getsize(path) // 1024, "Ko")


if __name__ == "__main__":
    main()
