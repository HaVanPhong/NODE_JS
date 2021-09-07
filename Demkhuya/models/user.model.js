const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt= require('bcrypt');
const userSchema= new Schema({
  email: {type: String, unique: true}, 
  password: {type: String}
}, {
  timestamps: true
})

// userSchema.set('toJSON', {
//   transform: function(doc, ret, options){
//     delete ret.password;
//     return ret; 
//   }
// })

// userSchema.pre('save', function(next){
//   this.password=bcrypt.hashSync(this.password, 10);
//   next();
// })

const UserModel= mongoose.model("User", userSchema, "Users");
module.exports= UserModel;