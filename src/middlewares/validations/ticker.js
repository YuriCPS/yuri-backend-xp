module.exports = (req, res, next) => {
  const { ticker } = req.params;

  if (!ticker){
    return res.status(400).send({ message: 'O ticker do ativo precisa ser informado' });
  }

  if (ticker.length < 5 || ticker.length > 6) {
    return res.status(400).send({ message: 'Informe um ticker valido com 5 ou 6 caracteres' });
  }

  return next();
};