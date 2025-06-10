const Jogo = require('../model/Jogos');

module.exports = function (request, response, banco) {
    console.log("DELETE: /jogos");

    const p_idJogo = parseInt(request.params.id); // <-- aqui que você garante que não será NaN
    console.log("ID recebido:", p_idJogo);

    const jogo = new Jogo(banco);
    jogo.id_jogos = p_idJogo;

    jogo.delete().then((respostaPromise) => {
        const resposta = {
            status: true,
            msg: 'Jogo deletado com sucesso',
            codigo: '002',
            dados: { idJogo: p_idJogo }
        };

        response.status(200).send(resposta);
    }).catch((erro) => {
        console.log("Erro ao deletar jogo:", erro);
        const resposta = {
            status: false,
            msg: 'Erro ao deletar jogo',
            codigo: '003',
            dados: {}
        };

        response.status(500).send(resposta);
    });
};
