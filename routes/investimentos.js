const express = require('express');
const investimentos = require('../controllers/investimentos');
const tokenValidation = require('../middlewares/validations/token');
const clientValidation = require('../middlewares/validations/cliente');

const router = express.Router();

router.post('/comprar', tokenValidation, clientValidation, investimentos.buy);
// router.post('/vender', tokenValidation, clientValidation, investimentos.sell);

module.exports = router;
