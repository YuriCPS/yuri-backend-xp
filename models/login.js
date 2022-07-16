const connection = require('../database/dbConnection');

const verifyClient = async ({ email, senha }) => {
  const clientInfos = await connection.query(`
    SELECT * FROM clientes
    WHERE emailCliente = ? AND senha = ?
    `, [email, senha]);

  return clientInfos;
}

module.exports = {
  verifyClient
}