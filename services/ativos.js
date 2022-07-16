const ativosModel = require('../models/ativos');

const getAll = () => ativosModel.getAll();

const getByClient = (codCliente) => ativosModel.getByClient(codCliente);

module.exports = {
  getAll,
  getByClient
}