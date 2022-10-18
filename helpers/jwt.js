const jwt = require('jsonwebtoken');

const generarJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id
        }

        jwt.sign(
            payload, process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Error al generar token');
                } else {
                    resolve(token);
                }
            }
        )
    });
}

module.exports = { generarJWT };