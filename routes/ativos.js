const express = require('express');
const assets = require('../controllers/ativos');

const router = express.Router();

router.get('/', assets.getAll);
router.get('/:codAtivo', assets.getByCode);
router.get('/ticker/:ticker', assets.getByTicker);

module.exports = router;
