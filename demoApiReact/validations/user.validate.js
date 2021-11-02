const Joi = require("joi");

const userValidate = Joi.object({
  username: Joi.string().alphanum().min(5).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

module.exports = (user) => userValidate.validate(user);
