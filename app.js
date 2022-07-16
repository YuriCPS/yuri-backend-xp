const express = require('express');
const ativosRouter = require('./routes/ativos');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

// Rotas
app.use('/ativos', ativosRouter);

// Middleware de Erro
app.use(errorMiddleware);

module.exports = app;
