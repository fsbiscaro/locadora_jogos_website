module.exports = class Usuario {
    constructor(banco) {
        this._banco = banco;
        this._id_usuario = null;
        this._nome_usuario = null;
        this._cpf_usuario = null;
        this._data_nascimento_usuario = null;
        this._endereco_usuario = null;
        this._email_usuario = null;
        this._telefone_usuario = null;
        this._senha_usuario = null;
        this._id_cargo = null;
    }

    async create() {
        const operacao = new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO usuario 
                (nome_usuario, cpf_usuario, data_nascimento_usuario, endereco_usuario, email_usuario, telefone_usuario, senha_usuario, id_cargo)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const parametros = [
                this._nome_usuario,
                this._cpf_usuario,
                this._data_nascimento_usuario,
                this._endereco_usuario,
                this._email_usuario,
                this._telefone_usuario,
                this._senha_usuario,
                this._id_cargo
            ];

            this._banco.query(sql, parametros, function (erro, resultados) {
                if (erro) {
                    console.log("Erro no CREATE:", erro);
                    reject(erro);
                } else {
                    console.log("Resultado do CREATE:", resultados);
                    resolve(resultados);
                }
            });
        });

        return operacao;
    }

    async read() {
        const operacao = new Promise((resolve, reject) => {
            const sql = "SELECT * FROM usuario ORDER BY nome_usuario";

            this._banco.query(sql, [], function (erro, resultados) {
                if (erro) {
                    console.log("Erro no READ:", erro);
                    reject(erro);
                } else {
                    console.log("Resultado do READ:", resultados);
                    resolve(resultados);
                }
            });
        });

        return operacao;
    }

    async update() {
        const operacao = new Promise((resolve, reject) => {
            if (!this._id_usuario) {
                return reject(new Error("ID do usuário não definido para atualização."));
            }

            const parametros = [
                this._nome_usuario,
                this._cpf_usuario,
                this._data_nascimento_usuario,
                this._endereco_usuario,
                this._email_usuario,
                this._telefone_usuario,
                this._senha_usuario,
                this._id_usuario,
                this._id_cargo
            ];

            const sql = `
                UPDATE usuario 
                SET nome_usuario = ?, 
                    cpf_usuario = ?, 
                    data_nascimento_usuario = ?, 
                    endereco_usuario = ?, 
                    email_usuario = ?, 
                    telefone_usuario = ?, 
                    senha_usuario = ?,
                    id_cargo = ?
                WHERE id_usuario = ?
            `;

            this._banco.query(sql, parametros, function (erro, resultados) {
                if (erro) {
                    console.log("Erro no UPDATE:", erro);
                    reject(erro);
                } else {
                    resolve(resultados);
                }
            });
        });

        return operacao;
    }

    async delete() {
        const operacao = new Promise((resolve, reject) => {
            const idUsuario = parseInt(this._id_usuario);

            const parametros = [idUsuario];
            const sql = "DELETE FROM usuario WHERE id_usuario = ?;";

            this._banco.query(sql, parametros, function (erro, resultados) {
                if (erro) {
                    reject(erro);
                } else {
                    resolve(resultados);
                }
            });
        });

        return operacao;
    }

    async login() {
        const operacao = new Promise((resolve, reject) => {
            const parametros = [this._email_usuario, this._senha_usuario];

            const sql = `
                SELECT COUNT(*) as qtd, id_usuario, nome_usuario, email_usuario
                FROM usuario 
                WHERE email_usuario = ? AND senha_usuario = ?
            `;

            this._banco.query(sql, parametros, (erro, resposta) => {
                if (erro) {
                    console.log("Erro no LOGIN:", erro);
                    reject(erro);
                } else {
                    if (resposta[0].qtd > 0) {
                        const obj = {
                            status: true,
                            dados: {
                                id: resposta[0].id_usuario,
                                nome: resposta[0].nome_usuario,
                                email: resposta[0].email_usuario
                            }
                        };
                        resolve(obj);
                    } else {
                        resolve({ status: false });
                    }
                }
            });
        });

        return operacao;
    }

    // Getters e setters
    set banco(valor) { this._banco = valor; }
    get banco() { return this._banco; }

    set id_usuario(valor) { this._id_usuario = valor; }
    get id_usuario() { return this._id_usuario; }

    set nome_usuario(valor) { this._nome_usuario = valor; }
    get nome_usuario() { return this._nome_usuario; }

    set cpf_usuario(valor) { this._cpf_usuario = valor; }
    get cpf_usuario() { return this._cpf_usuario; }

    set data_nascimento_usuario(valor) { this._data_nascimento_usuario = valor; }
    get data_nascimento_usuario() { return this._data_nascimento_usuario; }

    set endereco_usuario(valor) { this._endereco_usuario = valor; }
    get endereco_usuario() { return this._endereco_usuario; }

    set email_usuario(valor) { this._email_usuario = valor; }
    get email_usuario() { return this._email_usuario; }

    set telefone_usuario(valor) { this._telefone_usuario = valor; }
    get telefone_usuario() { return this._telefone_usuario; }

    set senha_usuario(valor) { this._senha_usuario = valor; }
    get senha_usuario() { return this._senha_usuario; }

    set id_cargo(valor) { this._id_cargo = valor; }
    get id_cargo() { return this._id_cargo; }
}
