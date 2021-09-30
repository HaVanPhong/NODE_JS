const express = require("express");
const app = express();
var session = require("express-session");

const redis = require("redis");
const redisClient = redis.createClient();
const redisStore = require("connect-redis")(session);

app.set("view engine", "ejs");
app.set("views", "./Views");
app.use(express.json());

redisClient.on("error", function (err) {
  console.log("ERROR REDIS:  ", err);
});

//middleware session
app.use(
  session({
    secret: "secret session",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 115000, // hạn của session id được lưu trong cookie
    },
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: redisClient,
      ttl: 8640,
    }),
  })
);

app.get("/", function (req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.render("index", { view: req.session.views });
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
});

app.get("/logout", function (req, res) {
  req.session.destroy();
  res.json("logout oke");
});

app.listen(8080, () => {
  console.log("Server connected at port: 8080");
});
