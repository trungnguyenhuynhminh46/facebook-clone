const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = async (err, req, res, next) => {
  const finalError = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong! Please try again",
  };
  if (err.name === "ValidationError") {
    finalError.status = StatusCodes.BAD_REQUEST;
    finalError.errors = Object.entries(err.errors).map(([key, value]) => {
      return { [key]: value.message };
    });
  }
  if (err.code === 11000) {
    finalError.status = StatusCodes.BAD_REQUEST;
    const fields = Object.keys(err.keyValue);
    finalError.message = `Duplicated ${
      fields.length > 1 ? "values at fields" : "value at field"
    } ${fields.join(", ")}`;
  }
  return res.status(finalError.status).json(finalError);
};
module.exports = errorHandlerMiddleware;
