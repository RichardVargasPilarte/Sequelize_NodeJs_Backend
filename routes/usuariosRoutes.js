const { Router } = require('express'); // import Router from express

const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');

const { getUsuarios, busqueda, getUserById, crearUsuarios, actualizarUsuarios, borrarUsuarios } = require('../controllers/usuariosControllers');

const router = Router(); // create an instance of Router

// TODO: Ruta para listar todos los usuarios
router.get('/', getUsuarios);

//TODO: Ruta para realizar la busqueda de los usuarios según los parametros del controlador
router.get('/busqueda', busqueda);


// TODO: Ruta para crear nuevos usuarios
router.post('/',
    [
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
        body('username', 'El nombre de usuario obligatorio').not().isEmpty(),
        body('password', 'La contraseña es obligatoria').not().isEmpty(),
        body('inss', 'El número de inss es obligatorio').not().isEmpty(),
        body('email', 'El correo institucional es obligatorio').isEmail(),
        body('role', 'El rol de usuario es obligatorio').not().isEmpty(),
        validarCampos
    ], crearUsuarios);

// TODO: Ruta para obtener un usuario mediante su id
router.get('/:id', getUserById);

// TODO: Ruta para actualizar un usuario
router.put('/:id', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    body('username', 'El nombre de usuario obligatorio').not().isEmpty(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    body('inss', 'El número de inss es obligatorio').not().isEmpty(),
    body('email', 'El correo institucional es obligatorio').isEmail(),
    body('role', 'El rol de usuario es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuarios)

// TODO: Ruta para boorar un usuarios
router.delete('/:id', borrarUsuarios);

module.exports = router;
