const accountRouter = require("./accounts.route");
const postRouter = require("./posts.router");

module.exports = (app) => {
  app.use("/api/accounts", accountRouter);
  app.use("/api/posts", postRouter);
};
