class ResponseData {
  constructor(obj) {
    this.defaultData = {
      status: 200,
      code: 0,
      msg: "success",
      records: null
    };

    this.data = Object.assign(this.defaultData, obj);
  }

  setStatus(status) {
    this.data.status = status;
    return this;
  }

  setCode(code) {
    this.data.code = code;
    return this;
  }

  setMessage(msg) {
    this.data.msg = msg;
    return this;
  }

  setRecords(records) {
    this.data.records = records;
    return this;
  }

  getResponseData() {
    return this.data;
  }
}

module.exports = ResponseData;
