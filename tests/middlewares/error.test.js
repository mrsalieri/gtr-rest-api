const request = require("supertest");
const server = require("../../server");
const { queryController } = require("../../utils/instances");

describe("middlewares.error", () => {
  afterEach(async () => {
    await server.close();
  });

  const exec = input => {
    return request(server)
      .post("/api/query/querytest")
      .send(input);
  };

  it("status 500 unexpected error", async () => {
    const input = {
      startDate: "2016-11-20",
      endDate: "2019-02-02",
      minCount: 2700,
      maxCount: 3000
    };

    queryController.queryTest = () => {
      throw new Error("test error");
    };

    const res = await exec(input);

    expect(res.status).toBe(500);
  });
});
