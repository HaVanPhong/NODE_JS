const express= require('express')
const route= express.Router();
const createError= require('http-errors');
const userValidate= require('../helpers/Joi_valid')
var User= require('../models/User.model')

route.post('/register', async (req, res, next)=>{
  try {
    const {email, password}= req.body;
    const { error }= userValidate(req.body);
    if (error){
      throw createError("Joi_Valid ERROR:: " + error.details[0].message)
    }

    const isExists = await User.findOne({username: email})
    if (isExists){
      throw createError.Conflict(`${email} is ready been register`);
    }

    var user= await User.create({
      username: email, 
      password: password
    })

    res.json(user)

  } catch (error) {
    next(error)
  }
})

module.exports = route;