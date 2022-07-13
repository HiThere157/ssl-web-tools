const { spawn } = require("child_process");
const { getConfig } = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const Validator = require("../utils/validateInput");

function runPing(data, socket) {
  if (!getConfig()["ping"]._enabled) return;

  const { target, count } = data;
  const timestamp = new Date().getTime();
  const title = "Ping to '" + target + "'";

  const validator = new Validator();
  validator
    .host(target, { message: "Invalid Target" })
    .int(count, { message: "Invalid Count", min: 1, max: 1000 });

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

  args.push("-c " + count);
  args.push(target);

  const cmd = spawn("ping", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runPing;
