const express = require('express');
const ativosRouter = require('./routes/ativos');
const loginRouter = require('./routes/login');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

// Rotas
app.use('/ativos', ativosRouter);
app.use('/login', loginRouter);

// Middleware de Erro
app.use(errorMiddleware);

module.exports = app;
