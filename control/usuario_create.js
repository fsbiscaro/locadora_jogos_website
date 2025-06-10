const Usuario = require('../model/usuario');
const JWT = require('../model/JWT');

module.exports = function (request, response, banco) {
    console.log("POST: /usuario");

    const auth = request.headers.authorization;
    console.log(auth);

    const jwt = new JWT();
    const validou = jwt.validar(auth);

    if (validou.status === true) {
        const {
            nome_usuario: p_nome_usuario,
            cpf_usuario: p_cpf_usuario,
            data_nascimento_usuario: p_data_nascimento_usuario,
            endereco_usuario: p_endereco_usuario,
            email_usuario: p_email_usuario,
            telefone_usuario: p_telefone_usuario,
            senha_usuario: p_senha_usuario,
            id_cargo: p_id_cargo
        } = request.body;

        if (p_nome_usuario === "") {
            const resposta = {
                status: false,
                msg: 'O nome do usuário não pode ser vazio',
                codigo: '001',
                dados: {}
            };
            return response.status(400).send(resposta);
        }

        const usuario = new Usuario(banco);
        usuario._nome_usuario = p_nome_usuario;
        usuario._cpf_usuario = p_cpf_usuario;
        usuario._data_nascimento_usuario = p_data_nascimento_usuario;
        usuario._endereco_usuario = p_endereco_usuario;
        usuario._email_usuario = p_email_usuario;
        usuario._telefone_usuario = p_telefone_usuario;
        usuario._senha_usuario = p_senha_usuario;
        usuario._id_cargo = p_id_cargo;

        usuario.create()
            .then(respostaPromise => {
                const resposta = {
                    status: true,
                    msg: 'Cadastrado com sucesso',
                    codigo: '002',
                    dados: {
                        idUsuario: respostaPromise.insertId,
                        nomeUsuario: p_nome_usuario,
                        token: jwt.gerar(validou.payload)
                    }
                };
                response.status(201).send(resposta);
            })
            .catch(erro => {
                console.error("Erro ao cadastrar usuário:", erro);
                const resposta = {
                    status: false,
                    msg: 'Erro ao cadastrar',
                    codigo: '003',
                    dados: {}
                };
                response.status(500).send(resposta);
            });

    } else {
        const resposta = {
            status: false,
            msg: 'Token inválido ou ausente',
            codigo: '999',
            dados: {}
        };
        response.status(401).send(resposta);
    }
};
