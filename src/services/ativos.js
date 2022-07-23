const assetsModels = require('../models/ativos');

const getAll = () => assetsModels.getAll();

const getByCode = (codAtivo) => assetsModels.getByCode(codAtivo);

const getByTicker = (ticker) => assetsModels.getByTicker(ticker);

module.exports = {
  getAll,
  getByCode,
  getByTicker,
};
