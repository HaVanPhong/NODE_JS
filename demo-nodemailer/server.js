const express = require("express");
const fs = require("fs");
const ejs = require("ejs");

const app = express();

app.use(express.json());

const sendMail = require("./helpers/sendMail");

app.post("/send-mail", async (req, res) => {
  const { to, subject } = req.body;

  const template = await ejs.compile(
    fs.readFileSync(__dirname + "/helpers/mailTemplate.ejs", "utf-8")
  );

  const html = template({ title: "Title 1", content: "Content 1" });

  // to: ["buitrungt@gmail.com", "tattrung15@gmail.com"]
  // to: "buitrungt@gmail.com,tattrung15@gmail.com"
  // to: "buitrungt@gmail.com"
  // subject: "hello"
  const info = await sendMail({ to, subject, html });

  res.status(200).json(info);
});

app.listen(3000, () => {
  console.log("Server is running");
});
