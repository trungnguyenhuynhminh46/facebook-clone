const express = require("express");
const router = express.Router();
const { register, verify, login } = require("../controllers/user");

router.get("/", async (req, res) => {
  return res.status(200).json({ msg: "Hello world" });
});
router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);

module.exports = router;
