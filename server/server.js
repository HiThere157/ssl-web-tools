const express = require("express");
const app = express();
const compression = require("compression");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const server = http.createServer(app);
const io = new Server(server);

const appPath = path.resolve(__dirname + "/../dist/") + "/";
const { getConfig, copyDefaultConfig } = require("./utils/getConfig");
copyDefaultConfig();

const runSSL = require("./runTests/runSSL");
const runPing = require("./runTests/runPing");
const runDig = require("./runTests/runDig");
const runWhois = require("./runTests/runWhois");
const runNmap = require("./runTests/runNmap");
const runTraceroute = require("./runTests/runTraceroute");

app.use(express.static(appPath));
app.use(compression());

app.get("/", (req, res) => {
  res.sendFile(appPath + "index.html");
});

app.get("/config.json", (req, res) => {
  res.json(getConfig());
});

io.on("connection", (socket) => {
  socket.on("runSSL", (data) => {
    runSSL(data, socket);
  });

  socket.on("runPing", (data) => {
    runPing(data, socket);
  });

  socket.on("runDig", (data) => {
    runDig(data, socket);
  });

  socket.on("runWhois", (data) => {
    runWhois(data, socket);
  });

  socket.on("runNmap", (data) => {
    runNmap(data, socket);
  });

  socket.on("runTraceroute", (data) => {
    runTraceroute(data, socket);
  });
});

server.listen(9000, () => {
  console.log(`App backend listening on port 9000`);
});
