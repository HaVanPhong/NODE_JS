const mongoose = require('mongoose');

var connect= async ()=>{
  try {
    const conn= await mongoose.connect('mongodb://localhost:27017/Demo_Passport', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log("Connect db succeslly");
  } catch (error) {
    console.log(error);
  }
}
module.exports = connect;