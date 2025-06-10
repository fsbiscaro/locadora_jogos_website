const jwt = require('jsonwebtoken');

module.exports = class JWT {
    constructor() {
        this._jsonwebtoken = jwt;
        this._jwt_key = "0b07d4ede2c73f4f7752c35e6de4698f";
        this._duracao = 60 * 60 * 24; // 1 dia
    }

    gerar(payload) {
        // remove o campo 'exp' do payload, se houver
        const { exp, ...payloadLimpo } = payload;

        const novoToken = this._jsonwebtoken.sign(
            payloadLimpo,
            this._jwt_key,
            { expiresIn: this._duracao }
        );

        return novoToken;
    }

    validar(token) {
        token = this.limparEntrada(token);

        try {
            const payload = this._jsonwebtoken.verify(token, this._jwt_key);
            return {
                status: true,
                payload: payload
            };
        } catch (erro) {
            return {
                status: false,
                payload: {}
            };
        }
    }

    limparEntrada(valor) {
        if (!valor) return "";
        return valor.replace("Bearer ", "").trim();
    }
};
