const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta='') => {

    return new Promise((resolve, reject) => {
        
        const { archivo } = files;
        console.log(archivo);

        console.log(files);
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];


        // Validar la extension

        if (!extensionesValidas.includes(extension)) {
            reject(`La extension ${extension} no es permitida ${extensionesValidas}`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        // Construccion del path donde hay que colocar el archivo
        // Crear un directorio de nombre uploads
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        //Funcion que mueve el archivo
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
                // return res.status(500).json({ err });
            }

            // res.json({ msg: 'File uploaded to ' + uploadPath });
            resolve(uploadPath);
        });
    })




}

module.exports = {
    subirArchivo
}