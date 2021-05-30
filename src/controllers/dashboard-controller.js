const donatepackagesModel = require('../models/donatepackages-model');
const donateitemsModel = require('../models/donateitems-model');
const paymentGatewayModel = require('../models/paymentgateway-model');
const guidesModel = require('../models/guides-model');
const guideArticlesModel = require('../models/guidearticles-model');
const newsModel = require('../models/news-model');
const usersModel = require('../models/users-model');
const donatesModel = require('../models/donates-model');

exports.index = async (req, res, next) => {
    try {
        return res.render('site/layouts/dashboard', {
            page: 'home',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    } 
};

exports.guildmark = async (req, res, next) => {
    try {
        return res.render('site/layouts/dashboard', {
            page: 'guildmark',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.support = async (req, res, next) => {
    try {
        return res.render('site/layouts/dashboard', {
            page: 'support',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.changepassword = async (req, res, next) => {
    try {
        return res.render('site/layouts/dashboard', {
            page: 'changepassword',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.recoverynumericpassword = async (req, res, next) => {
    try {
        return res.render('site/layouts/dashboard', {
            page: 'recoverynumericpassword',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.listnews = async (req, res, next) => {
    try {
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }

        const news = await newsModel.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5 || 0,
            include: [{
                model: usersModel,
            }],
        });
        
        return res.render('site/layouts/dashboard', {
            page: 'news',
            data: news,
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
            data: err,
        });
    }
};

/*
exports.donate = async (req, res, next) => {
    try {
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const donate = await donatepackagesModel.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5 || 0,
            include: [{
                model: donateitemsModel,
            }],
        });
        return res.render('site/layouts/dashboard', {
            page: 'donate',
            data: donate,
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.donatepackages = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (typeof id !== 'undefined') {
            const data = await donatepackagesModel.findOne({
                where: {
                    id: id,
                },
            });
            return res.render('site/layouts/dashboard', {
                page: 'donatepackages',
                data: data,
            });
        }
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const data = await donatepackagesModel.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5 || 0,
        });
        return res.render('site/layouts/dashboard', {
            page: 'donatepackages',
            data: data,
        });
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/pacotes-de-doacao');
    }
};

exports.donateitems = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (typeof id !== 'undefined') {
            const data = await donateitemsModel.findOne({
                where: {
                    id: id,
                },
            });
            return res.render('site/layouts/dashboard', {
                page: 'donateitems',
                data: data,
            });
        }
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const data = await donateitemsModel.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5 || 0,
        });
        const packages = await donatepackagesModel.findAll();
        return res.render('site/layouts/dashboard', {
            page: 'donateitems',
            data: data,
            packages: packages,
        });
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/painel-de-controle/pacotes-de-doacao');
    }
};

exports.changedonatepackage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const packages = await donatepackagesModel.findOne({ where: { id: id, } });
        if (packages) {
            return res.render('site/layouts/dashboard', {
                page: 'updatedonatepackages',
                data: packages,
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível encontrar o pacote de doação!',
            });
        }
        return res.redirect('/painel-de-controle/pacotes-de-doacao');
    } catch (err) {
        req.flash('error', {
            message: 'Não foi possível encontrar o pacote de doação!',
        });
        return res.redirect('/painel-de-controle/pacotes-de-doacao');
    }
};

exports.listdonateitems = async (req, res, next) => {
    try {
        const { id } = req.params;
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const items = await donateitemsModel.findAndCountAll({
            where: {
                id_package: id,
            },
            limit: 5,
            offset: (page - 1) * 5 || 0,
        });
        if (items) {
            return res.render('site/layouts/dashboard', {
                page: 'listdonateitems',
                data: items,
                id_package: id,
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível encontrar o pacote de doação!',
            });
        }
        return res.redirect('/painel-de-controle/pacotes-de-doacao');
    } catch (err) {
        req.flash('error', {
            message: 'Não foi possível encontrar o pacote de doação!',
        });
        return res.redirect('/painel-de-controle/pacotes-de-doacao');
    }
};

exports.changedonateitem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await donateitemsModel.findOne({
            where: {
                id: id,
            }
        });
        const packages = await donatepackagesModel.findAll();
        if (item) {
            return res.render('site/layouts/dashboard', {
                page: 'updatedonateitems',
                data: item,
                packages: packages,
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível encontrar a bonificação!',
            });
        }
        return res.redirect('/painel-de-controle/pacotes-de-doacao');
    } catch (err) {
        req.flash('error', {
            message: 'Não foi possível encontrar a bonificação!',
        });
        return res.redirect('/painel-de-controle/pacotes-de-doacao');
    }
};*/

exports.paymentgateway = async (req, res, next) => {
    try {
        const gateways = await paymentGatewayModel.findAll();

        return res.render('site/layouts/dashboard', {
            page: 'paymentgateway',
            data: gateways,
        });
    } catch (err) {
        return res.redirect('/painel-de-controle');
    }
};

exports.updatepaymentgateway = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const data = await paymentGatewayModel.findOne({
            where: {
                id: id,
            },
        });

        if (data) {
            return res.render('site/layouts/dashboard', {
                page: 'updatepaymentgateway',
                data: data,
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível encontrar o gateway de pagamento!',
            });
        }
        return res.redirect('/painel-de-controle');
    } catch (err) {
        return res.redirect('/');
    }
};

exports.news = async (req, res, next) => {
    try {
        return res.render('site/layouts/dashboard', {
            page: 'createnews',
        });
    } catch (err) {
        return res.redirect('/');
    }
};

exports.updatenews = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const data = await newsModel.findOne({
            where: {
                slug: slug,
            },
        });

        if (!data) {
            return res.redirect('/painel-de-controle/noticias');
        }

        return res.render('site/layouts/dashboard', {
            page: 'updatenews',
            data: data,
        });
    } catch (err) {
        return res.redirect('/');
    }
};

exports.guides = async (req, res, next) => {
    try {
        const { id } = req.params;
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const data = await guidesModel.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5 || 0,
        });

        return res.render('site/layouts/dashboard', {
            page: 'guides',
            data: data,
        });
    } catch (err) {
        return res.redirect('/');
    }
};

exports.deletenews = async (req, res, next) => {
    try {
        const { slug } = req.params;

        if (await newsModel.destroy({
            where: {
                slug: slug,
            },
        })) {
            req.flash('success', {
                message: 'Notícia deletada com sucesso!',
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível deletar a notícia!',
            });
        }

        return res.redirect('/painel-de-controle/noticias');
    } catch (err) {
        return res.redirect('/');
    }
};

exports.createguide = async (req, res, next) => {
    try {
        return res.render('site/layouts/dashboard', {
            page: 'createguide',
        });
    } catch (err) {
        return res.redirect('/');
    }
};

exports.updateguide = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const data = await guidesModel.findOne({
            where: {
                slug: slug,
            },
        });
        
        if (!data) {
            return res.redirect('/painel-de-controle/guia-do-jogo');
        }

        return res.render('site/layouts/dashboard', {
            page: 'updateguide',
            data: data,
        });
    } catch (err) {
        return res.redirect('/');
    }
};

exports.deleteguide = async (req, res, next) => {
    try {
        const { slug } = req.params;

        if (await guideArticlesModel.destroy({
            where: {
                slug: slug,
            },
        })) {
            req.flash('success', {
                message: 'Guia deletada com sucesso!',
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível deletar a guia!',
            });
        }
        
        return res.redirect('/painel-de-controle/guia-do-jogo');
    } catch (err) {
        return res.redirect('/');
    }
};

exports.logout = async (req, res, next) => {
    try {
        delete req.session.user;
        req.flash('success', {
            message: 'Deslogado com sucesso!',
        });
        return res.redirect('/');
    } catch (err) {
        return res.redirect('/');
    }
};

exports.donatepackages = async (req, res, next) => {
    try {
        const { id } = req.params;
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const data = await donatepackagesModel.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5 || 0,
            include: [{
                model: donateitemsModel,
            }],
        });

        return res.render('site/layouts/dashboard', {
            page: 'donatepackages',
            data: data,
        });
    } catch (err) {
        console.log(err)
        return res.redirect('/');
    }
};

exports.donate = async (req, res, next) => {
    try {
        const { id } = req.params;
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const data = await donatepackagesModel.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5 || 0,
            include: [{
                model: donateitemsModel,
            }],
        });

        return res.render('site/layouts/dashboard', {
            page: 'donate',
            data: data,
        });
    } catch (err) {
        return res.redirect('/');
    }
};

exports.createdonatepackages = async (req, res, next) => {
    try {
        return res.render('site/layouts/dashboard', {
            page: 'createdonatepackage',
        });
    } catch (err) {
        return res.redirect('/');
    }
};

exports.updatedonatepackages = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const data = await donatepackagesModel.findOne({
            where: {
                slug: slug,
            },
        });

        if (!data) {
            return res.redirect('/painel-de-controle/pacote-de-doacoes');
        }

        return res.render('site/layouts/dashboard', {
            page: 'updatedonatepackages',
            data: data,
        });
    } catch (err) {
        return res.redirect('/');
    }
};

exports.createdonateitems = async (req, res, next) => {
    try {
        const data = await donatepackagesModel.findAll();
        return res.render('site/layouts/dashboard', {
            page: 'createdonateitems',
            data: data,
        });
    } catch (err) {
        return res.redirect('/');
    }
};

exports.updatedonateitems = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const data = await donateitemsModel.findOne({
            where: {
                slug: slug,
            },
        });

        const packages = await donatepackagesModel.findAll();

        return res.render('site/layouts/dashboard', {
            page: 'updatedonateitems',
            data: data,
            packages: packages,
        });
    } catch (err) {
        return res.redirect('/');
    }
};

exports.listdonateitems = async (req, res, next) => {
    try {
        const { slug } = req.params;

        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }

        const data = await donatepackagesModel.findOne({
            where: {
                slug: slug,
            }
        });

        if (data) {
            const donateitems = await donateitemsModel.findAndCountAll({
                where: {
                    id_package: data.id,
                },
                limit: 5,
                offset: (page - 1) * 5 || 0,
            });

            return res.render('site/layouts/dashboard', {
                page: 'listdonateitems',
                data: donateitems,
            });
        } else {
            req.flash('error', {
                message: 'Pacote inexistente!',
            });
        }

        return res.redirect('/painel-de-controle/pacote-de-doacoes');
    } catch (err) {
        return res.redirect('/');
    }
};

exports.deletedonatepackages = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const package = await donatepackagesModel.findOne({
            where: {
                slug: slug,
            },
        });

        if (package) {
            if (await donateitemsModel.destroy({
                where: {
                    id_package: package.id,
                },
            })) {
                if (await donatepackagesModel.destroy({
                    where: {
                        slug: slug,
                    },
                })) {
                    req.flash('success', {
                        message: 'Pacote de doação deletado com sucesso!',
                    });
                } else {
                    req.flash('error', {
                        message: 'Não foi possível deletar o pacote de doação!',
                    });
                }
            } else {
                req.flash('error', {
                    message: 'Não foi possível deletar os itens contidos do pacote de doações!',
                });   
            }
        } else {
            req.flash('error', {
                message: 'Pacote inexistente!',
            });
        }
        return res.redirect('/painel-de-controle/pacote-de-doacoes');
    } catch (err) {
        return res.redirect('/');
    }
};

exports.deletedonateitems = async (req, res, next) => {
    try {
        const { slug } = req.params;

        if (await donateitemsModel.destroy({
            where: {
                slug: slug,
            },
        })) {
            req.flash('success', {
                message: 'Item deletado com sucesso do pacote!',
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível deletar o item do pacote!',
            });
        }

        return res.redirect('/painel-de-controle/pacote-de-doacoes');
    } catch (err) {
        return res.redirect('/');
    }
};

exports.purchase = async (req, res, next) => {
    try {
        const { slug, method } = req.params;

        if (method === 'picpay') {
            const data = await donatepackagesModel.findOne({
                where: {
                    slug: slug,
                },
            });
    
            if (data) {
                return res.render('site/layouts/dashboard', {
                    page: 'purchase',
                    method: method,
                    data: data,
                });
            } else {
                req.flash('error', {
                    message: 'Não foi possível encontrar o pacote de doação!',
                });
            }

        } else {
            req.flash('error', {
                message: 'Método de pagamento não existente!',
            });
        }

        return res.redirect('/painel-de-controle/doacoes');
    } catch (err) {
        return res.redirect('/');
    }
};

exports.historydonate = async (req, res, next) => {
    try {
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        
        const donate = await donatesModel.findAndCountAll({
            where: {
                id_user: req.session.user.id,
            },
            limit: 5,
            offset: (page - 1) * 5 || 0,
            include: [
                {
                    model: donatepackagesModel,
                    include: [{
                        model: donateitemsModel,
                    }],
                },
                {
                    model: usersModel,
                },
            ],
        });

        return res.render('site/layouts/dashboard', {
            page: 'historydonate',
            data: donate,
        });
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
    
            const donate = await donatesModel.create({
                id_user: req.session.user.id,
                id_package: id_package,
                state: 0,
            });
    
            if (donate) {
                return res.render('site/layouts/dashboard', {
                    page: 'makedonate',
                    data: donate,
                });
            } else {
                req.flash('error', {
                    message: 'Não foi possível gerar o pagamento!',
                });
            }
        } else {
            req.flash('error', {
                message: 'Método de pagemento inexistente!',
            });
        }

        return res.redirect('/painel-de-controle/doacoes');
    } catch (err) {
        return res.redirect('/');
    }
};