const Joi = require('joi')

const userValidate = data=>{
  const userScheme= Joi.object({
    email: Joi.string().email().pattern(new RegExp("gmail.com$")).required().max(50),
    password: Joi.string().min(4).max(32).required()
  })
  return userScheme.validate(data);
}
module.exports = userValidate;