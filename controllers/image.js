'use strict'

var path = require('path');
var Image = require('../models/image');
var Album = require('../models/album');

function pruebas(req, res){

    res.status(200).send({message:'Prueba del controlador'})

}

function getImage(req, res){

    const id = req.params.id;

    Image.findById(id, (err, image) => {

        if(err){
            return res.status(500).json({
                ok: false,
                err,
                message: 'Erro al devoler los marcadores'
            });
        }else{
            if(!image){
                return res.status(404).json({
                    ok: false,
                    err,
                    message: 'Erro al devoler los marcadores'
                });
            }else{         
                Album.populate(image, { path:'album' }, (err, image) => {
                    if(err){
                        res.status(500).send({message: 'Error en la consulta'});
                    }else{
                        res.status(200).send({image});
                    }
                });
                
            }
            
        }

    });

}

function getImages(req, res){

    const albumId = req.params.id;

    if(!albumId){
        //Sacar las imagenes de la DB
        var find = Image.find({}).sort('-title');

    }else{
        //Sacar todas las imagenes asociadas al album
        var find = Image.find({album: albumId}).sort('-title');
    }

    find.exec((err, images) => {

        if(err){
            res.status(500).json({
                ok: false,
                err,
                message: 'Erro al devoler los marcadores'
            });
        }else{
            if(!images){
                res.status(404).json({
                    ok: false,
                    err,
                    message: 'Erro al devoler los marcadores'
                });
            }else{
                Album.populate(images, { path:'album' }, (err, images) => {
                    if(err){
                        res.status(500).send({message: 'Error en la consulta'});
                    }else{
                        res.status(200).send({images});
                    }
                });
            }
            
        }

    });

}

function saveImage(req, res){
    
    const body = req.body;

    const image = new Image({
        title: body.title,
        picture: body.picture = null,
        album: body.album
    });

    image.save((err, image) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }else{
            if(!image){
                return res.status(404).json({
                    ok: false,
                    err:{
                        message: 'No hay marcadores'
                    }
                });
            }else{
                res.json({
                    ok: true,
                    image
                });
            }
        }
    })

}

function updateImage(req, res){

    const id = req.params.id;
    const params = req.body;

    Image.findByIdAndUpdate(id, params, (err, image) => {
        if(err){
            res.status(500).json({
                ok: false,
                err,
                message: 'Erro al devoler los marcadores'
            });
        }else{
            if(!image){
                res.status(500).json({
                    ok: false,
                    err,
                    message: 'Erro al devoler los marcadores'
                });
            }else{                
                res.status(200).send({image});
            }
            
        }
    });

}

function deleteImage(req, res){
    
    const id = req.params.id;

    Image.findByIdAndDelete(id, (err, image) => {
        if(err){
            res.status(500).json({
                ok: false,
                err,
                message: 'Erro al devoler los marcadores'
            });
        }else{
            if(!image){
                res.status(500).json({
                    ok: false,
                    err,
                    message: 'Erro al borrar el registro'
                });
            }else{                
                res.status(200).send({image: image});
            }
            
        }
    })

}

function uploadImage(req, res){

    var id = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        //ruta del fichero
        var file_path = req.files.image.path;
        //recortar el nombre del fichero o seperar para obtener el nobre del fichero
        var file_split = file_path.split('\\');
        var file_name =  file_split[1];
        
        
        Image.findByIdAndUpdate(id, {picture: file_name}, (err, image) => {
            if(err){
                res.status(500).json({
                    ok: false,
                    err,
                    message: 'Erro al devoler los marcadores'
                });
            }else{
                if(!image){
                    res.status(500).json({
                        ok: false,
                        err,
                        message: 'Erro al devoler los marcadores'
                    });
                }else{                
                    res.status(200).send({image});
                }
                
            }
        });
    }else{
        res.status(200).json({
            ok: false,
            err,
            message: 'No ha subido ninguna imagen'
        });
    }

}

var fs = require('fs');

function getImageFile(req, res){
    
    var imageFile = req.params.imageFile;

    fs.exists('./uploads/'+imageFile, function(exists){

        if(exists){
            res.sendFile(path.resolve('./uploads/'+imageFile));
        }else{
            res.status(200).send({message: 'No existe la imagen'})
        }
    })
}

module.exports = {
    pruebas,
    getImage,
    getImages,
    saveImage,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile
}

