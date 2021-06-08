const usersModel = require('../models/users-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        console.log(req.body);

        const userExists = await usersModel.findOne({
            where: {
                username: username,
            },
        });

        if (userExists) {
            if (bcrypt.compareSync(password, userExists.password)) {
                const token = jwt.sign({
                    id: userExists.id,
                }, process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                });
                return res.status(200).json({
                    id: userExists.id,
                    token: token,
                });
            }
        }
        return res.status(404).json({
            message: 'Não foi possível efetuar o login!'
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Erro interno!',
        });
    }
};

exports.verify = async (req, res, next) => {
    try {
        if (await usersModel.findOne({
            where: {
                id: req.user.id,
            },
        })) {
            const token = jwt.sign({
                id: req.user.id,
            }, process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            });
            return res.status(200).json({
                token: token,
                id: req.user.id,
            });
        }
        return res.status(404).json({
            message: 'Token inválido!',
        });
    } catch (err) {
        console.log(err);
        console.log(req.user.id);
        return res.status(500).json({
            message: 'Erro interno!',
        });
    }
};

exports.userdata = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await usersModel.findOne({
            where: {
                id: id,
            },
        });
        if (user) {
            delete user.password;
            return res.status(200).json({
                user: [
                    user,
                ],
            });
        }
        return res.status(404).json({
            message: 'Não encontrado!',
        });
    } catch(err) {
        return res.status(500).json({
            message: 'Erro interno!',
        });
    }
};