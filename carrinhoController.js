const db = require('./db');

const Joi = require('joi');

const carrinhoSchema = Joi.object({
    id_carrinho: Joi.string().required(),
    qtde_itens: Joi.string().required(),
    valor_parcial: Joi.string().required(),
    id_produto: Joi.string().required(),
    id_pedido: Joi.string().required(),
    cep: Joi.string().required(),
});

exports.listarCarrinho = (req, res) => {
    db.query('SELECT * FROM carrinho', (err, result) => {
        if (err) {
            console.error('Erro ao buscar carrinho:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json(result);
    });
};

exports.buscarCarrinho = (req, res) => {
    const { id_carrinho } = req.params; //req.params acessa os parametros


    db.query('SELECT * FROM carrinho WHERE id = ?', id_carrinho, (err, result) => {
        if (err) {
            console.error('Erro ao buscar carrinho:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        };
        if (result.length === 0) {
            res.status(404).json({ error: 'Carrinho não encontrado' });
            return;
        }

        res.json(result[0]); //RETORNA O PRIMEIRO PRODUTO ENCONTRADO
    });
};

exports.buscarcarrinhoValor = (req, res) => {
    const { valor_parcial} = req.params; //req.params acessa os parametros

    db.query('SELECT * FROM carrinho WHERE valor_parcial =?', [`${valor_parcial}%`], (err, result) => {

        if (err) {
            console.error('Erro ao buscar carrinho:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Carrinho não encontrado' });
            return;
        }

        res.json(result); //RETORNA O PRIMEIRO PRODUTO ENCONTRADO
    });
};