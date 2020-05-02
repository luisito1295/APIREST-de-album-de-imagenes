'use strcit'

const mongoose = require('mongoose');
//Configuracion del puerto
const port = process.env.PORT || 3000;

//Importaciones
var app = require('./app');

mongoose.connect('mongodb://localhost:27017/albums', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true }, (err, res) => {
    
    if(err){
        throw err;
    }else{
        console.log('Base de datos conectado');
        app.listen(port, () => {
            console.log('Escuchando en el puerto http://localhost:'+port);
        });

    }

});

