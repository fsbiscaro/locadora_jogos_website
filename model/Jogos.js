module.exports = class Jogo {
    constructor(banco) {
        this._banco = banco;
        this._id_jogos = null;
        this._nome_jogo = null;
        this._preco_jogo = null;
        this._distribuidora_jogo = null;
        this._id_categoria_jogo = null;
    }

    async create() {
        const operacao = new Promise((resolve, reject) => {
            const nome = this._nome_jogo;
            const preco = this._preco_jogo;
            const distribuidora = this._distribuidora_jogo;
            const idCategoria = this._id_categoria_jogo;

            const v_parametros = [nome, preco, distribuidora, idCategoria];
            const sql = `
                INSERT INTO jogos (nome_jogo, preco_jogo, distribuidora_jogo, id_categoria_jogo)
                VALUES (?, ?, ?, ?);
            `;

            this._banco.query(sql, v_parametros, function (erro, resultado) {
                if (erro) {
                    console.log("Erro ao criar jogo:", erro);
                    reject(erro);
                } else {
                    console.log("Jogo criado com sucesso");
                    resolve(resultado);
                }
            });
        });

        return operacao;
    }

    async read() {
    const operacao = new Promise((resolve, reject) => {
        const sql = `
            SELECT j.id_jogos, j.nome_jogo, j.preco_jogo, j.distribuidora_jogo, 
                   j.id_categoria_jogo, c.nome AS nome_categoria
            FROM jogos j
            JOIN categoria_jogo c ON j.id_categoria_jogo = c.id_categoria_jogo
            ORDER BY j.nome_jogo;
        `;

        this._banco.query(sql, [], function (erro, resultados) {
            if (erro) {
                console.log("Erro ao consultar jogos:", erro);
                reject(erro);
            } else {
                console.log("Consulta de jogos realizada com sucesso");
                resolve(resultados);
            }
        });
    });

    return operacao;
}


    async delete() {
        const operacao = new Promise((resolve, reject) => {
            const idJogo = this._id_jogos;
            const v_parametros = [idJogo];

            const sql = "DELETE FROM jogos WHERE id_jogos = ?";

            this._banco.query(sql, v_parametros, function (erro, resultado) {
                if (erro) {
                    console.log("Erro ao deletar jogo:", erro);
                    reject(erro);
                } else {
                    console.log("Jogo deletado com sucesso");
                    resolve(resultado);
                }
            });
        });

        return operacao;
    }
    async update() {
    const operacao = new Promise((resolve, reject) => {
        const id = this._id_jogos;
        const nome = this._nome_jogo;
        const preco = this._preco_jogo;
        const distribuidora = this._distribuidora_jogo;
        const idCategoria = this._id_categoria_jogo;

        const sql = `
            UPDATE jogos
            SET nome_jogo = ?, preco_jogo = ?, distribuidora_jogo = ?, id_categoria_jogo = ?
            WHERE id_jogos = ?;
        `;

        const parametros = [nome, preco, distribuidora, idCategoria, id];

        this._banco.query(sql, parametros, function (erro, resultado) {
            if (erro) {
                console.log("Erro ao atualizar jogo:", erro);
                reject(erro);
            } else {
                console.log("Jogo atualizado com sucesso");
                resolve(resultado);
            }
        });
    });

    return operacao;
}


    // Getters e Setters
    set banco(valor) { this._banco = valor; }
    get banco() { return this._banco; }

    set id_jogos(valor) { this._id_jogos = valor; }
    get id_jogos() { return this._id_jogos; }

    set nome_jogo(valor) { this._nome_jogo = valor; }
    get nome_jogo() { return this._nome_jogo; }

    set preco_jogo(valor) { this._preco_jogo = valor; }
    get preco_jogo() { return this._preco_jogo; }

    set distribuidora_jogo(valor) { this._distribuidora_jogo = valor; }
    get distribuidora_jogo() { return this._distribuidora_jogo; }

    set id_categoria_jogo(valor) { this._id_categoria_jogo = valor; }
    get id_categoria_jogo() { return this._id_categoria_jogo; }
};
