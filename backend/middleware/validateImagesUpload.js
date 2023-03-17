const removePath = require("../helpers/removePath");
const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const validateImagesUpload = async (req, res, next) => {
  if (!req.files || Object.values(req.files).flat().length === 0) {
    throw new customError(
      "Please selected at least one image",
      StatusCodes.BAD_REQUEST
    );
  }
  const files = Object.values(req.files).flat();

  files.forEach((file) => {
    // Handle if is image or not
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "gif" &&
      file.mimetype !== "image/webp"
    ) {
      removePath(file.tempFilePath);
      throw new customError("Wrong format of file", StatusCodes.BAD_REQUEST);
    }
    // Handle image size
    if (file.size > 1024 * 1024) {
      removePath(file.tempFilePath);
      throw new customError(
        "The size of files can't exceed 1Mb",
        StatusCodes.BAD_REQUEST
      );
    }
  });
  next();
};
module.exports = validateImagesUpload;
