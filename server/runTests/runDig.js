const { spawn } = require("child_process");
const getConfig = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const { validateHost, validateSelection } = require("../utils/validateInput");

function runDig(data, socket) {
  if (!getConfig()["dig"]._enabled) return;

  const { target, dns, type, reverse } = data;
  const timestamp = new Date().getTime();
  const title = "Dig to '" + target + "'";

  if (
    !validateHost(target) ||
    !validateHost(dns, true) ||
    !validateSelection(type, [
      "ANY",
      "A",
      "AAAA",
      "CNAME",
      "MX",
      "NS",
      "PTR",
      "SOA",
      "SRV",
    ])
  ) {
    return sendStatusUpdate(socket, timestamp, title, "error", "Invalid Input");
  }

  const args = [];
  if (reverse) args.push("-x");
  args.push(target);
  if (dns) args.push("@" + dns);
  args.push(type);

  const cmd = spawn("dig", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runDig;
