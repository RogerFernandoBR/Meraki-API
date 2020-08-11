const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://admin:TmsGVFxFIZHd1cjI@servidorroger-wtgz0.mongodb.net/meraki?retryWrites=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Check DB conection
mongoose.connection.on('error', (err) => {
  console.log(`Problema ao conectar com o banco de dados: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Você foi desconectado do banco de dados!');
});

mongoose.connection.on('connected', () => {
  console.log('Você foi conectado ao banco de dados com sucesso!');
});

app.use(express.json());
app.use(routes);

app.listen(3000);
