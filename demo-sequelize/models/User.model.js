const configuration = require("../configs/configuration");

const bcryptjs = require("bcryptjs");

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      scopes: {
        withoutPassword: {
          attributes: { exclude: ["password"] },
        },
      },
      hooks: {
        beforeCreate(user) {
          user.password = bcryptjs.hashSync(
            user.password,
            configuration.SALT_ROUNDS
          );
        },
        afterCreate: (user) => {
          delete user.dataValues.password;
        },
        beforeUpdate(user) {
          if (user.password) {
            user.password = bcryptjs.hashSync(
              user.password,
              configuration.SALT_ROUNDS
            );
          }
        },
        afterUpdate: (user) => {
          delete user.dataValues.password;
        },
      },
    }
  );
};
