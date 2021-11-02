const jwt= require('jsonwebtoken')
const createError = require('http-errors')
const configuration= require('../configs/configuration')
const User = require('../configs/db')
module.exports = async function(req, res, next) {
  const {authorization} = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')){
    throw createError(401, 'Unauthorized')
  }
  const token = authorization.split(' ')[1]
  const decode = jwt.verify(token, configuration.JWT_SECRET_KEY)
  const user= User.find(value=>value.username=== decode.username);

  if (!user){
    throw createError(404, "token incorrect")
  }
  next();
}