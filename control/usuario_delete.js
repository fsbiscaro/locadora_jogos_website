const Usuario = require('../model/usuario');
const JWT = require('../model/JWT');

module.exports = function (request, response, banco) {
    console.log("DELETE: /usuario/:id");

    const auth = request.headers.authorization;
    const jwt = new JWT();
    const validou = jwt.validar(auth);

    if (validou.status === true) {
        const p_idUsuario = parseInt(request.params.id);

        if (!p_idUsuario || isNaN(p_idUsuario)) {
            return response.status(400).send({
                status: false,
                msg: 'ID inválido ou não fornecido na URL',
                codigo: '001',
                dados: {}
            });
        }

        const usuario = new Usuario(banco);
        usuario.id_usuario = p_idUsuario;

        usuario.delete()
            .then((respostaPromise) => {
                const resposta = {
                    status: true,
                    msg: 'Usuário deletado com sucesso',
                    codigo: '002',
                    dados: {
                        idUsuario: p_idUsuario
                    }
                };
                response.status(200).send(resposta);
            })
            .catch((erro) => {
                console.log("Erro ao deletar usuário:", erro);
                const resposta = {
                    status: false,
                    msg: 'Erro ao deletar',
                    codigo: '003',
                    dados: {}
                };
                response.status(500).send(resposta);
            });
    } else {
        response.status(401).send({
            status: false,
            msg: 'Token inválido ou expirado',
            codigo: '004',
            dados: {}
        });
    }
};
