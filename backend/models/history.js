var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var historySchema = new Schema({
  user: { type: Schema.ObjectId, ref: "user", required: true },
  date: { type: Date, required: true },
  post: { type: Schema.ObjectId, ref: "post" },
});

module.exports = mongoose.model("history", historySchema);
