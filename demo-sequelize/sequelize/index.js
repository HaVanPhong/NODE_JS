const configuration = require("../configs/configuration");

const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const extraSetup = require("./extra-setup");

const { DB_NAME, USERNAME, PASSWORD, HOST, PORT, DIALECT } =
  configuration.DATABASE;

// tạo csdl nếu chưa tồn tại khi chạy mysql local
const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: HOST,
    port: PORT,
    user: USERNAME,
    password: PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
};

let configOption = {
  host: HOST,
  port: PORT,
  dialect: DIALECT,
  logging: false,
  timezone: "+07:00",
};

// config for postgres heroku
if (DIALECT === "postgres") {
  configOption = {
    ...configOption,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
}

const sequelize = new Sequelize(DB_NAME, USERNAME, PASSWORD, configOption);

// require các models
const defindModels = [
  require("../models/User.model"),
  require("../models/Post.model"),
];

// định nghĩa các thuộc tính trong bảng bằng cách truyền instance sequelize
for (const defindModel of defindModels) {
  defindModel(sequelize);
}

extraSetup(sequelize);

module.exports = {
  createConnection,
  sequelize,
  User: sequelize.models.user, // user là tên model, đối số đầu tiên truyền vào hàm define
  Post: sequelize.models.post, // post là tên model, đối số đầu tiên truyền vào hàm define
};
