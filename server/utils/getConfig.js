const fs = require("fs");
const path = require("path");

const confPath = path.resolve(__dirname + "/../config/") + "/";

function getConfig() {
  const configString = fs.readFileSync(confPath + "default.json");
  return JSON.parse(configString);
}

module.exports = getConfig;
