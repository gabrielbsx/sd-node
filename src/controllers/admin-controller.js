exports.donate = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/admin/donatepackages');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};