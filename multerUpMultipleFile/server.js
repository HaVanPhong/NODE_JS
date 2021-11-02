const express = require('express')
const multer= require('multer')
const upload = multer({dest: './public/img'})
const app = express()
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  res.render('index')
})

app.post('/projects', upload.array('photos'), (req, res)=>{
  
})


app.listen(8080, function() {
  console.log("runed at 8080");
})




