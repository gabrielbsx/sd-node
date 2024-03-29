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
                    'Authorization': `Bearer: ${jwt.sign({}, process.env.JWT_SECRET)}`,
                    'content-type': 'application/json',
                },
            });
            console.log(request);

            return request;
        } catch (err) {
            console.log(err);
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
                const account = await this.request(`${process.env.GAME_API}account/${username}`);

                if (account.data.status == 'success') {
                    if (Object.values(account.data).length > 0) {
                        if (user) {
                            return account.data;
                        }
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

            const account = await this.request(`${process.env.GAME_API}account/accountexists/${username}`);

            if (account.data.status == 'success') {
                const user = await userModel.findOne({
                    where: {
                        username: username,
                    },
                });
                if (user) {
                    return user;
                }
            }

            return false;
        } catch (err) {
            return false;
        }
    }

    async createAccount(username, password, numericpass) {
        try {

            const account = await this.request(`${process.env.GAME_API}account/createaccount/${username}/${password}/${numericpass}`);

            if (account.data.status == 'success') {
                return true;
            }
            
            return false;
        } catch (err) {
            return false;
        }
    }

    async changePassword(username, password) {
        try {
            const account = await this.request(`${process.env.GAME_API}account/updateaccount/${username}/${password}`);

            if (account.data.status == 'success') {
                return true;
            }

            return false;
        } catch (err) {
            return false;
        }
    }
}