// Imports
const dj = require("dankjson");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const chalk = require("chalk");

const checker = require("./checker.js");

// Express app
let app = express();

// View engine
app.engine("hbs", exphbs({extname: ".hbs", defaultLayout: "layout.hbs"}));
app.set("view engine", "hbs");
app.set("views", "views");

// Serve static files
app.use(express.static("static"));

// Body Parser
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
app.use("/", require("./routes/web.js"));
app.use("/api", require("./routes/api.js"));

// Config defaults
let defaults = [
    {
        proxies: [],
        tokens: [],
        port: 1337,
        delay: 5000,
        timeout: 2500
    }
];



// Read config and fire things up
dj(["../config.json"], defaults, 4).then(c => {

    let config = c.config;

    // Start checker
    // For now it requires the config as an parameter
    checker.check(config);

    // Start listening
    app.listen(config.port, () => {
        console.log(chalk.magenta("GalackSpammer est en cours d'exécution"));
        console.log("Visite localhost:" + config.port + " avec votre navigateur Web pour accéder au panneau Web");
    });

});