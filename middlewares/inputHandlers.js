const Joi = require("@hapi/joi");

const queryTest = (req, res, next) => {
  const { startDate, endDate, minCount, maxCount } = req.body;

  const filter = { startDate, endDate, minCount, maxCount };

  const joiFilter = Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    minCount: Joi.number().required(),
    maxCount: Joi.number().required()
  });

  const { error } = Joi.validate(filter, joiFilter);
  if (error) {
    return res.status(400).send({
      code: 400,
      msg: error.details[0].message
    });
  }

  req.body.queryTest = { startDate, endDate, minCount, maxCount };

  return next();
};

module.exports = {
  queryTest
};
