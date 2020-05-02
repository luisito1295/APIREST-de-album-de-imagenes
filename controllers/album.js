'use strict'

var Album = require('../models/album');


function getAlbum(req, res){

    const id = req.params.id;

    Album.findById(id, (err, album) => {
        if(err){
            res.status(500).send({
                ok:false,
                message: 'Error en la consulta'
            });
        }else{
            if(!album){
                res.status(500).send({
                    ok:false,
                    message: 'Error en la consulta'
                });
            }else{
                res.status(200).send({
                    ok: true,
                    album
                })
            }
            
        }
    })

}

function getAlbums(req, res){


    Album.find({}, (err, albums) => {
        if(err){
            res.status(500).send({
                ok:false,
                message: 'Error en la consulta'
            });
        }else{
            if(!albums){
                res.status(500).send({
                    ok:false,
                    message: 'Error en la consulta'
                });
            }else{
                res.status(200).send({
                    ok: true,
                    albums
                })
            }
            
        }
    })
}

function saveAlbum(req, res){

    let body = req.body;

    let album = new Album({
        title: body.title,
        des: body.des
    });

    album.save((err, album) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }else{
            if(!album){
                return res.status(404).json({
                    ok: false,
                    err,
                    message: 'No hay marcadores'
                });
            }else{
                res.json({
                    ok: true,
                    album
                });
            }
        }
    });
}

function updateAlbum(req, res){
    
    const id = req.params.id;
    const params = req.body;

    Album.findByIdAndUpdate(id, params, (err, album) => {

        if(err){
            return res.status(500).json({
                ok: false,
                err,
                message: 'Erro al devoler los marcadores'
            });
        }else{
            if(!album){
                return res.status(500).json({
                    ok: false,
                    err,
                    message: 'Erro al devoler los marcadores'
                });
            }else{                
                res.status(200).send({album});
            }
            
        }

    })
}

function deleteAlbum(req, res){
    
    
    let id = req.params.id;

    Album.findByIdAndDelete(id, (err, album) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!album) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Album no encontrado'
                }
            });
        }else{
            return res.status(200).json({
                ok: true,
                album
            });
        }
    });
}

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum
}