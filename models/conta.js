const connection = require('../database/dbConnection');

const getBalance = async (codCliente) => connection.query(`
  SELECT * FROM contas
  WHERE codConta = ?
  `, [codCliente]);

const getClient = async (codCliente) => connection.query(`
  SELECT * FROM clientes
  WHERE codCliente = ?
  `, [codCliente]);

module.exports = {
  getBalance,
  getClient,
}