// middlewares/index.js
const validarCampos = require('./validar-campos');
const { validarJWT } = require('./validar-jwt');
const { esAdminRole, tieneRole } = require('./validar-roles');

module.exports = {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole,
};
