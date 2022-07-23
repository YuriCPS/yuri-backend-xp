const express = require('express');
const investments = require('../controllers/investimentos');
const tokenValidation = require('../middlewares/validations/token');
const clientValidation = require('../middlewares/validations/cliente');
const assetValidation = require('../middlewares/validations/ativo');
const qtyValidation = require('../middlewares/validations/quantidade');

const router = express.Router();

router.post(
  '/comprar',
  tokenValidation,
  clientValidation,
  assetValidation,
  qtyValidation,
  investments.buy,
);

router.post(
  '/vender',
  tokenValidation,
  clientValidation,
  assetValidation,
  qtyValidation,
  investments.sell,
);

module.exports = router;
