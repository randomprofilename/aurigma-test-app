const express = require("express");
const morgan = require("morgan");
const { serverPort } = require("./config");
const router = require("./routes");

const app = express();

app.use(morgan('common'))
app.use(express.json());
app.use(router);

app.listen(serverPort, () => console.log(`Listen port ${serverPort}`));