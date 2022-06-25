const { spawn } = require("child_process");
const getConfig = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const { validateHost } = require("../utils/validateInput");

function runWhois(data, socket) {
  if (!getConfig()["whois"]._enabled) return;

  const { target } = data;
  const timestamp = new Date().getTime();
  const title = "Whois to '" + target + "'";

  if (!validateHost(target)) {
    return sendStatusUpdate(socket, timestamp, title, "error", "Invalid Input");
  }

  const args = [];
  args.push(target);

  const cmd = spawn("whois", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runWhois;
