const express = require('express'); //importando express

const path = require('path'); //importando path
//O path retorna o caminho de forma dinamica 

const router = express.Router()
// Isso permite que a gente crie diferentes URLs e ENDPOINTs para que o frontend possa fazer chamadas

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
});

const clienteController = require ('./clienteController');
//CHAMANDO O ARQUIVO QUE CONTROLA O CLIENTE


//ROTAS PARA CLIENTES
router.get ('/clientes',clienteController.listarClientes);

router.get ('/clientes/:cpf',clienteController.buscarCliente);

// POST: Aceita criar algum objeto do servidor.
router.post('/clientes',clienteController.adicionarCliente);

// PUT: aceita substituir algum objeto do servidor.
// PATCH: Aceita alterar algum objeto do servidor.
router.patch ('/clientes/:cpf',clienteController.atualizarCliente);

//DELETE: informa por meio da URL o objeto a ser deletado.
router.delete ('/clientes/:cpf',clienteController.deletarCliente);




const produtoController = require ('./produtoController');
// PRODUTO

// ROTAS PARA PRODUTO 
router.get ('/produto', produtoController.listarProdutos);

router.get ('/produto/:id', produtoController.buscarProduto);

router.post('/produto/:id', produtoController.adicionarProduto);

router.patch ('/produto/:id', produtoController.atualizarProduto);

router.delete ('/produto/:id', produtoController.deletarProduto);



















module.exports = router; 
// Aqui definimos nossa rota para o arquivo html usando o path para sempre retornar dinamicamente o que vem antes da "/pages/home.html"

