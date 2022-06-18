const fs = require("fs");
const path = require("path");

const confPath = path.resolve(__dirname + "/../config/") + "/";
const confName = process.env.CONF_NAME || "default";

function getConfig() {
  const configString = fs.readFileSync(confPath + confName + ".json");
  return JSON.parse(configString);
}

module.exports = getConfig;
