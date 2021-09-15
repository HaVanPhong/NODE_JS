const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./configs/database");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());

connectDB();

const router = require("./routers");

router(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running");
});
