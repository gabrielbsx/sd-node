const axios = require('axios');

exports.index = async (req, res, next) => {
    try {
        return res.render('site/layouts/portal', {
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