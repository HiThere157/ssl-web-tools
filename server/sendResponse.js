function sendResponse(socket, timestamp, title, cmd, callback) {
  cmd.stdout.on("data", (data) => {
    socket.emit("newResultData", {
      timestamp,
      title,
      data: data.toString(),
    });
  });

  cmd.on("error", (error) => {
    socket.emit("newResultStatus", {
      timestamp,
      title: "Traceroute",
      status: "error",
      data: error.message,
    });
  });

  cmd.on("close", (code) => {
    socket.emit("newResultStatus", {
      timestamp,
      title: "Traceroute",
      status: "complete",
      data: code,
    });
  });
}

module.exports = { sendResponse };
