
<img alt="Texte alternatif" src="/src/assets/img/logo.webp" title="Titre de l&amp;amp;#39;image" width="300"/>.

Ce [monorepo](https://en.wikipedia.org/wiki/Monorepo) contient le projet salac.
- projet 

Une documentation markdown est disponible est disponible le repertoire [documentation](documentation).

# Flux de travail 
- Propriétaire du produit : 
- Chef de mêlée/kanban : 
- Référent technique : 
- Référent infrastructure : 
- Site de développement : 
- Site de production : https://salac.store/#/
- Branche déployée sur le site de développement : `develop`
- Branche déployée en pré-production : `master`

| Préfixe de branches ou tag | Description                                               |
|----------------------------|-----------------------------------------------------------|
| `feature/`                 | branches de fonctionnalités                               |
| `release/`                 | branche de version                                        |
| `bugfix/`                  | branche de correctifs depuis `release/x.x.x` ou `develop` |
| `hotfix/`                  | branches de correctifs depuis `master`                    |
| `support/`                 | branches de support                                       |
|                            | tag de numéro de version [semver](https://semver.org/)    |

# Intégration continue

| application | master | release/1.1.0 | develop |
|--|--|--|-- |
| librairies | | |