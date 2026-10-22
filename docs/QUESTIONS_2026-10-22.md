# Questions du 22 octobre 2026 — Vrai ou Faux

**Statut : contenu vérifié par Codex ; fonctionnement dans l'application à vérifier par Claude avant intégration.** Cinq affirmations nouvelles, deux vraies et trois fausses. Les textes français et portugais ont le même identifiant et la même réponse. Chaque proposition nomme un transfert et une année précis : un retour éventuel dans un club ne peut pas changer la réponse.

| ID | Réponse | Fait contrôlé | Source UEFA | Difficulté estimée |
| --- | --- | --- | --- | --- |
| `lf-f-1300` | Faux | Beckham a quitté le LA Galaxy fin 2012, puis rejoint le PSG en janvier 2013. | [Annonce PSG, 31 janvier 2013](https://www.uefa.com/uefachampionsleague/news/0205-0ea577193698-ba3ac485bab7-1000--beckham-pens-five-month-deal-with-psg/) | Moyenne : les deux clubs sont connus, l'ordre peut piéger. |
| `lf-v-1301` | Vrai | Forlán est passé de Villarreal à l'Atlético Madrid en 2007. | [Accord Atlético, 30 juin 2007](https://www.uefa.com/news-media/news/0254-0d7baa1d0ee3-c01037697e50-1000--forlan-accepts-atletico-offer/) ; [départ de l'Atlético en 2011](https://www.uefa.com/uefachampionsleague/news/01f4-0ea2a098b10d-8d04252d7dfa-1000--inter-complete-deals-for-forlan-poli-and-zarate/) | Moyenne : accessible aux connaisseurs de Liga. |
| `lf-f-1302` | Faux | Cavani a quitté Naples pour le PSG en 2013, pas l'inverse. | [Transfert au PSG, 16 juillet 2013](https://www.uefa.com/uefachampionsleague/news/020b-0e855693399e-c897bc2da9b5-1000--psg-dig-deep-to-lure-cavani-from-napoli/) | Facile à moyenne : période PSG connue, Naples moins assuré. |
| `lf-f-1303` | Faux | Di María a quitté le Real Madrid pour Manchester United en 2014, pas l'inverse. | [Annonce Manchester United, 26 août 2014](https://www.uefa.com/news-media/news/0218-0e8bdb8b2163-245d525f47a5-1000--united-bound-di-maria-joins-record-breakers/) | Moyenne : parcours court à Manchester, ordre parfois confondu. |
| `lf-v-1304` | Vrai | Robben a quitté Chelsea pour le Real Madrid en 2007. | [Accord Real Madrid, 22 août 2007](https://www.uefa.com/uefachampionsleague/news/0254-0d7bab7a7dcb-3d2b2ab36a21-1000--robben-and-heinze-set-for-madrid/) ; [départ du Real en 2009](https://www.uefa.com/uefachampionsleague/news/01dc-0e72b86ae652-87d56fdcf27f-1000--robben-wings-his-way-to-bayern/) | Moyenne à difficile : l'étape madrilène est moins mémorisée que Chelsea/Bayern. |

## Contrôles de contenu

- Aucun de ces cinq joueurs n'avait déjà une affirmation `ordre_clubs` dans le jeu. Les cinq identifiants et les cinq formulations sont nouveaux dans les deux langues.
- Les dates et le sens des transferts ont été lus dans les annonces UEFA, plutôt qu'inférés de l'absence d'un club dans un extrait de carrière.
- Les trois affirmations fausses possèdent une correction en portugais ; le jeu construit la correction française à partir des deux clubs dans `valeur_source`.
- Il n'y a pas de réponse concurrente valable pour ces transferts **datés**. Les prêts et les autres clubs de la carrière ne changent pas le club de départ et d'arrivée pour l'année indiquée.
- La difficulté n'est qu'une estimation éditoriale ; elle reste à mesurer en partie test.
