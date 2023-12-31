const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosDelete } = require('../controllers/users');
const { login, googleSignIn } = require('../controllers/auth');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], login);

router.post('/google', [
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    validarCampos,
], googleSignIn);

module.exports = router;