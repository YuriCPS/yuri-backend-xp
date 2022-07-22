const accountServices = require('../services/conta');
const assetsServices = require('../services/ativos');
const getValues = require('../utils/getValues');

const getBalance = async (req, res, next) => {
  const { codCliente } = req.params;

  try {
    const response = await accountServices.getBalance(codCliente);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

const getMovimentation = async (req, res, next) => {
  const { codCliente } = req.params;

  try {
    const response = await accountServices.getMovimentation(codCliente);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

const getWallet = async (req, res, next) => {
  const { codCliente } = req.params;

  try {
    const [clientAssets] = await accountServices.getWallet(codCliente);
    const [allAssets] = await assetsServices.getAll();
    const clientAssetsWithValue = getValues(clientAssets, allAssets);

    if (clientAssetsWithValue.length === 0) {
      return res.status(404).json({
        message: 'O cliente não possui ativo em sua carteira'
      });
    }

    return res.status(200).json(clientAssetsWithValue);
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
  getMovimentation,
  getWallet,
  deposit,
  withdraw,
}