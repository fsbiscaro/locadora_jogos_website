const Jogo = require('../model/Jogos');

module.exports = function (request, response, banco) {
    console.log("POST: /jogos");

    const nome = request.body.nome_jogo;
    const preco = request.body.preco_jogo;
    const distribuidora = request.body.distribuidora_jogo;
    const idCategoria = request.body.id_categoria_jogo;

    if (!nome || nome.trim() === "") {
        const resposta = {
            status: false,
            msg: 'O nome do jogo não pode ser vazio',
            codigo: '001',
            dados: {}
        };
        return response.status(400).send(resposta);
    }

    const jogo = new Jogo(banco);
    jogo.nome_jogo = nome;
    jogo.preco_jogo = preco;
    jogo.distribuidora_jogo = distribuidora;
    jogo.id_categoria_jogo = idCategoria;

    jogo.create().then((respostaPromise) => {
        const resposta = {
            status: true,
            msg: 'Jogo cadastrado com sucesso',
            codigo: '002',
            dados: {
                nome_jogo: nome,
                preco_jogo: preco,
                distribuidora_jogo: distribuidora,
                id_categoria_jogo: idCategoria
            }
        };
        response.status(201).send(resposta);
    }).catch((erro) => {
        console.log(erro);
        const resposta = {
            status: false,
            msg: 'Erro ao cadastrar jogo',
            codigo: '003',
            dados: {}
        };
        response.status(500).send(resposta);
    });
};
