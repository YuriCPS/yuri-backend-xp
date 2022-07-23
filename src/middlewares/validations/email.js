module.exports = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).send({ message: 'O email precisa ser válido' });
  }

  return next();
};
