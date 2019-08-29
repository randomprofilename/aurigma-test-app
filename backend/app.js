const express = require("express");
const morgan = require("morgan");

const { serverPort } = require("./config");
const router = require("./routes");
const { errorHandler } = require("./middleware");

const app = express();

app.use(morgan('common'))
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(serverPort, () => console.log(`Listen port ${serverPort}`));