const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { spawn } = require("child_process");

const { sendResponse, sendStatusUpdate } = require("./utils/sendResponse");
const {
  validateHost,
  validateInt,
  validateBool,
} = require("./utils/validateInput");

const port = 9000;
const appPath = path.resolve(__dirname + "/../dist/") + "/";

app.use(express.static(appPath));
app.use(compression());

app.get("/", (req, res) => {
  res.sendFile(appPath + "index.html");
});

io.on("connection", (socket) => {
  socket.on("runPing", (data, callback) => {
    const { target, count } = data;
    const timestamp = new Date().getTime();
    const title = "Ping to '" + target + "'";

    if (!validateHost(target) || !validateInt(count, 1, 25)) {
      return sendStatusUpdate(
        socket,
        timestamp,
        title,
        "error",
        "Invalid Input"
      );
    }

    const cmd = spawn("ping", ["-c", count, target]);
    sendResponse(socket, timestamp, title, cmd);
  });

  socket.on("runDig", (data, callback) => {
    const { target, dns, reverse } = data;
    const timestamp = new Date().getTime();
    const title = "Dig to '" + target + "'";

    if (
      !validateHost(target) ||
      !validateHost(dns, true) ||
      !validateBool(reverse)
    ) {
      return sendStatusUpdate(
        socket,
        timestamp,
        title,
        "error",
        "Invalid Input"
      );
    }

    const cmd = spawn("nslookup", [target, "@" + dns]);
    sendResponse(socket, timestamp, title, cmd);
  });

  socket.on("runTraceroute", (data, callback) => {
    const { target, maxHops } = data;
    const timestamp = new Date().getTime();
    const title = "Traceroute to '" + target + "'";

    if (!validateHost(target) || !validateInt(maxHops, 1, 30)) {
      return sendStatusUpdate(
        socket,
        timestamp,
        title,
        "error",
        "Invalid Input"
      );
    }

    const cmd = spawn("traceroute", ["-m", maxHops, target]);
    sendResponse(socket, timestamp, title, cmd);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
