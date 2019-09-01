const http = require("http");
const express = require("express");
const morgan = require("morgan");
const formidable = require('express-formidable');
const ws = require("ws");

const { serverPort } = require("./config");
const { errorHandler } = require("./middleware");
const { watcher } = require("./modules/fileManager");
const router = require("./routes");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});

app.use(morgan('common'))
app.use(express.json());
app.use(formidable());
app.use(router);
app.use(errorHandler);

const server = http.createServer(app);
const wss = new ws.Server({ server });

let openedWsConnections = [];

let watcherThreshold;
watcher((eventName, filename) => {
  if (watcherThreshold) 
    return;

  openedWsConnections.forEach(ws => ws.send(`${eventName}:${filename}`));
  watcherThreshold = setTimeout(() => watcherThreshold = null, 500);
})

wss.on('connection', ws => {
  openedWsConnections.push(ws);
  ws.on("close", () => {
    openedWsConnections = openedWsConnections.filter(openedWs => openedWs !== ws);
  });
});

server.listen(serverPort, () => console.log(`Listen port ${serverPort}`));