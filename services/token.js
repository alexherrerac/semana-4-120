const jwt = require('jsonwebtoken');
const models = require('../models');

const checkToken = async(token) => {
    let localID = null;
    try {
        const { id } = await jwt.decode(token);
        localID = id;
    } catch (error) {
        return false;
    }
    const user = await models.Usuario.findOne({ where: {
        id : localID
    }});

    if (user) {
        const token = jwt.sign({ id: localID }, 'FraseSecretaParaCodificar', { expiresIn: 86400 });
        return {
            token,
            rol: user.rol
        }
    } else {
        return false;
    }
};

module.exports = {
    //genera el token
    encode: async(user) => {
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol
        }, 'FraseSecretaParaCodificar', {
            expiresIn: 86400,
        }
        );
        return token;
    },

    //permite decodificar el token
    decode: async(token) => {
        try {
            const { _id } = await jwt.verify(token, 'FraseSecretaParaCodificar');
            const user = await models.Usuario.findOne({ where: {
                id : _id
            }});
            if (user) {
                return user
            } else {
                return false;
            }
        } catch (error) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}