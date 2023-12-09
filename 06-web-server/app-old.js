const http = require('http');


// req: es lo que esta solicitando el cliente
// resp: es lo que mi servidor va responder

http.createServer((req, res)=>{
    // console.log(req);
    // res.writeHead(200,  {'Content-Type': 'text/plain'});
    // res.writeHead(200,  {'Content-Type': 'application/json'});
    // res.setHeader('Content-Disposition', 'attachment: filename=lista.csv')
    // res.writeHead(200,  {'Content-Type': 'application/csv'});
    
    // res.write('404 | Page not found');

    // const persona = {
    //     id: 1,
    //     nombre: 'Emmanuel',
    // };

    // res.write(JSON.stringify(persona));

    // res.write('id, nombre\n');
    // res.write('1, Emmanuel\n');
    // res.write('2, Maria\n');
    // res.write('3, Pedro\n');

    res.write('Hola mundo');

    res.end();

}).listen(8080);

console.log('Escuchando el puerto 8080');