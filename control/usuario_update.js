const Usuario = require('../model/usuario');
const JWT = require('../model/JWT');

module.exports = function (request, response, banco) {
    console.log("PUT: /usuario/:id");

    const auth = request.headers.authorization;
    const jwt = new JWT();
    const validou = jwt.validar(auth);

    if (validou.status === true) {
        const p_idUsuario = request.params.id;
        const p_nomeUsuario = request.body.nome_usuario;
        const p_cpfUsuario = request.body.cpf_usuario;
        const p_dataNascimento = request.body.data_nascimento_usuario;
        const p_endereco = request.body.endereco_usuario;
        const p_email = request.body.email_usuario;
        const p_telefone = request.body.telefone_usuario;
        const p_senha = request.body.senha_usuario;

        if (!p_nomeUsuario || p_nomeUsuario.trim() === "") {
            return response.status(400).send({
                status: false,
                msg: 'O nome do usuário não pode ser vazio',
                codigo: '001',
                dados: {}
            });
        }

        const usuario = new Usuario(banco);
        usuario.id_usuario = p_idUsuario;
        usuario.nome_usuario = p_nomeUsuario;
        usuario.cpf_usuario = p_cpfUsuario;
        usuario.data_nascimento_usuario = p_dataNascimento;
        usuario.endereco_usuario = p_endereco;
        usuario.email_usuario = p_email;
        usuario.telefone_usuario = p_telefone;
        usuario.senha_usuario = p_senha;

        usuario.update()
            .then((respostaPromise) => {
                const resposta = {
                    status: true,
                    msg: 'Atualizado com sucesso',
                    codigo: '002',
                    dados: {
                        idUsuario: p_idUsuario,
                        nome_usuario: p_nomeUsuario
                    }
                };
                response.status(200).send(resposta);
            })
            .catch((erro) => {
                console.log("Erro ao atualizar usuário:", erro);
                response.status(500).send({
                    status: false,
                    msg: 'Erro ao atualizar',
                    codigo: '003',
                    dados: {}
                });
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
