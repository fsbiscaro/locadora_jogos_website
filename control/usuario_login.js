const Usuario = require('../model/usuario');
const JWT = require('../model/JWT');

module.exports = function (request, response, banco) {
    console.log("POST: /usuario/login");

    // Campos corretos vindos do frontend
    const email = request.body.email_usuario;
    const senha = request.body.senha_usuario;

    // Criação do objeto e uso dos SETTERS corretos
    const usuario = new Usuario(banco);
    usuario.email_usuario = email;
    usuario.senha_usuario = senha;

    usuario.login().then(resposta => {
        if (resposta.status === true) {
            const jwt = new JWT();
            const token = jwt.gerar(resposta.dados);

            const respostaFinal = {
                status: true,
                msg: 'sucesso',
                codigo: '002',
                dados: resposta.dados,
                token: token
            };

            response.status(200).send(respostaFinal);
        } else {
            response.status(401).send({
                status: false,
                msg: 'Login inválido',
                codigo: '001'
            });
        }
    }).catch(erro => {
        console.log("Erro no login:", erro);
        response.status(500).send({
            status: false,
            msg: 'Erro interno no login',
            codigo: '003'
        });
    });
};
