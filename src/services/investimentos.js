const assetsModels = require('../models/ativos');
const accountModels = require('../models/conta');
const investmentsModels = require('../models/investimentos');
const buyValidation = require('../utils/buyValidation');
const sellValidation = require('../utils/sellValidation');

const buy = async (codCliente, codAtivo, qtdeAtivo)=> {
  const [asset] = await assetsModels.getByCode(codAtivo);
  const [balance] = await accountModels.getBalance(codCliente);
  const ticker = asset[0].ticker;

  // Verifica se o ativo existe e se tem quantidade disponível
  const verifyPurchase = buyValidation(asset, balance, qtdeAtivo);
  if (verifyPurchase.status) {
    return verifyPurchase;
  }

  // Verifica se o cliente já possui o ativo em sua carteira, se não, cria um novo registro
  let [clientAssets] = await accountModels.getWallet(codCliente);
  let assetToBuy = clientAssets.find(asset => asset.codAtivo === codAtivo);
  if (!assetToBuy) {
    await assetsModels.insert(codCliente, codAtivo, ticker);
    [clientAssets] = await accountModels.getWallet(codCliente);
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
    investmentsModels.updateNegotiation(codCliente, codAtivo, ticker, "compra", qtdeAtivo, total),
    ]).then(() => {
      return {
        message: `Compra de ${qtdeAtivo}x ${ticker} por R$ ${total} realizada com sucesso`,
        saldoAnterior: balance[0].saldo,
        saldo: newBalance,
      };
    }).catch(err => {
      console.log(err);
      return {
        status: 500,
        message: `Erro ao realizar a compra de ${qtdeAtivo}x ${ticker} por R$ ${total}`,
      };
    });

  return result;
}

const sell = async (codCliente, codAtivo, qtdeAtivo)=> {
  const [clientAssets] = await accountModels.getWallet(codCliente);
  const assetToSell = clientAssets.find(asset => asset.codAtivo === codAtivo);

  // Verifica se o cliente possui o ativo em sua carteira e se tem quantidade disponível
  const verifySale = sellValidation(clientAssets, assetToSell, qtdeAtivo);
  if (verifySale.status) {
    return verifySale;
  }

  const [asset] = await assetsModels.getByCode(codAtivo);
  const [balance] = await accountModels.getBalance(codCliente);
  const ticker = asset[0].ticker;
  const total = Number(asset[0].valor * qtdeAtivo);
  const newBalance = (Number(balance[0].saldo) + total).toFixed(2);
  const newAssetQty = Number(asset[0].qtdeAtivo) + qtdeAtivo;
  const newAssetQtyToSell = Number(assetToSell.qtdeAtivo) - qtdeAtivo;

  const result = Promise.all([
    accountModels.updateBalance(codCliente, newBalance),
    accountModels.updateMovimentation(codCliente, "venda", total),
    assetsModels.updateAssetQty(codAtivo, newAssetQty),
    investmentsModels.updateWallet(codCliente, codAtivo, newAssetQtyToSell),
    investmentsModels.updateNegotiation(codCliente, codAtivo, ticker, "venda", qtdeAtivo, total),
    ]).then(() => {
      return {
        message: `Venda de ${qtdeAtivo}x ${ticker} por R$ ${total} realizada com sucesso`,
        saldoAnterior: balance[0].saldo,
        saldo: newBalance,
      };
    }).catch(err => {
      console.log(err);
      return {
        status: 500,
        message: `Erro ao realizar a venda de ${qtdeAtivo}x ${ticker} por R$ ${total}`,
      };
    });

  return result;
}

module.exports = {
  buy,
  sell,
}