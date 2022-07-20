const express = require('express');
const account = require('../controllers/conta');
const tokenValidation = require('../middlewares/validations/token');
const valueValidation = require('../middlewares/validations/valor');
const clientValidation = require('../middlewares/validations/cliente');

const router = express.Router();

router.get('/:codCliente', tokenValidation, clientValidation, account.getBalance);

router.post('/deposito', tokenValidation, valueValidation, clientValidation, account.deposit);
router.post('/saque', tokenValidation, valueValidation, clientValidation, account.withdraw);

module.exports = router;
