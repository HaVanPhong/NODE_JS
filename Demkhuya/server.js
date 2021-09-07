const express = require("express");
const { IncomingForm } = require("formidable");
const configuration = require("./configs/configuration");
const connectDB = require("./configs/db");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.post("/users", (req, res) => {
  console.log(req.body);
});

// app.get('/', (req, res)=>{
//   res.render('index.ejs')
// })

// const bcrypt= require('bcrypt')
// const User= require('./models/user.model');
// const Posts= require('./models/Posts.model');

// app.get("/users", async (req, res) => {
//   const user= await User.find();
//   res.json(user);
// })

app.listen(configuration.PORT, () => {
  console.log("App runed", configuration.PORT);
});
