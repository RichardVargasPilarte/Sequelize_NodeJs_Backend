const { Router } = require('express'); // import Router from express

const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

const { login, renewToken } = require('../controllers/authControllers');

const router = Router(); // create an instance of Router

router.post('/',
    [
        body('username', 'El nombre de usuario obligatorio').not().isEmpty(),
        body('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

router.get('/renew', 
    validarJWT,
    renewToken
);

module.exports = router;