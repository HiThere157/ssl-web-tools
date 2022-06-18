const fs = require("fs");
const path = require("path");

const confDefaultFile = path.resolve(__dirname + "/../config/default.json");
const confFile = path.resolve(__dirname + "/../../config/default.json");

function getConfig() {
  copyDefaultConfig();

  const configString = fs.readFileSync(confFile);
  return JSON.parse(configString);
}

function copyDefaultConfig() {
  if (!fs.existsSync(confFile)) {
    fs.copyFileSync(confDefaultFile, confFile);
  }
}

module.exports = { getConfig, copyDefaultConfig };
