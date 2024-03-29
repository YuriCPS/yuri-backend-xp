const { verifyToken } = require('../../utils/jwt');

const token = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const isValid = verifyToken(authorization);
  if (!isValid) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }

  return next();
};

module.exports = token;
