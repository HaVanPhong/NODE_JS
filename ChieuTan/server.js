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

app.get("/api", function (req, res) {
  res.json({
    name: "phòng"
  })
});

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

//using multer
app.post("/multer", upload.single("avt"), async (req, res) => {
  var user = req.body;
  await cloudinary.uploader.upload(req.file.path, function (err, result) {
    user.avt = result.secure_url;
  });
  res.json(user);
});

app.listen(8080, () => {
  console.log("runned");
});
