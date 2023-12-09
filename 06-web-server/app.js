const express = require('express');
const hbs = require('hbs');
require('dotenv').config();


const app = express();



const port = process.env.PORT;
//TODO: requite('hbs);



//Handlebars
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials', function (err) {});


//Servir contenido estatico
//express.static('path')'
//middlewere
app.use(express.static('public/templated-roadtrip'))

//Este es un controlador
app.get('/', function (req, res) {
    // res.send('hola mundo');
    res.render('home', {
        nombre: 'Emmanuel',
        titulo : 'Curso Node',
    });
});



//Este es otro controlador
app.get('/generic', function (req, res) {
    // res.sendFile(__dirname + '/public/templated-roadtrip/generic.html');
    res.render('generic', {
        nombre: 'Emmanuel',
        titulo : 'Curso Node',
    });
});

app.get('/elements', function (req, res) {
    // res.sendFile(__dirname + '/public/templated-roadtrip/elements.html');
    res.render('elements', {
        nombre: 'Emmanuel',
        titulo : 'Curso Node',
    });
});

// app.get('/hola-mundo', (req, res) => {
//     res.send('Hola mundo en su respectiva ruta');
// });

app.get('*', (req, res) => {
    // res.send('public/404.html');
    res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});