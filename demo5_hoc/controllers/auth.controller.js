const configuration = require("../configs/configuration");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

const userValidate = require("../validations/user.validate");

const ResponseError = require("../helpers/ResponseError");

const typeRole = require("../constants/typeRole");

module.exports.signUp = async (req, res) => {
  const { ...body } = req.body;
  body.role = typeRole.USER;

  const { value, error } = userValidate(body);

  if (error) {
    throw new ResponseError(400, error.details);
  }

  const user = await User.create(value);

  const token = jwt.sign(
    { username: user.username, _id: user._id },
    configuration.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    userId: user._id,
    username: user.username,
    jwt: token,
  });
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new ResponseError(400, "Username or password invalid");
  }

  const token = jwt.sign(
    { username: user.username, _id: user._id },
    configuration.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    userId: user._id,
    username: user.username,
    jwt: token,
  });
};

module.exports.validateToken = async (req, res) => {
  const token = req.body.jwt;

  const decode = jwt.verify(token, configuration.JWT_SECRET);

  const user = await User.findById(decode._id);

  if (!user) {
    throw new ResponseError(401, "Invalid token");
  }

  const newToken = jwt.sign(
    { username: user.username, _id: user._id },
    configuration.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    userId: user._id,
    username: user.username,
    jwt: newToken,
  });
};
