# API CRUD avec NestJS

Ceci est une API basique construite avec [NestJS](https://nestjs.com/) à des fins d'apprentissage. Elle effectue les quatre opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur une ressource appelée "products".

## Prérequis

- Node.js (>= 12.x recommandé)
- npm ou yarn

## Installation

1. Clonez ce dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/votre-depot.git
   cd votre-depot
   ```

2. Installez les dépendances :

   ```bash
   npm install
   # ou
   yarn install
   ```

## Démarrage

Pour démarrer le serveur en mode développement :

```bash
npm run start:dev
# ou
yarn start:dev

```

Le serveur sera lancé sur http://localhost:3000.

## Endpoints

### Créer un produit

URL : /products
Méthode : POST
Body : JSON
{
"name": "Nom du produit",
"description": "Description du produit",
"price": 99.99
}

Réponse :
{
"id": "generated-id"
}

### Lire tous les produits

URL : /products
Méthode : GET

Réponse :
[
{
"id": "product-id",
"name": "Nom du produit",
"description": "Description du produit",
"price": 99.99
},
...
]

### Récupérer un produit par ID

URL : /products/:id
Méthode : GET

Réponse :
{
"id": "product-id",
"name": "Nom du produit",
"description": "Description du produit",
"price": 99.99
}

### Mettre à jour un produit

URL : /products/:id
Méthode : PATCH
Body : JSON
{
"name": "Nouveau nom du produit",
"description": "Nouvelle description du produit",
"price": 109.99
}

Réponse : Status 200 OK

### Supprimer un produit

URL : /products/:id
Méthode : DELETE
Réponse : Status 204 No Content
