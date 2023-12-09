const { response } = require("express");
// Importamos el modelo en este caso categoria
const { Categoria } = require('../models');

// obtenerCategorias - paginado - total de categorias - Populate
const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json(
        {
            total,
            usuarios: categorias
        }
    );
}



// obtenerCategoira - populate
const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');
    res.json(categoria);
}



const crearCategoria = async (req, res = response) => {
    // 1 Para extraer el nombre, esto viene desde la request
    const nombre = req.body.nombre.toUpperCase();

    // Lo que va entre llaves es el nombre de linea anterior
    const categoriaDB = await Categoria.findOne({ nombre });

    // Verificar si existe ya una categoria en la DB
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    // Generar la data a guardar, esto es en base al schema definido
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    // Generamos la nueva categoria
    const categoria = new Categoria(data);

    //Guardamos en la base de datos
    await categoria.save();
    // console.log('122111111111111111');
    //CUando se crea algo en DB es el status 201
    res.status(201).json(categoria);


}

// actualizarCategoria

const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;


    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);
}

// borrarCategoria - estadp : false
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(categoriaBorrada);
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}