module.exports = (sequelize) => {
  const { user, post } = sequelize.models;

  // tạo liên kết một - nhiều, trong bảng posts có thêm 1 field là userId
  user.hasMany(post);
  post.belongsTo(user);
};
