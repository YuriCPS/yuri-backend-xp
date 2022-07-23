module.exports = (req, res, next) => {
  const { senha } = req.body;

  if (!senha || senha.length < 8) {
    return res.status(400).send({
      message: 'A senha precisa ter no mínimo 8 caracteres',
    });
  }

  return next();
};
