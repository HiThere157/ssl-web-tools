const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { spawn } = require("child_process");

const port = 9000;
const path = __dirname + "/../dist/";

app.use(express.static(path));

app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

io.on("connection", (socket) => {
  socket.on("runTracert", (data, callback) => {
    const { target, maxHops } = data;

    const timestamp = new Date().getTime();

    const ls = spawn("ping", ["www.google.de"]);
    ls.stdout.on("data", (data) => {
      socket.emit("newResultData", {
        timestamp,
        title: "Tracert",
        data: data.toString(),
      });
    });

    ls.on("error", (error) => {
      callback({ status: 500, error: error.message });
    });

    ls.on("close", (code) => {
      callback({ status: 200, code: code });
    });
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
