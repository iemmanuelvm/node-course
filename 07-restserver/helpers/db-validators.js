const Role = require('../models/role');
const Usuario = require('../models/user');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto')

const esRoleValido = async (rol='') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async (correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo:correo});
    if(existeEmail){
        throw new Error(`El email ${correo} ya esta registrado en la base de datos`);
        // return res.status(400).json({
        //     msg : 'EL correo ya existe'
        // });
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`);
    }
}

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id no existe ${id}`);
    }
}

const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id no existe ${id}`);
    }
}

// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida. ${colecciones} permitidas`);
    }

    return true
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
};