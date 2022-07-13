const { spawn } = require("child_process");
const { getConfig } = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const Validator = require("../utils/validateInput");

function runWhois(data, socket) {
  if (!getConfig()["whois"]._enabled) return;

  const { target } = data;
  const timestamp = new Date().getTime();
  const title = "Whois to '" + target + "'";

  const validator = new Validator();
  validator.host(target, { message: "Invalid Target" });

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

  args.push(target);

  const cmd = spawn("whois", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runWhois;
