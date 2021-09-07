const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema= new Schema({
  title: {type: String}, 
  content: {type: String},
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",

  }
}, {
  timestamps: true
})

module.exports= mongoose.model("Post", postSchema, "Posts");