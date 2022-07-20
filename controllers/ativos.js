const assetsServices = require('../services/ativos');
const getValues = require('../utils/getValues');

const getAll = async (_req, res, next) => {
  try {
    const [allAssets] = await assetsServices.getAll();

    return res.status(200).json(allAssets);
  } catch (error) {
    next(error);
  }
}

const getByClient = async (req, res, next) => {
  const { codCliente } = req.params;

  try {
    const [clientAssets] = await assetsServices.getByClient(codCliente);

    if (clientAssets.length === 0) {
      return res.status(404).json({
        message: 'O cliente não possui assets em sua carteira'
      });
    }

    const [allAssets] = await assetsServices.getAll();
    const clientAssetsWithValue = getValues(clientAssets, allAssets);

    return res.status(200).json(clientAssetsWithValue);
  } catch (error) {
    next(error);
  }
}

const getByCode = async (req, res, next) => {
  const { codAtivo } = req.params;

  try {
    const [asset] = await assetsServices.getByCode(codAtivo);

    if (asset.length === 0) {
      return res.status(404).json({
        message: 'Ativo não encontrado'
      });
    }

    return res.status(200).json(asset);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getAll,
  getByClient,
  getByCode,
}