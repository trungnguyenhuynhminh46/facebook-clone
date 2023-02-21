const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = async (err, req, res, next) => {
  const finalError = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong! Please try again",
  };
  return res.status(finalError.status).json({ msg: finalError.message });
};
module.exports = errorHandlerMiddleware;
