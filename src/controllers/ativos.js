const assetsServices = require('../services/ativos');

const getAll = async (_req, res, next) => {
  try {
    const [allAssets] = await assetsServices.getAll();

    return res.status(200).json(allAssets);
  } catch (error) {
    next(error);
  }
};

const getByCode = async (req, res, next) => {
  const { codAtivo } = req.params;

  try {
    const [asset] = await assetsServices.getByCode(codAtivo);
    if (asset.length === 0) {
      return res.status(404).json({
        message: 'Ativo não encontrado',
      });
    }

    return res.status(200).json(asset);
  } catch (error) {
    next(error);
  }
};

const getByTicker = async (req, res, next) => {
  const { ticker } = req.params;

  try {
    const [asset] = await assetsServices.getByTicker(ticker);

    if (asset.length === 0) {
      return res.status(404).json({
        message: 'Ativo não encontrado',
      });
    }

    return res.status(200).json(asset);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getByCode,
  getByTicker,
};
