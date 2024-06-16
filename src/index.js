const express = require('express')
const rotas = require('./routes/rotas')
const cors = require('cors');
const { Console } = require('console');

const app = express()
//app.use(express.static("desafio-front"))
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(rotas)

const porta = 3000;
console.log(`Utilizando a porta localhost ${3000}`);

app.listen(porta)