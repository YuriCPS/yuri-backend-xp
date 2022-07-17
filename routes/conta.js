const express = require('express');
const conta = require('../controllers/conta');
const tokenValidation = require('../middlewares/validations/token');

const router = express.Router();

router.get('/:codCliente', tokenValidation, conta.getBalance);

module.exports = router;
