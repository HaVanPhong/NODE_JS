const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", userSchema, "Posts");
