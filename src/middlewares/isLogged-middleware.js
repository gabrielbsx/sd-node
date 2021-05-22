const Game = new (require('../helpers/game'))();
const bcrypt = require('bcryptjs');

const logged = async (req, res, next) => {
    try {
        if (req.session.user) {
            return next();
        } else {
            req.flash('error', {
                message: 'Efetue o login para entrar no painel de controle!',
            });
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

const notLogged = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return next();
        }
        return res.redirect('/home');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

module.exports = {
    logged,
    notLogged,
};