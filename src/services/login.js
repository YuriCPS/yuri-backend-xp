const loginModel = require('../models/login');
const { createToken } = require('../utils/jwt');

const verifyClient = async ({ email, senha }) => {
  const [clientInfos] = await loginModel.verifyClient({ email, senha });

  if (clientInfos.length === 0) {
    return false;
  }

  // Remove a senha para o payload do token
  const payload = clientInfos[0];
  delete payload.senha;

  return createToken(payload);
};

module.exports = {
  verifyClient,
};