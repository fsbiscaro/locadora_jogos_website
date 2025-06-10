const jogos_read = require('../control/jogos_read.js'); // certifique-se que o nome do arquivo é esse
const jogos_create = require('../control/jogos_create.js');
const jogos_delete = require('../control/jogos_delete.js');
const jogos_update = require('../control/jogos_update.js');

module.exports = function (app, banco) {
    app.get('/jogos', (request, response) => {
        jogos_read(request, response, banco);
    });

    app.post('/jogos', (request, response) => {
        jogos_create(request, response, banco);
    });

    app.delete("/jogos/:id", (request, response) => {
        jogos_delete(request, response, banco);
    });

    app.put('/jogos/:id_jogos', (request, response) => {
        jogos_update(request, response, banco);
    });
};
