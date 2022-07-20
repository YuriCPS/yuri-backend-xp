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

const getByCode = async (codAtivo) => connection.query(`
  SELECT * FROM ativos
  WHERE codAtivo = ?
  `, [codAtivo]);

const insert = async (codCliente, codAtivo) => connection.query(`
  INSERT INTO carteiras (codCliente, codAtivo, QtdeAtivo)
  VALUES (?, ?, 0)
  `, [codCliente, codAtivo]);

const updateQtdeAtivo = async (codAtivo, qtdeAtivo) => connection.query(`
  UPDATE ativos
  SET qtdeAtivo = ?
  WHERE codAtivo = ?
  `, [qtdeAtivo, codAtivo]);
  
module.exports = {
  getAll,
  getByClient,
  getByCode,
  insert,
  updateQtdeAtivo,
}