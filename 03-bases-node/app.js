// imprimir la tabla de multiplicar XxX

const {crearArchivoTabla} = require('./helpers/multiplicar')
const {argv} = require('./config/yargs');
const colors = require('colors');

console.clear();

// console.log(process.argv);
console.log('base: yargs', argv.base);

// console.log(process.argv);
// const [ , , arg3='--base=5'] = process.argv;
// const [ , base = 5] = arg3.split('=');
// // console.log(typeof(base));

crearArchivoTabla(argv.b, argv.h, argv.l)
.then(nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
.catch(err => console.log(err));
