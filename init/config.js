const config = require("config");

module.exports = () => {
  if (!config.get("DB")) {
    throw new Error("FATAL ERROR: DB is not defined in config");
  }
};
