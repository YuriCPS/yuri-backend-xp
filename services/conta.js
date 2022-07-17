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
  const valorDecimal = valor.toFixed(2);
  const newBalance = (Number(balance[0].Saldo) + valor).toFixed(2);

  await contaModels.updateMovimentations(codCliente, "deposito", valorDecimal);
  await contaModels.updateBalance(codCliente, newBalance);

  return {
    codCliente,
    message: `Depósito de R$ ${valorDecimal} realizado com sucesso!`,
    SaldoAnterior: balance[0].Saldo,
    Saldo: newBalance,
  };
}

module.exports = {
  getBalance,
  deposit,
}