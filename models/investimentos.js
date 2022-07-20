const connection = require('../database/dbConnection');

const updateNegotiation = async (codCliente, codAtivo, type, qtdeAtivo, total) => connection.query(`
  INSERT INTO negociacoes (codCliente, codAtivo, Tipo, QtdeAtivo, Valor)
  VALUES (?, ?, ?, ?, ?)
  `, [codCliente, codAtivo, type, qtdeAtivo, total]);

const updateWallet = async (codCliente, codAtivo, qtdeAtivo) => connection.query(`
  UPDATE carteiras
  SET QtdeAtivo = ?
  WHERE codCliente = ?
  AND codAtivo = ?
  `, [qtdeAtivo, codCliente, codAtivo]);

module.exports = {
  updateNegotiation,
  updateWallet,
}