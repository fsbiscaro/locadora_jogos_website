console.log("arquivo certo");

const express = require('express');
const mysql = require('mysql');

const rotas_usuario = require('./routes/rotas_usuario');
const rotas_jogos = require('./routes/rotas_jogos');

const app = express();
const porta = 4200;
const host = "http://localhost:" + porta;

// Middleware para tratar JSON
app.use(express.json());

// Servir arquivos estáticos da pasta /js
app.use(express.static('js'));



// Conexão com o banco de dados
const banco = mysql.createPool({
    connectionLimit: 128,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Locadora'
});

// Carregamento das rotas
rotas_usuario(app, banco);
rotas_jogos(app, banco);

console.log("Rotas carregadas!");

// Servir arquivos da pasta /view como páginas estáticas
app.use('/', express.static(__dirname + '/view'));

// Iniciar servidor
app.listen(porta, function () {
    console.log("Servidor rodando na porta:", porta);
    console.log(">>", host);
});
