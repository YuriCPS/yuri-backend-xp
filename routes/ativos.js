const express = require('express');
const ativos = require('../controllers/ativos');
const tokenValidation = require('../middlewares/validations/token');
const clientValidation = require('../middlewares/validations/cliente');

const router = express.Router();

router.get('/', ativos.getAll);
router.get('/:codAtivo', ativos.getByCode);
router.get('/carteira/:codCliente', tokenValidation, clientValidation, ativos.getByClient);

module.exports = router;
