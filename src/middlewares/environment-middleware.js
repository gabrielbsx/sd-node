require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        res.locals.recaptcha_site = process.env.RECAPTCHA_SITE;
        res.locals.dump = require('util').inspect;
        res.locals.user = req.session.user;
        res.locals.url = req.url;
        return next();
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};