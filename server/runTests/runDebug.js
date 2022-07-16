const { spawn } = require("child_process");
const { getConfig } = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const Validator = require("../utils/validateInput");

function runDebug(data, socket) {
  if (!getConfig()["debug"]._enabled) return;

  const { selectedTest } = data;
  const timestamp = new Date().getTime();
  const title = "Debug: '" + selectedTest + "'";

  const validator = new Validator();
  validator.selection(selectedTest, {
    message: "Invalid Test",
    selections: ["color"],
  });

  if (validator.hasErrors()) {
    return sendStatusUpdate(
      socket,
      timestamp,
      title,
      "error",
      validator.getErrors(),
    );
  }

  const args = [];

  let command = "";
  if (selectedTest === "color") {
    command = "colortest-16b";
  }

  if(command === "") {
    return;
  }

  const cmd = spawn(command, args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runDebug;
