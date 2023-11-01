
// criacao de uma aplicacao express
const express = require('express'); //importando express

const path = require('path'); //importando path
//O path retorna o caminho de forma dinamica 




const db = require ('./db');

const app = express();
// O app ira receber o express e todas suas dependencia

const routes = require ('./routes');

app.use(express.json());

app.use ('/',routes); //CHAMAR



app.listen(3333, ()=>{
    console.log('Servidor rodando');
})
// Aqui definimos quem ira escutar nossos chamados e nos responder
