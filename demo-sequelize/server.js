const configuration = require("./configs/configuration");

const cors = require("cors");
const express = require("express");

const connectDB = require("./configs/database");
const router = require("./routers");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

router(app);

const PORT = configuration.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
