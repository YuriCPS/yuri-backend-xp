module.exports = (asset, balance, qtdeAtivo) => {
  const total = Number(asset[0].valor * qtdeAtivo).toFixed(2);
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

  if (balance[0].saldo < asset[0].valor * qtdeAtivo) {
    return {
      status:406,
      message: `Saldo atual de R$ ${balance[0].saldo} é insuficiente para realizar a compra de R$ ${total}`,
    }
  }

  return { message: `Quantidade disponível na corretora e saldo do cliente suficiente` };
}