const express = require("express");
const cors = require("cors");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const router = require("./routers");

router(app);

app.listen(3000, () => {
  console.log("Server is running");
});
