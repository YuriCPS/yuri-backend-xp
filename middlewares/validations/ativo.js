module.exports = (req, res, next) => {
  try {
    const { codAtivo } = req.body;

    if (!codAtivo){
      return res.status(400).send({ message: 'O código do ativo precisa ser informado' });
    }

    if (codAtivo.length < 5 || codAtivo.length > 6) {
      return res.status(400).send({ message: 'Informe um código valido com 5 ou 6 caracteres' });
    }

    return next();
  } catch (err) {
    return next(err);
  }
};