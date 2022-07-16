const connection = require('../database/dbConnection');

const getAll = async () => connection.query(`
  SELECT * FROM ativos
  ORDER BY codAtivo ASC
  `);

const getByClient = async (codCliente) => connection.query(`
  SELECT * FROM carteiras
  WHERE codCliente = ?
  ORDER BY codAtivo ASC
  `, [codCliente]);

  module.exports = {
    getAll,
    getByClient
  }