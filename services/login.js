const loginModel = require('../models/login');
const { createToken } = require('../utils/jwt');

const verifyClient = async ({ email, password }) => {
  const clientInfos = await loginModel.verifyClient({ email, password });

  if (clientInfos.length === 0) {
    return false;
  }

  const token = createToken(clientInfos);

  return token;
};

module.exports = {
  verifyClient,
};