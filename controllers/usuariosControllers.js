const db = require('../models');
const Usuarios = db.usuarios;
const Op = db.Sequelize.Op;

// TODO: Se listan los datos
const getUsuarios = async (req, res) => {
    try {
        const users = await Usuarios.findAll({
            where: {
                eliminado: 'NO'
            }
        });
        // console.log(users);
        res.json(
            users
        );
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: err.msg || 'Hubo error inesperado al momento de traer los datos'
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params

        const user = await Usuarios.findByPk({
            where: {
                id
            }
        })

        res.json(user)
    } catch (error) {
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
                ok: false,
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

        res.json(
            newUsers
        );
    } catch (error) {
        return res.status(500).json({
            msg: err.msg || 'Hubo error inesperado al momento de crear el usuario'
        });
    }
}

// TODO: Se actualizan los datos del usuario
const actualizarUsuarios = async (req, res) => {

    try {
        const { id } = req.params;

        const { nombre, apellidos, username, password, inss, email, role } = req.body;

        const user = await Usuarios.findByPk(id);
        console.log(user);

        if (user.email !== email) {

            const existemail = await Usuarios.findOne({
                where: { email: email }
            });

            if (existemail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        user.nombre = nombre
        user.apellidos = apellidos
        user.username = username
        user.password = password
        user.inss = inss
        user.email = email
        user.role = role

        await user.save()
        res.json(user);
    } catch (error) {
        return res.status(500).json({
            msg: err.msg || 'Hubo error inesperado al momento de actualizar el usuario'
        });
    }
}

// TODO: Se actualiza el estado del campo eliminado, el cual es NO por defecto a SI, y de esta manera no 
const borrarUsuarios = async (req, res) => {
    // console.log(req.params.id)

    try {
        await Usuarios.update(
            {
                eliminado: 'SI'
            },
            {
                where: { id: req.params.id },
            }
        );
        res.sendStatus(204).json({
            msg: 'Usuario eliminado con exito'
        });
    } catch (error) {
        return res.status(500).json({
            msg: err.msg || 'Hubo error inesperado al momento de eliminar el usuario'
        });
    }
}

module.exports = {
    getUsuarios,
    getUserById,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuarios
}