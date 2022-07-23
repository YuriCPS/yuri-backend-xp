const express = require('express');
const assets = require('../controllers/ativos');
const assetValidation = require('../middlewares/validations/ativo');
const tickerValidation = require('../middlewares/validations/ticker');

const router = express.Router();

router.get('/', assets.getAll);
router.get('/:codAtivo', assetValidation, assets.getByCode);
router.get('/ticker/:ticker', tickerValidation, assets.getByTicker);

module.exports = router;
