const express = require('express');
const assets = require('../controllers/ativos');
const tokenValidation = require('../middlewares/validations/token');
const clientValidation = require('../middlewares/validations/cliente');

const router = express.Router();

router.get('/', assets.getAll);
router.get('/:codAtivo', assets.getByCode);
router.get('/carteira/:codCliente', tokenValidation, clientValidation, assets.getByClient);

module.exports = router;
