#!/usr/bin/env python3
"""Le Match : ajoute les noms usuels acceptés pour chaque équipe (fr et pt).

Les réponses tapées sont comparées aux noms des équipes et à leurs alias
(team_aliases). Ce script garantit que chaque carte, ancienne ou nouvelle,
accepte les mêmes noms courants : « Allemagne » pour la RFA, « Hollande » pour
les Pays-Bas, « PSG », « Barça », etc. Il n'enlève jamais d'alias.

Usage : python3 tools/lematch_aliases.py   (puis tools/bump-version.sh)
Voir docs/DECISIONS.md (2026-10-06).
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Clé : nom de l'équipe dans le fichier français. Valeur : noms acceptés en plus.
ALIASES = {
    # Pays dont le nom a changé, et noms courants
    "Allemagne de l’Ouest": ["Allemagne", "RFA", "Allemagne de l'Ouest", "West Germany", "Germany", "Alemanha", "Alemanha Ocidental"],
    "Allemagne de l’Est": ["RDA", "Allemagne de l'Est", "East Germany", "Alemanha Oriental"],
    "Allemagne": ["Germany", "Alemanha"],
    "URSS": ["Russie", "Union soviétique", "Russia", "Rússia", "União Soviética"],
    "Tchécoslovaquie": ["Tchéquie", "République tchèque", "Czech Republic", "Chéquia", "Checoslováquia"],
    "Tchéquie": ["République tchèque", "Czech Republic", "Czechia", "Chéquia", "República Checa"],
    "Yougoslavie": ["Serbie", "Serbia", "Sérvia", "Jugoslávia"],
    "Pays-Bas": ["Hollande", "Netherlands", "Holland", "Holanda", "Países Baixos"],
    "Corée du Sud": ["Corée", "South Korea", "Korea", "Coreia", "Coreia do Sul"],
    "Corée du Nord": ["North Korea", "Coreia do Norte"],
    "Angleterre": ["England", "Inglaterra"],
    "Espagne": ["Spain", "Espanha"],
    "Italie": ["Italy", "Itália"],
    "Brésil": ["Brazil", "Brasil"],
    "Argentine": ["Argentina"],
    "Croatie": ["Croatia", "Croácia"],
    "Belgique": ["Belgium", "Bélgica"],
    "Suisse": ["Switzerland", "Suíça"],
    "Maroc": ["Morocco", "Marrocos"],
    "Arabie saoudite": ["Saudi Arabia", "Arábia Saudita"],
    "Irlande": ["Ireland", "Eire", "République d'Irlande", "Irlanda"],
    "Géorgie": ["Georgia", "Geórgia"],
    "Turquie": ["Turkey", "Turquia"],
    "Autriche": ["Austria", "Áustria"],
    "Slovaquie": ["Slovakia", "Eslováquia"],
    # Clubs
    "FC Barcelone": ["Barça", "Barca", "Barcelone", "Barcelona"],
    "Real Madrid": ["Real"],
    "Atlético Madrid": ["Atlético", "Atletico", "Atlético de Madrid", "Atleti"],
    "Paris Saint-Germain": ["PSG", "Paris SG", "Paris"],
    "Olympique de Marseille": ["OM", "Marseille"],
    "AS Monaco": ["Monaco"],
    "Lille": ["LOSC"],
    "Manchester United": ["Man United", "Man Utd", "Manchester Utd"],
    "Manchester City": ["Man City"],
    "Tottenham Hotspur": ["Tottenham", "Spurs"],
    "Queens Park Rangers": ["QPR"],
    "Leicester City": ["Leicester"],
    "Aston Villa": ["Villa"],
    "Crystal Palace": ["Palace"],
    "Bayern Munich": ["Bayern", "Bayern Munique", "Bayern München"],
    "Borussia Dortmund": ["Dortmund", "BVB"],
    "Juventus": ["Juve"],
    "Inter Milan": ["Inter", "Internazionale", "Inter de Milan", "Inter Milão"],
    "AC Milan": ["Milan", "Milan AC"],
    "Naples": ["Napoli", "Nápoles"],
    "AS Rome": ["Roma", "Rome"],
    "FC Porto": ["Porto"],
    "Benfica": ["SL Benfica"],
    "Ajax": ["Ajax Amsterdam"],
    "Ajax Amsterdam": ["Ajax"],
    "Benfica Lisbonne": ["Benfica", "SL Benfica"],
    "Tottenham": ["Tottenham Hotspur", "Spurs"],
    "Hambourg SV": ["Hambourg", "Hamburg", "HSV"],
    "Bayer Leverkusen": ["Leverkusen"],
    "Borussia Mönchengladbach": ["Mönchengladbach", "Gladbach"],
    "Club Bruges": ["Bruges", "Club Brugge"],
    "Sampdoria Gênes": ["Sampdoria"],
    "Steaua Bucarest": ["Steaua", "Steaua Bucareste"],
    "Valence CF": ["Valence", "Valencia"],
    "Étoile rouge de Belgrade": ["Étoile rouge", "Red Star", "Crvena Zvezda", "Estrela Vermelha"],
    "PSV Eindhoven": ["PSV"],
    "Nottingham Forest": ["Forest", "Nottingham"],
    "Malmö FF": ["Malmö"],
    "Hongrie": ["Hungary", "Hungria"],
    "Suède": ["Sweden", "Suécia"],
    "Pologne": ["Poland", "Polónia"],
    "Bulgarie": ["Bulgaria", "Bulgária"],
    "Chili": ["Chile"],
    "Japon": ["Japan", "Japão"],
    "Algérie": ["Algeria", "Argélia"],
    "Cameroun": ["Cameroon", "Camarões"],
    "Colombie": ["Colombia", "Colômbia"],
    "Pérou": ["Peru"],
    "Sénégal": ["Senegal"],
}


def main():
    fr_path = os.path.join(ROOT, "src/data/lematch-cards.json")
    pt_path = os.path.join(ROOT, "src/data/pt/lematch-cards.json")
    fr = json.load(open(fr_path, encoding="utf-8"))
    pt = json.load(open(pt_path, encoding="utf-8"))
    teams_fr = {c["id"]: c["teams"] for c in fr["cards"]}
    added = 0
    for data in (fr, pt):
        for card in data["cards"]:
            names = teams_fr[card["id"]]
            aliases = card.setdefault("team_aliases", [[] for _ in names])
            while len(aliases) < len(names):
                aliases.append([])
            for i, name in enumerate(names):
                for extra in ALIASES.get(name, []):
                    if extra not in aliases[i] and extra != card["teams"][i]:
                        aliases[i].append(extra)
                        added += 1
    for path, data in ((fr_path, fr), (pt_path, pt)):
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
    print(f"{added} alias ajoutés")


if __name__ == "__main__":
    main()
