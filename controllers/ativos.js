const ativosServices = require('../services/ativos');
const getValues = require('../utils/getValues');

const getAll = async (_req, res, next) => {
  try {
    const [ativos] = await ativosServices.getAll();

    return res.status(200).json(ativos);
  } catch (error) {
    next(error);
  }
}

const getByClient = async (req, res, next) => {
  const { codCliente } = req.params;

  try {
    const [ativosDoCliente] = await ativosServices.getByClient(codCliente);

    if (ativosDoCliente.length === 0) {
      return res.status(404).json({
        message: 'O cliente não possui ativos em sua carteira'
      });
    }

    const [listaDeAtivos] = await ativosServices.getAll();
    const ativosDoClienteComValores = getValues(ativosDoCliente, listaDeAtivos);

    return res.status(200).json(ativosDoClienteComValores);
  } catch (error) {
    next(error);
  }
}

const getByCode = async (req, res, next) => {
  const { codAtivo } = req.params;

  try {
    const [ativo] = await ativosServices.getByCode(codAtivo);

    if (ativo.length === 0) {
      return res.status(404).json({
        message: 'Ativo não encontrado'
      });
    }

    return res.status(200).json(ativo);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getAll,
  getByClient,
  getByCode,
}