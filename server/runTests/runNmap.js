const { spawn } = require("child_process");
const { getConfig } = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const Validator = require("../utils/validateInput");

function runNmap(data, socket) {
  if (!getConfig()["nmap"]._enabled) return;

  const { target, serviceDetection, OSDetection, timing } = data;
  const { targetSubnet, subnet } = data;
  const { portOption, TCPPorts, verbose } = data;
  const timestamp = new Date().getTime();
  const title = "Nmap to '" + target + "'";

  const validator = new Validator();
  validator
    .host(target, { message: "Invalid Target" })
    .int(subnet, {
      message: "Invalid Subnet",
      optional: !targetSubnet,
      min: 0,
      max: 32,
    })
    .selection(timing, {
      message: "Invalid Timing",
      selections: ["T2", "T3", "T4"],
    })
    .selection(portOption, {
      message: "Invalid Port Option",
      selections: ["T1000", "T100", "custom"],
    })
    .portRange(TCPPorts, {
      message: "Invalid TCP Ports",
      optional: portOption !== "custom",
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

  if (serviceDetection) args.push("-sV");
  if (OSDetection) args.push("-O");
  if (portOption === "T100") args.push("-F");
  if (portOption === "custom") args.push("-p" + TCPPorts);
  if (verbose) args.push("-v");

  var targetWithSubnet = target;
  if (targetSubnet) {
    targetWithSubnet += "/" + subnet;
  }

  args.push(targetWithSubnet);
  args.push("-" + timing);

  const cmd = spawn("nmap", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runNmap;
