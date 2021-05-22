require('dotenv').config();
const axios = require('axios');

module.exports = async (req, res, next) => {
    try {
        recaptchaResponse = req.body['g-recaptcha-response'];
        delete req.body['g-recaptcha-response'];
        delete req.body['action'];
        if (recaptchaResponse) {
            var verifyRecaptcha = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaResponse}&remoteip=${req.connection.remoteAddress}`;
            const verified = await axios.post(verifyRecaptcha);
            if (verified.data.success) return next();
        }
        req.flash('error', {
            message: 'Recaptcha inválido!',
        });
        if (['/login', '/register', '/recovery'].includes(req.originalUrl)) return res.status(401).redirect('/');
        else return res.status(401).redirect('/home');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500', { err: err, });
    }
};