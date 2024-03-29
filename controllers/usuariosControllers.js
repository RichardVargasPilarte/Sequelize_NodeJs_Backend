const db = require('../models');
const Usuarios = db.usuarios;
const Op = db.Sequelize.Op;

const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

// TODO: Se listan los datos
const getUsuarios = async (req, res) => {
    try {

        const users = await Usuarios.findAll({
            where:
            {
                eliminado: 'NO'
            },
            order: [
                ['id', 'DESC']
            ]
        });
        // console.log(users);

        res.json(
            users
        );
    } catch (err) {
        return res.status(500).json({
            ok: true,
            msg: err.msg || 'Hubo error inesperado al momento de traer los datos'
        });
    }
}


// TODO: Se realiza la busqueda por nombre, apellidos, username
const busqueda = async (req, res) => {
    try {
        const busqueda = {};
        const { username } = req.query;

        if (username) busqueda.username = { [Op.iLike]: `%${username}%` }

        const resp = await Usuarios.findAll({
            where: {
                ...busqueda
            },
            order: ['id']
        });

        if (resp.busqueda <= 0) {
            res.status(404).send({
                message: 'No hay usuario registrado'
            });
        }

        // console.log(resp);
        // console.log(busqueda);
        res.json(
            resp
        );
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Hubo error inesperado al momento de traer los datos'
        });
    }
}

// TODO: Se obtiene el usuario según su Id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params

        const user = await Usuarios.findOne({
            where: {
                id: req.params.id
            }
        });
        // console.log(id);
        res.json(user)
    } catch (err) {
        return res.status(500).json({
            ok: true,
            msg: err.msg || 'Hubo error inesperado al momento de traer el dato'
        });
    }
}

// TODO: Se crean los usuarios
const crearUsuarios = async (req, res) => {
    const { nombre, apellidos, username, password, inss, eliminado, email, role } = req.body;

    try {

        const existeUserName = await Usuarios.findOne({
            where: { username: username }
        });

        // Se comprueba si el username existe, en caso de ser cierto
        // se muestra por consola un mensaje diciwendo que el username
        // ya existe

        if (existeUserName) {
            return res.status(400).json({
                msg: 'El nombre de usuario ya esta registrado'
            });
        }

        // En caso que el username no este registrado se procede a crear el registro en la base de datos
        const newUsers = await Usuarios.create({
            nombre,
            apellidos,
            username,
            password,
            inss,
            eliminado,
            email,
            role,
        });

        // TODO: Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        newUsers.password = bcryptjs.hashSync(password, salt);

        // TODO: Guarda USUARIO
        await newUsers.save();

        // TODO: Generar token de jwt
        const token = await generarJWT(newUsers.id)

        res.json({
            ok: true,
            newUsers,
            token
        });

    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Hubo error inesperado al momento de crear el usuario'
        });
    }
}

// TODO: Se actualizan los datos del usuario
const actualizarUsuarios = async (req, res) => {

    const {id} = req.params;
    try {

        // const {id} = req.params;
        const { nombre, apellidos, username, inss, email, role } = req.body;

        const usuarioDB = await Usuarios.findByPk(id);
        // const findById = await Usuarios.findOne({
        //     where: {
        //         id
        //     }
        // });
        console.log(id);

        if(!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: `No existe usuario ${id}`
            });
        }

        if (nombre) usuarioDB.nombre = nombre;
        if (apellidos) usuarioDB.apellidos = apellidos;
        if (username) usuarioDB.username = username;
        if (inss) usuarioDB.inss = inss;
        if (email) usuarioDB.email = email;
        if (role) usuarioDB.role = role;

        const updatePerson = await usuarioDB.save();

        if(!updatePerson) {
            return res.status(404).json({
                ok: false,
                msg: `Fallo actualización del usuario ${id}`
            });
        }

        // Actualizaciones
        // const campos  = req.body;

        // if (usuarioDB.username !== username) {
        //     const existeUserName = await Usuarios.findOne({
        //         where: { username }
        //     })

        //     if (existeUserName) {
        //         return res.status(400).json({
        //             ok: false,
        //             msg: 'Ya existe un usuario con ese nombre de usuario'
        //         })
        //     }
        // }

        // campos.username = username;

        // const usuarioActualizado = await Usuarios.update(id, campos, {new: true});

        // const { nombre, apellidos, username, password, inss, eliminado, email, role } = req.body;

        // const user = await Usuarios.findByPk(uid);
        // console.log(user);

        // if (user.username !== username) {

        //     const existeusername = await Usuarios.findOne({
        //         where: { username: username }
        //     });

        //     if (existeusername === existeusername) {
        //         return res.status(200).json({
        //             ok: false,
        //             msg: 'Te actualizo ahorita'
        //         })
        //     } else {
        //         return res.status(400).json({
        //             ok: false,
        //             msg: 'Ya existe un usuario con ese username'
        //         })
        //     }
        // }

        // user.nombre = nombre
        // user.apellidos = apellidos
        // user.username = username
        // user.password = password
        // user.inss = inss
        // user.eliminado = eliminado
        // user.email = email
        // user.role = role

        // await user.save()
        res.json({
            ok: true,
            user: updatePerson
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Hubo error inesperado al momento de actualizar el usuario'
        });
    }
}

// TODO: Se actualiza el estado del campo eliminado, el cual es NO por defecto a SI, y de esta manera no 
const borrarUsuarios = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await Usuarios.findByPk(id);

        user.eliminado = 'SI'

        await user.save()

        return res.status(204).json({
            msg: 'Usuario eliminado con exito'
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Hubo error inesperado al momento de eliminar el usuario'
        });
    }
}

module.exports = {
    getUsuarios,
    busqueda,
    getUserById,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuarios
}