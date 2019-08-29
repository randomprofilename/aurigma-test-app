const express = require("express");
const { serverPort } = require("./config");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(router);

app.listen(serverPort, () => console.log(`Listen port ${serverPort}`));