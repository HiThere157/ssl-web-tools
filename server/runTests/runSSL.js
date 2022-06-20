const { spawn } = require("child_process");
const { getConfig } = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const { validateHost, validateInt } = require("../utils/validateInput");

function runSSL(data, socket) {
  if (!getConfig()["ssl"]._enabled) return;

  const { target, port, useSelfSigned } = data;
  const timestamp = new Date().getTime();
  const title = "SSL Test of '" + target + "'";

  if (!validateHost(target) || !validateInt(port, 1, 65535)) {
    return sendStatusUpdate(socket, timestamp, title, "error", "Invalid Input");
  }

  const args = [];
  if (useSelfSigned) args.push("--add-ca");
  if (useSelfSigned) args.push("/certs/*.pem");
  args.push(target + ":" + port);

  const cmd = spawn("testssl.sh", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runSSL;
