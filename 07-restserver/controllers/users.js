const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');


//controller 1
const usuariosGet = async (req = request, res = response) => {

    // const query = req.query;
    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find(query)
    // .limit(Number(limite))
    // .skip(Number(desde));

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json(
        {
            // resp
            // total,
            // usuarios
            total,
            usuarios
        }
    );
}

//controller 2
const usuariosPut = async (req, res) => {

    // const id = req.params.id;
    // const {} = req.params;

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: Validar contra base de datos
    if (password) {
        //Encriptar la contrasena
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }


    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

//controller 3
const usuariosPost = async (req, res) => {
    //Se puede pasar todo el objeto literal
    // const body = req.body;
    //Los argumentos de usuario se le van a mandar al modelo de usuario
    // const usuario = new Usuario(body);



    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });





    //Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Para guardar la instancia
    await usuario.save();

    //Podemos desestructurar la informacion
    // const {nombre, edad} = req.body;

    res.status(200).json(
        {
            // msg: 'post API - controlador',
            // body: body
            // nombre,
            // edad,
            usuario: usuario
        }
    );
}

//controller 4
const usuariosDelete = async (req, res) => {

    const {id} = req.params;

    // const uid = req.uid;

    // Fisicamente lo  borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    const usuarioAutenticado = req.usuario;


    res.json(
        {
            usuario,
            // usuarioAutenticado,
            // uid
            // id: id,
            // msg: 'delete API - controlador',
        }
    );
}

//controller 5
const usuariosPatch = (req, res) => {
    res.json(
        {
            msg: 'patch API - controlador',
        }
    );
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
};