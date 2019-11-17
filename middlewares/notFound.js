const winston = require("winston");

module.exports = (req, res) => {
  winston.info(`Url not found ${req.path}`);
  return res.status(404).send({
    code: 404,
    msg: "endpoint not found"
  });
};
