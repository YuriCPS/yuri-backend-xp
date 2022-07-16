const connection = require('../database/dbConnection');

const verifyClient = async ({ email, password }) => {
  const clientInfos = await connection.query(`
    SELECT * FROM clientes
    WHERE email = ? AND senha = ?
    `, [email, password]);

  return clientInfos;
}

module.exports = {
  verifyClient
}