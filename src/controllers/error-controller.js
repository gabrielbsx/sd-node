exports.error404 = (req, res, next) => {
    return res.status(404).render('dashboard/pages/errors/404');
};

exports.error500 = (req, res, next) => {
    return res.status(404).render('dashboard/pages/errors/500');
};