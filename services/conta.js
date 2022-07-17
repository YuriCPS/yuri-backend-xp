const contaModels = require('../models/conta');

const getBalance = async (codCliente) => {
  const [balance] = await contaModels.getBalance(codCliente);
  const [clientInfos] = await contaModels.getClient(codCliente);

  return {
    codCliente: clientInfos[0].codCliente,
    nomeCliente: clientInfos[0].nomeCliente,
    emailCliente: clientInfos[0].emailCliente,
    Saldo: balance[0].Saldo,
  };
}

const deposit = async (codCliente, valor) => {
  const [balance] = await contaModels.getBalance(codCliente);
  const valorDecimal = Number(valor)
  const SaldoAnterior = Number(balance[0].Saldo);
  const newBalance = (SaldoAnterior + valorDecimal).toFixed(2);

  await contaModels.updateMovimentation(codCliente, "deposito", valorDecimal);
  await contaModels.updateBalance(codCliente, newBalance);

  return {
    codCliente,
    message: `Depósito de R$ ${valorDecimal} realizado com sucesso!`,
    SaldoAnterior: balance[0].Saldo,
    Saldo: newBalance,
  };
}

const withdraw = async (codCliente, valor) => {
  const [balance] = await contaModels.getBalance(codCliente);
  const valorDecimal = Number(valor).toFixed(2);
  const newBalance = (Number(balance[0].Saldo) - valorDecimal).toFixed(2);

  if (newBalance < 0) {
    return {
      status:406,
      message: `Saldo atual de R$ ${balance[0].Saldo} é insuficiente para realizar saque de R$ ${valorDecimal}!`,
    }
  }

  await contaModels.updateMovimentation(codCliente, "saque", valorDecimal);
  await contaModels.updateBalance(codCliente, newBalance);

  return {
    codCliente,
    message: `Saque de R$ ${valorDecimal} realizado com sucesso!`,
    SaldoAnterior: balance[0].Saldo,
    Saldo: newBalance,
  };
}

module.exports = {
  getBalance,
  deposit,
  withdraw,
}