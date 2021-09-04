const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, default: ''},
  password: {type: String, default: ''},
  create_at: {type: Date, default: Date.now()}
})

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel; 