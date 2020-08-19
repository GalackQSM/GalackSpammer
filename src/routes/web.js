const express = require("express");
const spammer = require("../spammer.js");
let router = express.Router();

router.get("/", (req, res) => {
    res.render("attaque", spammer.get());
});

router.get("/parametres", (req, res) => {
    res.render("parametres", spammer.get());
});

router.get("/statut", (req, res) => {
    res.render("statut", spammer.get());
});

router.get("/discord", (req, res) => {
    res.render("discord", spammer.get());
});

router.get("/serveur", (req, res) => {
    res.render("serveur", spammer.get());
});

router.get("/credits", (req, res) => {
    res.render("credits", spammer.get());
});

module.exports = router;