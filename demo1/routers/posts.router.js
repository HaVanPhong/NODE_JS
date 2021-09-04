const express = require("express");

const router = express.Router();

const postController = require("../controllers/posts.controller");

router.route("").get(postController.getAllPosts);

module.exports = router;
