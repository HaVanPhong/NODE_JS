const mongoose = require('mongoose');
const configuration= require('./configuration')
const connectDB= async ()=>{
  try {
    const connect = await mongoose.connect(configuration.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log("Connect successfully!!");
  } catch (error) {
    console.log(error);
  }
}

module.exports= connectDB;