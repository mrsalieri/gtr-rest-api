const moment = require("moment");
const { arrayHelper } = require("../utils/commonHelpers");

const { isArrayWithElements } = arrayHelper;

class QueryController {
  constructor({ recordsModel, responseData }) {
    this.Records = recordsModel;
    this.ResponseData = responseData;
  }

  async queryTest({ startDate, endDate, minCount, maxCount }) {
    const responseHandler = new this.ResponseData();

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
            $lte: moment
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
