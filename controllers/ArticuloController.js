const db = require('../models');

exports.list = async(req, res, next) => {
    try {
        const register = await db.Articulo.findAll({
            include: [
                {
                    model: db.Categoria,
                    as: 'categoria'
                }
            ]
        });
        // llama al modelo categoria, no mostrar id sino el nombre
        if (register) {
            res.status(200).json(register);
        } else {
            res.status(404).send({
                message: 'There is not categories in the system'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error!'
        })
        next(error);
    }
};

exports.add = async(req, res, next) => {
    try {
        const registro = await db.Articulo.create(req.body);
        res.status(200).json(registro);
    } catch (error) {
        res.status(500).send({
            message: 'Error!'
        })
        next(error);
    }
};

exports.update = async(req, res, next) => {
    try {
        const registro = await db.Articulo.update({codigo: req.body.codigo, nombre: req.body.nombre, categoria: req.body.categoria, descripcion: req.body.descripcion, categoria: req.body.categoria, estado: req.body.estado, precio_venta: req.body.precio_venta},
            {
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
    } catch (error) {
        res.status(500).send({
            message: 'Error!'
        });
        next(error);
    }
};

exports.activate = async(req, res, next) => {
    try {
        const registro = await db.Articulo.update({estado: 1},
            {
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
    } catch (error) {
        res.status(500).send({
            message: 'Error!'
        });
        next(error);
    }
};

exports.deactivate = async(req, res, next) => {
    try {
        const registro = await db.Articulo.update({estado: 0},
            {
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(registro);
    } catch (error) {
        res.status(500).send({
            message: 'Error!'
        });
        next(error);
    }
};