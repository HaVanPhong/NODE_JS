const express = require("express");

const router = express.Router();

const {
  getAllPosts,
  createNewPost,
  findPostById,
  editPost,
  deletePost,
} = require("../controllers/post.controller");

router.route("").get(getAllPosts).post(createNewPost);

router.route("/:postId").get(findPostById).patch(editPost).delete(deletePost);

module.exports = router;
