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


router.get ('/clientes',loginController.autenticarToken,clienteController.listarClientes);

router.get ('/clientes/:cpf',loginController.autenticarToken,clienteController.buscarCliente);

// POST: Aceita criar algum objeto do servidor.
router.post('/clientes',clienteController.adicionarCliente);

// PUT: aceita substituir algum objeto do servidor.
// PATCH: Aceita alterar algum objeto do servidor.
router.patch ('/clientes/:cpf',loginController.autenticarToken,clienteController.atualizarCliente);

//DELETE: informa por meio da URL o objeto a ser deletado.
router.delete ('/clientes/:cpf',loginController.autenticarToken,clienteController.deletarCliente);

// ROTAS PARA LOGIN
const loginController= require ('./loginController');

router.post ('/login', loginController.loginCliente);

const produtoController = require ('./produtoController');
// PRODUTO

// ROTAS PARA PRODUTO 
router.get ('/produto', produtoController.listarProdutos);

router.get ('/produto/:id', produtoController.buscarProduto);

router.get('/produto/nome/:nome_produto',produtoController.buscarProdutoNome);

router.post('/produto',loginController.autenticarToken,produtoController.adicionarProduto);

router.patch ('/produto/:id',loginController.autenticarToken,produtoController.atualizarProduto);

router.delete ('/produto/:id',loginController.autenticarToken,produtoController.deletarProduto);



const pedidoController = require ('./pedidoController');
// PEDIDO

// ROTAS PARA PRODUTO 
router.get ('/pedido',loginController.autenticarToken, pedidoController.listarPedidos);

router.get ('/pedido/:id', loginController.autenticarToken,pedidoController.buscarPedido);

router.get('/pedido/cpf/:cpf',loginController.autenticarToken,pedidoController.buscarPedidoCpf);

router.post('/pedido', loginController.autenticarToken,pedidoController.adicionarPedido);


const carrinhoController = require ('./carrinhoController');
// CARRINHO

// ROTAS PARA CARRINHO
router.get ('/carrinho', carrinhoController.listarCarrinho);

router.get ('/carrinho/:id_carrinho', carrinhoController.buscarCarrinho);

router.get('/carrinho/valor/:valor_parcial',carrinhoController.buscarcarrinhoValor);

const fornecedorController = require ('./fornecedorController');
// FORNECEDOR

// ROTAS PARA FORNECEDOR
router.get ('/fornecedor',loginController.autenticarToken, fornecedorController.listarFornecedor);

router.get ('/fornecedor/:id_fornecedor', loginController.autenticarToken,fornecedorController.buscarFornecedor);

router.get('/fornecedor/nome/:nome_fornecedor',loginController.autenticarToken,fornecedorController.buscarFornecedorNome);

router.post('/fornecedor',loginController.autenticarToken, fornecedorController.adicionarFornecedor);

router.patch ('/fornecedor/:id_fornecedor', loginController.autenticarToken,fornecedorController.atualizarFornecedor);

router.delete ('/fornecedor/:id_fornecedor',loginController.autenticarToken, fornecedorController.deletarFornecedor);

const forneceController = require ('./forneceController');
//CHAMANDO O ARQUIVO QUE CONTROLA O FORNECE


//ROTAS PARA FORNECE


router.get ('/fornece',forneceController.listarFornece);



module.exports = router; 