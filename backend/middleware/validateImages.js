const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const removeFile = require("../helpers/removeFile");
const validateImages = async (req, res, next) => {
  // Handle if there are any images
  if (!req.files || Object.values(req.files).flat().length === 0) {
    throw new customError(
      "Please attach some at least one image",
      StatusCodes.BAD_REQUEST
    );
  }
  const files = Object.values(req.files).flat();
  files.forEach((file) => {
    // Handle is not image
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/webp" &&
      file.mimetype !== "image/gif"
    ) {
      removeFile(file.tempFilePath);
      throw new customError("Invalid type of file", StatusCodes.BAD_REQUEST);
    }
    // Handler size is too large
    if (file.size > 5 * 1024 * 1024) {
      // console.log(file.size);
      removeFile(file.tempFilePath);
      throw new customError(
        "Files can't be larger than 5Mb",
        StatusCodes.BAD_REQUEST
      );
    }
  });
  next();
};
module.exports = validateImages;
