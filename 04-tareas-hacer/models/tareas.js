const Tarea = require('./tarea');
const colors = require('colors');
/*
_listado:
    {'uuid-1234-1234-1': {id:12, desc:asd, completadoEn:1234}},
    {'uuid-1234-1234-1': {id:12, desc:asd, completadoEn:1234}},
    {'uuid-1234-1234-1': {id:12, desc:asd, completadoEn:1234}},
    {'uuid-1234-1234-1': {id:12, desc:asd, completadoEn:1234}},
*/

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            // console.log(key);
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTareas(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        // console.log('aqui');
        // console.log(tareas);
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }
    
    crearTareas(desc='') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, idx) => {
            const i = `${idx+1}`.green;
            const {desc, completadaEn} = tarea;
            // console.log(completadaEn);
            const estado = (completadaEn) 
            ? 'Completado'.green 
            : 'Incompleto'.red;
            // const desc = tarea.desc;

            console.log(`${i}. ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        let contador = 0;
        this.listadoArr.forEach((tarea, idx) => {
            const {desc, completadaEn} = tarea;
            const estado = (completadaEn) 
            ? 'Completado'.green 
            : 'Incompleto'.red;
            if(completadas) {
                if(completadaEn){
                    contador += 1;
                    console.log(`${contador.toString().green}. ${desc} :: ${completadaEn}`);
                }
            } else {
                if(!completadaEn){
                    contador += 1;
                    console.log(`${contador.toString().green}. ${desc} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadaEn){
                tarea.completadaEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadaEn = null;
                tarea.completadaEn = null;
            }
        });
    }


}

module.exports = Tareas;