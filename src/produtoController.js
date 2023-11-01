const db = require ('./db');

const Joi = require('joi');

const produtoSchema = Joi.object({
    id:  Joi.string().required(),
    nome_produto: Joi.string().required(),
    descricao: Joi.string().required(),
    valor: Joi.string().required(),
    imagem: Joi.string().required(),
});

exports.listarProdutos = (req,res) => {
   db.query('SELECT * FROM produto', (err,result) =>{
     if (err) {
         console.error('Erro ao buscar produtos:',err);
         res.status(500).json ({error: 'Erro interno no servidor'});
         return;
     }
        res.json(result);
   });
};


exports.buscarProduto = (req, res) => {
    const { id } = req.params; //req.params acessa os parametros


    db.query('SELECT * FROM produto WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        };
        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }

        res.json(result[0]); //RETORNA O PRIMEIRO PRODUTO ENCONTRADO
    });
};


exports.adicionarProduto = (req,res) => {
   const {id,nome_produto,descricao,valor,imagem} = req.body;

   const { error } = produtoSchema.validate({ id, nome_produto, descricao, valor,imagem });

   if (error) {
    res.status(400).json({ error: 'Dados do produto inválidos' });
    return;
}

const novoProduto = {
     id,
     nome_produto,
     descricao,
     valor,
     imagem
};
db.query('INSERT INTO produto SET ?', novoProduto, (err, result) => {
    if (err) {
        console.error('Erro ao adicionar produto:', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
        return;
    }
    res.json({ message: 'Produto adicionado com sucesso' });
});

};

exports.atualizarProduto = (req,res) => {
     const {id} = req.params;
     const {nome_produto,descricao,valor,imagem} = req.body;
    
    const {error} = produtoSchema.validate ({id,nome_produto,descricao,valor,imagem})

    if (error) {
        res.status(400).json({ error: 'Dados do produto inválidos' });
        return;
    }

    const produtoAtualizado = {
        id,
        nome_produto,
        descricao,
        valor,
        imagem,
    };

    db.query ('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado,id], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
        return;
      }
      res.json({message: 'Produto atualizado com sucesso'});
    });
};

exports.deletarProduto = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM produto WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao deletar produto:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({message:'Produto deletado com sucesso'});
    });
};