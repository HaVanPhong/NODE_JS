const Joi = require("joi");

const typeRole = require("../constants/typeRole");

const userValidate = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string().email(),
  role: Joi.string().valid(...Object.values(typeRole)),
});

module.exports = (user) => userValidate.validate(user);
