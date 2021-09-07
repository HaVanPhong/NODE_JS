const userRouter = require("./user.router");
const postRouter = require("./post.router");

module.exports = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/posts", postRouter);
};
