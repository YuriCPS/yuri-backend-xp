const { verifyToken } = require('../../utils/jwt');

const clientValidation = (req, res, next) => {
  const { authorization } = req.headers;
  const { codCliente: tokenCodClient } = verifyToken(authorization);
  const { codCliente: codClienteParams } = req.params;
  const { codCliente: codClienteBody } = req.body;

  try {
    const codCliente = codClienteParams || codClienteBody;
    // O cliente não pode fazer operações para outro cliente
    if(codCliente === undefined) {
      return res.status(400).send({ message: 'O código do cliente precisa ser informado' });
    }

    if (Number(codCliente) !== tokenCodClient) {
      return res.status(401).json({ message: 'Usuário não autorizado!' });
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = clientValidation;
