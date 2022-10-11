const db = require('../models');
const Usuarios = db.usuarios;
const Op = db.Sequelize.Op;

const { pagination } = require('../helpers/pagination');

// TODO: Se listan los datos
const getUsuarios = async (req, res) => {
    try {

        const users = await Usuarios.findAll({
            where:
            {
                eliminado: 'NO'
            },
            order: ['id']
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

const paginacion = async (req, res) => {

    try {
        const busqueda = {};
        const { nombre, apellidos, username } = req.query;

        const page = req.query.page ? parseInt(req.query.page) : 1;
        const per_page = req.query.per_page ? parseInt(req.query.page) : 1;

        if (nombre) busqueda.nombre = { [Op.like]: `%${nombre}%` }
        if (apellidos) busqueda.apellidos = { [Op.like]: `%${apellidos}%` }
        if (username) busqueda.username = { [Op.like]: `%${username}%` }

        const { count, rows } = await Usuarios.findAndCountAll({
            where: {
                ...busqueda
            },
            offset: 0,
            limit: 10,
            distinct: true,
            order: ['id']
        });

        console.log(pagination);
        const result = pagination({
            data: rows,
            count,
            page,
            per_page
        });

        if (count <= 0) {
            res.status(404).send({
                message: 'No hay usuario registrado'
            });
        }

        // console.log(resp);
        // console.log(busqueda);
        res.status(200).send({
            result
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Hubo error inesperado al momento de traer los datos'
        });
    }
}

// TODO: Se realiza la busqueda por nombre, apellidos, username
const busqueda = async (req, res) => {
    try {
        const busqueda = {};
        const { nombre, apellidos, username } = req.query;

        if (nombre) busqueda.nombre = { [Op.iLike]: `%${nombre}%` }
        if (apellidos) busqueda.apellidos = { [Op.iLike]: `%${apellidos}%` }
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
        res.status(200).send({
            resp
        });
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
        // console.log(user);
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

        res.json(
            newUsers
        );
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Hubo error inesperado al momento de crear el usuario'
        });
    }
}

// TODO: Se actualizan los datos del usuario
const actualizarUsuarios = async (req, res) => {

    try {
        const { id } = req.params;

        const { nombre, apellidos, username, password, inss, eliminado, email, role } = req.body;

        const user = await Usuarios.findByPk(id);
        // console.log(user);

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
        user.eliminado = eliminado
        user.email = email
        user.role = role

        await user.save()
        res.json(user);
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
    paginacion,
    getUserById,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuarios
}