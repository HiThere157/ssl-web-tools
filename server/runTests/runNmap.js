const { spawn } = require("child_process");
const { getConfig } = require("../utils/getConfig");
const { sendResponse, sendStatusUpdate } = require("../utils/sendResponse");
const {
  validateHost,
  validateSelection,
  validatePortRange,
} = require("../utils/validateInput");

function runNmap(data, socket) {
  if (!getConfig()["nmap"]._enabled) return;

  const { target, serviceDetection, OSDetection, timing } = data;
  const { portOption, TCPPorts, verbose } = data;
  const timestamp = new Date().getTime();
  const title = "Nmap to '" + target + "'";

  if (
    !validateHost(target) ||
    !validateSelection(timing, ["T2", "T3", "T4"]) ||
    !validateSelection(portOption, ["T1000", "T100", "custom"]) ||
    !validatePortRange(TCPPorts, portOption !== "custom")
  ) {
    return sendStatusUpdate(socket, timestamp, title, "error", "Invalid Input");
  }

  const args = [];
  if (serviceDetection) args.push("-sV");
  if (OSDetection) args.push("-O");
  if (portOption === "T100") args.push("-F");
  if (portOption === "custom") args.push("-p" + TCPPorts);
  if (verbose) args.push("-v");
  args.push(target);
  args.push("-" + timing);

  const cmd = spawn("nmap", args);
  sendResponse(socket, timestamp, title, cmd);
}

module.exports = runNmap;