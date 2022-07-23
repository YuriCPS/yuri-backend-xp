const investmentsServices = require('../services/investimentos');
const assetsServices = require('../services/ativos');

const buy = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;

  try {
    const [asset] = await assetsServices.getByCode(codAtivo);
    if (asset.length === 0) {
      return res.status(404).json({ message: 'Ativo não encontrado, verifique o código do ativo' });
    }

    const response = await investmentsServices.buy(codCliente, codAtivo, qtdeAtivo);
    if (response.status) {
      return res.status(response.status).json({ message: response.message });
    }

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const sell = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;

  try {
    const [asset] = await assetsServices.getByCode(codAtivo);
    if (asset.length === 0) {
      return res.status(404).json({ message: 'Ativo não encontrado, verifique o código do ativo' });
    }

    const response = await investmentsServices.sell(codCliente, codAtivo, qtdeAtivo);
    if (response.status) {
      return res.status(response.status).json({ message: response.message });
    }

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  buy,
  sell,
};
