require('colors');
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} = require('./helpers/menuInquirer');
// const Tarea = require('./models/tarea');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');
// const {mostrarMenu, pausa} = require('./helpers/mensajes')

console.clear();

const main = async() => {
    // console.log('Hola mundo');
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        // TODO: cargarTareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    await pausa();
    
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                //Crear opcion
                const desc = await leerInput('descripcion: ');
                // console.log(desc);
                tareas.crearTareas(desc);
                break;
        
            case '2':
                // console.log(tareas.listadoArr)
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                // console.log({id});
                if(id !== '0'){
                    const ok = await confirmar('Desea eliminar?');
                    // console.log({ok});
                    if (ok) {
                        tareas.borrarTareas(id);
                        console.log('Tarea borrada'.blue);
                    }
                }
                
                break;
            
            case '0':
                
                break;
        }
        // console.log({opt});
        // const tareas = new Tareas();
        // console.log(tareas);
        // const tarea = new Tarea('Comprar comida');
        // console.log(tarea);

        // tareas._listado[tarea.id] = tarea;
        guardarDB(tareas.listadoArr);

        await pausa();
    } while (opt!=='0');
    // mostrarMenu();
    // pausa();
}

main();