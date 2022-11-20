Ce [monorepo](https://en.wikipedia.org/wiki/Monorepo) contient le projet salac.

Une documentation markdown est disponible est disponible le repertoire [documentation](documentation).

# Flux de travail 
- Propriétaire du produit : 
- Chef de mêlée/kanban : 
- Référent technique : 
- Référent infrastructure : Manon Biaudelle
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