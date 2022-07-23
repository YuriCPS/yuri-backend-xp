const Importer = require("mysql-import");
require("dotenv").config();

const restoreDb = async () => {
    const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

    const importer = new Importer({
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        host: MYSQL_HOST,
      });

      await importer.import("./src/database/YuriBackend.sql");

      console.log("Banco de dados restaurado com sucesso!");

      await importer.disconnect();
};

module.exports = restoreDb;

if (!module.parent) {
    restoreDb();
}