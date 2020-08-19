// Imports
const request = require("request");

class Bot {

    constructor(token, proxy) {
        // Private
        this._token = token;
        this._proxy = proxy;
        this._fails = 0;
    }

    // Make a request with bot
    req(method, url, form) {
        return new Promise((resolve, reject) => {
            request({
                method: method,
                url: url,
                proxy: "http://" + this._proxy,
                headers: {
                    authorization: this._token
                },
                form: form
            }, (error, response, body) => {
                if (error) return reject(error);
                resolve(body);
            });
        });
    }

}

// Exports
module.exports = Bot;