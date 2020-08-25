const mongoose = require("mongoose");
const config = require("./config");

module.exports = [
    mongoose.connect(config.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }),

    mongoose.connection.on("error", (err) => {
        console.log(`Problema ao conectar com o banco de dados: ${err}`);
    }),

    mongoose.connection.on("disconnected", () => {
        console.log("Você foi desconectado do banco de dados!");
    }),

    mongoose.connection.on("connected", () => {
        console.log("Você foi conectado ao banco de dados com sucesso!");
    })

];
