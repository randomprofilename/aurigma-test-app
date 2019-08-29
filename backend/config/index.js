/* eslint-disable no-undef */
const config = {
  serverPort: process.env.PORT || 3000,
  workingDirectory: process.env.DIRECTORY
};

for (let param in config)
  if (config[param] === undefined)
    throw new Error(`Config error: parameter ${param} is undefined`)

module.exports = config;