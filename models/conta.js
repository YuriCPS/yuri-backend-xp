const connection = require('../database/dbConnection');

const getBalance = async (codCliente) => connection.query(`
  SELECT * FROM contas
  WHERE codConta = ?
  `, [codCliente]);

const getClient = async (codCliente) => connection.query(`
  SELECT * FROM clientes
  WHERE codCliente = ?
  `, [codCliente]);

const updateMovimentation = async (codCliente, type, value) => connection.query(`
  INSERT INTO movimentacoes (codCliente, tipo, valor)
  VALUES (?, ?, ?)
  `, [codCliente, type, value]);

const updateBalance = async (codCliente, newBalance) => connection.query(`
  UPDATE contas
  SET saldo = ?
  WHERE codConta = ?
  `, [newBalance, codCliente]);

module.exports = {
  getBalance,
  getClient,
  updateMovimentation,
  updateBalance,
}