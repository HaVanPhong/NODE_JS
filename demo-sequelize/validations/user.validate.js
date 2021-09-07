const Joi = require("joi");

const userValidateField = {
  username: Joi.string().alphanum().min(3).max(60).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  displayname: Joi.string().min(3).max(60).required(),
};

const userSchema = Joi.object(userValidateField);

module.exports.userValidate = (user) => userSchema.validate(user);

module.exports.userUpdateValidate = (user) => {
  let userSchemaUpdate = {};

  if (user.username) {
    userSchemaUpdate = {
      ...userSchemaUpdate,
      username: userValidateField.username,
    };
  }

  if (user.password) {
    userSchemaUpdate = {
      ...userSchemaUpdate,
      password: userValidateField.password,
    };
  }

  if (user.displayname) {
    userSchemaUpdate = {
      ...userSchemaUpdate,
      displayname: userValidateField.displayname,
    };
  }

  return Joi.object(userSchemaUpdate).validate(user);
};
