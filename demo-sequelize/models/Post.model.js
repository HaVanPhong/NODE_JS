const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        async afterCreate(post) {
          post.dataValues.user = await sequelize.models.user
            .scope("withoutPassword")
            .findOne({
              where: {
                id: post.userId,
              },
            });
        },
        async afterUpdate(post) {
          post.dataValues.user = await sequelize.models.user
            .scope("withoutPassword")
            .findOne({
              where: {
                id: post.userId,
              },
            });
        },
      },
    }
  );
};
