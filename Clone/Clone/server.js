const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
global.SECRET = "clone123";
var cookieParser = require("cookie-parser");
const accounts = require("./models/accountModel");
const fs = require("fs");

// middleware
app.use(cookieParser());

const { urlencoded, json } = require("express");
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

console.log(__dirname, __filename);
const router = require("./router/router");
app.use("/", router);

app.get("/login", (req, res, next) => {
  res.sendFile(path.join(__dirname, "login.html"));
});
app.post("/login", (req, res, next) => {
  accounts
    .findOne(req.body)
    .then((data) => {
      if (data) {
        let token = jwt.sign({ id: data._id }, global.SECRET);
        return res.json({
          message: "Successfully",
          token: token,
        });
      } else {
        return res.json({
          message: "Failure",
          token: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Loi server!");
    });
});
app.get(
  "/private",
  (req, res, next) => {
    try {
      res.data = jwt.verify(req.cookies.token, global.SECRET);
      next();
    } catch (err) {
      res.send("Ban can dang nhap de co the vao trang nay!");
    }
  },
  (req, res, next) => {
    accounts
      .findOne({ _id: res.data.id })
      .then((data) => {
        res.send(`Chao mung ${data.name}`);
      })
      .catch((err) => {
        res.status(500).json("Loi server");
      });
  }
);
const CheckPermission = require("./middlware.js");
app.get(
  "/user",
  CheckPermission.isAll,
  CheckPermission.isUser,
  (req, res, next) => {
    res.json("Đã đăng nhập");
  }
);
app.get(
  "/admin",
  CheckPermission.isAll,
  CheckPermission.isAdmin,
  (req, res, next) => {
    res.json("Đã đăng nhập");
  }
);
app.get(
  "/creater",
  CheckPermission.isAll,
  CheckPermission.isCreater,
  (req, res, next) => {
    res.json("Đã đăng nhập");
  }
);
passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
    },
    function (username, password, done) {
      accounts
        .findOne({
          name: username,
          password: password,
        })
        .then((data) => {
          if (!data) {
            done(null, false);
          } else {
            done(null, data.toObject());
          }
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);
app.post("/sign", function (req, res, next) {
  passport.authenticate("local", function (err, data) {
    if (err) {
      return res.status(500).json({
        message: "Loi server",
        status: 500,
      });
    }
    if (!data) {
      return res.status(403).json({
        message: "Ten hoac mat khau sai",
        status: 403,
      });
    }
    try {
      let token = jwt.sign({ id: data._id }, global.SECRET);
      return res.json({
        message: "Dang nhap thanh cong!",
        token: token,
      });
    } catch {
      return res.json({
        message: "Loi server",
        status: 500,
      });
    }
  })(req, res, next);
});
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
