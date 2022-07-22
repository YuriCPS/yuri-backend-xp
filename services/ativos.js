const assetsModels = require('../models/ativos');

const getAll = () => assetsModels.getAll();

const getByCode = (codAtivo) => assetsModels.getByCode(codAtivo);

module.exports = {
  getAll,
  getByCode,
}