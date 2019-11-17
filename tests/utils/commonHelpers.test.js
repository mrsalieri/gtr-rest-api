const commonHelpers = require("../../utils/commonHelpers");

const { objectHelper, arrayHelper } = commonHelpers;

const { hasOwnPropertyCall } = objectHelper;
const { appendArrayOnTargetArray, isArrayWithElements } = arrayHelper;

describe("utils.commonHelpers", () => {
  it("hasOwnPropertyCall true", () => {
    const body = {
      status: 400
    };

    const response = hasOwnPropertyCall(body, "status");

    expect(response).toEqual(true);
  });

  it("hasOwnPropertyCall false", () => {
    const body = {
      status: 400
    };

    const response = hasOwnPropertyCall(body, "status2");

    expect(response).toEqual(false);
  });

  it("appendArrayOnTargetArray", () => {
    const ary1 = [1, 2];
    const ary2 = [3, 4];

    appendArrayOnTargetArray({ targetArray: ary1, arrayToBeAppended: ary2 });

    expect(ary1.length).toEqual(4);
  });

  it("isArrayWithElements true", () => {
    const ary = [1, 2];

    const response = isArrayWithElements(ary);

    expect(response).toEqual(true);
  });

  it("isArrayWithElements empty array", () => {
    const ary = [];

    const response = isArrayWithElements(ary);

    expect(response).toEqual(false);
  });

  it("isArrayWithElements non array", () => {
    const response = isArrayWithElements(null);

    expect(response).toEqual(false);
  });
});
