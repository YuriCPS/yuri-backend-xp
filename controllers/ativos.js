const ativosServices = require('../services/ativos');

const getAll = async (req, res, next) => {
  try {
    const [ativos] = await ativosServices.getAll();

    return res.status(200).json(ativos);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll
}