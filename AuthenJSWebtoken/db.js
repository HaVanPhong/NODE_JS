const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/AuthenService', {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true
    });
    console.log('Connect db successfully!!!');
  } catch (error) {
    console.log('Connect db failure!!', error);
  }
}
module.exports = { connect };