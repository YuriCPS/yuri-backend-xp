const express = require('express');
const ativosRouter = require('./routes/ativos');
const loginRouter = require('./routes/login');
const investimentosRouter = require('./routes/investimentos');
const contaRouter = require('./routes/conta');
const errorMiddleware = require('./middlewares/error');
const { use } = require('./routes/conta');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

// Rotas
app.use('/ativos', ativosRouter);
app.use('/conta', contaRouter);
app;use('/investimentos', investimentosRouter);
app.use('/login', loginRouter);

// Middleware de Erro
app.use(errorMiddleware);

module.exports = app;
