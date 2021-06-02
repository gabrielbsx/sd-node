const axios = require('axios');
const newsModel = require('../models/news-model');
const newsCommentsModel = require('../models/newscomments-model');
const usersModel = require('../models/users-model');

exports.index = async (req, res, next) => {
    try {
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const data = await newsModel.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5 || 0,
        });
        return res.render('site/layouts/portal', {
            data: data,
            page: 'home',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.guides = async (req, res, next) => {
    try {
        return res.render('site/layouts/portal', {
            page: 'guides',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.ranking = async (req, res, next) => {
    try {
        return res.render('site/layouts/portal', {
            page: 'ranking',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.rankingplayers = async (req, res, next) => {
    try {
        return res.render('site/layouts/portal', {
            page: 'rankingplayers',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.rankingcities = async (req, res, next) => {
    try {
        return res.render('site/layouts/portal', {
            page: 'rankingcities',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.serverlist = async (req, res, next) => {
    try {
        const { server } = req.params;

        const serverlist = await axios.get('http://51.222.128.81/serv00.htm');

        return res.send(serverlist.data);
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.login = async (req, res, next) => {
    try {
        return res.render('site/layouts/portal', {
            page: 'login',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.register = async (req, res, next) => {
    try {
        return res.render('site/layouts/portal', {
            page: 'register',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.recovery = async (req, res, next) => {
    try {
        return res.render('site/layouts/portal', {
            page: 'recovery',
        });
    } catch (err) {
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.onenews = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const data = await newsModel.findOne({
            where: {
                slug: slug,
            },
            include: [{
                model: newsCommentsModel,
                include: [{
                    model: usersModel,
                }],
            }],
        });

        if (data) {
            return res.render('site/layouts/portal', {
                page: 'onenews',
                data: data,
            });
        } else {
            req.flash('error', {
                message: 'Notícia inexistente!',
            });
        }

        return res.redirect('/');
    } catch(err) {
        console.log(err);
        return res.render('site/layouts/portal', {
            page: '500',
        });
    }
};

exports.community = async (req, res, next) => {
    try {
        return res.render('site/layouts/portal', {
            page: 'community',
        });
    } catch (err) {
        return res.redirect('/');
    }
};