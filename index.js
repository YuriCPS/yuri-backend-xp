const app = require('./app');
require('dotenv').config();

app.listen(process.env.API_PORT, () => {
  console.log(`Escutando na porta ${process.env.API_PORT}`);
});
