const db = require ('./db');

const Joi = require ('joi');

const fornecedorSchema = Joi.object({
id_fornecedor: Joi.string().required(),
nome_fornecedor: Joi.string().required(),
telefone_fornecedor: Joi.string().required(),


});

exports.listarFornecedor = (req,res) => { //token
db.query('SELECT * FROM fornecedor', (err,result) =>{
 if(err){
    console.error ('Erro ao buscar fornecedor:',err);
    res.status (500).json ({error: 'Erro interno no servidor'});
    return;
 }
res.json(result);
});

};

exports.buscarFornecedor = (req, res) => { //token
    const { id_fornecedor } = req.params; //req.params acessa os parametros

    db.query('SELECT * FROM fornecedor WHERE id=?', id_fornecedor, (err, result) => {
        if (err) {
            console.error('Erro ao buscar fornecedor:',err);
            res.status(500).json ({error:'Erro interno no servidor'});
            return;
        };
        if (result.length === 0) {
            res.status(404).json({ error: 'Fornecedor não encontrado' });
            return;
        }

        res.json(result[0]); //RETORNA O PRIMEIRO FORNECEDOR ENCONTRADO

    });


};

exports.adicionarFornecedor = (req, res) => { //token
    const { id_fornecedor, nome_fornecedor, telefone_fornecedor } = req.body;

    const { error } = fornecedorSchema.validate({ id_fornecedor, nome_fornecedor, telefone_fornecedor });

    if (error) {
        res.status(400).json({ error: 'Dados do fornecedor inválidos' });
        return;
    }

    const novoFornecedor = {
        id_fornecedor,
        nome_fornecedor,
        telefone_fornecedor
    };
    db.query('INSERT INTO fornecedor SET ?', novoEntregador, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar fornecedor:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Fornecedor adicionado com sucesso' });
    });

};

exports.atualizarFornecedor = (req, res) => { //token
    const { id_fornecedor } = req.params;
    const { nome_fornecedor, telefone_fornecedor } = req.body;

    const { error } = produtoSchema.validate({ id_fornecedor, nome_fornecedor, telefone_fornecedor })

    if (error) {
        res.status(400).json({ error: 'Dados do fornecedor inválidos' });
        return;
    }

    const fornecedorAtualizado = {
        id_fornecedor,
        nome_fornecedor,
        telefone_fornecedor,
    };

    db.query('UPDATE fornecedor SET ? WHERE id = ?', [entregadorAtualizado, id_fornecedor], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar fornecedor:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Fornecedor atualizado com sucesso' });
    });
};

exports.deletarFornecedor = (req, res) => { //token
    const { id_fornecedor } = req.params;

    db.query('DELETE FROM fornecedor WHERE id = ?', id_fornecedor, (err, result) => {
        if (err) {
            console.error('Erro ao deletar fornecedor:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Fornecedor deletado com sucesso' });
    });
};

exports.buscarFornecedorNome = (req, res) => { //token
    const { nome_fornecedor } = req.params; //req.params acessa os parametros

    db.query('SELECT * FROM fornecedor WHERE nome_fornecedorLIKE?', [`${nome_fornecedor}%`], (err, result) => {

        if (err) {
            console.error('Erro ao buscar fornecedor:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Fornecedor não encontrado' });
            return;
        }

        res.json(result); //RETORNA O PRIMEIRO FORNECEDOR ENCONTRADO
    });
};