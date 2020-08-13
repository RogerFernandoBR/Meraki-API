const mongoose = require("mongoose");
const config = require("./config");

module.exports = [
    mongoose.connect(config.bd_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }),

    mongoose.connection.on("error", (err) => {
        // eslint-disable-next-line no-console
        console.log(`Problema ao conectar com o banco de dados: ${err}`);
    }),

    mongoose.connection.on("disconnected", () => {
        // eslint-disable-next-line no-console
        console.log("Você foi desconectado do banco de dados!");
    }),

    mongoose.connection.on("connected", () => {
        // eslint-disable-next-line no-console
        console.log("Você foi conectado ao banco de dados com sucesso!");
    })

];
