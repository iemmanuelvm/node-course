//REferencias del html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();


socket.on('connect', ()=>{
    console.log('Conectado al servidor');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', ()=>{
    console.log('Desconectado del servidor');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('enviar-msj', (payload)=>{
    console.log(payload);
});



btnEnviar.addEventListener('click', ()=>{
    const mensaje = txtMensaje.value;
    // console.log(mensaje);

    const payload = {
        mensaje,
        id: "123",
        fecha: new Date().getTime()
    }



    socket.emit('enviar-msj', payload, (id) => {
        console.log('Desde el server;', id);
    });
});