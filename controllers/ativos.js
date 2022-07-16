const ativosServices = require('../services/ativos');
const getValues = require('../utils/getValues');
const { verifyToken } = require('../utils/jwt');

const getAll = async (req, res, next) => {
  try {
    const [ativos] = await ativosServices.getAll();

    return res.status(200).json(ativos);
  } catch (error) {
    next(error);
  }
}

const getByClient = async (req, res, next) => {
  const { codCliente } = req.params;
  const { authorization } = req.headers;
  const { codCliente: tokenCodClient } = verifyToken(authorization);

  try {
    // O cliente não pode ver a carteira de outro cliente
    if (Number(codCliente) !== tokenCodClient) {
      return res.status(401).json({ message: 'Usuário não autorizado!' });
    }

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


module.exports = {
  getAll,
  getByClient
}