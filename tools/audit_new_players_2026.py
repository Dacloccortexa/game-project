#!/usr/bin/env python3
"""Check the 8 October 2026 player batch against its sourced fact snapshot."""
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "src" / "data"
load = lambda name: json.loads((ROOT / name).read_text(encoding="utf-8"))
players = load("players-2026-10-08.json")["players"]
transfert = load("transfert-cards.json")["cards"]
quisuisje = load("quisuisje-cards.json")["cards"]
statements = load("vraifaux-statements.json")["statements"]
pt_transfert = load("pt/transfert-cards.json")["cards"]
pt_quisuisje = load("pt/quisuisje-cards.json")["cards"]
pt_statements = load("pt/vraifaux-statements.json")["statements"]

by_name = {p["answer"]: p for p in players}
assert len(players) == len(by_name) == 100
assert all(p["birth_year"] and p["birth_place"] and p["height_cm"] and p["position"] and p["national_team"] for p in players)
assert all(p["revision"] and f"oldid={p['revision']}" in p["source"] for p in players)
assert all(p["title_evidence"] and "runner-up" not in p["title_evidence"].split(":", 1)[0].lower() for p in players)
assert all(p["birth_year"] == p["wikidata_crosscheck"]["birth_year"] for p in players)
assert all(p["wikidata_crosscheck"]["qid"].startswith("Q") for p in players)

t = {c["id"]: c for c in transfert if int(c["id"][1:]) >= 113}
q = {c["id"]: c for c in quisuisje if int(c["id"][2:]) >= 101}
v = [s for s in statements if int(s["id"].rsplit("-", 1)[1]) >= 1001]
assert len(t) == len(q) == 100
assert len(v) == 598
assert Counter(s["est_vraie"] for s in v) == {True: 299, False: 299}
assert {c["answer"] for c in t.values()} == set(by_name)
assert {c["answer"] for c in q.values()} == set(by_name)
assert not set(by_name) & {c["answer"] for c in transfert if c["id"] not in t}
assert not set(by_name) & {c["answer"] for c in quisuisje if c["id"] not in q}
assert len({s["id"] for s in statements}) == len(statements)
assert len(pt_transfert) == len(transfert) and len(pt_quisuisje) == len(quisuisje) and len(pt_statements) == len(statements)

SOURCE_CLUB_NAMES = {
    "Tottenham": "Tottenham Hotspur", "Hambourg SV": "Hamburger SV",
    "LAFC": "Los Angeles FC", "FC Barcelone": "Barcelona",
    "Vitesse": "Vitesse Arnhem", "Al-Ittifaq": "Al-Ettifaq",
    "Al-Hilal": "Al Hilal", "Wolverhampton": "Wolverhampton Wanderers",
    "PSG": "Paris Saint-Germain", "AS Rome": "Roma",
    "Brighton": "Brighton & Hove Albion", "PSV Eindhoven": "PSV",
    "Nuremberg": "1. FC Nürnberg", "Bâle": "FC Basel",
    "Club Bruges": "Club Brugge", "Vancouver Whitecaps": "Vancouver Whitecaps FC",
}

def source_spells(player, club):
    name = club.removesuffix(" (prêt)")
    alias = SOURCE_CLUB_NAMES.get(name, name)
    return [spell for spell in player["source_career"] if spell["club"] in {name, alias}]

def played_spells(player, club):
    return [spell for spell in source_spells(player, club)
            if spell["league_appearances"] is not None and spell["league_appearances"] > 0]

def period(years):
    digits = [int(y) for y in re.findall(r"(?:19|20)\d{2}", years)]
    assert digits and len(digits) <= 2
    return digits[0], digits[-1] if len(digits) == 2 else (None if "présent" in years else digits[0])

for card in t.values():
    p = by_name[card["answer"]]
    assert 2 <= len(card["career"]) <= 5
    assert card["verification_status"] == "vérifié" and p["source"] in card["sources"]
    assert card["career"] == p["career"]
    assert len({x["club"] + x["years"] for x in card["career"]}) == len(card["career"])
    previous_end = 0
    for stop in card["career"]:
        spells = played_spells(p, stop["club"])
        assert spells, (p["answer"], stop)
        start, end = period(stop["years"])
        assert start >= previous_end, (p["answer"], stop)
        earliest = min(spell["start"] for spell in spells)
        latest = None if any(spell["end"] is None for spell in spells) else max(spell["end"] for spell in spells)
        assert start >= earliest and (latest is None or (end is not None and end <= latest)), (p["answer"], stop)
        previous_end = end or 2026

for card in q.values():
    p = by_name[card["answer"]]
    assert card["transfert_card_id"] in t and t[card["transfert_card_id"]]["answer"] == card["answer"]
    assert [x["points"] for x in card["clues"]] == [5, 4, 3, 2, 1]
    assert {x["kind"] for x in card["clues"]} == {"club", "trophy", "position", "teammate", "nationality"}
    for clue in card["clues"]:
        fact = clue["fact"]
        assert clue["source"] == p["source"]
        if clue["kind"] == "club":
            assert any(c["club"].removesuffix(" (prêt)") == fact["club"] for c in p["career"])
            assert played_spells(p, fact["club"])
        elif clue["kind"] == "trophy":
            assert fact["trophy"] == p["title"] and fact["evidence"] == p["title_evidence"]
        elif clue["kind"] == "position":
            assert fact["position"] == p["position"]
        elif clue["kind"] == "nationality":
            assert fact["national_team"] == p["national_team"]
        else:
            assert fact["name"] == p["teammate"]["name"]
            assert fact["shared_club"] == p["teammate"]["shared_club"]
            assert fact["teammate_source"] == by_name[fact["name"]]["source"]
            assert fact["club_only"] is True and clue["text"].endswith("en club.")
            assert p["teammate"]["overlap_years"] >= 1
            assert played_spells(p, fact["shared_club"])
            assert played_spells(by_name[fact["name"]], fact["shared_club"])

pairs = {}
for s in v:
    assert s["verification_status"] == "vérifié"
    assert all(name in by_name for name in s["joueurs"])
    assert all(by_name[name]["source"] in s["sources"] for name in s["joueurs"])
    pair = pairs.setdefault(s["groupe_exclusif"], [])
    pair.append(s)
    cat, values = s["categorie"], s["valeur_source"]
    if cat == "ordre_clubs":
        a, b = s["valeur_affirmee"]
        first_spells = played_spells(by_name[s["joueurs"][0]], a)
        second_spells = played_spells(by_name[s["joueurs"][0]], b)
        assert first_spells and second_spells
        if s["est_vraie"] and any(z["end"] is not None and z["end"] <= x["start"]
                                      for z in second_spells for x in first_spells):
            assert s.get("first_spell_order") and "premier passage" in s["affirmation"]
        expected = values[a][0] < values[b][0]
        assert values[a][1] <= values[b][0] if expected else values[b][1] <= values[a][0]
    elif cat == "comparaison_age":
        a, b = s["joueurs"]
        assert values[a] == by_name[a]["birth_year"] and values[b] == by_name[b]["birth_year"]
        expected = (values[a] < values[b]) if s["valeur_affirmee"] == "plus âgé" else (values[a] > values[b])
    elif cat == "comparaison_taille":
        a, b = s["joueurs"]
        assert values[a] == by_name[a]["height_cm"] and values[b] == by_name[b]["height_cm"]
        expected = (values[a] > values[b]) if s["valeur_affirmee"] == "plus grand" else (values[a] < values[b])
        wd_a = by_name[a]["wikidata_crosscheck"]["height_cm"]
        wd_b = by_name[b]["wikidata_crosscheck"]["height_cm"]
        assert abs(values[a] - values[b]) >= 5 and abs(wd_a - wd_b) >= 5
        assert (values[a] > values[b]) == (wd_a > wd_b)
    else:
        raise AssertionError(cat)
    assert expected == s["est_vraie"], s["id"]
assert len(pairs) == 299
assert all(len(pair) == 2 and {s["est_vraie"] for s in pair} == {True, False} for pair in pairs.values())
print("OK: 100 fiches, 100 Transfert, 100 Qui suis-je ?, 598 Vrai ou Faux (299 vrais, 299 faux), FR/PT")
