const jwt = require('jsonwebtoken');

const config = {
  expiresIn: '10h',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET;
console.log(secret);

const createToken = (infos) => {
  const token = jwt.sign(infos, secret, config);
  return token;
};

const verifyToken = (token) => {
  try {
    const infos = jwt.verify(token, secret, config);
    return infos;
  } catch (err) {
    return false;
  }
};

module.exports = {
  createToken,
  verifyToken,
};