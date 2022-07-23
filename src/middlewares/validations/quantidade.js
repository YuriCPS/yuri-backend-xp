module.exports = (req, res, next) => {
  const { qtdeAtivo } = req.body;

  if (!qtdeAtivo) {
    return res.status(400).send({ message: 'A quantidade precisa ser informada' });
  }

  if (qtdeAtivo < 0) {
    return res.status(400).send({ message: 'A quantidade precisa ser maior que 0' });
  }

  return next();
};
