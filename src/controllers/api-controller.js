require('dotenv').config();
const Joi = require('joi');
const userSchema =  require('../schemas/users-schema');
const guildmarkSchema = require('../schemas/guildmark-schema');
const donatepackageSchema = require('../schemas/donatepackage-schema');
const donateitemsSchema = require('../schemas/donateitems-schema');
const newsSchema = require('../schemas/news-schema');
const guidesSchema = require('../schemas/guides-schema');
const userModel = require('../models/users-model');
const newsModel = require('../models/news-model');
const donatepackagesModel = require('../models/donatepackages-model');
const donateitemsModel = require('../models/donateitems-model');
const paymentGatewayModel = require('../models/paymentgateway-model');
const guidesModel = require('../models/guides-model');
const guideArticlesModel = require('../models/guidearticles-model');
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
        await userSchema
            .tailor('register')
            .validateAsync(user, { abortEarly: false, });

        const response = await axios.get(`${process.env.GAME_API}/account/${username}`);

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
        return res.redirect('/cadastrar');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/cadastrar');
    }
};

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
                req.flash('success', {
                    message: 'Login efetuado com sucesso!',
                });
                req.session.user = user;
                return res.redirect('/painel-de-controle');
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
        return res.redirect('/entrar');
    } catch (err) {
        console.log(err);
        req.flash('error', {
            message: err.details || 'Erro interno',
        });
        return res.redirect('/entrar');
    }
};

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
        return res.redirect('/recuperar-conta');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/recuperar-conta');
    }
};

exports.guildmark = async (req, res, next) => {
    try {
        const { guildid } = req.body;
        const { guildmark } = req.files;
        await guildmarkSchema
            .validateAsync({ guildid: guildid }, { abortEarly: false, });

        if (typeof guildmark !== 'undefined') {
            //API FLASK PYTHON [get guildid/name]
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
        return res.redirect('/painel-de-controle/guildmark');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/guildmark');
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
                        
                        //await Game.changePassword(username, oldpassword); API FLASK PYTHON
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
        return res.redirect('/painel-de-controle/alterar-senha');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/alterar-senha');
    }
};

exports.recoverynumericpassword = async (req, res, next) => {
    try {

    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/recuperar-numerica');
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

        return res.render('/painel-de-doacao/picpay');

    } catch (err) {
        return res.redirect('/painel-de-controle');
    }
};

exports.createnews = async (req, res, next) => {
    try {
        const {
            title,
            slug,
            content,
            category
        } = req.body;

        await newsSchema
            .tailor('createnews')
            .validateAsync({
                title: title,
                slug: slug,
                content: content,
                category: category,
            });

        const slugExists = await newsModel.findOne({
            where: {
                slug: slug,
            },
        });

        if (!slugExists) {
            const id = v4();

            const news = await newsModel.create({
                id: id,
                title: title,
                slug: slug,
                content: content,
                category: category,
                id_user: req.session.user.id,
            });
    
            if (news) {
                req.flash('success', {
                    message: 'Notícia criada com sucesso!',
                });
            } else {
                req.flash('error', {
                    message: 'Não foi possível criar uma notícia!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Slug existente!',
            });
        }

        return res.redirect('/painel-de-controle/criar-noticia')
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/criar-noticia');
    }
};

exports.updatenews = async (req, res, next) => {
    try {
        var { slug } = req.params;
        const {
            title,
            content,
            category,
        } = req.body;

        const nSlug = req.body.slug;

        await newsSchema
            .tailor('updatenews')
            .validateAsync({
                title: title,
                slug: nSlug,
                slug: slug,
                content: content,
                category: category,
            });

        const news = await newsModel.findOne({
            where: {
                slug: slug,
            },
        });

        if (news) {
            const data = await newsModel.update({
                title: title,
                slug: nSlug,
                content: content,
                category: category,
            }, {
                where: {
                    slug: slug,
                },
            });
            if (data) {
                req.flash('success', {
                    message: 'Notícia alterada com sucesso!',
                });
                slug = nSlug;
            } else {
                req.flash('error', {
                    message: 'Não foi possível alterar a notícia',
                });
            }
            return res.redirect(`/painel-de-controle/editar-noticia/${slug}`);
        } else {
            req.flash('error', {
                message: 'Notícia inexistente!',
            });
            return res.redirect('/painel-de-controle/noticias');
        }
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/noticias');
    }
};

exports.mercadopago = async (req, res, next) => {
    try {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/noticias');
    } catch (err) {
        return res.redirect('/');
    }
};

exports.createguide = async (req, res, next) => {
    try { 
        const {
            title,
            slug,
            content,
        } = req.body;

        const id = v4();

        await guidesSchema
            .tailor('createguide')
            .validateAsync({
                title: title,
                slug: slug,
                content: content,
            });

        const slugExists = await guidesModel.findOne({
            where: {
                slug: slug,
            },
        });

        if (!slugExists) {
            const guide = await guidesModel.create({
                title: title,
                slug: slug,
                content: content,
            });
            
            if (guide) {
                req.flash('success', {
                    message: 'Guia criada com sucesso!',
                });
            } else {
                req.flash('error', {
                    message: 'Naõ foi possível criar uma guia!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Slug existente!',
            });
        }

        return res.redirect('/painel-de-controle/guia-do-jogo');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/criar-guia-do-jogo');
    }
};

exports.updateguide = async (req, res, next) => {
    try {
        var { slug } = req.params;
        const {
            title,
            content,
        } = req.body;

        const nSlug = req.body.slug;

        await guidesSchema
            .tailor('updateguide')
            .validateAsync({
                title: title,
                slug: nSlug,
                slug: slug,
                content: content,
            });

        const news = await guidesModel.findOne({
            where: {
                slug: slug,
            },
        });

        if (news) {
            const data = await guidesModel.update({
                title: title,
                slug: nSlug,
                content: content,
            }, {
                where: {
                    slug: slug,
                },
            });
            if (data) {
                req.flash('success', {
                    message: 'Guia alterada com sucesso!',
                });
                slug = nSlug;
            } else {
                req.flash('error', {
                    message: 'Não foi possível alterar a guia',
                });
            }
            return res.redirect(`/painel-de-controle/editar-guia-do-jogo/${slug}`);
        } else {
            req.flash('error', {
                message: 'Guia do jogo inexistente!',
            });
            return res.redirect('/painel-de-controle/guia-do-jogo');
        }
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/guia-do-jogo');
    }
};

exports.createdonateitems = async (req, res, next) => {
    try {
        const {
            id_package,
            itemname,
            slug,
            item_id,
            eff1,
            effv1,
            eff2,
            effv2,
            eff3,
            effv3,
        } = req.body;

        await donateitemsSchema
            .tailor('createitem')
            .validateAsync({
                id_package: id_package,
                itemname: itemname,
                slug: slug,
                item_id: item_id,
                eff1: eff1,
                effv1: effv1,
                eff2: eff2,
                effv2: effv2,
                eff3: eff3,
                effv3: effv3,
            });

        const id = v4();

        const slugExists = await donateitemsModel.findOne({
            where: {
                slug: slug,
            },
        });

        if (!slugExists) {
            const donateitems = await donateitemsModel.create({
                id: id,
                id_package: id_package,
                itemname: itemname,
                slug: slug,
                item_id: item_id,
                eff1: eff1,
                effv1: effv1,
                eff2: eff2,
                effv2: effv2,
                eff3: eff3,
                effv3: effv3,
            });
    
            if (donateitems) {
                req.flash('success', {
                    message: 'Item de doação criado com sucesso!',
                });
            } else {
                req.flash('error', {
                    message: 'Não foi possível criar o item de doação!',
                });
            }
    
        } else {
            req.flash('error', {
                message: 'Slug existente!',
            });
        }
        
        return res.redirect('/painel-de-controle/pacote-de-doacoes');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/itens-de-doacoes');
    }
};