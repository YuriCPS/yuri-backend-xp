module.exports = (asset, qtdeAtivo) => {
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

  return { message: `Quantidade disponível` };
}