const User = require('../configs/db');
const userValidate= require('../validations/user.validate')
const createError= require('http-errors')
module.exports = {
  getAll: async (req, res, next) => {
    res.status(200).json({
      status: 200,
      data: User
    })
  },
  createUser: async (req, res, next) => {
    const {...body}= req.body;
    const {value, error}= userValidate(body);
    if (error) {
      throw createError(400, error.message)
    }

    let oldUser= User.find(v=> v.username=== value.username);
    if (oldUser) {
      throw createError(403, `The username ${oldUser.username} already exists`);
    }

    value.id= User.length+1
    User.push(value);
    
    res.status(200).json({
      id: value.id,
      username: value.username
    })
  }
}