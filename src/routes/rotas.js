const express = require('express')
const rotas = express();

//importação Controller
const cliente = require('../controllers/controllerGeral');

//get teste
rotas.get('/teste', cliente.listarTeste);


module.exports = rotas; 