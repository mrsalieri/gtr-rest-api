const ResponseData = require("../../libs/responseData");

describe("libs.responseData", () => {
  it("constructor check", () => {
    const body = {
      status: 400,
      code: 401,
      msg: "error",
      records: null
    };

    const responseData = new ResponseData(body).getResponseData();

    expect(responseData).toEqual(body);
  });

  it("function checks", () => {
    const body = {
      status: 400,
      code: 401,
      msg: "error",
      records: "records"
    };

    const response = new ResponseData();

    const responseData = response
      .setStatus(body.status)
      .setCode(body.code)
      .setMessage(body.msg)
      .setRecords(body.records)
      .getResponseData();

    expect(responseData).toEqual(body);
  });
});
