const express = require("express");
const routes = require("./routes/routes");
require("./config/connection");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000);
