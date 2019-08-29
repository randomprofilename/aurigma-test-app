const express = require("express");
const { serverPort } = require("./config");

const app = express();

app.use(express.json());

app.listen(serverPort, () => console.log(`Listen port ${serverPort}`));