const fs = require("fs");
const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const removePath = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw new customError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  });
};
module.exports = removePath;
