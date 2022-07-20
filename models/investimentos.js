const connection = require('../database/dbConnection');

const updateNegotiation = async (codCliente, codAtivo, type, qtdeAtivo, total) => connection.query(`
  INSERT INTO negociacoes (codCliente, codAtivo, Tipo, QtdeAtivo, Valor)
  VALUES (?, ?, ?, ?, ?)
  `, [codCliente, codAtivo, type, qtdeAtivo, total]);

const updateWallet = async (codCliente, codAtivo, qtdeAtivo) => connection.query(`
  INSERT INTO carteiras (codCliente, codAtivo, QtdeAtivo)
  VALUES (?, ?, ?)
  `, [codCliente, codAtivo, qtdeAtivo]);

module.exports = {
  updateNegotiation,
  updateWallet,
}