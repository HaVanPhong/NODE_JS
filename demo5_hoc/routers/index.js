const userRouter = require("./user.route");
const postRouter = require("./post.router");
const authRouter = require("./auth.router");

const errorHandle = require("../middlewares/errorHandle");

module.exports = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/auth", authRouter);
  app.use(errorHandle);
};
