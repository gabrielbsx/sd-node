require('dotenv').config();
const Joi = require('joi');
const userSchema =  require('../schemas/users-schema');
const guildmarkSchema = require('../schemas/guildmark-schema');
const donatepackageSchema = require('../schemas/donatepackage-schema');
const donateitemsSchema = require('../schemas/donateitems-schema');
const userModel = require('../models/users-model');
const donatepackagesModel = require('../models/donatepackages-model');
const donateitemsModel = require('../models/donateitems-model');
const paymentGatewayModel = require('../models/paymentgateway-model');
const Users = require('../models/users-model');
const Game = new (require('../helpers/game'))();
const bcrypt = require("bcryptjs");
const { v4 } = require('uuid');
const axios = require('axios');

exports.register = async (req, res, next) => {
    try {
        const { name, username, password, password_confirm, email } = req.body;
        user = {
            name: name,
            username: username,
            password: password,
            password_confirm: password_confirm,
            email: email,
        };
        await userSchema.tailor('register').validateAsync(user, { abortEarly: false, });
        if (await Game.userExists(username) === false) {
            delete user.password_confirm;
            user.id = v4();
            user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(15));
            if (await userModel.create(user)) {
                if (await Game.createAccount(username, password)) {
                    req.flash('success', {
                        message: 'Cadastro efetuado com sucesso!',
                    });
                } else {
                    await userModel.destroy({
                        where: {
                            id: user.id,
                            name: name,
                            username: username,
                            email: email,
                        },
                    });
                    req.flash('error', {
                        message: 'Não foi possível cadastrar!',
                    });
                }
            } else {
                req.flash('error', {
                    message: 'Não foi possível cadastrar a conta!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Conta existente!',
            });
        }
        return res.redirect('/register');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/register');
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        await userSchema
            .tailor('login')
            .validateAsync({
                username: username,
                password: password,
            });
        const user = await Game.userExists(username);
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                delete user.password;
                /*req.flash('success', {
                    message: 'Login efetuado com sucesso!',
                });*/
                req.session.user = user;
                return res.redirect('/home');
            } else {
                req.flash('error', {
                    message: 'Não foi possível efetuar o login!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Não foi possível efetuar o login!',
            });
        }
        return res.redirect('/login');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno',
        });
        return res.redirect('/login');
    }
}

exports.recovery = async (req, res, next) => {
    try {
        const { email } = req.body;
        await userSchema
            .tailor('recovery')
            .validateAsync({
                email: email,
            });
        req.flash('success', {
            message: 'Um e-mail foi enviado para você, confirma para recuperar sua conta!',
        });
        return res.redirect('/recovery');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/recovery');
    }
};

exports.guildmark = async (req, res, next) => {
    try {
        const { guildid } = req.body;
        const { guildmark } = req.files;
        await guildmarkSchema.validateAsync({ guildid: guildid }, { abortEarly: false, });


        
        if (typeof guildmark !== 'undefined') {
            if (guildmark.mimetype === 'image/bmp') {
                if (guildmark.encoding === '7bit') {
                    if (guildmark.size <= 100000) {
                        let path = __dirname + '/../' + process.env.GUILD_PATH + 'b0' + (100000 + parseInt(guildid)) + '.bmp';
                        await guildmark.mv(path);
                        req.flash('success', {
                            message: 'Guildmark enviada com sucesso!',
                        });
                    } else {
                        req.flash('error', {
                            message: 'Guildmark muito grande!',
                        });
                    }
                } else {
                    req.flash('error', {
                        message: 'Guildmark não é 24 bits!',
                    });
                }
            } else {
                req.flash('error', {
                    message: 'Guildmark inválido!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Envie uma guildmark!',
            });
        }
        return res.redirect('/guildmark');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/guildmark');
    }
};

exports.changepassword = async (req, res, next) => {
    try {
        const { oldpassword, password_confirm } = req.body;
        var { password } = req.body;
        const { username } = req.session.user;

        await userSchema
            .tailor('changepassword')
            .validateAsync({
                username: username,
                password: password,
                password_confirm: password_confirm,
            });

        const user = await Game.userExists(username);

        if (user) {
            if (await bcrypt.compare(oldpassword, user.password)) {
                if (await Game.changePassword(username, password)) {
                    password = await bcrypt.hash(password, await bcrypt.genSalt(15));
                    const result = await userModel.update({ password: password, }, {
                        where: {
                            username: username,
                        }
                    });
                    if (result) {
                        req.flash('success', {
                            message: 'Senha alterada com sucesso!',
                        });
                    } else {
                        await Game.changePassword(username, oldpassword);
                        req.flash('error', {
                            message: 'Não foi possível alterar a senha!',
                        });
                    }
                } else {
                    req.flash('error', {
                        message: 'Não foi possível alterar a senha!',
                    });
                }
            } else {
                req.flash('error', {
                    message: 'Senha antiga inválida!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Conta inexistente!',
            });
        }
        return res.redirect('/change-password');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/change-password');
    }
};

exports.recoverynumericpassword = async (req, res, next) => {
    try {

    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/recovery-numeric-password');
    }
};

exports.createdonatepackage = async (req, res, next) => {
    try {
        const { name, value, donate, percent } = req.body;
        var donatepackage = {
            name: name,
            value: value,
            donate: donate,
            percent: percent,
        };
        await donatepackageSchema.validateAsync(donatepackage, { abortEarly: false, });
        donatepackage.id = v4();
        if (await donatepackagesModel.create(donatepackage)) {
            req.flash('success', {
                message: 'Pacote de doação criado com sucesso!',
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível adicionar pacote de doação!',
            });
        }
        return res.redirect('/donate-packages');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/donate-packages');
    }
};

exports.createdonateitem = async (req, res, next) => {
    try {
        const { id_package, itemname, item_id, eff1, eff2, eff3, effv1, effv2, effv3 } = req.body;
        var donateitems = {
            id_package: id_package,
            itemname: itemname,
            item_id: item_id,
            eff1: eff1,
            eff2: eff2,
            eff3: eff3,
            effv1: effv1,
            effv2: effv2,
            effv3: effv3,
        };
        
        await donateitemsSchema.validateAsync(donateitems, { abortEarly: false, });
        if (await donatepackagesModel.findOne({ where: { id: id_package } })) {
            donateitems.id = v4();
            if (await donateitemsModel.create(donateitems)) {
                req.flash('success', {
                    message: 'Bonificação criada com sucesso!',
                });
            } else {
                req.flash('error', {
                    message: 'Não foi possível criar a bonificação!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Pacote de doação inexistente!',
            });
        }
        return res.redirect(`/list-donate-items/${id_package}`);
    } catch (err) {
        const { id_package } = req.body;
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect(`/list-donate-items/${id_package}`);
    }
};

exports.updatedonatepackage = async (req, res, next) => {
    try {
        const { id, name, value, donate, percent } = req.body;
        var donatepackage = {
            name: name,
            value: value,
            donate: donate,
            percent: percent,
        };
        await donatepackageSchema.validateAsync(donatepackage, { abortEarly: false, });
        if (await donatepackagesModel.update(donatepackage, { where: { id: id }})) {
            req.flash('success', {
                message: 'Pacote de doação atualizado com sucesso!',
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível atualizar o pacote de doação!',
            });
        }
        return res.redirect('/donate-packages');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/donate-packages');
    }
};

exports.updatedonateitems = async (req, res, next) => {
    try {
        const { id, id_package, itemname, item_id, eff1, eff2, eff3, effv1, effv2, effv3 } = req.body;
        var donateitems = {
            id_package: id_package,
            itemname: itemname,
            item_id: item_id,
            eff1: eff1,
            eff2: eff2,
            eff3: eff3,
            effv1: effv1,
            effv2: effv2,
            effv3: effv3,
        };
        await donateitemsSchema.validateAsync(donateitems, { abortEarly: false, });
        if (await donatepackagesModel.findOne({ where: { id: id_package }})) {
            if (await donateitemsModel.update(donateitems, { where: { id: id }})) {
                req.flash('success', {
                    message: 'Bonificação atualizada com sucesso!',
                });
            } else {
                req.flash('error', {
                    message: 'Não foi possível atualizar a bonificação!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Pacote de doação inexistente!',
            });
        }
        return res.redirect(`/list-donate-items/${id_package}`);
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/donate-packages');
    } 
};

exports.deletedonateitem = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (await donateitemsModel.destroy({ where: { id: id, }})) {
            req.flash('success', {
                message: 'Bonificação deletada com sucesso!',
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível deletar a bonificação!',
            });
        }
        return res.redirect('/donate-items');
    } catch (err) {
        req.flash('error', {
            message: 'Não foi possível deletar a bonificação!',
        });
    }
};

exports.deletedonatepackage = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (await donatepackagesModel.destroy({ where: { id: id, }})) {
            await donateitemsModel.destroy({ where: { id_package: id, }});
            req.flash('success', {
                message: 'Pacote de doação deletada com sucesso!',
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível deletar o pacote de doação!',
            });
        }
        return res.redirect('/donate-packages');
    } catch (err) {
        req.flash('error', {
            message: 'Não foi possível deletar o pacote de doação!',
        });
    }
};

exports.creategateway = async (req, res, next) => {
    try {
        const { name, key, token } = req.body;

        if (name === 'Mercado Pago' || name === 'Picpay') {
            if (typeof key !== 'undefined' && typeof token !== 'undefined') {
                const exists = await paymentGatewayModel.findOne({
                    where: {
                        name: name,
                    },
                });
                if (!exists) {
                    const id = v4();
                    const data = await paymentGatewayModel.create({
                        id: id,
                        name: name,
                        key: key,
                        token: token,
                    });
                    if (data) {
                        req.flash('success', {
                            message: 'Gateway adicionado com sucesso!',
                        });
                    } else {
                        req.flash('error', {
                            message: 'Não foi possível adicionar o gateway!',
                        });
                    }
                } else {
                    req.flash('error', {
                        message: 'Gateway existente!',
                    });
                }
            } else {
                req.flash('error', {
                    message: 'Requisição inválida!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Somente permitido: mercado pago ou picpay!',
            });
        }

        return res.redirect('/payment-gateway');
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
};

exports.updategateway = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, key, token } = req.body;

        if (name === 'Mercado Pago' || name === 'Picpay') {
            if (typeof key !== 'undefined' && typeof token !== 'undefined') {
                const data = await paymentGatewayModel.update({
                    name: name,
                    key: key,
                    token: token,
                 }, {
                    where: {
                        id: id,
                    },
                });

                if (data) {
                    req.flash('success', {
                        message: 'Gateway atualizado com sucesso!',
                    });
                } else {
                    req.flash('error', {
                        message: 'Não foi possível atualizar o gateway',
                    });
                }
            } else {
                req.flash('error', {
                    message: 'Requisição inválida!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Somente permitido: mercado pago ou picpay!',
            });
        }

        return res.redirect('/payment-gateway');
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
};

exports.picpay = async (req, res, next) => {
    try {
        const { key, token } = await paymentGatewayModel.findOne({
            where: {
                name: 'picpay',
            },
        });

        if (typeof key !== 'undefined' && typeof token !== 'undefined') {
            const _request = axios.post('https://appws.picpay.com/ecommerce/public/payments', {
                callbackUrl: '',
                expiresAt: new Date ((new Date.getTime()) + (1000 * 60 * 60 * 24 * 2)),
                returnUrl: '',
                value: 10,
                buyer: {
                    firstName: '',
                    lastName: '',
                    document: '',
                },
            }, {
                headers: {
                    'x-picpay-token': token,
                    'Content-Type': 'application/json',
                }
            });
        }

        return res.render('/donate/picpay');

    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
};

exports.mercadopago = async (req, res, next) => {
    try {
        
    } catch (err) {
        return res.redirect('/');
    }
};