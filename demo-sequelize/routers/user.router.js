const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  createNewUser,
  editUser,
  findUserById,
  deleteUser,
} = require("../controllers/user.controller");

router.route("").get(getAllUsers).post(createNewUser);

router.route("/:userId").get(findUserById).patch(editUser).delete(deleteUser);

module.exports = router;
