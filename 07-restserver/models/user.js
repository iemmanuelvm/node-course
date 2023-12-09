// Como quiero almamcenar mi objeto en la base de datos

// {
//     nombre: 'Emmanuel',
//     correo: 'emmanuel@emmanuel.com',
//     password: '123456789',
//     img: 'url/img.png',
//     rol: 'rol',
//     estado: false,
//     google: false
// }

const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre : {
        type: String,
        required : [true, 'El nombre es obligatorio']
    },
    correo : {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password : {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img : {
        type: String
    },
    rol : {
        type: String,
        required: true
        // enum: ['ADMIN_ROLE', 'SUPER_ROLE']
    },
    estado : {
        type: Boolean,
        default: true
    },
    google : {
        type: Boolean,
        default: false
    },
});

//SObreescribir metodos, funcion que permite no regresar cosas inecesarias
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model("Usuario", UsuarioSchema);
