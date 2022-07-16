module.exports = (client, all) => {
  const ativosWithValues = [];

  client.forEach(ativoClient => {
    ativosWithValues.push(
      {
        codCliente: ativoClient.codCliente,
        codAtivo: ativoClient.codAtivo,
        QtdeAtivo: ativoClient.QtdeAtivo,
        Valor: all.find(ativo => ativo.codAtivo === ativoClient.codAtivo).Valor
      }
    );
  });

  return ativosWithValues;
}