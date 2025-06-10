const Usuario = require('../model/usuario');
const JWT = require('../model/JWT');

module.exports = function (request, response, banco) {
    console.log("GET: /usuarios");

    const auth = request.headers.authorization;
    const jwt = new JWT();
    const validou = jwt.validar(auth);

    if (validou.status === true) {
        const usuario = new Usuario(banco);

        usuario.read().then((respostaPromise) => {
            const resposta = {
                status: true,
                msg: 'sucesso',
                codigo: '001',
                dados: respostaPromise
            };
            response.status(200).send(resposta);
        }).catch(erro => {
            response.status(500).send({
                status: false,
                msg: 'Erro ao buscar usuários',
                erro: erro.message
            });
        });

    } else {
        response.status(401).send({
            status: false,
            msg: 'Token inválido ou expirado'
        });
    }
};
