const express = require("express");
const app = express();
const compression = require("compression");
const http = require("http");
const { Server } = require("socket.io");

const path = require("path");
const { spawn } = require("child_process");

const getConfig = require("./utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("./utils/sendResponse");
const {
  validateHost,
  validateInt,
  validateSelection,
  validatePortRange,
} = require("./utils/validateInput");

const server = http.createServer(app);
const io = new Server(server);

const port = 9000;
const appPath = path.resolve(__dirname + "/../dist/") + "/";

app.use(express.static(appPath));
app.use(compression());

app.get("/", (req, res) => {
  res.sendFile(appPath + "index.html");
});

app.get("/config.json", (req, res) => {
  res.json(getConfig());
});

io.on("connection", (socket) => {
  socket.on("runSSL", (data, callback) => {
    if (!getConfig()["ssl"]._enabled) return;

    const { target, port, useSelfSigned } = data;
    const timestamp = new Date().getTime();
    const title = "SSL Test of '" + target + "'";

    if (!validateHost(target) || !validateInt(port, 1, 65535)) {
      return sendStatusUpdate(
        socket,
        timestamp,
        title,
        "error",
        "Invalid Input",
      );
    }

    const args = [];
    if (useSelfSigned) args.push("--add-ca");
    if (useSelfSigned) args.push("/certs/*.pem");
    args.push(target + ":" + port);

    const cmd = spawn("testssl.sh", args);
    sendResponse(socket, timestamp, title, cmd);
  });

  socket.on("runPing", (data, callback) => {
    if (!getConfig()["ping"]._enabled) return;

    const { target, count } = data;
    const timestamp = new Date().getTime();
    const title = "Ping to '" + target + "'";

    if (!validateHost(target) || !validateInt(count, 1, 25)) {
      return sendStatusUpdate(
        socket,
        timestamp,
        title,
        "error",
        "Invalid Input",
      );
    }

    const args = [];
    args.push("-c " + count);
    args.push(target);

    const cmd = spawn("ping", args);
    sendResponse(socket, timestamp, title, cmd);
  });

  socket.on("runDig", (data, callback) => {
    if (!getConfig()["dig"]._enabled) return;

    const { target, dns, reverse } = data;
    const timestamp = new Date().getTime();
    const title = "Dig to '" + target + "'";

    if (!validateHost(target) || !validateHost(dns, true)) {
      return sendStatusUpdate(
        socket,
        timestamp,
        title,
        "error",
        "Invalid Input",
      );
    }

    const args = [];
    if (reverse) args.push("-x");
    args.push(target);
    if (dns) args.push("@" + dns);

    const cmd = spawn("dig", args);
    sendResponse(socket, timestamp, title, cmd);
  });

  socket.on("runNmap", (data, callback) => {
    if (!getConfig()["nmap"]._enabled) return;

    const { target, serviceDetection, OSDetection, timing } = data;
    const { portOption, TCPPorts, verbose } = data;
    const timestamp = new Date().getTime();
    const title = "Nmap to '" + target + "'";

    if (
      !validateHost(target) ||
      !validateSelection(timing, ["T2", "T3", "T4"]) ||
      !validateSelection(portOption, ["T1000", "T100", "custom"]) ||
      !validatePortRange(TCPPorts, portOption !== "custom")
    ) {
      return sendStatusUpdate(
        socket,
        timestamp,
        title,
        "error",
        "Invalid Input",
      );
    }

    const args = [];
    if (serviceDetection) args.push("-sV");
    if (OSDetection) args.push("-O");
    if (portOption === "T100") args.push("-F");
    if (portOption === "custom") args.push("-p" + TCPPorts);
    if (verbose) args.push("-v");
    args.push(target);
    args.push("-" + timing);

    const cmd = spawn("nmap", args);
    sendResponse(socket, timestamp, title, cmd);
  });

  socket.on("runTraceroute", (data, callback) => {
    if (!getConfig()["traceroute"]._enabled) return;

    const { target, maxHops } = data;
    const timestamp = new Date().getTime();
    const title = "Traceroute to '" + target + "'";

    if (!validateHost(target) || !validateInt(maxHops, 1, 30)) {
      return sendStatusUpdate(
        socket,
        timestamp,
        title,
        "error",
        "Invalid Input",
      );
    }

    const args = [];
    args.push("-m " + maxHops);
    args.push("-I");
    args.push(target);

    const cmd = spawn("traceroute", args);
    sendResponse(socket, timestamp, title, cmd);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
