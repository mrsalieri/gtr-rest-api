const { mongoose } = require("../utils/db");

const { Schema } = mongoose;

const recordsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  key: String,
  value: String,
  count: [Number],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Records = mongoose.model("Records", recordsSchema);

module.exports = { Records };
