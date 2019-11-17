const QueryController = require("../controllers/query");
const { Records } = require("../models/records");
const ResponseData = require("../libs/responseData");
const instances = require("../utils/instances");

instances.queryController = new QueryController({
  recordsModel: Records,
  responseHandler: ResponseData
});
