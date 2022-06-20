const { spawn } = require("child_process");
const { getConfig } = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const { validateHost, validateInt } = require("../utils/validateInput");

function runPing(data, socket) {
  if (!getConfig()["ping"]._enabled) return;

  const { target, count } = data;
  const timestamp = new Date().getTime();
  const title = "Ping to '" + target + "'";

  if (!validateHost(target) || !validateInt(count, 1, 1000)) {
    return sendStatusUpdate(socket, timestamp, title, "error", "Invalid Input");
  }

  const args = [];
  args.push("-c " + count);
  args.push(target);

  const cmd = spawn("ping", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runPing;
