const accountModels = require('../models/conta');

const getBalance = async (codCliente) => {
  const [balance] = await accountModels.getBalance(codCliente);
  const [clientInfos] = await accountModels.getClient(codCliente);

  return {
    codCliente: clientInfos[0].codCliente,
    nomeCliente: clientInfos[0].nomeCliente,
    emailCliente: clientInfos[0].emailCliente,
    saldo: balance[0].saldo,
  };
};

const getMovimentation = async (codCliente) => {
  const [movimentation] = await accountModels.getMovimentation(codCliente);

  return movimentation;
};

const getWallet = (codCliente) => accountModels.getWallet(codCliente);

const deposit = async (codCliente, valor) => {
  const [balance] = await accountModels.getBalance(codCliente);
  const decimalValue = Number(valor);
  const previousBalance = Number(balance[0].saldo);
  const newBalance = (previousBalance + decimalValue).toFixed(2);

  await accountModels.updateMovimentation(codCliente, 'deposito', decimalValue);
  await accountModels.updateBalance(codCliente, newBalance);

  return {
    codCliente,
    message: `Depósito de R$ ${decimalValue} realizado com sucesso!`,
    saldoAnterior: balance[0].saldo,
    saldo: newBalance,
  };
};

const withdraw = async (codCliente, valor) => {
  const [balance] = await accountModels.getBalance(codCliente);
  const decimalValue = Number(valor).toFixed(2);
  const newBalance = (Number(balance[0].saldo) - decimalValue).toFixed(2);

  if (newBalance < 0) {
    return {
      status: 406,
      message: `Saldo atual de R$ ${balance[0].saldo} é insuficiente para realizar saque de R$ ${decimalValue}!`,
    };
  }

  await accountModels.updateMovimentation(codCliente, 'saque', decimalValue);
  await accountModels.updateBalance(codCliente, newBalance);

  return {
    codCliente,
    message: `Saque de R$ ${decimalValue} realizado com sucesso!`,
    saldoAnterior: balance[0].saldo,
    saldo: newBalance,
  };
};

module.exports = {
  getBalance,
  getMovimentation,
  getWallet,
  deposit,
  withdraw,
};
