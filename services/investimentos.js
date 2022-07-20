const ativosModel = require('../models/ativos');
const contaModels = require('../models/conta');
const investimentosModel = require('../models/investimentos');

const buy = async (codCliente, codAtivo, qtdeAtivo)=> {
  const [ativo] = await ativosModel.getByCode(codAtivo);
  if (ativo.length === 0) {
    return {
      status:404,
      message: `Ativo não encontrado, verifique o código do ativo`,
    }
  }
  if (qtdeAtivo > ativo[0].QtdeAtivo) {
    return {
      status:400,
      message: `Quantidade de ativos disponíveis insuficiente para essa compra`,
    }
  }

  const [balance] = await contaModels.getBalance(codCliente);
  if (balance[0].Saldo < ativo[0].Valor * qtdeAtivo) {
    return {
      status:406,
      message: `Saldo atual de R$ ${balance[0].Saldo} é insuficiente para realizar a compra de R$ ${ativo[0].Valor * qtdeAtivo}`,
    }
  }

  const total = Number(ativo[0].Valor * qtdeAtivo);
  const newBalance = (Number(balance[0].Saldo) - total).toFixed(2);
  const newQtdeAtivo = Number(ativo[0].QtdeAtivo) - qtdeAtivo;

  await contaModels.updateBalance(codCliente, newBalance);
  await contaModels.updateMovimentation(codCliente, "compra", total);
  await ativosModel.updateQtdeAtivo(codAtivo, newQtdeAtivo);
  await investimentosModel.updateWallet(codCliente, codAtivo, qtdeAtivo);
  await investimentosModel.updateNegotiation(codCliente, codAtivo, "compra", qtdeAtivo, total);

  return {
    message: `Compra de ${qtdeAtivo} ${codAtivo} por R$ ${total} realizada com sucesso`,
  }
}

module.exports = {
  buy,
}