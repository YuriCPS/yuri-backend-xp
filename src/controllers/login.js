const loginServices = require('../services/login');

const login = async (req, res, next) => {
  const { email, senha } = req.body;

  try {
    const response = await loginServices.verifyClient({ email, senha });

    if (!response) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos' });
    }

    return res.status(200).json({ token: response });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
};
