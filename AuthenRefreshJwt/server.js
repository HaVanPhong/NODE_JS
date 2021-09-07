require("dotenv").config();

const express = require("express");
const app = express();
const verifyToken = require("./middleware/auth");

const posts = [
  {
    id: 1,
    content: "Posts 1",
    userId: 2,
  },
  {
    id: 2,
    content: "Posts2",
    userId: 1,
  },
  {
    id: 3,
    content: "Posts 3",
    userId: 1,
  },
  {
    id: 4,
    content: "Posts 4",
    userId: 2,
  },
];

app.use(express.json());

app.get("/posts", verifyToken, (req, res) => {
  const userId = req.id;
  const p = posts.filter((post) => post.userId === userId);
  res.json({
    ...p,
  });
});

app.listen(8080, () => {
  console.log("Runned");
});
