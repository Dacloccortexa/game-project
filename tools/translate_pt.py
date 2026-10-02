#!/usr/bin/env python3
"""Génère les données pt-PT (Portugal) du jeu à partir des fichiers français.

Usage : python3 tools/translate_pt.py [--check-only]

Entrées : src/data/{transfert-cards,quisuisje-cards,lematch-cards,vraifaux-statements}.json
          tools/i18n/pt_names.json (tables de correspondance FR -> pt-PT)
Sorties : src/data/pt/<même nom>.json

Échoue (code 1) en listant les clés manquantes si une valeur n'est pas dans les
tables ou si une phrase française n'a pas le format attendu : aucune carte ne peut
rester silencieusement en français.
"""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
OUT = DATA / "pt"
NAMES = json.loads((ROOT / "tools" / "i18n" / "pt_names.json").read_text(encoding="utf-8"))

FILES = ["transfert-cards", "quisuisje-cards", "lematch-cards", "vraifaux-statements"]

missing = defaultdict(set)   # table -> clés absentes
errors = []                  # phrases non reconnues / autres problèmes bloquants
warnings = []                # anomalies de données non bloquantes

ART = {"m": "o", "f": "a", "mp": "os", "fp": "as"}
EM = {"m": "no", "f": "na", "mp": "nos", "fp": "nas"}
DE = {"m": "do", "f": "da", "mp": "dos", "fp": "das"}


# ---------------------------------------------------------------- lookups
def lookup(table, key, where):
    tab = NAMES.get(table, {})
    if key in tab:
        return tab[key]
    missing[table].add(key)
    errors.append(f"{where}: '{key}' absent de {table}")
    return None


def split_suffix(name):
    for fr, pt in NAMES.get("suffixes", {}).items():
        if name.endswith(" " + fr):
            return name[: -len(fr) - 1], " " + pt
    if re.search(r"\(.*\)$", name):
        missing["suffixes"].add(re.search(r"\(.*\)$", name).group(0))
    return name, ""


def club(name, where):
    """-> (nom pt, genre) ; gère le suffixe '(prêt)'."""
    base, suf = split_suffix(name)
    v = lookup("clubs", base, where)
    if v is None:
        return name, "m"
    return v["pt"] + suf, v["g"]


def team(name, where):
    """Équipe de Le Match : club ou sélection nationale."""
    if name in NAMES["countries"]:
        v = NAMES["countries"][name]
        return v["pt"], v["g"]
    if name in NAMES["clubs"]:
        v = NAMES["clubs"][name]
        return v["pt"], v["g"]
    missing["clubs|countries"].add(name)
    errors.append(f"{where}: équipe '{name}' absente de clubs et countries")
    return name, "m"


def player(name, where):
    if name in NAMES.get("players", {}):
        return NAMES["players"][name]
    if "(" in name:  # désambiguïsation en français à traduire
        missing["players"].add(name)
        errors.append(f"{where}: joueur '{name}' contient une précision à traduire")
    return name


def em(name, g):
    return f"{EM[g]} {name}" if g else f"em {name}"


def de(name, g):
    return f"{DE[g]} {name}" if g else f"de {name}"


# ---------------------------------------------------------------- transfert
def do_transfert(d):
    for card in d["cards"]:
        for step in card["career"]:
            step["club"], _ = club(step["club"], card["id"])
    return d


# ---------------------------------------------------------------- qui suis-je
def do_quisuisje(d):
    for card in d["cards"]:
        for c in card["clues"]:
            f, k, w = c["fact"], c["kind"], f"{card['id']}/{c['kind']}"
            if k == "club":
                n, g = club(f["club"], w)
                c["text"] = f"Joguei {em(n, g)}."
            elif k == "trophy":
                v = lookup("trophies", f["trophy"], w)
                c["text"] = f"Ganhei {ART[v['g']]} {v['pt']}." if v else ""
            elif k == "position":
                v = lookup("positions", f["position"], w)
                c["text"] = f"Sou {v}." if v else ""
            elif k == "teammate":
                club(f["shared_club"], w)  # contrôle de couverture uniquement
                c["text"] = f"Joguei com {f['name']}."
            elif k == "nationality":
                v = lookup("nationalities", f["national_team"], w)
                lookup("countries", f["national_team"], w)
                c["text"] = f"Sou {v}." if v else ""
            else:
                errors.append(f"{w}: kind inconnu '{k}'")
    return d


# ---------------------------------------------------------------- le match
MIN = r"à la (\d+)(?:e|re) minute(?: \(\+(\d+)\))?"
SCORE = r"(\d+)-(\d+)"
RX = [
    ("goal", re.compile(rf"^But(?: par (?P<who>.+?))? {MIN}\. Le score passe à {SCORE}\.$")),
    ("pen", re.compile(rf"^Penalty transformé(?: par (?P<who>.+?))? {MIN}\. Le score passe à {SCORE}\.$")),
    ("own", re.compile(rf"^But contre son camp(?: (?:de|par) (?P<who>.+?))? {MIN}\. Le score passe à {SCORE}\.$")),
    ("yellow", re.compile(rf"^(?:Carton jaune|Avertissement)(?: : (?P<who>.+?))? {MIN}\.$")),
    ("red", re.compile(rf"^Expulsion(?: : (?P<who>.+?))? {MIN}\.$")),
    ("sub", re.compile(rf"^(?:Remplacement|Entrée en jeu : (?P<who>.+?)) {MIN}\.$")),
    ("half", re.compile(rf"^À la mi-temps, le score est de {SCORE}\.$")),
    ("full", re.compile(rf"^Au coup de sifflet final, le score est de {SCORE}\.$")),
    ("et", re.compile(rf"^À la fin du temps réglementaire, {SCORE} : la prolongation commence\.$")),
    ("so", re.compile(rf"^La séance de tirs au but se termine {SCORE}\.$")),
]
KIND_OF = {"goal": "goal", "pen": "goal", "own": "goal", "yellow": "yellow_card", "red": "red_card",
           "sub": "substitution", "half": "halftime", "full": "fulltime", "et": "extra_time", "so": "shootout"}


def at_minute(m, plus):
    if plus:
        return f"aos {m}+{plus} minutos"
    return "ao 1.º minuto" if m == "1" else f"aos {m} minutos"


CAPS = re.compile(r"\b[A-ZÀ-ÝŁŠŽ]{2,}\b")


def match_player(name, where):
    """Noms openfootball en MAJUSCULES -> casse naturelle via la table match_players."""
    tab = NAMES.get("match_players", {})
    if name in tab:
        return tab[name]
    if CAPS.search(name):
        missing["match_players"].add(name)
        errors.append(f"{where}: nom en majuscules '{name}' absent de match_players")
    return name


def do_event(card, ev):
    w = f"{card['id']}#{ev['order']}"
    for tag, rx in RX:
        m = rx.match(ev["text"])
        if m:
            break
    else:
        errors.append(f"{w}: texte non reconnu « {ev['text']} »")
        return
    if KIND_OF[tag] != ev["kind"]:
        errors.append(f"{w}: kind '{ev['kind']}' incohérent avec le texte « {ev['text']} »")
    gd = m.groupdict()
    who = (gd.get("who") or "").strip() or None
    if who is not None and len(who) <= 1:
        warnings.append(f"{w}: nom de joueur invalide « {who} » dans « {ev['text']} » -> traité comme anonyme")
        who = None
    if who:
        who = match_player(who, w)
    # groupes positionnels (hors 'who') : minute, plus, [score1, score2] ou score1, score2
    pos = [g for i, g in enumerate(m.groups(), 1) if i not in m.re.groupindex.values()]
    nums = pos
    if tag in ("goal", "pen", "own", "yellow", "red", "sub"):
        minute, plus = pos[0], pos[1]
        mm = minute + (f"+{plus}" if plus else "")
        if mm != ev["minute"]:
            warnings.append(f"{w}: minute du texte ({mm}) != champ minute ({ev['minute']})")
        when = at_minute(minute, plus)
        if tag in ("goal", "pen", "own"):
            s = f"{pos[2]}-{pos[3]}"
            label = {"goal": "Golo", "pen": "Golo de penálti", "own": "Autogolo"}[tag]
            by = f" de {who}" if who else ""
            ev["text"] = f"{label}{by} {when}. O marcador passa a {s}."
            ev["short"] = f"{label}{by} · {s}"
        elif tag == "yellow":
            ev["text"] = f"Cartão amarelo para {who} {when}." if who else f"Cartão amarelo {when}."
            ev["short"] = f"Cartão amarelo: {who}" if who else "Cartão amarelo"
        elif tag == "red":
            ev["text"] = f"Expulsão de {who} {when}." if who else f"Expulsão {when}."
            ev["short"] = f"Expulsão: {who}" if who else "Expulsão"
        elif tag == "sub":
            ev["text"] = f"Entra {who} {when}." if who else f"Substituição {when}."
            ev["short"] = f"Entra {who}" if who else "Substituição"
    else:
        s = f"{nums[0]}-{nums[1]}"
        if tag == "half":
            ev["text"], ev["short"] = f"Ao intervalo, o marcador é {s}.", f"Intervalo · {s}"
        elif tag == "full":
            ev["text"], ev["short"] = f"Apito final: {s}.", f"Fim do jogo · {s}"
        elif tag == "et":
            ev["text"], ev["short"] = (f"No fim do tempo regulamentar, {s}: segue-se o prolongamento.",
                                       f"Prolongamento · {s}")
        elif tag == "so":
            ev["text"], ev["short"] = (f"O desempate por penáltis termina {s}.",
                                       f"Desempate por penáltis · {s}")


def do_lematch(d):
    for card in d["cards"]:
        v = lookup("competitions", card["competition"], card["id"])
        if v:
            card["competition"] = v
        r = lookup("rounds", card["round"], card["id"])
        if r:
            card["round"] = r
        fr_teams = list(card["teams"])
        card["teams"] = [team(t, card["id"])[0] for t in fr_teams]
        aliases = card.get("team_aliases") or [[] for _ in fr_teams]
        new = []
        for fr, pt, al in zip(fr_teams, card["teams"], aliases):
            al = list(al)
            for extra in (fr, fr.replace("’", "'")):
                if extra != pt and extra not in al:
                    al.append(extra)
            new.append(al)
        card["team_aliases"] = new
        for ev in card["events"]:
            do_event(card, ev)
    return d


# ---------------------------------------------------------------- vrai ou faux
def do_vraifaux(d):
    for s in d["statements"]:
        cat, w = s["categorie"], s["id"]
        corr = None
        fr_players = s["joueurs"]
        P = [player(p, w) for p in fr_players]
        s["joueurs"] = P
        va, vs = s["valeur_affirmee"], s["valeur_source"]
        if cat == "annee_naissance":
            s["affirmation"] = f"{P[0]} nasceu em {va}."
            corr = f"Na verdade, {P[0]} nasceu em {vs}."
        elif cat == "taille":
            s["affirmation"] = f"{P[0]} mede {va} cm."
            corr = f"Na verdade, {P[0]} mede {vs} cm."
        elif cat == "debut_professionnel":
            s["affirmation"] = f"A carreira profissional de {P[0]} começou em {va}."
            corr = f"Na verdade, a carreira profissional de {P[0]} começou em {vs}."
        elif cat == "ville_naissance":
            a = lookup("cities", va, w)
            b = lookup("cities", vs, w)
            if a and b:
                s["valeur_affirmee"], s["valeur_source"] = a["pt"], b["pt"]
                s["affirmation"] = f"{P[0]} nasceu {em(a['pt'], a.get('g'))}."
                corr = f"Na verdade, {P[0]} nasceu {em(b['pt'], b.get('g'))}."
        elif cat == "pied_fort":
            a, b = lookup("feet", va, w), lookup("feet", vs, w)
            if a and b:
                s["valeur_affirmee"], s["valeur_source"] = a, b
                s["affirmation"] = f"O pé preferido de {P[0]} é o {a}."
                corr = f"Na verdade, o pé preferido de {P[0]} é o {b}."
        elif cat == "poste":
            a, b = lookup("positions", va, w), lookup("positions", vs, w)
            if a and b:
                s["valeur_affirmee"], s["valeur_source"] = a, b
                s["affirmation"] = f"{P[0]} é {a}."
                corr = f"Na verdade, {P[0]} é {b}."
        elif cat == "ordre_clubs":
            (c1, g1), (c2, g2) = club(va[0], w), club(va[1], w)
            s["valeur_affirmee"] = [c1, c2]
            s["valeur_source"] = {club(k, w)[0]: v for k, v in vs.items()}
            if len(s["valeur_source"]) != len(vs):
                errors.append(f"{w}: collision de noms de clubs après traduction {list(vs)}")
            s["affirmation"] = f"{P[0]} jogou {em(c1, g1)} antes {de(c2, g2)}."
            # ordre réel : tri par année de début dans valeur_source (clés FR)
            (f1, h1), (f2, h2) = [club(k, w) for k in sorted(vs, key=lambda k: (vs[k][0], vs[k][1]))]
            if len({v[0] for v in vs.values()}) < 2:
                errors.append(f"{w}: années de début identiques, ordre réel indéterminé {vs}")
            corr = f"Na verdade, {P[0]} jogou {em(f1, h1)} antes {de(f2, h2)}."
        elif cat in ("comparaison_age", "comparaison_taille"):
            a = lookup("comparisons", va, w)
            if a:
                s["valeur_affirmee"] = a
                s["affirmation"] = f"{P[0]} é {a} do que {P[1]}."
            s["valeur_source"] = {player(k, w): v for k, v in vs.items()}
            (pa, ya), (pb, yb) = list(s["valeur_source"].items())
            if ya == yb:
                errors.append(f"{w}: valeurs égales, comparaison indéterminée {vs}")
            elif cat == "comparaison_age":  # année de naissance la plus tardive = plus jeune
                young, old = (pa, pb) if ya > yb else (pb, pa)
                corr = f"Na verdade, {young} é mais novo do que {old}."
            else:
                tall, short = (pa, pb) if ya > yb else (pb, pa)
                corr = f"Na verdade, {tall} é mais alto do que {short}."
        else:
            errors.append(f"{w}: catégorie inconnue '{cat}'")
        if s["est_vraie"]:
            s["correction"] = ""
        elif corr:
            s["correction"] = corr
        else:
            errors.append(f"{w}: impossible de construire la correction")
            s["correction"] = ""
    return d


# ---------------------------------------------------------------- main
HANDLERS = {"transfert-cards": do_transfert, "quisuisje-cards": do_quisuisje,
            "lematch-cards": do_lematch, "vraifaux-statements": do_vraifaux}


def main():
    check_only = "--check-only" in sys.argv
    results = {}
    for name in FILES:
        src = json.loads((DATA / f"{name}.json").read_text(encoding="utf-8"))
        out = HANDLERS[name](src)
        results[name] = {"lang": "pt-PT", **{k: v for k, v in out.items() if k != "lang"}}

    for wmsg in warnings:
        print("AVERTISSEMENT:", wmsg, file=sys.stderr)
    if errors or missing:
        print("\nÉCHEC : traduction incomplète.", file=sys.stderr)
        for table, keys in sorted(missing.items()):
            print(f"  Clés manquantes dans '{table}' ({len(keys)}):", file=sys.stderr)
            for k in sorted(keys):
                print(f"    - {k}", file=sys.stderr)
        other = [e for e in errors if "absent de" not in e and "absente de" not in e]
        for e in other:
            print("  -", e, file=sys.stderr)
        sys.exit(1)

    if check_only:
        print("OK (check-only) : aucune clé manquante.")
        return
    OUT.mkdir(parents=True, exist_ok=True)
    for name, data in results.items():
        (OUT / f"{name}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"écrit {OUT.relative_to(ROOT)}/{name}.json")


if __name__ == "__main__":
    main()
