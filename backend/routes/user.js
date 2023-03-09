const express = require("express");
const router = express.Router();
const { register, verify, login, auth } = require("../controllers/user");
const { authMiddleware } = require("../middleware/auth");

router.get("/", async (req, res) => {
  return res.status(200).json({ msg: "Hello world" });
});
router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.post("/auth", authMiddleware, auth);

module.exports = router;
