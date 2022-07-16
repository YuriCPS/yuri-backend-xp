const express = require('express');
const ativos = require('../controllers/ativos');

const router = express.Router();

router.get('/', ativos.getAll);

module.exports = router;
