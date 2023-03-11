const express = require("express");
const router = express.Router();
const { register, verify, login, resentEmail } = require("../controllers/user");
// Middlewares
const authorizationMiddleware = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/verify", authorizationMiddleware, verify);
router.post("/resentEmail", authorizationMiddleware, resentEmail);

module.exports = router;
