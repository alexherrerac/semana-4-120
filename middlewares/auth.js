const tokenServices = require('../services/token.js');

module.exports = {
    verificarAdministrador: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No hay Token'
            });
        } 
            const response = await tokenServices.decode(req.headers.token);
            if (response.rol == 'Administrador') {
                next();
            } else {
                return res.status(403).send({
                    message: 'Usuario No autorizado'
                });
            }
        
    },

    verificarVendedor: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        } 
            const response = await tokenServices.decode(req.headers.token);
            if (response.rol == 'Administrador' || response.rol == 'Vendedor') {
                next();
            } else {
                return res.status(403).send({
                    message: 'Usuario No autorizada'
                });
            }
        
    }
}