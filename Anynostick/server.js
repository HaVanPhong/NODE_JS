const express = require('express')
const app= express();
const userRouter= require('./Routes/User.Route')
const createError= require('http-errors');
const { required } = require('joi');
require('./helpers/connect_DB')();
const client = require('./helpers/connect_redis')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/', userRouter)
 

client.set('oe', "haha");
client.get('oe', function (err, res) {
  console.log(res);
})

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500, 
    message: err.message 
  })
})


app.listen(8080, ()=>{
  console.log("runed");
})