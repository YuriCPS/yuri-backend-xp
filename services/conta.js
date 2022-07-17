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

module.exports = {
  getBalance,
}