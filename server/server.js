const express = require("express");
const app = express();
const compression = require("compression");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const server = http.createServer(app);
const io = new Server(server);

const appPath = path.resolve(__dirname + "/../dist/") + "/";
const getConfig = require("./utils/getConfig");

let config = getConfig();

const allTests = {
  runSSL: require("./runTests/runSSL"),
  runPing: require("./runTests/runPing"),
  runDig: require("./runTests/runDig"),
  runWhois: require("./runTests/runWhois"),
  runNmap: require("./runTests/runNmap"),
  runTraceroute: require("./runTests/runTraceroute"),
};

app.use(express.static(appPath));
app.use(compression());

app.get("/", (req, res) => {
  res.sendFile(appPath + "index.html");
});

app.get("/config.json", (req, res) => {
  config = getConfig();
  res.json(config);
});

io.on("connection", (socket) => {
  Object.keys(allTests).forEach((test) => {
    socket.on(test, (data) => {
      allTests[test](data, socket);
    });
  });
});

server.listen(process.env.APP_PORT || 9000, () => {
  console.log("App backend running");
});
