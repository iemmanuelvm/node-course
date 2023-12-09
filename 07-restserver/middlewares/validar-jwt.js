const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    // console.log(token);
    if(!token){
        return res.status(401).json({
            msg: 'NO hay token en la peticion'
        });
    }
    try {

        //Funcion para verificar el JSON WEB TOKEN
        //extraer el id del usuario
        // const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // console.log(payload)
        // Este uid lo puedo extrar desde los controladores ya que se estan pasando por referencia
        
        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        
        if(!usuario){
            return res.status(401).json({
                msg : 'Token no valido - usuario no existe DB'
            });
        }


        if(!usuario.estado) {
            return res.status(401).json({
                msg : 'Token no valido - usuario con estado false'
            });
        }
        
        req.usuario = usuario;
        
        
        // req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        });
    }
    
}

module.exports = {
    validarJWT,
}