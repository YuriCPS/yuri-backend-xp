module.exports = (req, res, next) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send({ message: 'Algum campo não foi preenchido' });
  }

  return next();
};
