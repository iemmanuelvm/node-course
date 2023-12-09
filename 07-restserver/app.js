const Server = require('./models/server');

//Instancia del servidor
const server = new Server();

//Lanzar el servidor a la escucha
server.listen();