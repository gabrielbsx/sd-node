const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const secret = process.env.JWT_SECRET;
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                status: 'error',
                auth: false,
                message: 'Não foi possível efetuar a requisição!',
            });
        }
        jwt.verify(token, secret, (err, decoded) => {
            console.log(err)
            if (err) return res.status(403).json({ status: 'error', auth: false, message: 'Não foi possível autenticar!', });
            req.user = decoded;
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