var mongoose = require("mongoose");
// const { DateTime } = require('luxon');

var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  price: { type: Number, min: 0, required: true },
  picture_urls: [{ type: String }],
  post_date: { type: Date, required: true },
  condition: { type: String, required: true, enum: ["New", "Used"] },
  platform: {
    type: String,
    required: true,
    enum: [
      "Nintendo Switch",
      "PlayStation 4",
      "PlayStation 5",
      "Xbox One",
      "Xbox Series X|S",
    ],
  },
  pickup_address: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 300 },
  status: {
    type: String,
    required: true,
    enum: ["Selling", "Sold", "Suspended"],
  },
  seller: { type: Schema.ObjectId, ref: "user", required: true },
});

module.exports = mongoose.model("post", postSchema);
