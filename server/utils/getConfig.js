const fs = require("fs");
const path = require("path");

const useDefaultFile = !process.argv.includes("--with-docker-volume");

const confDefaultFile = path.resolve(__dirname + "/../config/default.json");
const confFile = path.resolve(__dirname + "/../../config/default.json");

function getConfig() {
  copyDefaultConfig();

  const configString = fs.readFileSync(
    useDefaultFile ? confDefaultFile : confFile,
  );
  return JSON.parse(configString);
}

function copyDefaultConfig() {
  if (!fs.existsSync(confFile) && !useDefaultFile) {
    fs.copyFileSync(confDefaultFile, confFile);
  }
}

module.exports = { getConfig, copyDefaultConfig };
