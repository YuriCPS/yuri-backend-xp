module.exports = (req, res, next) => {
  const { codAtivo: codAtivoBody } = req.body;
  const { codAtivo: codAtivoParams } = req.params;
  const codAtivo = codAtivoBody || codAtivoParams;

  if (!codAtivo) {
    return res.status(400).send({ message: 'O código do ativo precisa ser informado' });
  }

  if (isNaN(codAtivo)) {
    return res.status(400).send({ message: 'O código do ativo precisa um número' });
  }

  return next();
};
