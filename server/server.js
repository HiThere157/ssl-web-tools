const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 9000;
const path = __dirname + "/../dist/";

app.use(express.static(path));

app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
