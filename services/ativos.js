const ativosModel = require('../models/ativos');

const getAll = () => ativosModel.getAll();

const getByClient = (codCliente) => ativosModel.getByClient(codCliente);

const getByCode = (codAtivo) => ativosModel.getByCode(codAtivo);

module.exports = {
  getAll,
  getByClient,
  getByCode,
}