exports.create = async (req, res, next) => {
    try {
        const { title, slug, category, content, name, id_user } = req.body;


        return res.status(404).json({
            status: 'error',
            auth: true,
            message: newsService.message,
        });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: 'Erro interno!',
        })
    }
};

exports.read = async (req, res, next) => {
    try {
        const { slug } = req.body;
        return res.status(200).json({});
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: err.toString(),
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        const { title, slug, category, content } = req.body;
        return res.status(200).json({});
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: err.toString(),
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        return res.status(200).json({});
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: true,
            message: err.toString(),
        });
    }
};