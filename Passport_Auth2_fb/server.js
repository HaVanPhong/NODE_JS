const express = require("express");
const app = express();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
const ConnectDB = require("./configs/database");
const UserModel = require("./Models/User.model");
const jwt = require("jsonwebtoken");
const authenticate = require("./middlewares/auth");
const session = require("express-session");
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
ConnectDB();

//passport facebook=========================
app.use(
  session({
    secret: "key cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: "393410692500626",
      clientSecret: "88798e9e3868c1fa8ad8e235d3a06c21",
      callbackURL:
        "https://e9ac-14-166-161-246.ngrok.io/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (err, res) {
    res.redirect("/");
  }
);

app.get("/home", (req, res, next) => {
  res.json(req.user);
});











//passport local=================================
app.get("/", authenticate, async (req, res) => {
  var allUser = await UserModel.find({});
  res.json(allUser);
});
app.get("/login", (req, res) => {
  res.render("index");
});

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      var user = await UserModel.findOne({ username });
      if (user) {
        done(null, user.toObject());
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  })
);

app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user) {
    console.log("local nè. User: ", user);
    if (err) {
      return res.json({
        status: "Lỗi cái mẹ gì đó",
        message: err.message,
      });
    }
    if (!user) {
      return res.json("username or pass không hợp lệ");
    } //username không hợp lệ
    // req.user= user;
    try {
      var token = jwt.sign({ id: user._id, username: user.username }, "123", {
        expiresIn: "1d",
      });
      res.status(200).json({
        status: "success",
        token: "Bearer " + token,
      });
    } catch (error) {
      res.status(500).json({
        message: "lỗi server",
        error: error,
      });
    }
  })(req, res, next);
});

app.listen(8080, () => {
  console.log("server runned at 8080");
});
