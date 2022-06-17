const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { spawn } = require("child_process");

const { sendResponse } = require("./sendResponse");
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

    if (!(validateHostname(target) || validateIp(target))) {
      socket.emit("newResultStatus", {
        timestamp,
        title: "Traceroute",
        status: "error",
        data: "Invalid target",
      });
      return;
    }

    if (!validateInt(maxHops, 1, 30)) {
      socket.emit("newResultStatus", {
        timestamp,
        title: "Traceroute",
        status: "error",
        data: "Invalid maxHops",
      });
      return;
    }

    const cmd = spawn("tracert", [target]);
    sendResponse(socket, timestamp, "Traceroute", cmd);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
