const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');


require('dotenv').config();

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:  '/api/auth',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            categorias: '/api/categorias',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        };



        // this.usuariosRoutePath = '/api/usuarios';

        //JWT
        // this.authPath = '/api/auth'

        //Conectar a base de datos
        this.conectarDB();
        
        //Middlewares funciones que van anadir otra funcionalidad al web server
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }
    
    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        // FileUpload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));
    }

    routes() {
        //consumo de URL
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.buscar, require('../routes/buscar'));
        this.app.use(this.path.usuarios, require('../routes/users'));
        this.app.use(this.path.productos, require('../routes/productos'));
        this.app.use(this.path.categorias, require('../routes/categorias'));
        this.app.use(this.path.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;