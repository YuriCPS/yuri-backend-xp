const assetsModels = require('../models/ativos');

const getAll = () => assetsModels.getAll();

const getByClient = (codCliente) => assetsModels.getByClient(codCliente);

const getByCode = (codAtivo) => assetsModels.getByCode(codAtivo);

module.exports = {
  getAll,
  getByClient,
  getByCode,
}