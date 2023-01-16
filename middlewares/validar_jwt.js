const jwt = require('jsonwebtoken');
const db = require('../models');
const Usuarios = db.usuarios;


const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'No hay token en la petición'
            }
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = id;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

const validarAdminRole = async (req, res, next) => {

    const uid = req.id;

    try {
        const usuarioDB = await Usuarios.findByPk(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos para realizar esta acción'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const validarAdminRole_o_MismoUsuario = async (req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {
        const usuarioDB = await Usuarios.findByPk(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos para realizar esta acción'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}


module.exports = { validarJWT, validarAdminRole, validarAdminRole_o_MismoUsuario };