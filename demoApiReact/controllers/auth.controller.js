var User= require('../configs/db')
const jwt= require('jsonwebtoken')
const userValidate = require('../validations/user.validate')
const createError= require('http-errors')
const configuration = require('../configs/configuration')
module.exports ={
  signUp: async (req, res, next) => {
    const {...body}= req.body;
    const {value, error}= userValidate(body);
    if (error) {
      throw createError(400, error.message)
    }
    let oldUser= User.find(v=> v.username=== value.username);
    if (oldUser) {
      throw createError(403, `The username ${oldUser.username} already exists`);
    }
    value.id= User.length+1;
    User.push(value);
    const token = jwt.sign(
      {id: value.id, username: value.username},
      configuration.JWT_SECRET_KEY,  
      {
        expiresIn: "1d"
      }
    );
    res.status(200).json({
      userId: value.id, 
      username: value.username,
      token: token
    })
  }, 
  login: async (req, res, next) => {
    const { username, password } = req.body;
    let u= User.find(v=> v.username===username && v.password===password)
    if (!u){
      throw createError(400, "Username and password invalid");
    }
    const token = jwt.sign(
      {id: u.id, username: u.username},
      configuration.JWT_SECRET_KEY,
      {
        expiresIn: "1d"
      }
    )
    res.status(200).json({
      userId: u.id,
      username: u.username,
      token: token,
    })
  }, 
}