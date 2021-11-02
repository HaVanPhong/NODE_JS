var User= require('../configs/db')
const jwt= require('jsonwebtoken')
const createError= require('http-errors')
const configuration = require('../configs/configuration')
module.exports ={
  login: async (req, res, next) => {
    const { username, password } = req.body;
    // let u= User.find(v=> v.username===username && v.password===password)
    let u= username==='admin' && password==='admin'
    if (!u){
      throw createError(400, "Username and password invalid");
    }
    const token = jwt.sign(
      {username},
      configuration.JWT_SECRET_KEY,
      {
        expiresIn: "1m"
      }
    )
    res.status(200).json({
      username,
      token,
    })
  }, 
}