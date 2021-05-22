const fs = require('fs');
const userModel = require('../models/users-model');
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

    async userExists(username) {
        try {
            var initial = await this.getInitial(username);
            var path = `${this.account + initial}/${username}`;
            const user = await userModel.findOne({
                where: {
                    username: username,
                }
            });
            if (fs.existsSync(path) && user) {
                return user;
            }
            return false;
        } catch (err) {
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