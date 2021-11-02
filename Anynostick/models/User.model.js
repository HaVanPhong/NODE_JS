const mongoose= require('mongoose');
const _schema= mongoose.Schema;

const userSchema= new _schema({
  username: String, 
  password: String
}, {
  timestamps:  true
})


module.exports = mongoose.model("User", userSchema, "Users");