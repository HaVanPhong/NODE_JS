const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const UserSchema= new Schema({
  username: String,
  password: String,
}, {
  timestamps: true,
  collection: 'Users',
});
const UserModel= mongoose.model('User', UserSchema);
module.exports = UserModel;