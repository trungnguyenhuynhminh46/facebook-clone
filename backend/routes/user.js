const express = require("express");
const router = express.Router();
const {
  register,
  verify,
  login,
  resentEmail,
  getUserByEmail,
  sendValidationCode,
  validateCode,
  resetPassword,
  getUserInfoByUserEmail,
  updateProfilePicture,
} = require("../controllers/user");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/verify", authorizationMiddleware, verify);
router.post("/resentEmail", authorizationMiddleware, resentEmail);
router.post("/getUserByEmail", getUserByEmail);
router.post("/sendValidationCode", sendValidationCode);
router.post("/validateCode", validateCode);
router.post("/resetPassword", resetPassword);
router.get(
  "/getUserInfoByUserEmail/:email",
  authorizationMiddleware,
  getUserInfoByUserEmail
);
router.post(
  "/updateProfilePicture",
  authorizationMiddleware,
  updateProfilePicture
);

module.exports = router;
