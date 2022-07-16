const express = require('express');
const ativos = require('../controllers/ativos');
const tokenValidation = require('../middlewares/validations/token');

const router = express.Router();

router.get('/', ativos.getAll);
router.get('/:codCliente', tokenValidation, ativos.getByClient);

module.exports = router;
