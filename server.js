require("dotenv").config();
const express = require("express");
const winston = require("winston");
const gracefulShutdown = require("./init/shutdown");

const app = express();

require("./init/security")(app);
require("./init/logging")(app);
require("./init/config")();
require("./init/instances");
require("./init/routes")(app);
require("./init/db")();

const port = process.env.PORT || 8054;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

gracefulShutdown(server);

module.exports = server;
