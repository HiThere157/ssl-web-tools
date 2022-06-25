const { spawn } = require("child_process");
const getConfig = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const { validateHost, validateInt } = require("../utils/validateInput");

function runTraceroute(data, socket) {
  if (!getConfig()["traceroute"]._enabled) return;

  const { target, maxHops } = data;
  const timestamp = new Date().getTime();
  const title = "Traceroute to '" + target + "'";

  if (!validateHost(target) || !validateInt(maxHops, 1, 30)) {
    return sendStatusUpdate(socket, timestamp, title, "error", "Invalid Input");
  }

  const args = [];
  args.push("-m " + maxHops);
  args.push("-I");
  args.push(target);

  const cmd = spawn("traceroute", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runTraceroute;
