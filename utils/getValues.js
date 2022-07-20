module.exports = (clientAssets, allAssets) => {
  const assetsWithValues = [];

  clientAssets.map(clientAsset => {
    assetsWithValues.push(
      {
        codCliente: clientAsset.codCliente,
        codAtivo: clientAsset.codAtivo,
        qtdeAtivo: clientAsset.qtdeAtivo,
        valor: allAssets.find(asset => asset.codAtivo === clientAsset.codAtivo).valor,
      }
    );
  });

  return assetsWithValues;
}