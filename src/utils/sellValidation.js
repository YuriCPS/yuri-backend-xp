module.exports = (clientAssets, assetToSell, qtdeAtivo) => {
  if (clientAssets.length === 0) {
    return {
      status: 404,
      message: 'O cliente não possui ativos em sua carteira',
    };
  }

  if (!assetToSell) {
    return { status: 404, message: 'Ativo não encontrado ou o cliente não possui esse ativo' };
  }

  if (qtdeAtivo > assetToSell.qtdeAtivo) {
    return {
      status: 400,
      message: 'Quantidade de ativos em carteira insuficiente para essa venda',
    };
  }

  return { message: 'Quantidade disponível em carteira para venda' };
};
