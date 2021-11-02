const configuration = require('./configuration');
const mongoose = require('mongoose');
const connectDB= async ()=>{
  try {
    const conn= await mongoose.connect(configuration.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      userCreationStrategy: true,
    })
    console.log(`Mongoose connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;;