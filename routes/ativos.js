const express = require('express');
const ativos = require('../controllers/ativos');

const router = express.Router();

router.get('/', ativos.getAll);
router.get('/:codCliente', ativos.getByClient);

module.exports = router;
