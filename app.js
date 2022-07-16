const express = require('express');
const ativosRouter = require('./routes/ativos');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

// Rotas
app.use('/ativos', ativosRouter);

// Middleware de Erro

module.exports = app;
