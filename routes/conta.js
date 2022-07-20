const express = require('express');
const conta = require('../controllers/conta');
const tokenValidation = require('../middlewares/validations/token');
const valueValidation = require('../middlewares/validations/valor');
const clientValidation = require('../middlewares/validations/cliente');

const router = express.Router();

router.get('/:codCliente', tokenValidation, clientValidation, conta.getBalance);

router.post('/deposito', tokenValidation, valueValidation, clientValidation, conta.deposit);
router.post('/saque', tokenValidation, valueValidation, clientValidation, conta.withdraw);

module.exports = router;
