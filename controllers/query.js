const moment = require("moment");
const { arrayHelper } = require("../utils/commonHelpers");

const { isArrayWithElements } = arrayHelper;

class QueryController {
  constructor({ recordsModel, responseHandler }) {
    this.Records = recordsModel;
    this.ResponseHandler = responseHandler;
  }

  async queryTest({ startDate, endDate, minCount, maxCount }) {
    const responseHandler = new this.ResponseHandler();

    // Get data
    const response = await this.Records.aggregate([
      {
        $project: {
          _id: false,
          key: true,
          createdAt: true,
          totalCount: { $sum: "$counts" }
        }
      },
      {
        $match: {
          totalCount: {
            $gte: parseInt(minCount, 10),
            $lte: parseInt(maxCount, 10)
          },
          createdAt: {
            $gte: moment.utc(startDate, "YYYY-MM-DD").toDate(),
            $lte: moment // converts end date to YYYY-MM-DD 23:59:59
              .utc(endDate, "YYYY-MM-DD")
              .add(1, "day")
              .subtract(1, "second")
              .toDate()
          }
        }
      }
    ]);

    if (!isArrayWithElements(response)) {
      return responseHandler
        .setStatus(404)
        .setCode(404)
        .setMessage("no data found")
        .getResponseData();
    }

    return responseHandler
      .setStatus(200)
      .setCode(0)
      .setMessage("success")
      .setRecords(response)
      .getResponseData();
  }
}

module.exports = QueryController;
