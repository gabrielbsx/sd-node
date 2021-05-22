module.exports = async (req, res, next) => {
    try {
        return res.redirect('/login');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};