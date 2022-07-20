const accountServices = require('../services/conta');

const getBalance = async (req, res, next) => {
  const { codCliente } = req.params;

  try {
    const response = await accountServices.getBalance(codCliente);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

const deposit = async (req, res, next) => {
  const { codCliente, valor } = req.body;

  try {
    const response = await accountServices.deposit(codCliente, valor);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

const withdraw = async (req, res, next) => {
  const { codCliente, valor } = req.body;

  try {
    const response = await accountServices.withdraw(codCliente, valor);

    if (response.status) {
      return res.status(response.status).json({ message: response.message });
    }

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBalance,
  deposit,
  withdraw,
}