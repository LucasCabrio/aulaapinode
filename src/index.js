
// criacao de uma aplicacao express
const { log } = require('console');
const express = require('express'); //importando express

const path = require('path'); //importando path
//O path retorna o caminho de forma dinamica 

const app = express();
// O app ira receber o express e todas suas dependencia

const router = express.Router()
// Isso permite que a gente crie diferentes URLs e ENDPOINTs para que o frontend possa fazer chamadas

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})
// Aqui definimos nossa rota para o arquivo html usando o path para sempre retornar dinamicamente o que vem antes da "/pages/home.html"

app.use(router);
// Apos declarar nossas rotas, aqui falamos para o nosso app usar elas como referencia

app.listen(3333, ()=>{
    console.log('Servidor rodando');
})
// Aqui definimos quem ira escutar nossos chamados e nos responder

app.get('/hello',(request,res)=>{
    console.log('GET FUNCIONANDO');
    res.send({message:'Hello world!!!!!'});
})

// dentro do get ja definimos uma funcao anonima CALLBACK, que recebe um requisiçao com REQUEST e que retorna uma resposta com o reply

app.get('/usuario', (req,res)=>{
    console.log('GET USUARIO FUNCIONANDO');
    res.send({usuario: 'PIMBA'});
})