const request = require("supertest");
const server = require("../../../server");

jest.setTimeout(60000);

describe("Routes.query.querytest", () => {
  afterEach(async () => {
    await server.close();
  });

  const queryTest = input =>
    request(server)
      .post("/api/query/querytest")
      .send(input);

  it("startDate not found", async () => {
    const input = {
      endDate: "2019-02-02",
      minCount: 2700,
      maxCount: 3000
    };
    const res = await queryTest(input);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe(400);
  });

  it("endDate not found", async () => {
    const input = {
      startDate: "2016-11-20",
      minCount: 2700,
      maxCount: 3000
    };
    const res = await queryTest(input);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe(400);
  });

  it("minCount not found", async () => {
    const input = {
      startDate: "2016-11-20",
      endDate: "2019-02-02",
      maxCount: 3000
    };
    const res = await queryTest(input);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe(400);
  });

  it("maxCount not found", async () => {
    const input = {
      startDate: "2016-11-20",
      endDate: "2019-02-02",
      minCount: 2700
    };
    const res = await queryTest(input);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe(400);
  });

  it("startDate invalid", async () => {
    const input = {
      startDate: "2019-15-02",
      endDate: "2019-02-02",
      minCount: 2700,
      maxCount: 3000
    };
    const res = await queryTest(input);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe(400);
  });

  it("endDate invalid", async () => {
    const input = {
      startDate: "2016-11-20",
      endDate: "2019-15-02",
      minCount: 2700,
      maxCount: 3000
    };
    const res = await queryTest(input);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe(400);
  });

  it("records not found with 404", async () => {
    const input = {
      startDate: "2016-11-20",
      endDate: "2014-02-02",
      minCount: 2700,
      maxCount: 3000
    };
    const res = await queryTest(input);

    expect(res.status).toBe(404);
    expect(res.body.code).toBe(404);
  });

  it("success", async () => {
    const input = {
      startDate: "2016-11-20",
      endDate: "2019-02-02",
      minCount: 2700,
      maxCount: 3000
    };
    const res = await queryTest(input);

    expect(res.status).toBe(200);
    expect(res.body.code).toBe(0);

    expect(res.body.records[0]).toEqual(
      expect.objectContaining({
        key: expect.any(String),
        createdAt: expect.any(String),
        totalCount: expect.any(Number)
      })
    );
  });
});
