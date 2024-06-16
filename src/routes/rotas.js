const express = require('express')
const rotas = express();

//importação Controller
const controller = require('../controllers/controllerGeral');

//começar a enviar requisições e guardar dados
rotas.get('/iniciar', controller.listar);
rotas.get('/usar-urls-do-banco', controller.usarUrls);


module.exports = rotas; 