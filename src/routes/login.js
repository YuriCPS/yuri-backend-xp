const express = require('express');
const login = require('../controllers/login');
const loginMiddleware = require('../middlewares/validations/login');
const emailValidation = require('../middlewares/validations/email');
const passwordValidation = require('../middlewares/validations/senha');

const router = express.Router();

router.post('/', loginMiddleware, emailValidation, passwordValidation, login.login);

module.exports = router;
