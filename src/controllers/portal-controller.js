const axios = require('axios');
const newsModel = require('../models/news-model');
const newsCommentsModel = require('../models/newscomments-model');
const usersModel = require('../models/users-model');
const forumBoardsModel = require('../models/forumboards-model');
const forumTopicsModel = require('../models/forumtopics-model');
const forumSubTopicsModel = require('../models/forumsubtopics-model');
const droplistModel = require('../models/droplist-model');
const droplistItemsModel = require('../models/droplistitems-model');
const itemicon = require('../helpers/itemicon');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

        const serverlist = await axios.get('http://144.217.19.50/serv00.htm');

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
        var { page } = req.query;
        page = parseInt(page) || 1;
        
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }

        const boards = await forumBoardsModel.findAndCountAll({   
            limit: 5,
            offset: (page - 1) * 5 || 0,
            include: [{
                model: forumTopicsModel,
                include: [{
                    model: forumSubTopicsModel,
                }],
            }],
        });

        return res.render('site/layouts/portal', {
            page: 'community',
            data: boards,
        });
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
};

exports.droplist = async (req, res, next) => {
    try {
        const droplist = await axios.get('http://144.217.19.50/droplist', {
            headers: {
                'Authorization': `Bearer: ${jwt.sign({}, process.env.JWT_SECRET)}`,
                'content-type': 'application/json',
            },
        });

        const npcs = await axios.get('http://144.217.19.50/droplist/npcs', {
            headers: {
                'Authorization': `Bearer: ${jwt.sign({}, process.env.JWT_SECRET)}`,
                'content-type': 'application/json',
            },
        });

        return res.render('site/layouts/portal', {
            page: 'droplist',
            droplist: droplist.data,
            data: npcs.data,
        });
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}