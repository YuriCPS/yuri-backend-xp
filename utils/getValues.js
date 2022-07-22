module.exports = (clientAssets, allAssets) => {
  const assetsWithValues = [];

  clientAssets.forEach(clientAsset => {
    if (clientAsset.qtdeAtivo !== 0) {
      assetsWithValues.push(
        {
          codCliente: clientAsset.codCliente,
          codAtivo: clientAsset.codAtivo,
          ticker: clientAsset.ticker,
          qtdeAtivo: clientAsset.qtdeAtivo,
          valor: allAssets.find(asset => asset.codAtivo === clientAsset.codAtivo).valor,
        }
      );
    }
  });

  return assetsWithValues;
}