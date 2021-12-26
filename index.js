const express = require("express");
const cors = require("cors");
const fs = require("fs");
/**
 * Path vers le fichier json contenant les données personnages.
 */
const dataCharactersPath = "./data/characters.json";
const imageCharactersPath = "/pictures";

const app = express();
const characters = require(dataCharactersPath);

/**
 * Fonction de mise à jour des données personnages dans un fichier json en local.
 * @param {Array} characters - Le tableau de personnages à sauvegarder/mettre à jour.
 */
function updateFile(characters) {
    fs.writeFile(dataCharactersPath, JSON.stringify(characters), err => {
        if (err) console.log("Error writing file:", err);
    });
}

// Middleware pour interpreter les body (contenu) des requêtes http.
app.use(express.json());
// Pour éviter les erreurs CORS en local
app.use(cors());
// Autoriser l'accès aux images stockés sur le serveur
app.use(imageCharactersPath, express.static('./assets/pictures/cards'));

// Récupération de tous les personnages
app.get("/characters", (req, res) => {
    res.status(200).json(characters);
});

// Récupération données d'un personnage existant via son nom
app.get("/characters/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    const myCharacter = characters.find(character => character.name.toLowerCase() === name);
    res.status(200).json(myCharacter);
});

// Création d'un nouveau personnage
app.post("/characters", (req, res) => {
    characters.push(req.body);
    updateFile(characters);
    res.status(200).json(characters);
});

// Mise à jour d'un personnage existant
app.put("/characters/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    let myCharacter = characters.find(character => character.name.toLowerCase() === name);
    myCharacter.sexe = req.body.sexe;
    myCharacter.element = req.body.element;
    myCharacter.weapon = req.body.weapon;
    myCharacter.description = req.body.description;
    myCharacter.nation = req.body.nation;
    myCharacter.rarity = req.body.rarity;
    myCharacter.imageUrl = req.body.imageUrl;
    updateFile(characters);
    res.status(200).json(myCharacter);
});

// Suppression d'un personnage existant
app.delete("/characters/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    let myCharacter = characters.find(character => character.name.toLowerCase() === name);
    characters.splice(characters.indexOf(myCharacter), 1);
    if (!characters.length) {
        res.status(404).json({ error: "Le nom du personnage n'existe pas." });
    } else {
        updateFile(characters);
        res.status(200).json(characters);
    }
});

app.listen(8081, () => {
    console.log("Serveur à l'écoute");
});