const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

//Modelo
const Usuario = require('../models/user');
const { generarJWT } = require("../helpers/generar-jwt");
const { google_verify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el mail existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            });
        }

        // Verificar la contrasena
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }



        // Generar el JWT
        const token = await generarJWT(usuario.id);

        //Aqui regreso una respuesta que se haya generado
        res.json({
            msg: 'Login ok',
            usuario,
            token
            // "correo" : correo,
            // "password" : password
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
}


const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {

        // const googleUser = await google_verify(id_token);
        
        const {nombre, img, correo} = await google_verify(id_token);
        
        console.log({nombre, img, correo})

        let usuario = await Usuario.findOne({correo});
        
        console.log({usuario})
        
        
        if(!usuario){
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                // img,
                rol: "ADMIN_ROL",
                google: true
            };
            console.log(data);

            usuario = new Usuario(data);
            console.log('+++++++++++++');
            console.log(usuario);
            await usuario.save();
        }
        //SI el usuario en DB
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);

        console.log(token);
        // console.log(googleUser);
        res.json({
            // msg: 'Todo bien!',
            // id_token
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            // ok: false,
            msg: 'Token de Google no es valido'
        })
    }


}


module.exports = {
    login,
    googleSignIn
};