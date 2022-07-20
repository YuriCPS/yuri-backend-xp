const express = require('express');
const investments = require('../controllers/investimentos');
const tokenValidation = require('../middlewares/validations/token');
const clientValidation = require('../middlewares/validations/cliente');

const router = express.Router();

router.post('/comprar', tokenValidation, clientValidation, investments.buy);
router.post('/vender', tokenValidation, clientValidation, investments.sell);

module.exports = router;
