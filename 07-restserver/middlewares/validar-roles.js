const { response } = require("express");


const esAdminRole = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROL') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }

    next();
}

const tieneRole = (...roles) => {
    // Hay que regresar un callback con los argumentos por dafaul req, res, next
    // Esta es la funcion que va retornar para ejecutarse como middleware
    return (req, res = response, next) => {
        // console.log(roles, req.usuario.rol);
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se requiere verificar el role sin validar el token primero'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg : `El servicio requiere uno de estos roles ${roles}`
            });
        }



        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
};