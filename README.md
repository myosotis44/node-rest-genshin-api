
 API REST Genshin Impact en node.js
## Présentation
Ce service rest dispose d'une API permettant d'afficher les données des personnages de Genshin Impact. 
On peut récupérer l'ensemble des données personnages ou uniquement un personnage en particulier via son nom.
Il est aussi possible de modifier les données, de créer un nouveau personnage ou de le supprimer définitivement.

Au lieu d'une base de données, c'est un fichier json qui se charge de sauvegarder les opérations de mise à jour.

## Installation et utilisation
Après l'avoir récupérer en local via github, il est nécessaire de disposer au préalable d'une installation node.js.
Pour installer rapidement node.js : https://nodejs.org/fr/download/ (prendre installateur windows msi en 64 bits)

## Lancer le service rest
Dans le terminal de visual code, se positionner à la racine du projet où se trouve le fichier index.js
Ensuite, entrer la ligne de commande suivante
```
node .\index.js
```
Si tout se passe bien, un message 'Serveur à l'écoute' s'affichera dans la console. 

## Documentation sur les points d'entrées REST
GET - Affichage de tous les personnages
http://localhost:8081/characters

GET - Affichage d'un personnage
http://localhost:8081/characters/:name
Exemple : http://localhost:8081/characters/zhongli

POST - Création d'un nouveau personnage
http://localhost:8081/characters/
La requête http devra contenir dans son body un flux json, voici un exemple :
```
    {
        "id": 1,
        "name": "Zhongli",
        "sexe": "M",
        "element": "Geo",
        "weapon": "Lance",
        "description": "<p>Consultant mystérieux invité par le Funérarium Wangsheng, ce beau jeune homme aux manières élégantes possède des connaissances qui vont bien au-delà de celles des gens ordinaires.<br> Bien que personne ne sache d'où il est originaire, Zhongli est coutumier de l'étiquette et des règles de la bienséance. Il effectue toutes sortes de cérémonies pour le compte du Funérarium Wangsheng.</p>",
        "nation": "Liyue",
        "imageUrl": "http://localhost:8081/pictures/Character_Zhongli_Card.jpg",
        "rarity": 5
    },
```
Le nom DOIT être unique. 

PUT - Mise à jour d'un personnage existant
http://localhost:8081/characters/:name
Exemple : http://localhost:8081/characters/zhongli
La requête http devra contenir dans son body un flux json, se référer à l'exemple plus haut. 

DELETE - Suppression d'un personnage existant
http://localhost:8081/characters/:name
Exemple : http://localhost:8081/characters/zhongli
Une erreur est retourné si la suppression concerne un personnage non existant.
