const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const secret = process.env.SECRET;
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                status: 'error',
                auth: false,
                message: 'Failed to authenticate!',
            });
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return res.status(403).json({ status: 'error', auth: false, message: 'Não foi possível autenticar o pacote!', });
            //req.body = decoded;
            return next();
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            auth: false,
            message: 'Internal Error!',
        });
    }
};