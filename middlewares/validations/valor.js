module.exports = (req, res, next) => {
  try {
    const { valor } = req.body;

    if (!valor){
      return res.status(400).send({ message: 'O valor precisa ser informado' });
    }

    if (valor < 0) {
      return res.status(400).send({ message: 'O valor precisa ser maior que R$ 0.00' });
    }

    return next();
  } catch (err) {
    return next(err);
  }
};