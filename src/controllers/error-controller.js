exports.error404 = (req, res, next) => {
    return res.render('site/layouts/portal', {
        page: '404',
    });
};

exports.error500 = (req, res, next) => {
    return res.render('site/layouts/portal', {
        page: '500',
    });
};