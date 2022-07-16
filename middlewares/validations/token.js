const { verifyToken } = require('../utils/jwt');

const token = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

   const isValid = verifyToken(authorization);
    if (!isValid) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = token;
