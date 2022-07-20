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
  let [ativosDoCliente] = await ativosModel.getByClient(codCliente);
  let ativoCompra = ativosDoCliente.find(ativo => ativo.codAtivo === codAtivo);
  if (!ativoCompra) {
    await ativosModel.insert(codCliente, codAtivo);
    [ativosDoCliente] = await ativosModel.getByClient(codCliente);
    ativoCompra = ativosDoCliente.find(ativo => ativo.codAtivo === codAtivo);
  }

  const total = Number(ativo[0].Valor * qtdeAtivo).toFixed(2);
  const newBalance = (Number(balance[0].Saldo) - total).toFixed(2);
  const newQtdeAtivo = Number(ativo[0].QtdeAtivo) - qtdeAtivo;
  const newQtdeAtivoCompra = Number(ativoCompra.QtdeAtivo) + qtdeAtivo;

  await contaModels.updateBalance(codCliente, newBalance);
  await contaModels.updateMovimentation(codCliente, "compra", total);
  await ativosModel.updateQtdeAtivo(codAtivo, newQtdeAtivo);
  await investimentosModel.updateWallet(codCliente, codAtivo, newQtdeAtivoCompra);
  await investimentosModel.updateNegotiation(codCliente, codAtivo, "compra", qtdeAtivo, total);

  return {
    message: `Compra de ${qtdeAtivo}x ${codAtivo} por R$ ${total} realizada com sucesso`,
  }
}

const sell = async (codCliente, codAtivo, qtdeAtivo)=> {
  const [ativosDoCliente] = await ativosModel.getByClient(codCliente);
  if (ativosDoCliente.length === 0) {
    return {
      status:404,
      message: `O cliente não possui ativos em sua carteira`,
    }
  }

  const ativoVenda = ativosDoCliente.find(ativo => ativo.codAtivo === codAtivo);
  if (!ativoVenda) {
    return { status:404, message: `Ativo não encontrado ou o cliente não possui esse ativo` };
  }

  if (qtdeAtivo > ativoVenda.QtdeAtivo) {
    return {
      status:400,
      message: `Quantidade de ativos em carteira insuficiente para essa venda`,
    }
  }
  const [ativo] = await ativosModel.getByCode(codAtivo);
  const [balance] = await contaModels.getBalance(codCliente);
  const total = Number(ativo[0].Valor * qtdeAtivo);
  const newBalance = (Number(balance[0].Saldo) + total).toFixed(2);
  const newQtdeAtivo = Number(ativo[0].QtdeAtivo) + qtdeAtivo;
  const newQtdeAtivoVenda = Number(ativoVenda.QtdeAtivo) - qtdeAtivo;

  await contaModels.updateBalance(codCliente, newBalance);
  await contaModels.updateMovimentation(codCliente, "venda", total);
  await ativosModel.updateQtdeAtivo(codAtivo, newQtdeAtivo);
  await investimentosModel.updateWallet(codCliente, codAtivo, newQtdeAtivoVenda);
  await investimentosModel.updateNegotiation(codCliente, codAtivo, "venda", qtdeAtivo, total);

  return {
    message: `Venda de ${qtdeAtivo}x ${codAtivo} por R$ ${total} realizada com sucesso`,
  }
}

module.exports = {
  buy,
  sell,
}