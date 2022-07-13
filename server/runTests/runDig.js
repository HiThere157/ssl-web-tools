const { spawn } = require("child_process");
const { getConfig } = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const Validator = require("../utils/validateInput");

function runDig(data, socket) {
  if (!getConfig()["dig"]._enabled) return;

  const { target, dns, type, reverse } = data;
  const timestamp = new Date().getTime();
  const title = "Dig to '" + target + "'";

  const validator = new Validator();
  validator
    .host(target, { message: "Invalid Target" })
    .host(dns, { message: "Invalid DNS", optional: dns === "" })
    .selection(type, {
      message: "Invalid Type",
      selections: [
        "ANY",
        "A",
        "AAAA",
        "CNAME",
        "MX",
        "NS",
        "PTR",
        "SOA",
        "SRV",
      ],
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

  if (reverse) args.push("-x");
  args.push(target);
  if (dns) args.push("@" + dns);
  args.push(type);

  const cmd = spawn("dig", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runDig;
