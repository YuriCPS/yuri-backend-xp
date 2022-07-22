const express = require('express');
const assets = require('../controllers/ativos');

const router = express.Router();

router.get('/', assets.getAll);
router.get('/:codAtivo', assets.getByCode);

module.exports = router;
