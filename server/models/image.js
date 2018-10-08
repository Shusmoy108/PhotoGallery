const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ImageSchema = new Schema({
  imageLink: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  tags: [],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("images", ImageSchema);
