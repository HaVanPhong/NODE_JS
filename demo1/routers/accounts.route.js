const express = require("express");

const router = express.Router();

const {
  createNewAccount,
  getAllAccounts,
} = require("../controllers/accounts.controller");

router.route("").get(getAllAccounts).post(createNewAccount);

module.exports = router;
