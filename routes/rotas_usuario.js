const usuario_create = require('../control/usuario_create');
const usuario_read = require('../control/usuario_read');
const usuario_update = require('../control/usuario_update');
const usuario_delete = require('../control/usuario_delete');
const usuario_login = require('../control/usuario_login');


module.exports = function (app, banco) {

    app.post("/login", (request, response) => {
        usuario_login(request, response, banco);
    });

    app.post("/usuario", (request, response) => {
        usuario_create(request, response, banco);
    });

    app.get("/usuario", (request, response) => {
        usuario_read(request, response, banco);
    });

    app.put("/usuario/:id", (request, response) => {
        usuario_update(request, response, banco);
    });

    app.delete("/usuario/:id", (request, response) => {
        usuario_delete(request, response, banco);
    });

};
