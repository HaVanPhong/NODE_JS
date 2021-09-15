const configuration = require("../configs/configuration");

const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

const ResponseError = require("../helpers/ResponseError");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new ResponseError(401, "Unauthorized");
  }

  const token = authorization.substring(7);

  const decode = jwt.verify(token, configuration.JWT_SECRET);

  const user = await User.findById(decode._id);

  if (!user) {
    throw new ResponseError(401, "Unauthorized");
  }

  req.user = user;
  next();
};
