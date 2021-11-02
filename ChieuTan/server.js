const express = require("express");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const ejs = require("ejs");
const multer = require("multer");
const upload = multer({ dest: "./public/image/" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

//templates engine
app.set("view engine", "ejs");
app.set("views", "./views");

cloudinary.config({
  cloud_name: "djowq0mq4",
  api_key: "262823481682934",
  api_secret: "BEuY5pxfnwkTdifGNTBQHJjpZwU",
  secure: true,
});

app.get("/test", function(req, res){
  res.json({
    "status": "ok chứ còn gì nữa", 
    "message": "adu vip"
  })
})

app.get('/', function(req, res) {
  res.render('index');
})

//using formidable
app.post("/api", function (req, res) {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    await cloudinary.uploader.upload(files.file.path, function (err, result) {
      fields.avt = result.secure_url;
      console.log(result.secure_url);
    });
    res.json(fields);
  });
});

//using multer (nên dùng cái này)
app.post("/multer", upload.single("avt"), async (req, res) => {
  var user = req.body;
  console.log(req.file);
  await cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err){
      return res.status(500).json({message: err})
    }
    user.avt = result.secure_url;
  });
  res.json(user);
});

app.listen(8080, () => {
  console.log("runned 8080");
});