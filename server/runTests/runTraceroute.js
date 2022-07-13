const { spawn } = require("child_process");
const { getConfig } = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const Validator = require("../utils/validateInput");

function runTraceroute(data, socket) {
  if (!getConfig()["traceroute"]._enabled) return;

  const { target, maxHops } = data;
  const timestamp = new Date().getTime();
  const title = "Traceroute to '" + target + "'";

  const validator = new Validator();
  validator
    .host(target, { message: "Invalid Target" })
    .int(maxHops, { message: "Invalid Max Hops", min: 1, max: 30 });

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

  args.push("-m " + maxHops);
  args.push("-I");
  args.push(target);

  const cmd = spawn("traceroute", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runTraceroute;
