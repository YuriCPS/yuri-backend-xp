module.exports = (err, _req, res) => {
  console.log('Erro na aplicação!', err);

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
};
