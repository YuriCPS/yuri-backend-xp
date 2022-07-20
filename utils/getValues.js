module.exports = (clientAssets, all) => {
  const assetsWithValues = [];

  clientAssets.forEach(clientAsset => {
    assetsWithValues.push(
      {
        codCliente: clientAsset.codCliente,
        codAtivo: clientAsset.codAtivo,
        qtdeAtivo: clientAsset.qtdeAtivo,
        valor: all.find(asset => asset.codAtivo === clientAsset.codAtivo).valor
      }
    );
  });

  return assetsWithValues;
}