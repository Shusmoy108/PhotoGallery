const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TagSchema = new Schema({
  tagName: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("tags", TagSchema);
