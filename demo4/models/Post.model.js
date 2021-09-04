const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", userSchema, "Posts");
