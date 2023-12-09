const argv = require('yargs')
            .option('b', {
                alias: 'base',
                type: 'number',
                demandOption: true,
                describe: 'Es la base la tabla de multiplicar',
            })
            .option('h', {
                alias: 'hasta',
                type: 'number',
                demandOption: true,
                describe: 'Es hasta donde se va multiplicar',
            })
            .option('l', {
                alias: 'lista',
                type: 'boolean',
                demandOption: true,
                default: false,
                describe: 'Opcion de listar',
            })
            .check((argv, options)=>{
                // console.log('yargs', argv);
                if(isNaN(argv.b)){
                    throw 'La base tiene que ser un numero'
                }
                return true;
            })
            .argv;

module.exports = {
    argv,
}