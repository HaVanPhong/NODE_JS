require("dotenv").config();

module.exports = {
  DATABASE: {
    HOST: process.env.DB_HOST || "localhost",
    PORT: process.env.DB_PORT || "3306",
    DB_NAME: process.env.DB_NAME || "test",
    USERNAME: process.env.DB_USERNAME || "root",
    PASSWORD: process.env.DB_PASSWORD || "1234",
    DIALECT: process.env.DB_DIALECT || "mysql",
  },
  PORT: process.env.PORT || 3000,
  SALT_ROUNDS: 10,
};
