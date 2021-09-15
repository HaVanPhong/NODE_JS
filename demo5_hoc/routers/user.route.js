const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  createNewUser,
  getUserById,
} = require("../controllers/user.controller");

const asyncMiddleware = require("../middlewares/async.middleware");

const authMiddleware = require("../middlewares/auth.middlware");
const roleMiddleware = require("../middlewares/role.middleware");

const typeRole = require("../constants/typeRole");

router
  .route("")
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(typeRole.ADMIN)),
    asyncMiddleware(getAllUsers)
  )
  .post(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(typeRole.ADMIN)),
    asyncMiddleware(createNewUser)
  );

// asyncMiddleware(roleMiddleware([typeRole.ADMIN, typeRole.USER]))
router
  .route("/:userId")
  .get(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(roleMiddleware(Object.values(typeRole))),
    asyncMiddleware(getUserById)
  );

module.exports = router;
