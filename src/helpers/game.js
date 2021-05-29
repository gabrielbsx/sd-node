const fs = require('fs');
const userModel = require('../models/users-model');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = class Game {
    game = process.env.GAME_DIR;
    binaryAccount = this.game + 'base.bin';
    dbsrv = this.game + 'DBSrv/run/';
    tmsrv = this.game + 'TMSrv/run/';
    common = this.game + 'Common/';
    account = this.dbsrv + 'account/';
    importDonate = this.common + 'importDonate/';
    importPass = this.common + 'importPass/';
    importItem = this.common + 'importItem/';
    logCreateAccount = this.common + 'logs/account/';
    logImportPass = this.common + 'logs/ImportPass/';
    logImportDonate = this.common + 'logs/ImportDonate/';
    logImportItem = this.common + 'logs/ImportItem/';

    constructor () {}   

    async request(url) {
        try {
            const request = await axios.get(url, {
                headers: {
                    'x-wyd-token': jwt.sign({}, process.env.JWT_SECRET),
                    'content-type': 'application/json',
                },
            });

            return request;
        } catch (err) {
            return {}
        }
    }

    async getInitial(username) {
        try {
            if (username[0].match(/^([a-zA-Z])$/)) {
                return username[0];
            }
            return 'etc';
        } catch (err) {
            return false;
        }
    }

    async getAccount(username) {
        try {
            if (await this.userExists(username)) {
                const account = await this.request(`${process.env.GAME_API}/account/${username}`);
    
                if (Object.values(account.data).length > 0) {
                    if (user) {
                        return account.data;
                    }
                }
            }
            
            return false;
        } catch (err) {
            return false;
        }
    }

    async userExists(username) {
        try {

            const account = await this.request(`${process.env.GAME_API}/accountexists/${username}`);

            if (account.status === 200) {
                if (account.data) {
                    const user = await userModel.findOne({
                        where: {
                            username: username,
                        },
                    });
                    if (user) {
                        return user;
                    }
                }
            }

            return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async createAccount(username, password) {
        try {
            var initial = await this.getInitial(username);
            var path = `${this.account + initial}/${username}`;

            var account = fs.readFileSync(this.binaryAccount);
            username = Buffer.from(username, undefined);
            password = Buffer.from(password, undefined);

            for (var i = 0; i < username.length; i++) {
                account[i] = username[i];
            }

            for (i = 0; i < password.length; i++) {
                account[(i + 16)] = password[i];
            }

            fs.writeFileSync(path, account);

            return true;
        } catch (err) {
            return false;
        }
    }

    async changePassword(username, password) {
        try {
            const path = process.env.GAME_DIR + 'Common/ImportPass/' + (new Date().getTime()).toString() + '.txt';

            fs.writeFileSync(path, `${username} ${password}`);

            return true;
        } catch (err) {
            return false;
        }
    }
}