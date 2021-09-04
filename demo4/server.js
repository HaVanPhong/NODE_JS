const configuration = require("./configs/configuration");
const express = require("express");
const cors = require("cors");

const connectDB = require("./configs/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

connectDB();

// const router = require("./routers");

// router(app);

const User = require("./models/User.model");
const Post = require("./models/Post.model");

app.get("/", async (req, res) => {
  const userId = "613232a61b5761284cf8edf2";
  const user = await User.findByIdAndUpdate(
    userId,
    { password: "xyz" },
    {
      news: true,
    }
  );
  // console.log(user);
  // res.json(users);
});

app.listen(3000);
