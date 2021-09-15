const User = require("../models/User.model");

const ResponseError = require("../helpers/ResponseError");

const userValidate = require("../validations/user.validate");

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    statusCode: 200,
    users,
  });
};

module.exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  const users = await User.findById(userId);

  if (!users) {
    throw new ResponseError(404, "Resource not found");
  }

  res.status(200).json({
    statusCode: 200,
    users,
  });
};

module.exports.createNewUser = async (req, res) => {
  const { value, error } = userValidate(req.body);

  if (error) {
    throw new ResponseError(400, error.details);
  }

  const user = await User.create(value);

  res.status(201).json({
    statusCode: 201,
    user,
  });
};
