const Jogo = require('../model/Jogos');

module.exports = function (request, response, banco) {
    const jogo = new Jogo(banco);

    // Pegando os dados do body e params
    const p_id_jogos = request.params.id_jogos;
    const p_nome_jogo = request.body.nome_jogo;
    const p_preco_jogo = request.body.preco_jogo;
    const p_distribuidora_jogo = request.body.distribuidora_jogo;
    const p_id_categoria_jogo = request.body.id_categoria_jogo;

    // Validando nome do jogo
    if (!p_nome_jogo || p_nome_jogo.trim() === "") {
        const resposta = {
            status: false,
            msg: 'O nome do jogo não pode ser vazio',
            codigo: '001',
            dados: {}
        };
        return response.status(400).send(resposta);
    }

    // Setando valores
    jogo.id_jogos = p_id_jogos;
    jogo.nome_jogo = p_nome_jogo;
    jogo.preco_jogo = p_preco_jogo;
    jogo.distribuidora_jogo = p_distribuidora_jogo;
    jogo.id_categoria_jogo = p_id_categoria_jogo;

    // Executando update
    jogo.update().then(respostaPromise => {
        const resposta = {
            status: true,
            msg: 'Jogo atualizado com sucesso',
            codigo: '002',
            dados: respostaPromise
        };
        response.status(201).send(resposta);
    }).catch(erro => {
        console.log("Erro ao atualizar jogo:", erro);
        const resposta = {
            status: false,
            msg: 'Erro ao atualizar jogo',
            codigo: '003',
            dados: {}
        };
        response.status(500).send(resposta);
    });
};
