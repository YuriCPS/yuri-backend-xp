const assetsModels = require('../models/ativos');
const accountModels = require('../models/conta');
const investmentsModels = require('../models/investimentos');
const verifyAssetQty = require('../utils/verifyAssetQty');
const verifyClientBalance = require('../utils/verifyClientBalance');

const buy = async (codCliente, codAtivo, qtdeAtivo)=> {
  // Verifica se o ativo existe e se tem quantidade disponível
  const [asset] = await assetsModels.getByCode(codAtivo);
  const verifyQty = verifyAssetQty(asset, qtdeAtivo);
  if (verifyQty.status) {
    return verifyQty;
  }

  // Verifica se o cliente tem saldo suficiente para a compra
  const [balance] = await accountModels.getBalance(codCliente);
  const verifyBalance = verifyClientBalance(asset, balance, qtdeAtivo);
  if (verifyBalance.status) {
    return verifyBalance;
  }

  // Verifica se o cliente já possui o ativo em sua carteira, se não, cria um novo registro
  let [clientAssets] = await assetsModels.getByClient(codCliente);
  let assetToBuy = clientAssets.find(asset => asset.codAtivo === codAtivo);
  if (!assetToBuy) {
    await assetsModels.insert(codCliente, codAtivo);
    [clientAssets] = await assetsModels.getByClient(codCliente);
    assetToBuy = clientAssets.find(asset => asset.codAtivo === codAtivo);
  }

  const total = Number(asset[0].valor * qtdeAtivo).toFixed(2);
  const newBalance = (Number(balance[0].saldo) - total).toFixed(2);
  const newAssetQty = Number(asset[0].qtdeAtivo) - qtdeAtivo;
  const newAssetQtyToBuy = Number(assetToBuy.qtdeAtivo) + qtdeAtivo;

  const result = Promise.all([
    accountModels.updateBalance(codCliente, newBalance),
    accountModels.updateMovimentation(codCliente, "compra", total),
    assetsModels.updateAssetQty(codAtivo, newAssetQty),
    investmentsModels.updateWallet(codCliente, codAtivo, newAssetQtyToBuy),
    investmentsModels.updateNegotiation(codCliente, codAtivo, "compra", qtdeAtivo, total),
    ]).then(() => {
      return {
        message: `Compra de ${qtdeAtivo}x ${codAtivo} por R$ ${total} realizada com sucesso`,
        saldoAnterior: balance[0].saldo,
        saldo: newBalance,
      };
    }).catch(err => {
      console.log(err);
      return {
        status: 500,
        message: `Erro ao realizar a compra de ${qtdeAtivo}x ${codAtivo} por R$ ${total}`,
      };
    });

  return result;
}

const sell = async (codCliente, codAtivo, qtdeAtivo)=> {
  const [clientAssets] = await assetsModels.getByClient(codCliente);
  if (clientAssets.length === 0) {
    return {
      status:404,
      message: `O cliente não possui ativos em sua carteira`,
    }
  }

  const assetToSell = clientAssets.find(asset => asset.codAtivo === codAtivo);
  if (!assetToSell) {
    return { status:404, message: `Ativo não encontrado ou o cliente não possui esse ativo` };
  }

  if (qtdeAtivo > assetToSell.qtdeAtivo) {
    return {
      status:400,
      message: `Quantidade de ativos em carteira insuficiente para essa venda`,
    }
  }
  const [asset] = await assetsModels.getByCode(codAtivo);
  const [balance] = await accountModels.getBalance(codCliente);
  const total = Number(asset[0].valor * qtdeAtivo);
  const newBalance = (Number(balance[0].saldo) + total).toFixed(2);
  const newAssetQty = Number(asset[0].qtdeAtivo) + qtdeAtivo;
  const newAssetQtyToSell = Number(assetToSell.qtdeAtivo) - qtdeAtivo;

  const result = Promise.all([
    accountModels.updateBalance(codCliente, newBalance),
    accountModels.updateMovimentation(codCliente, "venda", total),
    assetsModels.updateAssetQty(codAtivo, newAssetQty),
    investmentsModels.updateWallet(codCliente, codAtivo, newAssetQtyToSell),
    investmentsModels.updateNegotiation(codCliente, codAtivo, "venda", qtdeAtivo, total),
    ]).then(() => {
      return {
        message: `Venda de ${qtdeAtivo}x ${codAtivo} por R$ ${total} realizada com sucesso`,
        saldoAnterior: balance[0].saldo,
        saldo: newBalance,
      };
    }).catch(err => {
      console.log(err);
      return {
        status: 500,
        message: `Erro ao realizar a venda de ${qtdeAtivo}x ${codAtivo} por R$ ${total}`,
      };
    });

  return result;
}

module.exports = {
  buy,
  sell,
}