const jwt = require("jsonwebtoken");
const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").split(" ")[1]
    : "";
  if (!token) {
    throw new customError("Invalid authorization", StatusCodes.BAD_REQUEST);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new customError("Invalid authorization", StatusCodes.BAD_REQUEST);
    }
    res.user = user;
    next();
  });
};

module.exports = { authMiddleware };
