require('dotenv').config();

module.exports={
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/AccountSv",
  PORT: process.env.PORT || 8080,
  SALT_ROUNDS: +process.env.SALT_ROUNDS|| 10
}