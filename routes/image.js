'use strict'

const express = require('express');
const ImageController = require('../controllers/image');
const api = express.Router();

//Middleware
var multipart = require('connect-multiparty');
var multipartMiddlwate = multipart({uploadDir:'./uploads'})

api.get('/prueba', ImageController.pruebas);
api.get('/images/:album?', ImageController.getImages);
api.get('/image/:id', ImageController.getImage);
api.post('/image', ImageController.saveImage);
api.put('/image/:id', ImageController.updateImage);
api.delete('/image/:id', ImageController.deleteImage);
api.post('/upload-image/:id',multipartMiddlwate ,ImageController.uploadImage);
api.get('/get-image/:imageFile',multipartMiddlwate ,ImageController.getImageFile);

module.exports = api;