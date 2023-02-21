const { StatusCodes } = require("http-status-codes");
const notFoundMiddleware = async (req, res, next) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: "Something went wrong! Your page is not found." });
};
module.exports = notFoundMiddleware;
