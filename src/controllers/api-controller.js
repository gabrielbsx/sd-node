require('dotenv').config();
const Joi = require('joi');
const fetch = require('node-fetch');
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
const donatesModel = require('../models/donates-model');
const picpayGatewayModel = require('../models/picpaygateway-model');
const mercadoPagoGatewayModel = require('../models/mercadopago-model');
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

exports.createdonatepackage = async (req, res, next) => {
    try {
        const { name, slug, value, donate, percent } = req.body;

        await donatepackageSchema
            .tailor('createpackage')
            .validateAsync({
                slug: slug,
                name: name,
                value: value,
                donate: donate,
                percent: percent,
            }, { abortEarly: false, });

        const id = v4();

        const data = await donatepackagesModel.create({
            id: id,
            slug: slug,
            name: name,
            value: value,
            donate: donate,
            percent: percent,
        });

        if (data) {
            req.flash('success', {
                message: 'Pacote de doação criado com sucesso!',
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível adicionar pacote de doação!',
            });
        }
        return res.redirect('/painel-de-controle/pacote-de-doacoes');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/pacote-de-doacoes');
    }
};


//não necessário
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
        
        await donateitemsSchema
            .tailor('createitem')
            .validateAsync(donateitems, { abortEarly: false, });
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
        return res.redirect(`/painel-de-controle/lista-de-itens/${id_package}`);
    } catch (err) {
        const { id_package } = req.body;
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect(`/painel-de-controle/lista-de-itens/${id_package}`);
    }
};

exports.updatedonatepackage = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { name, value, donate, percent } = req.body;

        const nSlug = req.body.slug;

        var donatepackage = {
            slug: nSlug,
            name: name,
            value: value,
            donate: donate,
            percent: percent,
        };

        await donatepackageSchema
            .tailor('updatepackage')
            .validateAsync(donatepackage, { abortEarly: false, });

        if (await donatepackagesModel.update(donatepackage, {
            where: {
                slug: slug
            }
        })) {
            req.flash('success', {
                message: 'Pacote de doação atualizado com sucesso!',
            });
            return res.redirect(`/painel-de-controle/editar-pacote-de-doacoes/${nSlug}`);
        } else {
            req.flash('error', {
                message: 'Não foi possível atualizar o pacote de doação!',
            });
        }
        return res.redirect(`/painel-de-controle/editar-pacote-de-doacoes/${nSlug}`);
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/pacote-de-doacoes');
    }
};

exports.updatedonateitems = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { id_package, itemname, item_id, eff1, eff2, eff3, effv1, effv2, effv3 } = req.body;
        const nSlug = req.body.slug;
        var donateitems = {
            slug: nSlug,
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
            if (await donateitemsModel.update(donateitems, { where: { slug: slug }})) {
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
        return res.redirect(`/painel-de-controle/editar-item-de-doacoes/${nSlug}`);
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/pacote-de-doacoes');
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
            if (await donatepackagesModel.findOne({ where : { id: id_package }})) {
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
                    message: 'Pacote inexistente!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Slug existente!',
            });
        }
        
        return res.redirect('/painel-de-controle/criar-pacote-de-doacoes');
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/itens-de-doacoes');
    }
};

exports.paymentsystem = async (req, res, next) => {
    try {
        const { method } = req.params;

        if (method === 'picpay') {
            const {
                xpicpaytoken,
                xsellertoken,
            } = req.body;

            const gateway = await picpayGatewayModel.findOne({});

            if (gateway) {
                if (await picpayGatewayModel.update({
                    xpicpaytoken: xpicpaytoken,
                    xsellertoken: xsellertoken,
                }, {
                    where: {
                        id: gateway.id,
                    },
                })) {
                    req.flash('success', {
                        message: 'Picpay salvo com sucesso!',
                    });
                } else {
                    req.flash('error', {
                        message: 'Não foi possível alterar o método picpay!',
                    });
                }
            } else {
                if (await picpayGatewayModel.create({
                    xpicpaytoken: xpicpaytoken,
                    xsellertoken: xsellertoken,
                })) {
                    req.flash('success', {
                        message: 'Picpay salvo com sucesso!',
                    });
                } else {
                    req.flash('error', {
                        message: 'Não foi possível alterar o método picpay!',
                    });
                }
            }
        }

        return res.redirect('/painel-de-controle/sistema-de-pagamentos');
    } catch (err) {
        return res.redirect('/');
    }
};

exports.createdonate = async (req, res, next) => {
    try {
        const { method } = req.params;
        const { id_package } = req.body;

        if (method === 'picpay') {
            const id = v4();

            const gateway = await picpayGatewayModel.findOne({});

            if (gateway) {

                const package = await donatepackagesModel.findOne({
                    where: {
                        id: id_package,
                    },
                });

                if (package) {
                    const referenceId = v4();

                    const body = {
                        referenceId: referenceId,
                        callbackUrl: `${process.env.CALLBACK_URL}`,
                        expiresAt: new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)), //5 dias
                        returnUrl: `${process.env.RETURN_URL}/${method}`,
                        value: package.value,
                        buyer: {
                            firstName: 'Gabriel',
                            lastName: 'Silva',
                            document: '461.905.698-70',
                        },
                    };
                      
                    const response = await fetch('https://appws.picpay.com/ecommerce/public/payments', {
                        method: 'post',
                        headers: {
                            'content-type': 'application/json',
                            'x-picpay-token': gateway.xpicpaytoken,
                        },
                        body: JSON.stringify(body),
                    });
                    
                    if (response.status === 200) {
                        const data = await response.json();

                        if (data.referenceId === referenceId) {
                            const donate = await donatesModel.create({
                                id: id,
                                id_user: req.session.user.id,
                                id_package: id_package,
                                method: 'picpay',
                                state: 0,
                                reference_id: referenceId,
                                payment_url: data.paymentUrl,
                                qrcode: data.qrcode.base64,
                                content: data.qrcode.content,
                            });
                    
                            if (donate) {
                                return res.redirect(`/painel-de-controle/finalizar-doacao/${id}`);
                            } else {
                                req.flash('error', {
                                    message: 'Não foi possível gerar o pagamento!',
                                });
                            }
                        } else {
                            req.flash('error', {
                                message: 'Houve algum problema no método de pagamento!',
                            });
                        }
                    } else {
                        req.flash('error', {
                            message: 'Não foi possível utilizar o método de pagamento!',
                        });
                    }
                } else {
                    req.flash('error', {
                        message: 'Pacote inexistente!',
                    });
                }
            } else {
                req.flash('error', {
                    message: 'Método de pagamento desabilitado!',
                });
            }    
        } else {
            req.flash('error', {
                message: 'Método de pagemento inexistente!',
            });
        }

        return res.redirect('/painel-de-controle/doacoes');
    } catch (err) {
        return res.redirect('/painel-de-controle/doacoes');
    }
};