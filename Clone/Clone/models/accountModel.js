const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountUser = new Schema({
  name: String,
  password: String,
  role: String,
}, {
    collection: "accounts"
});

module.exports = mongoose.model('accounts', AccountUser);