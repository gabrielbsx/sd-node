module.exports = async (req, res, next) => {
    try {
        if (req.session.user.access === 3) {
            return next();
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};