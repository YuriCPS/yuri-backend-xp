const express = require('express');
const ativosRouter = require('./src/routes/ativos');
const loginRouter = require('./src/routes/login');
const investimentosRouter = require('./src/routes/investimentos');
const contaRouter = require('./src/routes/conta');
const errorMiddleware = require('./src/middlewares/error');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send();
});

// Rotas
app.use('/ativos', ativosRouter);
app.use('/conta', contaRouter);
app.use('/investimentos', investimentosRouter);
app.use('/login', loginRouter);

// Middleware de Erro
app.use(errorMiddleware);

module.exports = app;
