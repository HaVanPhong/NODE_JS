const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  getAllPosts,
  createNewPost,
} = require("../controllers/post.controller");

const asyncMiddleware = require("../middlewares/async.middleware");

router
  .route("")
  .get(asyncMiddleware(getAllPosts))
  .post(multer().single("image"), asyncMiddleware(createNewPost));

module.exports = router;
