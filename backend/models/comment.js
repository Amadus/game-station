var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "user", required: true },
  date: { type: Date, required: true },
  content: { type: String, maxlength: 300, required: true },
  post: { type: Schema.ObjectId, ref: "post" },
});

module.exports = mongoose.model("comment", commentSchema);
