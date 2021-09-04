const { json } = require('express');
const express = require('express');
const app= express();
const PORT= process.env.PORT || 8080;
const db= require('./db');

const jwt = require('jsonwebtoken');

//Model 
const UserInF= require('./user');

//connect mongodb
db.connect();

app.use(express.json());

// register
app.post('/user/register', async (req, res)=>{
  try {
    const {email, password}= req.body;
    //check xem email tồn tại chưa
    const isCheckUser= await UserInF.findOne({email});
    if (!!isCheckUser){
      return res.json({
        status: 'success',
        message: 'User already exists'
      })
    }
    //nếu chưa có thì đăng ký
    const createUser = new UserInF({
      email,
      password
    });
    await createUser.save()
      .then(res.json({
        status: 'success',
        message: createUser
      }))
      .catch(error=>console.log(error))
    // return res.json()
  } catch (error) {
    console.log("Error: :: ", error);
    return json.status(500).json({
      status: 'error'
    })
  }
})


//login
app.post('/user/login', async (req, res)=>{
  try {
    const {email, password}= req.body;
    const isUser= await UserInF.findOne({email});
    if (!isUser){
      return res.json({
        status: "success",
        message: "User do not exists"
      })
    }

    if (password !== isUser.password){
      return res.json({
        status: 'success',
        message: 'Password incorrect!'
      })
    }
    var payload={
      email
    }
    jwt.sign(payload, 'secrect', (error, token)=>{
      if (error) console.log(error);
      else return res.json({
        status: 'success',
        token
      })
    })

  } catch (error) {
    console.log("Error: ::", error);
    return json.status(500).json({
      status: "error"
    })
  }
})


app.listen(PORT, ()=>console.log("Run app successs", PORT));