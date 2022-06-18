const Convert = require("ansi-to-html");
const convert = new Convert();

function sendResponse(socket, timestamp, title, cmd) {
  const sendData = (data, status) => {
    socket.emit("newResultData", {
      timestamp,
      title,
      status,
      command: cmd.spawnargs.join(" "),
      data: convert.toHtml(data.toString()),
    });
  };

  cmd.stdout.on("data", (data) => {
    sendData(data, "pending");
  });
  cmd.stderr.on("data", (data) => {
    sendData(data, "error");
  });

  cmd.on("error", (error) => {
    sendData(error.message, "error");
  });

  cmd.on("close", (code) => {
    sendData(" (Status: " + code + ")", "complete");
  });
}

function sendStatusUpdate(socket, timestamp, title, status, data) {
  socket.emit("newResultData", {
    timestamp,
    title,
    status,
    command: undefined,
    data: convert.toHtml(data.toString()),
  });
}

module.exports = { sendResponse, sendStatusUpdate };
