
# 📂 Nest.js #1
## 📝 Authors

- [@ymerej-noyorb](https://www.github.com/ymerej-noyorb)
## 💽 Installation

```bash
  docker-compose up -d --build 
```
    
## Usage/Examples

Utilisez Postman, Thunder ou toutes autres applications permettant de tester des API pour pouvoir intéragir avec les ressources de l'application.

Exemple de requête POST à `http://localhost:3000/posts` avec le body suivant :
```json
{
    "title": "Premier post",
    "body": "Le contenu de mon premier post"
}
```

Vous pouvez également visualiser la base de données Postgres avec Adminer depuis `http://localhost:8080/` avec les identifiants suivant :

```json
{
    "system": "PostgreSQL",
    "server": "postgres",
    "username": "postgres",
    "password": "password",
    "database": "database",
}
```