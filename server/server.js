const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { spawn } = require("child_process");

const { sendResponse, sendStatusUpdate } = require("./sendResponse");
const {
  validateHostname,
  validateIp,
  validateInt,
} = require("./validateInput");

const port = 9000;
const appPath = path.resolve(__dirname + "/../dist/") + "/";

app.use(express.static(appPath));
app.use(compression());

app.get("/", (req, res) => {
  res.sendFile(appPath + "index.html");
});

io.on("connection", (socket) => {
  socket.on("runTraceroute", (data, callback) => {
    const { target, maxHops } = data;
    const timestamp = new Date().getTime();
    const title = "Traceroute to '" + target + "'";

    if (!(validateHostname(target) || validateIp(target))) {
      sendStatusUpdate(socket, timestamp, title, "error", "Invalid target");
      return;
    }

    if (!validateInt(maxHops, 1, 30)) {
      sendStatusUpdate(socket, timestamp, title, "error", "Invalid maxHops");
      return;
    }

    const cmd = spawn("tracert", ["-h", maxHops, target]);
    sendResponse(socket, timestamp, title, cmd);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
