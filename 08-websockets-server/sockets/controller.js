const socketController = (socket) => {
    // console.log('cliente conectado', socket.id);
    
    console.log('Cliente conectado', socket.id);
    
    
    socket.on('disconnect', ()=>{
        console.log('CLiente desconectado', socket.id);
    });

    socket.on('enviar-msj', (payload, callback)=>{
        // console.log(payload);
        const id = 123456;
        callback({id, fecha: new Date().getTime()});
        socket.broadcast.emit('enviar-msj', payload);
        
    
    
    });
}

module.exports = {
    socketController,
}