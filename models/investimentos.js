const connection = require('../database/dbConnection');

const updateNegotiation = async (codCliente, codAtivo, ticker, type, qtdeAtivo, total) => connection.query(`
  INSERT INTO negociacoes (codCliente, codAtivo, ticker, tipo, qtdeAtivo, valor)
  VALUES (?, ?, ?, ?, ?, ?)
  `, [codCliente, codAtivo, ticker, type, qtdeAtivo, total]);

const updateWallet = async (codCliente, codAtivo, qtdeAtivo) => connection.query(`
  UPDATE carteiras
  SET qtdeAtivo = ?
  WHERE codCliente = ?
  AND codAtivo = ?
  `, [qtdeAtivo, codCliente, codAtivo]);

module.exports = {
  updateNegotiation,
  updateWallet,
}