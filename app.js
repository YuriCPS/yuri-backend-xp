const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

// Rotas

// Middleware de Erro

module.exports = app;
