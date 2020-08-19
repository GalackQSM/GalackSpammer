// Imports
const express = require("express");

const spammer = require("../spammer.js");

// Express router
let router = express.Router();

// GET Modify settings
router.post("/modify", (req, res) => {
    spammer.modify(req.body);

    res.redirect("/settings");
});

// GET Start attack
router.post("/start", (req, res) => {
    spammer.start(req.body);

    res.redirect("/");
});

// GET Stop attack
router.post("/stop", (req, res) => {
    spammer.stop();

    res.redirect("/");
});

// Exports
module.exports = router;