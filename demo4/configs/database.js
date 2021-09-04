const configuration = require("./configuration");

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(configuration.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;
