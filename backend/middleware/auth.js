const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authorizationMiddleware = async (req, res, next) => {
  const authorization = req.header("authorization");
  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new customError("Invalid authorization", StatusCodes.UNAUTHORIZED);
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new customError(err.message, StatusCodes.UNAUTHORIZED);
    }
    req.user = user;
    next();
  });
};

module.exports = authorizationMiddleware;
