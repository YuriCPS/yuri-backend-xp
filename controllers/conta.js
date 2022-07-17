const contaServices = require('../services/conta');
const { verifyToken } = require('../utils/jwt');

const getBalance = async (req, res, next) => {
  const { codCliente } = req.params;
  const { authorization } = req.headers;
  const { codCliente: tokenCodClient } = verifyToken(authorization);

  try {
    // O cliente não pode ver a conta de outro cliente
    if (Number(codCliente) !== tokenCodClient) {
      return res.status(401).json({ message: 'Usuário não autorizado!' });
    }

    const response = await contaServices.getBalance(codCliente);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

const deposit = async (req, res, next) => {
  const { codCliente, valor } = req.body;
  const { authorization } = req.headers;
  const { codCliente: tokenCodClient } = verifyToken(authorization);

  try {
    // O cliente não pode fazer um depósito para outro cliente
    if (Number(codCliente) !== tokenCodClient) {
      return res.status(401).json({ message: 'Usuário não autorizado!' });
    }

    const response = await contaServices.deposit(codCliente, valor);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBalance,
  deposit,
}