const { response } = require("express");
// Importamos el modelo en este caso categoria
const { Producto } = require('../models');
const { body } = require("express-validator");

// obtenerCategorias - paginado - total de categorias - Populate
const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json(
        {
            total,
            productos
        }
    );
}



// obtenerCategoira - populate
const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
}



const crearProducto = async (req, res = response) => {
    // 1 Para extraer el nombre, esto viene desde la request
    const {estado, usuario, ...body} = req.body;

    // Lo que va entre llaves es el nombre de linea anterior
    const productoDB = await Producto.findOne({ nombre: body.nombre });

    // Verificar si existe ya una categoria en la DB
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    // Generar la data a guardar, esto es en base al schema definido
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    // Generamos la nueva categoria
    const producto = new Producto(data);

    //Guardamos en la base de datos
    await producto.save();
    // console.log('122111111111111111');
    //CUando se crea algo en DB es el status 201
    res.status(201).json(producto);


}

// actualizarCategoria

const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

// borrarCategoria - estadp : false
const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    const productoBorrada = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(productoBorrada);
}



module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}