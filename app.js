'use stict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cargar rutas
const album_route = require('./routes/album');
const image_route = require('./routes/image');

//Middleware o cabeceras
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


//Rutas
app.use('/api', album_route);
app.use('/api', image_route);


module.exports = app;