module.exports = (asset, balance, qtdeAtivo) => {
  if (balance[0].saldo < asset[0].valor * qtdeAtivo) {
    return {
      status:406,
      message: `Saldo atual de R$ ${balance[0].saldo} é insuficiente para realizar a compra de R$ ${asset[0].valor * qtdeAtivo}`,
    }
  }

  return { message: `OK, saldo suficiente!` };
}