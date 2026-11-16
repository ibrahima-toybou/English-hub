# English Learning Hub

Mon programme d'anglais personnel, du niveau **A2 au C2** : une leçon, des révisions et un peu de pratique chaque jour.

- **Site** : https://ibrahima-toybou.github.io/English-hub/
- **Version Claude** (sauvegarde sur le compte, correction des textes par Claude) : https://claude.ai/artifact/Pm9UKhwEpDLUPfKgzRcu5x

## Contenu

- **68 leçons de grammaire** : A2 (21), B1 (16), B2 (13), C1 (10), C2 (8). Chaque leçon contient une explication en français, la forme, quand l'utiliser, des exemples à écouter, les pièges des francophones, une astuce, 6 exercices et 5 cartes de révision.
- Les leçons A2 et B1 renvoient aux unités d'*Essential Grammar in Use* (R. Murphy, 4e édition).
- **Vocabulaire** : 25 listes thématiques, 70 verbes à particule, 45 expressions idiomatiques, 30 faux amis, 40 connecteurs, 110 verbes irréguliers.
- **Révisions espacées** : chaque carte revient après 1, 2, 4, 8, 16, 32 puis 64 jours. Les erreurs d'exercices deviennent des cartes.
- **Pratique** : dictées, prononciation au micro (Chrome, Edge, Safari), écriture avec une grille de relecture.
- **Mission du jour**, série de jours d'affilée, objectif quotidien en XP.

Le site s'installe sur l'écran d'accueil du téléphone (« Ajouter à l'écran d'accueil ») et fonctionne hors connexion après la première visite. La progression est gardée dans le navigateur de chaque appareil.

## Déployer sur Vercel

1. Sur vercel.com : **Add New → Project**, puis importer ce dépôt.
2. Framework Preset : **Other**. Ne mettre ni commande de build ni dossier de sortie.
3. **Deploy**. Chaque push sur `main` republie le site.

## Structure

| Chemin | Rôle |
|---|---|
| `index.html`, `sw.js`, `manifest.webmanifest`, icônes | Le site publié (fichiers générés) |
| `source/data/` | Le contenu : leçons par niveau, vocabulaire, ressources |
| `source/src/` | L'application : styles, interface, moteur |
| `source/build-site.js` | Génère le site à la racine du dépôt |
| `source/build.js` | Génère la version artefact Claude |
| `source/validate.js` | Vérifie le contenu (format des leçons, exercices, réponses) |
| `source/SCHEMA.md` | Format des données |

## Mettre à jour

```bash
node source/validate.js        # contrôle du contenu
node source/build-site.js      # régénère index.html, sw.js et manifest
```
