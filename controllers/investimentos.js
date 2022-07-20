const investimentosServices = require('../services/investimentos');

const buy = async (req, res, next) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;

  try {
    const response = await investimentosServices.buy(codCliente, codAtivo, qtdeAtivo);

    if (response.status) {
      return res.status(response.status).json({ message: response.message });
    }

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buy,
}