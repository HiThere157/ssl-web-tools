function sendResponse(socket, timestamp, title, cmd) {
  const sendData = (data) => {
    socket.emit("newResultData", {
      timestamp,
      title,
      data: data.toString(),
    });
  };

  cmd.stdout.on("data", sendData);
  cmd.stderr.on("data", sendData);

  cmd.on("error", (error) => {
    sendStatusUpdate(socket, timestamp, title, "error", error.message);
  });

  cmd.on("close", (code) => {
    sendStatusUpdate(socket, timestamp, title, "complete", code);
  });
}

function sendStatusUpdate(socket, timestamp, title, status, data) {
  socket.emit("newResultStatus", {
    timestamp,
    title,
    status,
    data,
  });
}

module.exports = { sendResponse, sendStatusUpdate };