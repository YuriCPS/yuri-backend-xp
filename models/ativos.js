const connection = require('../database/dbConnection');

const getAll = async () => connection.query(`
  SELECT * FROM ativos
  ORDER BY codAtivo ASC
  `);

const getByCode = async (codAtivo) => connection.query(`
  SELECT * FROM ativos
  WHERE codAtivo = ?
  `, [codAtivo]);

const getByTicker = async (ticker) => connection.query(`
  SELECT * FROM ativos
  WHERE ticker = ?
  `, [ticker]);

const insert = async (codCliente, codAtivo) => connection.query(`
  INSERT INTO carteiras (codCliente, codAtivo, qtdeAtivo)
  VALUES (?, ?, 0)
  `, [codCliente, codAtivo]);

const updateAssetQty = async (codAtivo, qtdeAtivo) => connection.query(`
  UPDATE ativos
  SET qtdeAtivo = ?
  WHERE codAtivo = ?
  `, [qtdeAtivo, codAtivo]);

module.exports = {
  getAll,
  getByCode,
  getByTicker,
  insert,
  updateAssetQty,
}