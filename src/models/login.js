const connection = require('../database/dbConnection');

const verifyClient = async ({ email, senha }) => connection.query(`
    SELECT * FROM clientes
    WHERE emailCliente = ? AND senha = ?
    `, [email, senha]);

module.exports = {
  verifyClient,
};
