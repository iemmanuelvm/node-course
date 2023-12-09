const fs = require('fs');
const colors = require('colors');

const crearArchivoTabla = async(multiplicador=1, hasta=1, listar=false) => {
    
    try {
        
        
        let salida, consola = '';
        for (let i = 1; i <= hasta; i++) {
            salida = salida + `${i} ${'x'.green} ${multiplicador} ${'='.green} ${i*multiplicador}\n`;
            consola = consola + `${i} ${'x'} ${multiplicador} ${'='} ${i*multiplicador}\n`;
        }
        if(listar){
            console.log('================================='.green);
            console.log(`${colors.green('Tabla del')} ${colors.blue(multiplicador)}`)
            console.log('================================='.green);
            console.log(salida);
        }
        fs.writeFileSync(`./salida/tabla-${multiplicador}.txt`, consola);
        return `tabla-de-multiplicar-${multiplicador}.txt`;
    } catch (err) {
        throw(err);
    }
    
    
}

module.exports = {
    crearArchivoTabla,
}