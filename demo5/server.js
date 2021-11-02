const express = require('express')
const app= express();
const User = require('./models/User.model')
const connectDB= require('./configs/database')
const multer = require('multer');
const upload = multer();
const fs= require('fs');
const path = require('path');

require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());

connectDB();
app.get('/', async (req, res)=>{
  const users = await User.find();
  if (users.length>0)
    res.status(200).json(users);
  else {
    res.send("troongs");
  } 
})



app.use('/users', (req, res)=>{
  console.log(process.env.TETS);
})

app.post('/', upload.single('avt'), async (req, res)=>{
  const user= req.body;
  const file= req.file;
  console.log(req.body, req.file);
  fs.writeFileSync(path.join(__dirname, `public/uploads/${file.originalname}`), file.buffer,{encoding: "utf8"});
})

app.listen(8080, ()=>console.log("run at 8080"))