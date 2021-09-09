require('dotenv').config();
const express = require('express')
const nodemailer= require('nodemailer')
const multer= require('multer');
const upload = multer();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', './views')
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
})

app.post('/send-mail', upload.none(), async (req, res)=>{
  const {email, subject, message} = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { 
      user: process.env.USERNAME_MAIL + "@gmail.com" , 
      pass: process.env.PASSWORD_MAIL
    },
  });
  const content = {
    from:  `ADIM DUONGLĂNG ${process.env.USERNAME_MAIL}`,
    to: email,
    subject,
    text: message,
  }

  const info= await transporter.sendMail(content);

  res.json(info);
})

app.listen(8080, ()=>{
  console.log("runned 3000");
})
