const bcrypt = require('bcryptjs');
const db = require('../models');
const tokenServices = require('../services/token');

exports.login = async(req, res, next) => {
    try {
        const user = await db.Usuario.findOne({ where: { email: req.body.email }});
        if (user) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {
                const token = await tokenServices.encode(user);
                res.status(200).json({ 
                    auth: true,
                    tokenReturn: token 
                });
            } else {
                res.status(401).json({
                    auth: false,
                    tokenReturn: null,
                    reason: 'Invalid Password'
                });
            }
        } else {
            res.status(404).json({
                error: 'User Not Found.'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error!'
        })
        next(error);
    }
};

exports.list = async(req, res, next) => {
    try {
        const user = await db.Usuario.findAll();
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send({
                message: 'There is not user in the system'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error!'
        })
    }
};

exports.register = async(req, res, next) => {
    try {
        const user = await db.Usuario.findOne({where: {email: req.body.email}});
        if (user) {
            res.status(409).send({
                message: 'Sorry your request has a conflict with our system state'
            })
        } else {
            res.body.password = bcrypt.hashSync(req.body.password, 8);
            const user = await db.Usuario.create(req.body);
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error!'
        })
        next(error);
    }
};

exports.update = async(req, res, next) => {
    try {
        const user = await db.Usuario.findOne({where: {email: req.body.email}});
        if (user) {
            const user = await db.Usuario.update({nombre: req.body.nombre},
                {
                where: {
                    email: req.body.email
                }
            });
            res.status(202).json(user);
        } else {
            res.status(404).send({
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error!'
        })
        next(error);
    }
}