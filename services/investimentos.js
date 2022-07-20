const assetsModels = require('../models/ativos');
const accountModels = require('../models/conta');
const investmentsModels = require('../models/investimentos');

const buy = async (codCliente, codAtivo, qtdeAtivo)=> {
  const [asset] = await assetsModels.getByCode(codAtivo);
  if (asset.length === 0) {
    return {
      status:404,
      message: `Ativo não encontrado, verifique o código do ativo`,
    }
  }
  if (qtdeAtivo > asset[0].qtdeAtivo) {
    return {
      status:400,
      message: `Quantidade de ativos disponíveis insuficiente para essa compra`,
    }
  }

  const [balance] = await accountModels.getBalance(codCliente);
  if (balance[0].saldo < asset[0].valor * qtdeAtivo) {
    return {
      status:406,
      message: `Saldo atual de R$ ${balance[0].saldo} é insuficiente para realizar a compra de R$ ${asset[0].valor * qtdeAtivo}`,
    }
  }

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

  await accountModels.updateBalance(codCliente, newBalance);
  await accountModels.updateMovimentation(codCliente, "compra", total);
  await assetsModels.updateAssetQty(codAtivo, newAssetQty);
  await investmentsModels.updateWallet(codCliente, codAtivo, newAssetQtyToBuy);
  await investmentsModels.updateNegotiation(codCliente, codAtivo, "compra", qtdeAtivo, total);

  return {
    message: `Compra de ${qtdeAtivo}x ${codAtivo} por R$ ${total} realizada com sucesso`,
  }
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

  await accountModels.updateBalance(codCliente, newBalance);
  await accountModels.updateMovimentation(codCliente, "venda", total);
  await assetsModels.updateAssetQty(codAtivo, newAssetQty);
  await investmentsModels.updateWallet(codCliente, codAtivo, newAssetQtyToSell);
  await investmentsModels.updateNegotiation(codCliente, codAtivo, "venda", qtdeAtivo, total);

  return {
    message: `Venda de ${qtdeAtivo}x ${codAtivo} por R$ ${total} realizada com sucesso`,
  }
}

module.exports = {
  buy,
  sell,
}