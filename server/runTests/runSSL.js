const { spawn } = require("child_process");
const { getConfig } = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const Validator = require("../utils/validateInput");

function runSSL(data, socket) {
  if (!getConfig()["ssl"]._enabled) return;

  const { target, port, useSelfSigned } = data;
  const timestamp = new Date().getTime();
  const title = "SSL Test of '" + target + "'";

  const validator = new Validator();
  validator
    .host(target, { message: "Invalid Target" })
    .int(port, { message: "Invalid Port", min: 1, max: 65535 });

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

  if (useSelfSigned) args.push("--add-ca");
  if (useSelfSigned) args.push("/caCerts/*.pem");
  args.push(target + ":" + port);

  const cmd = spawn("testssl.sh", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runSSL;
