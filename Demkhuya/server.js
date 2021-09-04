const express= require('express');
const configuration= require('./configs/configuration')
const connectDB= require('./configs/db')
const app= express();
app.set('view engine', "ejs");
app.set('views', './views');

app.use(express.static("public"));

connectDB();

app.get('/', (req, res)=>{
  res.render('index.ejs')
})



app.listen(configuration.PORT, ()=>{
  console.log("App runed");
})