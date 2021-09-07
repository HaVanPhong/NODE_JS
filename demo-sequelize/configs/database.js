const configuration = require("./configuration");
const { sequelize, createConnection } = require("../sequelize");

const connectDB = async () => {
  try {
    if (configuration.DATABASE.DIALECT === "mysql") {
      await createConnection();
    }
    await sequelize.sync(); // tự động tạo các bảng
    // await sequelize.sync({ alter: true }); // alter: true thay đổi cấu trúc bảng nếu có
    await sequelize.authenticate(); // kết nối db
    console.log(`Connected database: ${sequelize.config.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1); // nếu kết nối db lỗi thì kết thúc server
  }
};

module.exports = connectDB;
