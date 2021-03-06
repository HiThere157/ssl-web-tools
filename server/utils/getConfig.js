const fs = require("fs");
const path = require("path");

const useCustomFile = process.argv.includes("--with-docker-volume");

const configDefaultFile = path.resolve(__dirname + "/../config/default.json");
const configFile = path.resolve(__dirname + "/../../config/default.json");

function getConfig() {
  // useCustomFile: only use a seperate user config file in the docker image. Otherwise use the default config file.

  // configDefault: default server side config, is updated when starting a new version
  // config: current config, can be updated by the user and is saved in a docker volume

  const configDefaultString = fs.readFileSync(configDefaultFile);
  const configDefault = JSON.parse(configDefaultString);

  if (!useCustomFile) {
    return configDefault;
  }

  if (!fs.existsSync(configFile)) {
    fs.copyFileSync(configDefaultFile, configFile);
  }

  const configString = fs.readFileSync(configFile);
  const config = JSON.parse(configString);

  // if there is a new version of the configDefault, add the new fields to the user config
  if (config._version !== configDefault._version) {
    const mergedConfig = mergeConfig(configDefault, config);
    mergedConfig._version = configDefault._version;

    fs.writeFileSync(configFile, JSON.stringify(mergedConfig, null, 2));
  }

  return config;
}

async function getDockerTags() {
  try {
    const response = await fetch(
      "https://hub.docker.com/v2/repositories/hithere157/ssl-web-tools/tags",
    );
    if (response.ok) {
      const data = await response.json();
      const tags = data.results.sort((a, b) =>
        b.name.localeCompare(a.name, undefined, { numeric: true }),
      );

      return tags;
    }
  } catch (error) {
    console.error(error);
    console.log("Error fetching docker tags");
  }
}

function mergeConfig(baseConfig, config) {
  const mergedConfig = { ...baseConfig };
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      if (typeof config[key] === "object") {
        mergedConfig[key] = mergeConfig(baseConfig[key], config[key]);
      } else {
        mergedConfig[key] = config[key];
      }
    }
  }
  return mergedConfig;
}

module.exports = { getConfig, getDockerTags };
