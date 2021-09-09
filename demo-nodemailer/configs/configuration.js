require("dotenv").config();

module.exports = {
  EMAIL: {
    USERNAME: process.env.EMAIL_USERNAME,
    PASSWORD: process.env.EMAIL_PASSWORD,
  },
};
