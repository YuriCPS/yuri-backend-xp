const ativosModel = require('../models/ativos');

const getAll = () => ativosModel.getAll();

module.exports = {
  getAll
}