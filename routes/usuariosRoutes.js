const {Router} = require('express'); // import Router from express
const {getUsuarios , getUserById , crearUsuarios, actualizarUsuarios, borrarUsuarios} = require('../controllers/usuariosControllers');

const router = Router(); // create an instance of Router

// TODO: Ruta para listar todos los usuarios
// router.get( '/', usuarios.findAll);

router.get('/', getUsuarios);

// TODO: Ruta para crear nuevos usuarios
// router.post( '/', usuarios.create);

router.post( '/', crearUsuarios);

// TODO: Ruta para obtener un usuario mediante su id
// router.get( '/:id', usuarios.findOne);
router.get( '/:id', getUserById);

// TODO: Ruta para actualizar un usuario
// router.put( '/:id', usuarios.update);
router.put( '/:id', actualizarUsuarios)

// TODO: Ruta para boorar un usuarios
// router.delete( '/:id', usuarios.delete)
router.delete( '/:id', borrarUsuarios);

module.exports = router;
