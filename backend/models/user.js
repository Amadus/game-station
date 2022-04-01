var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  user_name: { type: String, maxlength: 100, required: true },
  avatar_url: { type: String },
});

module.exports = mongoose.model("user", userSchema);
