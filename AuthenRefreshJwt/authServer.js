require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const verifyToken = require("./middleware/auth");

let users = [
  {
    id: 1,
    username: "Phongf",
    refreshToken: null,
  },
  {
    id: 2,
    username: "Nam",
    refreshToken: null,
  },
  {
    id: 3,
    username: "Doong",
    refreshToken: null,
  },
  {
    id: 4,
    username: "Phuong",
    refreshToken: null,
  },
];

app.use(express.json());

const generateToken = (payload) => {
  //create JWT
  delete payload.refreshToken;
  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign(payload, process.env.RESFRESH_TOKEN, {
    expiresIn: "1h",
  });
  return { accessToken: accessToken, refreshToken: refreshToken };
};

const updateRefreshToken = (username, refreshToken) => {
  users = users.map((user) => {
    if (user.username === username) {
      return {
        ...user,
        refreshToken: refreshToken,
      };
    }
    return user;
  });
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.sendStatus(404);
  }

  //create JWT
  const tokens = generateToken(user);
  updateRefreshToken(username, tokens.refreshToken);
  res.json({
    tokens,
    users,
  });
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  const user = users.find((user) => user.refreshToken === refreshToken);
  if (!user) {
    console.log("Khoong timf ddc user");
    return res
      .status(403)
      .json({ status: "error", message: "Khong tìm được user" });
  }
  try {
    //decode: từ token => payload
    var decoded = jwt.verify(refreshToken, process.env.RESFRESH_TOKEN);
    console.log("decoded: ", decoded);
    const tokens = generateToken(user);
    updateRefreshToken(user.username, tokens.refreshToken);
    return res.json(tokens);
  } catch (error) {
    console.log("verify error::", error);
    res
      .status(403)
      .json({ status: "error", message: "verify thất bại do token hết hạn" });
  }
});

app.delete("/logout", verifyToken, (req, res) => {
  const user = users.find((user) => user.id === req.id);
  updateRefreshToken(user.username, null);
  res.status(200).json({ status: "success", message: "Đã đăng xuất" });
});

app.listen(8081, () => {
  console.log("Runned");
});
