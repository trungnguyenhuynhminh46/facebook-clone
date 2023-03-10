const express = require("express");
const router = express.Router();
const { register, verify, login, auth } = require("../controllers/user");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.post("/authorized", authorizationMiddleware, auth);

module.exports = router;
