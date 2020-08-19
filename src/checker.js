// Imports
const dj = require("dankjson");
const chalk = require("chalk");

const Bot = require("./Bot.js");



// Proxies and tokens array
let proxies = [];
let tokens = [];

// Curently working tokens
let passedProxies = [];
let passedTokens = [];

// Proxy and Token index
let p = 0;
let t = 0;

function check(config) {

    // Set the config if it hasn't already been set
    proxies = config.proxies;
    tokens = config.tokens;

    // Because JS (No pointers)
    exports.proxies = proxies;
    exports.tokens = tokens;

    let proxy = proxies[p];
    let token = tokens[t];

    // Set if proxy / token passed
    function set(item, passed) {
        let list;

        if (proxies.includes(item)) list = passedProxies;
        else list = passedTokens;
        
        if (passed) {
            if (!list.includes(item)) list.push(item);
        } else {
            if (list.includes(item)) list.splice(list.indexOf(item), 1);
        }
    }

    // Couldn't think of any other name...
    // Will be null if already completed
    let virgin = function() {virgin = null}

    // Make a request to see if proxy and token works
    new Bot(token, proxy).req("GET", "https://discordapp.com/api/v6/users/@me").then(body => {
        if (!virgin) return;

        let parsed = JSON.parse(body);

        if (parsed.code == "0") {
            console.log("Token " + token + chalk.red(" échoué (peut-être que le token et sécurisé par téléphone)"));
            set(token, false);
        } else {
            console.log("Token " + token + chalk.green(" passer "));
            set(token, true);
            t++;
        }

        console.log("Proxy " + proxy + chalk.green(" passer "));
        set(proxy, true);

        virgin();
    }).catch(error => {
        if (!virgin) return;

        console.log("Proxy " + proxy + chalk.red(" échoué ✗") + " (délai d'expiration du proxy > 2500ms)");
        set(proxy, false);

        virgin();
    });

    // Timeout if the proxy is taking too long
    setTimeout(() => {
        if (!virgin) return;

        console.log("Proxy " + proxy + chalk.red(" échoué ✗") + " (délai d'expiration du proxy > 2500ms)");
        set(proxy, false);

        virgin();
    }, config.timeout);

    p++;
    if (p == proxies.length) p = 0;
    if (t == tokens.length) t = 0;

    // Repeat next after delay
    setTimeout(() => check(config), config.delay);

}

// Exports
exports.check = check;
exports.passedProxies = passedProxies;
exports.passedTokens = passedTokens;