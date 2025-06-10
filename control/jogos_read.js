const Jogo = require('../model/Jogos'); // Arquivo se chama "Jogos.js" com "s"

module.exports = function (request, response, banco) {
    const jogo = new Jogo(banco);

    jogo.read().then(respostaPromise => {
        const resposta = {
            status: true,
            msg: 'Consulta realizada com sucesso',
            codigo: '001',
            dados: respostaPromise
        };

        response.status(200).send(resposta);
    }).catch(erro => {
        console.log("Erro ao consultar jogos:", erro);
        const resposta = {
            status: false,
            msg: 'Erro ao consultar jogos',
            codigo: '002',
            dados: {}
        };

        response.status(500).send(resposta);
    });
};
