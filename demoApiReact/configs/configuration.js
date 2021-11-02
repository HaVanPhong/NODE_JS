require('dotenv').config();

module.exports = {
  SALT_ROUNDS: +process.env.SALT_ROUNDS || 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "asdfgh"
}