require("dotenv").config();

console.log(`Iniciando a API em ambiente ${process.env.NODE_ENV}`);

module.exports = process.env;
